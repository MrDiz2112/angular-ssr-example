# Angular SSR - Полный пример Server-Side Rendering

Практические примеры использования Server-Side Rendering в Angular, основанные на статье [Angular SSR - Everything You Need to Know](https://angular.love/angular-ssr-everything-you-need-to-know).

## 📚 Обзор Angular SSR

### Что такое SSR?

Server-Side Rendering (SSR) - это процесс рендеринга Angular приложения на сервере, а не в браузере. Сервер генерирует HTML и отправляет его клиенту, что обеспечивает:

- **Улучшенное SEO** - поисковые системы видят полный контент страницы
- **Быстрое первое отображение** (First Contentful Paint) - пользователь видит контент быстрее
- **Лучшая производительность** на слабых устройствах
- **Поддержка социальных сетей** - корректное отображение превью ссылок

### Как работает SSR в Angular?

1. **Сервер получает запрос** от пользователя
2. **Angular рендерит приложение** на сервере (Node.js)
3. **Сервер отправляет HTML** с полным контентом
4. **Браузер отображает HTML** мгновенно (статичный контент)
5. **Angular загружается** и делает страницу интерактивной (Hydration)

### Hydration

Hydration - это процесс, когда Angular "оживляет" серверный HTML, прикрепляя обработчики событий и делая приложение интерактивным. Angular повторно использует существующую DOM структуру вместо полной перерисовки.

## 🚀 Запуск проекта

### Установка и запуск

```bash
npm install
npm run dev:ssr
```

Приложение будет доступно по адресу `http://localhost:4000`

### Команды

- `npm start` - разработка без SSR (`http://localhost:4200`)
- `npm run build:ssr` - production сборка
- `npm run serve:ssr` - запуск SSR сервера
- `npm run dev:ssr` - быстрый запуск SSR для разработки

## 📂 Структура проекта

```
src/
├── app/
│   ├── pages/              # Страницы с примерами SSR
│   ├── services/           # Сервисы приложения
│   ├── data/              # Моковые данные
│   ├── app.component.ts   # Главный компонент
│   ├── app.config.ts      # Конфигурация клиента
│   ├── app.config.server.ts  # Конфигурация сервера
│   └── app.routes.ts      # Маршруты
├── main.ts                # Точка входа клиента
└── main.server.ts         # Точка входа сервера
server.ts                  # Express сервер для SSR
```

## 💡 Основные возможности SSR

### 1. Transfer State - Передача данных

**Файл:** [`src/app/pages/transfer-state/transfer-state.component.ts`](src/app/pages/transfer-state/transfer-state.component.ts)

Transfer State позволяет передавать данные с сервера на клиент без повторных HTTP запросов после hydration.

**Как это работает:**
1. На сервере данные загружаются и сохраняются в Transfer State
2. Transfer State сериализуется в HTML внутри тега `<script>`
3. На клиенте данные извлекаются из Transfer State
4. HTTP запрос не выполняется повторно

### 2. Platform Check - Проверка платформы

**Файл:** [`src/app/pages/platform-check/platform-check.component.ts`](src/app/pages/platform-check/platform-check.component.ts)

Некоторый код должен выполняться только в браузере (например, работа с `localStorage`, `window`), а некоторый только на сервере. Используйте `isPlatformBrowser()` и `isPlatformServer()` для проверки окружения.

**Важно:** Всегда проверяйте платформу перед использованием browser-only API!

### 3. SEO Meta Tags - Мета-теги для поисковой оптимизации

**Файл:** [`src/app/pages/seo/seo.component.ts`](src/app/pages/seo/seo.component.ts)

SSR позволяет поисковым системам и социальным сетям видеть мета-теги, так как они генерируются на сервере. Используйте сервисы `Meta` и `Title` для управления:
- Title и Description
- Open Graph (Facebook, LinkedIn)
- Twitter Cards

### 4. Hydration - "Оживление" серверного HTML

**Файл:** [`src/app/app.config.ts`](src/app/app.config.ts)

Включается через `provideClientHydration()` в конфигурации приложения. Angular автоматически повторно использует существующую DOM структуру вместо полной перерисовки.

## 🛠 Конфигурация SSR

### Server-side конфигурация

**Файлы:** 
- [`server.ts`](server.ts) - Express сервер с CommonEngine
- [`src/app/app.config.server.ts`](src/app/app.config.server.ts) - серверная конфигурация Angular с `provideServerRendering()`

### Client-side конфигурация

**Файл:** [`src/app/app.config.ts`](src/app/app.config.ts)

Клиентская конфигурация включает `provideClientHydration()` для оптимальной производительности.

## 📝 Дополнительные файлы

- [`src/app/data/mock-data.ts`](src/app/data/mock-data.ts) - Моковые данные для примеров
- [`src/app/services/data.service.ts`](src/app/services/data.service.ts) - Сервис для работы с данными
- [`src/app/pages/home/home.component.ts`](src/app/pages/home/home.component.ts) - Главная страница с описанием

## 🎯 Рекомендации

1. **Используйте Transfer State** для избежания повторных HTTP запросов
2. **Проверяйте платформу** перед использованием browser-only API
3. **Настраивайте мета-теги** для каждой страницы
4. **Включайте Hydration** для оптимальной производительности
5. **Избегайте прямого доступа** к `window`, `document`, `localStorage` без проверки платформы

## 📖 Источник

Примеры основаны на статье: [Angular SSR - Everything You Need to Know](https://angular.love/angular-ssr-everything-you-need-to-know)

---

Этот репозиторий создан в образовательных целях. Не стесняйтесь использовать примеры в своих проектах!
