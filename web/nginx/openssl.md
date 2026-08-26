# [OpenSSL](https://www.openssl.org)
[github openssl](https://github.com/openssl/openssl/)


<details>
<summary>利用openssl生成 自签名证书CA</summary>

利用openssl生成 自签名证书CA，利用自签名证书对localhost颁发ssl证书
关键在于Subject Alternative Name (SAN) 扩展。因为从 Chrome 58 开始，浏览器不再信任只包含 CommonName 的证书，必须显式声明 localhost 和 127.0.0.1 为合法域名

```shell
# step 1
mkdir cert
cd cert
mkdir ca
mkdir localhost

# step2
# 2.1 生成CA私钥 生成密钥key
cd cert/ca
# 会有两次要求输入密码，输入同一个密码
openssl genrsa -out ca.key 4096
# 2.2 生成CA根证书，自签名，有效期10年
# -x509: 表示直接生成自签名证书，而不是证书签名请求 (CSR)
# -new -nodes: 生成一个新证书，且不加密私钥（免密码，适合开发环境）
# -subj: 快速指定证书的主体信息，其中 CN (Common Name) 填一个描述性名称即可
openssl req -x509 -new -nodes -key ca.key -sha256 -days 3650 -out ca.crt -subj "/C=CN/ST=Beijing/L=Beijing/O=MyDev/CN=Mylocalhost"

# step 3
# 3.1 生成服务器私钥
cd cert/localhost
openssl genrsa -out localhost.key 2048
# 生成证书签名请求CSR
openssl req -new -key localhost.key -out localhost.csr -subj "/C=CN/ST=Beijing/L=Beijing/O=MyDev/CN=localhost"

# step4 
# 配置SAN扩展文件 创建localhost.ext
cat > ~/my-ca/localhost/localhost.ext <<EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
DNS.2 = meijie.local
DNS.3 = meijie.li
IP.1 = 127.0.0.1
EOF
# 使用CA签发证书
# -CA 和 -CAkey: 指定用来签名的CA证书和私钥
# -CAcreateserial: 自动创建序列号文件，确保每次签发的证书序列号唯一
# -extfile: 应用我们刚才写的扩展文件，让证书支持 localhost
openssl x509 -req -in localhost.csr -CA ../ca/ca.crt -CAkey ../ca/ca.key -CAcreateserial -out localhost.crt -days 3650 -sha256 -extfile localhost.ext

# 验证
openssl x509 -in localhost.crt -text -noout | grep -A1 "Subject Alternative Name"
# nginx配置
server {
    listen 443 ssl;
    server_name localhost;

    ssl_certificate /path/to/your/localhost.crt;
    ssl_certificate_key /path/to/your/localhost.key;
    # ...
}
```

</details>

<details>
<summary>证书应用</summary>

CA目录下是CA证书ca.crt和CA私钥ca.key,作为根证书，可以导入系统的钥匙中，然后修改为信任

localhost目录下得到服务器证书和服务器私钥，配置在nginx服务器中，用来支持https访问,或者开发环境中使用

### 浏览器

Edge 和 Chrome 通常共享 Windows/macOS 的系统证书存储， 但Firefox 使用自己的证书存储，与操作系统分开，因此即使系统已添加信任，也需要单独为 Firefox 操作

如果失败或权限问题，在地址栏中输入about:config后更改security.enterprise_roots.enabled为true。

**由于CA 根证书不在“受信任的根证书颁发机构”存储区中，所以它不受信任。** [window 分发的有效根 CA 证书显示为不受信任的问题提供了解决方法](https://learn.microsoft.com/zh-cn/troubleshoot/windows-server/identity/valid-root-ca-certificates-untrusted)

```shell
# linux
# 不同版本的Linux路径和命令都不同
# debian/ubuntu
cp ca.crt /usr/local/share/ca-certificates/
sudo update-ca-certificates # sudo apt install ca-certificates

# window
# powershell中以管理员方式打开，执行如下命令即可添加
certutil.exe -addstore root .\cert\ca\ca.crt
```

</details>

<details>
<summary>PEM-Privacy-Enhanced Mail</summary>

.pem 本质上不是一种格式，而是一种容器（文件扩展名）。它代表 Privacy-Enhanced Mail，简单说就是把二进制数据用 Base64 编码，并在首尾加上 -----BEGIN XXX----- 和 -----END XXX----- 标记。

OpenSSL 默认输出的 *.crt 和 *.key 文件，绝大多数情况下就是 PEM 格式。

```shell
# 如果你手上已有二进制格式（DER）或 PKCS#12 格式（.pfx / .p12）的证书，可以这样转换

# DER → PEM（二进制转文本）
# 证书转换
openssl x509 -in certificate.der -inform DER -out certificate.pem -outform PEM
# 私钥转换
openssl rsa -in privatekey.der -inform DER -out privatekey.pem -outform PEM

# PKCS#12 (含私钥的 .p12/.pfx) → PEM
# 提取证书（不含私钥）
openssl pkcs12 -in cert.p12 -clcerts -nokeys -out cert.pem
# 提取私钥（需要输入 p12 密码）
openssl pkcs12 -in cert.p12 -nocerts -nodes -out privatekey.pem
```


</details>

<details>
<summary>Subject -subj参数详情</summary>

-subj 参数是用来直接指定证书主体信息的，可以让你在生成证书或签名请求（CSR）时，免去交互式输入的步骤。它的全称是 Subject（主题）

它的格式是 /键=值/键=值/...，斜杠 / 作为分隔符。不同字段的顺序不重要，但必须用 / 开头。

📝 主要字段说明

| 字段代码 | 含义 | 示例值 | 说明 |
| :--- | :--- | :--- | :--- |
| **`C`** | Country Name (国家) | `CN` | 两位字母的国家代码 |
| **`ST`** | State/Province (州/省) | `Beijing` | 省份或州名 |
| **`L`** | Locality (城市) | `Beijing` | 城市或地区名 |
| **`O`** | Organization (组织/公司) | `MyDev` | 公司或组织名称 |
| **`OU`** | Organizational Unit (部门) | `IT` | 部门名称（可选） |
| **`CN`** | Common Name (通用名称) | `localhost` 或 `example.com` | **最重要的字段**：对于服务器证书，这是**域名**；对于CA证书，这是一个描述性名称 |

</details>

<details>
<summary>开发</summary>

加密解密，可以通过配置openssl的开发环境，来开发加解密文档。

## AES
支持AES symmetric encryption using the EVP_CIPHER API

- [EVP_CIPHER-AES - The AES EVP_CIPHER implementations](https://manpages.debian.org/trixie/openssl/EVP_CIPHER-AES.7ssl.en.html)
- [debian openssl ](https://manpages.debian.org/trixie/openssl/index.html)
- [debian libssl doc](https://manpages.debian.org/trixie/libssl-doc/index.html)

</details>