# Angular SSR - Полный пример Server-Side Rendering

Этот репозиторий содержит практические примеры использования Server-Side Rendering в Angular, основанные на ключевых концепциях SSR.

> **🚀 Новичок в SSR?** Начните с [`START_HERE.md`](START_HERE.md) для быстрого старта!

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

### Установка зависимостей

```bash
npm install
```

### Разработка (без SSR)

```bash
npm start
```

Приложение будет доступно по адресу `http://localhost:4200`

### Сборка и запуск с SSR

```bash
npm run build:ssr
npm run serve:ssr
```

Приложение с SSR будет доступно по адресу `http://localhost:4000`

### Быстрый запуск SSR для разработки

```bash
npm run dev:ssr
```

## 📂 Структура проекта

```
src/
├── app/
│   ├── pages/              # Страницы с примерами
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

**Подробное описание:** [`PROJECT_STRUCTURE.md`](PROJECT_STRUCTURE.md)

## 💡 Основные возможности SSR

### 1. Transfer State - Передача данных

**Файлы:** [`src/app/pages/transfer-state/transfer-state.component.ts`](src/app/pages/transfer-state/transfer-state.component.ts)

Transfer State позволяет передавать данные с сервера на клиент без повторных HTTP запросов после hydration.

**Как это работает:**

1. На сервере данные загружаются и сохраняются в Transfer State
2. Transfer State сериализуется в HTML внутри тега `<script>`
3. На клиенте данные извлекаются из Transfer State
4. HTTP запрос не выполняется повторно

**Пример использования:**

```typescript
import { TransferState, makeStateKey } from '@angular/core';

const USERS_KEY = makeStateKey<User[]>('users');

export class TransferStateComponent implements OnInit {
  private transferState = inject(TransferState);
  private dataService = inject(DataService);
  
  ngOnInit() {
    const cachedUsers = this.transferState.get(USERS_KEY, null);
    
    if (cachedUsers) {
      // Данные уже есть из Transfer State
      this.users = cachedUsers;
    } else {
      // Загружаем данные и сохраняем в Transfer State
      this.dataService.getUsers().subscribe(users => {
        this.users = users;
        this.transferState.set(USERS_KEY, users);
      });
    }
  }
}
```

### 2. Platform Check - Проверка платформы

**Файлы:** [`src/app/pages/platform-check/platform-check.component.ts`](src/app/pages/platform-check/platform-check.component.ts)

Некоторый код должен выполняться только в браузере (например, работа с `localStorage`, `window`), а некоторый только на сервере.

**Пример использования:**

```typescript
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

export class PlatformCheckComponent {
  private platformId = inject(PLATFORM_ID);
  
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Код для браузера
      const width = window.innerWidth;
      localStorage.setItem('key', 'value');
    }
    
    if (isPlatformServer(this.platformId)) {
      // Код для сервера
      console.log('Рендеринг на сервере');
    }
  }
}
```

**Важно:** Всегда проверяйте платформу перед использованием browser-only API!

### 3. SEO Meta Tags - Мета-теги для поисковой оптимизации

**Файлы:** [`src/app/pages/seo/seo.component.ts`](src/app/pages/seo/seo.component.ts)

SSR позволяет поисковым системам и социальным сетям видеть мета-теги, так как они генерируются на сервере.

**Пример использования:**

```typescript
import { Meta, Title } from '@angular/platform-browser';

export class SeoComponent implements OnInit {
  private meta = inject(Meta);
  private title = inject(Title);
  
  ngOnInit() {
    // Title
    this.title.setTitle('SEO с Angular SSR');
    
    // Description
    this.meta.updateTag({
      name: 'description',
      content: 'Описание страницы для SEO'
    });
    
    // Open Graph для Facebook, LinkedIn
    this.meta.updateTag({ 
      property: 'og:title', 
      content: 'SEO с Angular SSR' 
    });
    
    // Twitter Card
    this.meta.updateTag({ 
      name: 'twitter:card', 
      content: 'summary_large_image' 
    });
  }
}
```

### 4. Hydration - "Оживление" серверного HTML

**Файлы:** [`src/app/app.config.ts`](src/app/app.config.ts)

Hydration включается в конфигурации приложения:

```typescript
import { provideClientHydration } from '@angular/platform-browser';

export const config: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    // ... другие провайдеры
  ]
};
```

Angular автоматически повторно использует существующую DOM структуру вместо полной перерисовки.

## 🛠 Конфигурация SSR

### Server-side конфигурация

**Файлы:** 
- [`server.ts`](server.ts) - Express сервер
- [`src/app/app.config.server.ts`](src/app/app.config.server.ts) - серверная конфигурация Angular

Express сервер обрабатывает запросы и использует Angular CommonEngine для рендеринга:

```typescript
import { CommonEngine } from '@angular/ssr';

const commonEngine = new CommonEngine();

server.get('*', (req, res) => {
  commonEngine.render({
    bootstrap,
    documentFilePath: indexHtml,
    url: req.url,
    publicPath: browserDistFolder,
  }).then(html => res.send(html));
});
```

### Client-side конфигурация

**Файлы:** [`src/app/app.config.ts`](src/app/app.config.ts)

Клиентская конфигурация включает:

```typescript
export const config: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),  // Включаем Hydration
    provideHttpClient(withFetch())  // HTTP клиент с fetch
  ]
};
```

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

## 📖 Дополнительные материалы

- [`QUICK_START.md`](QUICK_START.md) - Инструкция по быстрому запуску
- [`SSR_GUIDE.md`](SSR_GUIDE.md) - Краткий справочник по Angular SSR с примерами и чек-листом
- [Angular SSR - Everything You Need to Know](https://angular.love/angular-ssr-everything-you-need-to-know) - Оригинальная статья

## 🤝 Вклад

Этот репозиторий создан в образовательных целях. Не стесняйтесь использовать примеры в своих проектах!
