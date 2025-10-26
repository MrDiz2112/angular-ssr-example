# Структура проекта Angular SSR Example

## Корневые файлы

### Конфигурация Angular

- **`angular.json`** - Конфигурация Angular CLI с настройками для browser и server сборки
- **`tsconfig.json`** - Базовая TypeScript конфигурация
- **`tsconfig.app.json`** - TypeScript конфигурация для клиентской части
- **`tsconfig.server.json`** - TypeScript конфигурация для серверной части

### Server-Side Rendering

- **`server.ts`** - Express сервер для SSR с CommonEngine

### Менеджер пакетов

- **`package.json`** - Зависимости и скрипты для сборки и запуска

### Документация

- **`README.md`** - Полная документация проекта
- **`QUICK_START.md`** - Инструкция по быстрому запуску
- **`SSR_GUIDE.md`** - Справочник по Angular SSR
- **`PROJECT_STRUCTURE.md`** - Этот файл

## Исходный код (src/)

### Точки входа

- **`main.ts`** - Точка входа для клиентской части (браузер)
- **`main.server.ts`** - Точка входа для серверной части (Node.js)
- **`index.html`** - HTML шаблон приложения
- **`styles.css`** - Глобальные стили приложения

### Приложение (src/app/)

#### Основные компоненты

- **`app.component.ts`** - Корневой компонент с навигацией
- **`app.routes.ts`** - Маршруты приложения
- **`app.config.ts`** - Конфигурация для клиента (browser)
- **`app.config.server.ts`** - Конфигурация для сервера

#### Страницы с примерами (src/app/pages/)

##### Home (`pages/home/`)
- **`home.component.ts`** - Главная страница с описанием SSR
  - Обзор возможностей SSR
  - Преимущества использования

##### Transfer State (`pages/transfer-state/`)
- **`transfer-state.component.ts`** - Пример Transfer State API
  - Демонстрация передачи данных с сервера на клиент
  - Избежание дублирования HTTP запросов
  - Работа с `makeStateKey()` и `TransferState`

##### Platform Check (`pages/platform-check/`)
- **`platform-check.component.ts`** - Пример проверки платформы
  - Использование `isPlatformBrowser()` и `isPlatformServer()`
  - Безопасная работа с browser-only API (window, localStorage)
  - Серверная vs клиентская логика

##### SEO (`pages/seo/`)
- **`seo.component.ts`** - Пример мета-тегов для SEO
  - Управление Title и Meta tags
  - Open Graph для социальных сетей
  - Twitter Cards
  - Использование сервисов `Meta` и `Title`

#### Сервисы (src/app/services/)

- **`data.service.ts`** - Сервис для работы с данными
  - Симуляция HTTP запросов
  - Используется в примере Transfer State

#### Данные (src/app/data/)

- **`mock-data.ts`** - Моковые данные для примеров
  - Интерфейс `User`
  - Массив `MOCK_USERS` с тестовыми пользователями

## Ключевые концепции в коде

### 1. Transfer State API

**Где:** `pages/transfer-state/transfer-state.component.ts`

```typescript
const USERS_KEY = makeStateKey<User[]>('users');
const cachedUsers = this.transferState.get(USERS_KEY, null);
```

### 2. Platform Detection

**Где:** `pages/platform-check/platform-check.component.ts`

```typescript
if (isPlatformBrowser(this.platformId)) {
  // Browser-only код
}
```

### 3. SEO Meta Tags

**Где:** `pages/seo/seo.component.ts`

```typescript
this.title.setTitle('Заголовок');
this.meta.updateTag({ name: 'description', content: '...' });
```

### 4. Hydration

**Где:** `app.config.ts`

```typescript
provideClientHydration()
```

### 5. Server Rendering

**Где:** `app.config.server.ts`

```typescript
provideServerRendering()
```

## Особенности реализации

### Standalone компоненты

Все компоненты используют standalone API Angular 17+:

```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule],
  template: `...`
})
```

### Dependency Injection

Используется новый функциональный подход с `inject()`:

```typescript
private meta = inject(Meta);
private transferState = inject(TransferState);
```

### Routing

Простая конфигурация маршрутов без NgModules:

```typescript
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'transfer-state', component: TransferStateComponent },
  // ...
];
```

### Express Server

Минималистичный Express сервер с CommonEngine:

```typescript
const commonEngine = new CommonEngine();
commonEngine.render({
  bootstrap,
  documentFilePath: indexHtml,
  url: req.url,
  // ...
});
```

## Расширение проекта

### Добавление новой страницы

1. Создайте компонент в `src/app/pages/new-page/`
2. Добавьте маршрут в `app.routes.ts`
3. Добавьте ссылку в навигацию в `app.component.ts`

### Добавление нового сервиса

1. Создайте сервис в `src/app/services/`
2. Используйте `@Injectable({ providedIn: 'root' })`
3. Инжектируйте через `inject(ServiceName)`

### Добавление API запросов

1. Используйте HttpClient
2. Обязательно используйте Transfer State для избежания дублирования
3. Проверяйте платформу при необходимости

## Команды разработки

```bash
# Установка
npm install

# Разработка без SSR
npm start  # http://localhost:4200

# Разработка с SSR
npm run dev:ssr  # http://localhost:4000

# Production сборка
npm run build:ssr
npm run serve:ssr
```

## Полезные советы

1. **Всегда проверяйте платформу** перед использованием browser API
2. **Используйте Transfer State** для HTTP запросов
3. **Настраивайте мета-теги** для каждой страницы
4. **Тестируйте с отключенным JavaScript** для проверки SSR
5. **Смотрите исходный код страницы** (Ctrl+U) для проверки серверного HTML
