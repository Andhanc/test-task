# Описание проекта


## Архитектура

Базовая архитектура на React с хуками.
Проект маленький, поэтому не вижу смысла усложнять его Redux.

`pages/`            страницы
`components/`       компоненты

`React Router`                      для роутинга
`ProtectedRoute` и `PublicRoute`    защита маршрутов 

Состояние авторизации хранится в localStorage

Добавил сортировку(по алфавиту) и фильтрацию(каждый 10 остается)




## Файловая структура

```
ProtectedRoute.jsx      # Защита приватных маршрутов
PublicRoute.jsx         # Защита публичных маршрутов

SignIn.jsx          # Страница входа
UsersPage.jsx       # Страница пользователя
UsersPage.css       # Стили

App.jsx             # Роутинг
App.css             # Стили 
main.jsx            # Точка входа
main.css            # Cтили

vite.config.js      #сервер/сборщик
```

## Библиотеки

- **React** 
- **React Router DOM** 
- **Vite** 


## Запуск проекта

1. Установить зависимости:
```bash
npm install
```

2. Запустить сервер:
```bash
npm run dev
```

Проект откроется на `http://localhost:5173` 

Чтобы скинуть сессию и вернуться на sign-in нужно очистить ls (localStorage.clear()) и обновить страницу

