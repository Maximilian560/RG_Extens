# RG_Extens <img alt="RG_Extens Version" src="https://img.shields.io/badge/RG_Extens-v0.0.1-green">  

### Связь с разработчиком:  

[<img alt="Telegram"        src="https://img.shields.io/badge/Rinemest-green?logo=Telegram&logoColor=ffffff&label=Telegram&labelColor=24A1DE&color=222222&link=https%3A%2F%2Ft.me%2Frinemest">](https://t.me/Rinemest)
[<img alt="Telegram"        src="https://img.shields.io/badge/Rinegine-green?logo=Telegram&logoColor=ffffff&label=Telegram&labelColor=24A1DE&color=444444&link=https://t.me/Rinegine">](https://t.me/Rinegine)

## Добро пожаловать на главную страницу расширения для работы с движком [Rinegine](https://github.com/Maximilian560/Rinegine)!

Данное расширение необходимо только тем, кто работает с движком [Rinegine](https://github.com/Maximilian560/Rinegine)
Сам движок как и расширение работает только на Windows! Возможно на линукс с Wine, но это не проверялось. Вопросы по Wine рассмотрены не будут!
### Что умеет:
Данное расширение упрощает сборку программ с помощью [Rinegine](https://github.com/Maximilian560/Rinegine) 
* После установки скорее всего вас потребуют указать путь до движка [Rinegine](https://github.com/Maximilian560/Rinegine), надо указать включая папку [Rinegine](https://github.com/Maximilian560/Rinegine), иначе будет ошибка.
* После как укажите путь вы сможете собирать проекты одним сочетанием клавиш (но только после того, как вы создадите файл rgset с настройками проекта) <kbd>CTRL</kbd>+<kbd>F8</kbd>. Вы сможете изменить сочетание настройками самой VS code. По умолчанию для сборки используется сборщик 32 разрядный, но вы можете так же указать сочетание клавиш и для сборки 64 разрядным сборщиком.
* При создании конфигурационного файла вам будут показываться подсказки переменных и функций. Для подробного описание введите `rgcmd -rg` или `rgcmd --rgset`
* Вы так же можете вручную вызвать сборку командой нажав <kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>P</kbd> и вписав в открывшееся окно Build, Будет несколько вариантов, `Build (64-bit)` и `Build (32-bit)`, можете выбрать любой.
### Что планируется:
* Подсветка других файлов использующих в [Rinegine](https://github.com/Maximilian560/Rinegine).
* Более улучшенная подсветка синтаксиса в файлах [Rinegine](https://github.com/Maximilian560/Rinegine).
* Более лучшая помощь от подсказок автозаполнения.
