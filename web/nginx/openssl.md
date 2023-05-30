# OpenSSL

## Linux系统下生成证书
利用openssl生成 自签名证书CA，利用自签名证书对localhost颁发ssl证书

```shell
# step 1
mkdir cert
cd cert
mkdir ca
mkdir localhost

# step2
# 生成密钥key
# 会有两次要求输入密码，输入同一个密码
openssl genrsa -out ca.key 2048
# 生成的server.key被openssl的cli或api调用时，可能要经常输入密码，
# 想去除输入密码的步骤，可以执行
# openssl rsa -in ca.key -out server.key
# 创建服务器证书的申请文件server.csr
openssl req -new -key ca.key -out ca.csr

# step 3
# 创建证书
openssl x509 -req -days 3650 -in ca.csr -signkey ca.key -out ca.crt

# step4 
# 创建localhost.ext
# 
openssl genrsa -out localhost.key 2048
openssl req -new -key localhost.key -out localhost.csr
openssl x509 -req -in localhost.csr -CA ../ca/ca.crt -CAkey ../ca/ca.key -CAcreateserial -extfile localhost.ext -out localhost.crt
```

CA目录下是CA证书ca.crt和CA私钥ca.key,作为根证书，可以导入系统的钥匙中，然后修改为信任

localhost目录下得到服务器证书和服务器私钥，配置在nginx服务器中，用来支持https访问

### linux

### window 

**由于CA 根证书不在“受信任的根证书颁发机构”存储区中，所以它不受信任。**

certutil.exe -addstore root .\cert\ca\ca.crt

[分发的有效根 CA 证书显示为不受信任的问题提供了解决方法](https://learn.microsoft.com/zh-cn/troubleshoot/windows-server/identity/valid-root-ca-certificates-untrusted)

## minica

minica封装了openssl的api，可以快速生成证书
