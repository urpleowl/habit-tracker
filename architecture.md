# Архитектура проекта Habit Tracker

## 1. Структура проекта

Монорепозиторий на npm workspaces. Два пакета:

| Пакет | Назначение |
|-------|------------|
| `packages/ui` | Библиотека общих React-компонентов. Без бизнес-логики приложения. |
| `packages/app` | Основное SPA. Импортирует компоненты из `@habit-tracker/ui`. |

### packages/ui

```
packages/ui/
├── package.json
├── tsconfig.json
├── eslint.config.js
├── jest.config.cjs
├── jest.setup.cjs
├── vite.config.ts          # вспомогательный (опционально)
├── __tests__/
│   ├── Button.test.tsx
│   └── ProgressBar.test.tsx
└── src/
    ├── index.ts            # публичный API библиотеки
    ├── types.ts
    ├── css-modules.d.ts
    └── components/
        ├── Button/
        ├── Card/
        ├── ProgressBar/
        ├── HabitCard/
        └── BarChart/
```

Сборка UI: `tsc --noEmit` (проверка типов). Точка входа для приложения — исходники `src/index.ts` (workspace import), без обязательной публикации в `dist`.

### packages/app

```
packages/app/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── eslint.config.js
├── jest.config.cjs
├── index.html
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── css-modules.d.ts
    ├── context/HabitsContext.tsx
    ├── storage/habitsStorage.ts
    ├── routes/index.tsx
    ├── pages/
    │   ├── HomePage.tsx
    │   ├── HabitsPage.tsx
    │   ├── HabitDetailPage.tsx
    │   ├── StatisticsPage.tsx
    │   └── NotFoundPage.tsx
    └── styles/global.css
```

Сборка app: `tsc --noEmit && vite build`.

---

## 2. Используемые библиотеки

### packages/ui

| Библиотека | Версия | Назначение |
|------------|--------|------------|
| react | ^19.3.1 | UI |
| react-dom | ^19.3.1 | Рендеринг |
| typescript | ^5.9.3 | Типизация |
| vite | ^8.3.8 | Инструменты сборки (devDeps) |
| jest | ^30.2.0 | Юнит-тесты |
| @testing-library/react | ^16.3.0 | Тесты компонентов |
| eslint | ^9.39.5 | Линтинг |

### packages/app

| Библиотека | Версия | Назначение |
|------------|--------|------------|
| react | ^19.3.1 | UI |
| react-dom | ^19.3.1 | Рендеринг |
| react-router-dom | ^7.9.4 | Маршрутизация |
| typescript | ^5.9.3 | Типизация |
| vite | ^8.3.8 | Dev-сервер и production-сборка |
| @habit-tracker/ui | workspace | Общие компоненты |
| jest | ^30.2.0 | Тесты |
| eslint | ^9.39.5 | Линтинг |

---

## 3. Компоненты библиотеки `packages/ui`

| Компонент | Назначение |
|-----------|------------|
| `Button` | Кнопка (primary / secondary / danger) |
| `Card` | Карточка-контейнер с опциональным заголовком |
| `ProgressBar` | Полоса прогресса (value / max) |
| `HabitCard` | Карточка привычки: имя, streak, прогресс, toggle |
| `BarChart` | Простая столбчатая диаграмма для статистики |

---

## 4. Структура роутинга (`packages/app`)

| Маршрут | Страница | Описание |
|---------|----------|----------|
| `/` | HomePage | Сегодня: список привычек и общий прогресс |
| `/habits` | HabitsPage | Список и добавление привычек |
| `/habits/:id` | HabitDetailPage | Детали привычки |
| `/statistics` | StatisticsPage | Статистика и диаграмма |
| `*` | NotFoundPage | 404 |

Роутинг: React Router v7. Точка входа оборачивает приложение в `BrowserRouter`. Маршруты объявлены компонентами `Routes` и `Route` в `src/routes/index.tsx` (не через `createBrowserRouter`).

---

## 5. Связь app ↔ ui

Приложение импортирует компоненты так:

```ts
import { Button, Card, ProgressBar, HabitCard, BarChart } from '@habit-tracker/ui'
import type { Habit } from '@habit-tracker/ui'
```

Разрешение модуля:
- npm workspaces (`"@habit-tracker/ui": "*"`);
- `exports` в `packages/ui/package.json` указывают на `./src/index.ts`;
- в `packages/app` alias Vite и `paths` TypeScript на исходники UI.

Состояние привычек: React Context + `localStorage` (`HabitsContext`, `habitsStorage`).

---

## 6. Скрипты (корень монорепо)

| Скрипт | Действие |
|--------|----------|
| `npm run dev` | Vite dev-сервер приложения |
| `npm run build` | Проверка типов UI, затем build app |
| `npm run lint` | ESLint во всех workspaces |
| `npm run test` | Jest во всех workspaces |
| `npm run test:coverage` | Coverage (в UI порог ≥70% для ProgressBar) |
