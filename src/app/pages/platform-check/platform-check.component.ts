import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'app-platform-check',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h1>Platform Check Example</h1>
      <p>
        Некоторый код должен выполняться только в браузере (например, работа с localStorage, window),
        а некоторый только на сервере. Angular предоставляет утилиты для проверки платформы.
      </p>
      
      <h2>Текущая платформа:</h2>
      <div class="card" [style.background]="isBrowser ? '#e3f2fd' : '#fff3e0'">
        <h3>{{ currentPlatform }}</h3>
        <p>isBrowser: {{ isBrowser }}</p>
        <p>isServer: {{ isServer }}</p>
      </div>
      
      <h2>Примеры использования:</h2>
      
      <div class="card" style="background: #f5f5f5;">
        <h3>1. Доступ к Window API:</h3>
        <pre><code>{{ windowExample }}</code></pre>
        <p><strong>Результат:</strong> {{ windowWidth }}</p>
      </div>
      
      <div class="card" style="background: #f5f5f5;">
        <h3>2. Доступ к LocalStorage:</h3>
        <pre><code>{{ localStorageExample }}</code></pre>
        <p><strong>Результат:</strong> {{ storageResult }}</p>
      </div>
      
      <div class="card" style="background: #f5f5f5;">
        <h3>3. Серверная логика:</h3>
        <pre><code>{{ serverExample }}</code></pre>
        <p><strong>Результат:</strong> {{ serverMessage }}</p>
      </div>
      
      <div class="card" style="margin-top: 2rem; background: #fffde7;">
        <h3>💡 Важно:</h3>
        <p>Всегда проверяйте платформу перед использованием browser-only API,
        иначе приложение упадет при рендеринге на сервере!</p>
      </div>
    </div>
  `
})
export class PlatformCheckComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);
  
  isBrowser = isPlatformBrowser(this.platformId);
  isServer = isPlatformServer(this.platformId);
  currentPlatform = '';
  windowWidth = '';
  storageResult = '';
  serverMessage = '';
  
  windowExample = `if (isPlatformBrowser(this.platformId)) {
  this.windowWidth = window.innerWidth + 'px';
}`;

  localStorageExample = `if (isPlatformBrowser(this.platformId)) {
  localStorage.setItem('example', 'value');
  const value = localStorage.getItem('example');
}`;

  serverExample = `if (isPlatformServer(this.platformId)) {
  console.log('Этот код выполняется только на сервере');
  // Здесь можно выполнять серверную логику
}`;

  ngOnInit() {
    this.currentPlatform = this.isBrowser ? '🌐 Browser' : '🖥️ Server';
    
    if (this.isBrowser) {
      this.windowWidth = `Window width: ${window.innerWidth}px`;
      
      try {
        localStorage.setItem('ssr-example', 'test-value');
        const value = localStorage.getItem('ssr-example');
        this.storageResult = `LocalStorage доступен! Значение: ${value}`;
      } catch (e) {
        this.storageResult = 'LocalStorage недоступен';
      }
      
      this.serverMessage = 'Не выполняется в браузере';
    }
    
    if (this.isServer) {
      this.windowWidth = 'Window API недоступен на сервере';
      this.storageResult = 'LocalStorage недоступен на сервере';
      this.serverMessage = '✅ Этот код выполнился на сервере!';
      console.log('🖥️ Server-side rendering active');
    }
  }
}
