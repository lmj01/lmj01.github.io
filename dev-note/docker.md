# Docker

```shell
sudo apt update 
sudo apt install docker.io
sudo systemctl start docker 
sudo systemctl enable docker 
```
增加源
vim /etc/docker/daemon.json
```json
{
    "registry-mirrors":[
        "https://do.nark.eu.org",
        "https://docker.mirrors.ustc.edu.cn",
        "https://docker.nju.edu.cn"
    ]
}
```
```shell
sudo systemctl dameon-reload
sudo systemctl restart docker 
sudo systemctl status docker
sudo docker info
sudo docker run hello-world

sudo docker image ls 
sudo docker run -d -p 80:80 --name mj-ngix nginx 

```
