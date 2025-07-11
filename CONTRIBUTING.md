# Оформление коммитов
Сообщения коммитов оформляются согласно [conventional-commits](https://www.conventionalcommits.org/ru/v1.0.0/).

## Типы коммитов
|   Тип    | Назначение                                                                            | Пример                                                 |
| :------: | ------------------------------------------------------------------------------------- | ------------------------------------------------------ |
|   feat   | Для коммитов, которые содержат полностью готовую фичу                                 | feat: buy nft with Matic                               |
|   fix    | Для коммитов, которые содержат исправление ошибок и багов                             | fix: cancel modal window not closing after transaction |
|  chore   | Для коммитов, которые не являются багами, отностяся больше к косметическим изменениям | chore: changed text on main page                       |
|   prog   | Для промежуточных коммитов, которые содержат новый код для фичи                       | prog: buy modal window                                 |
|   test   | Для коммитов, которые содержат новые или недостоющие тесты                            | test: 2+2=5                                            |
|  merge   | Если при merge было необходимо решать конфликты                                       | merge: dev                                             |
| refactor | Для коммитов, которые содержат отрефакторенный код                                    | refactor: buy modal                                    |

## Scopes

Для более понятного описание коммитов предусмотрены скоупы.  

В рамках Front-end приложения выделены следующие скоупы:
|  Scope  | Назначение                                                                     |
| :-----: | ------------------------------------------------------------------------------ |
| markup  | Изменния, кторый касаются UI                                                   |
|   api   | Подключение новых endpoint-ов, изменение логики существующей работы с сервером |
|  web3   | Всё что связано с работой с кошельками, сетями, контрактами                    |
| utility | Написание вспомогательных функций, типов                                       |

## Пример
**Задача**: Сделать покупку с помощью нативной валюты  

Данная задача может быть разбита на несколько подзадач:
- Сверстать модальное окно
- Написать метода вызова покупки через нативный токен
- Интегрировать метод покупки.

Каждая из задач может быть рассмотрена как отдельная фича, но **в глобальном смылсе фичей, считается завершённый пользовательский сценарий, либо завершённая часть системы недоступная пользователю(пример: генерация sitemap)**.

Соотвественно история комитов может выглядеть следующим образом:
- **prog(markup)**: buy modal window
- **prog(web3)**: buy method
- **feat**: buying nft with native tokens

## Уточнения

### Атомарные коммиты
Важно соблюдать атомарность, если, например, задач разделена на три фичи, то это должны быть отдельные коммиты:
- feat: feature #1
- feat: feature #2
- feat: feature #3,

Вместо одного:
- feat: feature #1, feature #2, feature #3

### Содержимое сообщения(subject)
1. Изсходя из сообщения коммита, должно быть понятно что делает новый код
    ```json
    // incorrect
    feat: check text content exist in GSSP // Не понятно что происходит после проверки и для чего она, использование абревиатуры

    // correct
    feat: redirect to 500 if failed to get page content in getServerSideProps
    ```
2. Сообщение должно описывать атомарное изменение
   ```json
    // incorrect
    fix: back link from sell page, add request for tokens on mystery boxes page // Сообщение соддержит изменния для ссылки страницы продажи и измение запроса на токены

    // correct
    fix: added missing back link from sell page
    prog(api): added request for tokens on mystery boxes page
   ```
3. Сообщения для `feat` должны описывать фичу как сценарий в настоящем времени
    ```json
    // incorrect
    feat: buy nft with native tokens(Matic) //

    // correct
    feat: buying nft with native tokens(Matic)
    ```
4. Сообщения для `chore` должны описывать фичу в прошедшем времени времени
    ```json
    // incorrect
    chore: change page name //

    // correct
    chore: changed page name
    ```