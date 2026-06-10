# [SuperTux](https://github.com/SuperTux/supertux)

- [developer doc](https://invent.kde.org/education/gcompris/-/wikis/Developers-corner/Development-process)

## dev

```shell
sudo apt-get install cmake g++ libgl1-mesa-dev libssl-dev gettext
sudo apt install libqt6svg6-dev \
                 qt6-multimedia-dev qt6-tools-dev qt6-tools-dev-tools \
                 libqt6sensors6-dev libqt6svg6-dev \
                 linguist-qt6 qt6-l10n-tools \
                 qt6-declarative6-dev qml6-module-qtcharts \
                 libqt6charts6-dev \
                 qml6-module-qtcore qml6-module-qtquick-controls \
                 qml6-module-qtmultimedia qml6-module-qtqml \
                 qml6-module-qtqml-workerscript qml6-module-qtquick \
                 qml6-module-qtquick-window qt6-image-formats-plugins \
                 qml6-module-qtquick-templates

git clone https://invent.kde.org/education/gcompris.git
cd gcompris
git submodule init && git submodule update
mkdir build
cd build
cmake ..
make
```
