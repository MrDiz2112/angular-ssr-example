# Краткий справочник Angular SSR

## Основные концепции

### 1. Transfer State API

Избегайте дублирования HTTP запросов:

```typescript
import { TransferState, makeStateKey } from '@angular/core';

const DATA_KEY = makeStateKey<MyData>('data');

// На сервере и клиенте
const cached = this.transferState.get(DATA_KEY, null);
if (cached) {
  this.data = cached;
} else {
  this.http.get('/api/data').subscribe(data => {
    this.data = data;
    this.transferState.set(DATA_KEY, data);
  });
}
```

### 2. Platform Detection

Проверяйте, где выполняется код:

```typescript
import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

const platformId = inject(PLATFORM_ID);

if (isPlatformBrowser(platformId)) {
  // Только в браузере
  window.localStorage.setItem('key', 'value');
}

if (isPlatformServer(platformId)) {
  // Только на сервере
  console.log('Server-side rendering');
}
```

### 3. SEO Meta Tags

Управляйте мета-тегами для SEO:

```typescript
import { Meta, Title } from '@angular/platform-browser';

const meta = inject(Meta);
const title = inject(Title);

title.setTitle('Заголовок страницы');
meta.updateTag({ name: 'description', content: 'Описание' });
meta.updateTag({ property: 'og:title', content: 'OG Заголовок' });
```

### 4. Hydration

Включите в конфигурации приложения:

```typescript
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration()
  ]
};
```

## Частые ошибки и решения

### ❌ Ошибка: "window is not defined"

```typescript
// НЕПРАВИЛЬНО
ngOnInit() {
  const width = window.innerWidth; // ❌ Падает на сервере
}

// ПРАВИЛЬНО
ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    const width = window.innerWidth; // ✅ Безопасно
  }
}
```

### ❌ Ошибка: "localStorage is not defined"

```typescript
// НЕПРАВИЛЬНО
saveToStorage() {
  localStorage.setItem('key', 'value'); // ❌ Падает на сервере
}

// ПРАВИЛЬНО
saveToStorage() {
  if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('key', 'value'); // ✅ Безопасно
  }
}
```

### ❌ Ошибка: Дублирование HTTP запросов

```typescript
// НЕПРАВИЛЬНО
ngOnInit() {
  this.http.get('/api/users').subscribe(users => {
    this.users = users; // ❌ Запрос выполнится и на сервере, и на клиенте
  });
}

// ПРАВИЛЬНО
ngOnInit() {
  const cached = this.transferState.get(USERS_KEY, null);
  if (cached) {
    this.users = cached; // ✅ Используем кеш
  } else {
    this.http.get('/api/users').subscribe(users => {
      this.users = users;
      this.transferState.set(USERS_KEY, users); // ✅ Сохраняем в кеш
    });
  }
}
```

## Чек-лист для SSR проекта

- [ ] `provideClientHydration()` добавлен в `app.config.ts`
- [ ] `provideServerRendering()` добавлен в `app.config.server.ts`
- [ ] Проверки `isPlatformBrowser/Server` для browser-only API
- [ ] Transfer State используется для HTTP запросов
- [ ] Meta tags настроены для каждой страницы
- [ ] `withFetch()` используется с `provideHttpClient()`
- [ ] Express сервер настроен в `server.ts`
- [ ] Build скрипты настроены в `package.json`

## Полезные команды

```bash
# Разработка без SSR
npm start

# Сборка для продакшена
npm run build:ssr

# Запуск SSR сервера
npm run serve:ssr

# Быстрый запуск для разработки
npm run dev:ssr
```

## Отладка SSR

### Просмотр серверного HTML

```bash
curl http://localhost:4000 > output.html
```

### Проверка Transfer State

Откройте исходный код страницы (Ctrl+U) и найдите:

```html
<script id="transfer-state" type="application/json">
  {"users":[{"id":1,"name":"John"}]}
</script>
```

### Логирование на сервере

В компонентах:

```typescript
if (isPlatformServer(this.platformId)) {
  console.log('Это сообщение появится в консоли сервера');
}
```

## Производительность

### Оптимизация SSR

1. **Кеширование** - используйте Transfer State
2. **Lazy Loading** - загружайте модули по требованию
3. **Preloading Strategy** - предзагрузка критичных модулей
4. **Compression** - включите gzip на сервере
5. **CDN** - используйте для статики

### Измерение производительности

```typescript
// На сервере
if (isPlatformServer(this.platformId)) {
  console.time('SSR Render Time');
}

// После рендеринга
if (isPlatformServer(this.platformId)) {
  console.timeEnd('SSR Render Time');
}
```

## Дополнительные ресурсы

- [Angular SSR документация](https://angular.io/guide/ssr)
- [Angular Hydration](https://angular.io/guide/hydration)
- [Transfer State API](https://angular.io/api/platform-browser/TransferState)
