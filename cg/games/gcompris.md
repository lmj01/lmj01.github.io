<<<<<<< HEAD
# [GCompris](https://gcompris.net)

- [git repo](https://invent.kde.org/education/gcompris)
=======
# [SuperTux](https://github.com/SuperTux/supertux)

>>>>>>> eb4c435 (update)
- [developer doc](https://invent.kde.org/education/gcompris/-/wikis/Developers-corner/Development-process)

## dev

```shell
sudo apt-get install cmake g++ libgl1-mesa-dev libssl-dev gettext
<<<<<<< HEAD
sudo apt install qt6-multimedia-dev qt6-tools-dev qt6-tools-dev-tools \
                 qt6-sensors-dev qt6-svg-dev \
                 linguist-qt6 qt6-l10n-tools \
                 qt6-declarative-dev qml6-module-qtcharts \
                 qt6-charts-dev \
=======
sudo apt install libqt6svg6-dev \
                 qt6-multimedia-dev qt6-tools-dev qt6-tools-dev-tools \
                 libqt6sensors6-dev libqt6svg6-dev \
                 linguist-qt6 qt6-l10n-tools \
                 qt6-declarative6-dev qml6-module-qtcharts \
                 libqt6charts6-dev \
>>>>>>> eb4c435 (update)
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
