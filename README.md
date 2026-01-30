# Описание проекта


## Архитектура

 React с хуками, Context api для управления состоянием.

- `services` — работа с api
- `utils` — валидация
- `context` — глобальное состояние 
- `components` — компоненты
- `pages` — страницы приложения

Роутинг через `React Router` с защитой маршрутов (`ProtectedRoute` и `PublicRoute`).
Состояние авторизации сохраняется в localStorage.


## Файловая структура

```
components/
        ProtectedRoute.jsx      # Защита приватных маршрутов
        PublicRoute.jsx         # Защита публичных маршрутов
        UsersTable.jsx          # Таблица 
        UsersTable.css          # Стили

context/
        AuthContext.jsx        # Управление авторизацией
        UsersContext.jsx       # Управление данными пользователей

 pages/
        SignIn.jsx             # Страница входа
        UsersPage.jsx          # Страница пользователя
        UsersPage.css          # Стили

services/
        api.js                 # Запросы к fakerapi

utils/
        validation.js          # Валидация форм

App.jsx         # Роутинг
App.css         # Стили           
main.jsx        # Точка входа
main.css        # Стили
```

## Библиотеки

- **React** — UI
- **React Router DOM** — роутинг
- **Vite** — сервер и сборка 


## Запуск проекта

1. Установить зависимости:
```bash
npm install
```

2. Запустить dev-сервер:
```bash
npm run dev
```

Проект откроется на `http://localhost:5173`

Для сбросасессии нужнл очистить localStorage в консоли: localStorage.clear()


