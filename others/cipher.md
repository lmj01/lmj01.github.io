# 密码学与安全
> 曾经一度迷恋了密码学,觉得高大上,很有前途,可是仅是幻想,自己没有那个本事牙,还是一步步走来得实在,遇到了就用现有,能麻烦别人就不要折腾自己.

## 数字签名
- **openssl**:TLS/SSL and crypto library, The OpenSSL Project is a collaborative effort to develop a robust,commercial-grade, fully featured, and Open Source toolkit implementing the Transport Layer Security (TLS) protocols (including SSLv3) as well as a full-strength general purpose cryptographic library.
- **Digital Signature**:签名的算法步骤大概流程如下:
    1. 服务方用Hash对明文计算得到digest
    2. 服务方用私钥对digest加密得到signature
    3. 客户方用服务方的公钥对Signature解密得到digest,确定服务方来源的
    4. 客户方用Hash对明文计算得到digest,对比两个digest确定是否修改过,客户方为确保得到的服务方的公钥没有被替换,需要第三方的CA对服务方的签名.
- **HTTPS**: 大概流程:
    1. 客户端发送请求到服务器
    2. 服务器返回证书(含公开秘钥)
    3. 客户端验证证书的真实性和有效性,生成共享秘钥,利用服务器的公开秘钥加密后发送给服务器
    4. 服务器利用私钥解密得到共享秘钥,用共享秘钥加密数据,传输给客户端
    5. 客户端使用共享秘钥解密数据
- **Digital Certificate**:
    * **CA-Certificate Authority**:非对称密码产生的公钥与私钥, 大概流程如下:
        1. 服务方向CA(第三方机构)申请证书
        2. CA给服务方发放证书(包含:服务方的公钥,服务方的组织信息,CA的信息,有效时间,证书序号等明文信息,一个签名)
        3. 客户向服务发送请求,服务返回证书
        4. 客户认证证书是否有效,客户会从CA获取相关的信息来确认证书的真实性和有效性
