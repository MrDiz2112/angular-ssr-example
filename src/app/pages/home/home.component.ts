import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="card">
      <h1>Angular SSR Example</h1>
      <p>Примеры Server-Side Rendering в Angular</p>
      
      <h2>Основные возможности SSR:</h2>
      <ul>
        <li><strong>Transfer State</strong> - передача данных с сервера на клиент без повторных запросов</li>
        <li><strong>Platform Check</strong> - выполнение кода специфичного для браузера или сервера</li>
        <li><strong>SEO Meta Tags</strong> - динамическое управление мета-тегами для поисковой оптимизации</li>
        <li><strong>Hydration</strong> - плавное превращение серверного HTML в интерактивное приложение</li>
      </ul>
      
      <h2>Преимущества SSR:</h2>
      <ul>
        <li>Улучшенное SEO</li>
        <li>Быстрое первое отображение контента (FCP)</li>
        <li>Лучшая производительность на слабых устройствах</li>
        <li>Поддержка социальных сетей (Open Graph)</li>
      </ul>
    </div>
  `,
  styles: [`
    h1 {
      color: #2196F3;
      margin-bottom: 1rem;
    }
    h2 {
      margin-top: 2rem;
      margin-bottom: 1rem;
    }
    ul {
      margin-left: 2rem;
    }
    li {
      margin-bottom: 0.5rem;
    }
  `]
})
export class HomeComponent {}
