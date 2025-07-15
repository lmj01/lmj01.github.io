# [flutter](https://flutter.dev/)

## dev

```shell
# step one
sudo apt update
sudo apt install -y git curl unzip xz-utils zip libglu1-mesa
# step two
cd ~
curl -O https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.10.6-stable.tar.xz
tar xf flutter_linux_3.10.6-stable.tar.xz

# step three
flutter channel stable
flutter upgrade
flutter config --enable-web 
# step four
flutter create demo1
cd demo1
flutter run -d web-server --web-port=3000 --web-hostname=0.0.0.0 --web-renderer=canvaskit
```