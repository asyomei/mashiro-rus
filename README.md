# Русификатор для Mashiroiro Symphony HD -Love is Pure White-
# Русификатор для Mashiroiro Symphony HD -Sana Edition-

[[VNDB] Mashiroiro Symphony HD -Love is Pure White-](https://vndb.org/v1552)

[[VNDB] Mashiroiro Symphony HD -Sana Edition-](https://vndb.org/v37651)

## Статус перевода
Начат 25.02.2025

## Перевод
1. Вытащить файлы сценарии (см. KirikiriTools > KirikiriUnencryptedArchive)
1. `pnpm i`
1. `pnpm scn-unpack scenarios/scenario_01.txt.scn`
1. `pnpm translate scenarios/unpacked/scenario_01.txt.json`
1. Внести изменения в `scenarios/translated/scenario_01.txt.json`
1. `pnpm scn-pack scenarios/translated/scenario_01.txt.json`
1. Интегрировать `scenarios/translated/scenario_01.txt.scn` в игру (см. KirikiriTools > KirikiriUnencryptedArchive)

## Используемые инструменты
- [fontkit](https://github.com/foliojs/fontkit) - для расчёта ширины текста при шрифте игры
- [VNTextPatch](https://github.com/arcusmaximus/VNTranslationTools)
- [KirikiriTools](https://github.com/arcusmaximus/KirikiriTools)

## [Перевод] KirikiriTools > KirikiriUnencryptedArchive
Файл `version.dll` позволяет игре принимать незашифрованные .xp3 архивы. Используя данный файл, больше не нужно хитрить с шифрованием для добавления/замены .xp3 файлов; просто создайте незашифрованный архив с помощью Xp3Pack, поместите `version.dll` в папку с игрой и готово.

DLL также логгируется; его логи можно увидеть через Microsoft DebugView - так можно проверить, что DLL работает.

Существуют спец. фичи для работы с .xp3 архивами с зашифрованными именами файлов, которые не доступны другим инструментам. В частности, эти фичи доступны если DebugView показывает сообщение в духе "Hooking storage media 'arc'", когда запускается игра (это не относится к media "psb").

- Если существует файл `extract-unencrypted.txt` в папке с игрой, DLL будет вытаскивать любые файлы, с которыми игра будет взаимодействовать, в папку `unencrypted` с оригинальными именами. Поскольку файлы достаются по мере того, как игра их считывает, то для распаковки всех файлов придётся вручную взаимодействовать с игрой. **Даже если существует другой инструмент для распаковки файлов, вместо этого воспользуйтесь этим.**

- Если файл есть в папке `unencrypted`, игра будет использовать его вместо оригинального файла в зашифрованных .xp3 архивах.

- Если файл есть в `unencrypted.xp3`, игра будет использовать файл в этом архиве вместо оригинального в зашифрованных .xp3 архивах.
