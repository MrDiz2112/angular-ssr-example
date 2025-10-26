import { Component, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-seo',
  standalone: true,
  template: `
    <div class="card">
      <h1>SEO Meta Tags Example</h1>
      <p>
        SSR позволяет поисковым системам и социальным сетям видеть мета-теги,
        так как они генерируются на сервере и присутствуют в HTML до загрузки JavaScript.
      </p>
      
      <h2>Установленные мета-теги для этой страницы:</h2>
      
      <div class="card" style="background: #f5f5f5;">
        <h3>Title:</h3>
        <pre><code>{{ pageTitle }}</code></pre>
      </div>
      
      <div class="card" style="background: #f5f5f5;">
        <h3>Description:</h3>
        <pre><code>{{ metaTags.description }}</code></pre>
      </div>
      
      <div class="card" style="background: #f5f5f5;">
        <h3>Open Graph (для социальных сетей):</h3>
        <pre><code>og:title: {{ metaTags.ogTitle }}
og:description: {{ metaTags.ogDescription }}
og:image: {{ metaTags.ogImage }}
og:type: {{ metaTags.ogType }}</code></pre>
      </div>
      
      <div class="card" style="background: #f5f5f5;">
        <h3>Twitter Card:</h3>
        <pre><code>twitter:card: {{ metaTags.twitterCard }}
twitter:title: {{ metaTags.twitterTitle }}
twitter:description: {{ metaTags.twitterDescription }}</code></pre>
      </div>
      
      <div class="card" style="margin-top: 2rem; background: #e8f5e9;">
        <h3>Код компонента:</h3>
        <pre><code>{{ codeExample }}</code></pre>
      </div>
      
      <div class="card" style="margin-top: 1rem; background: #fffde7;">
        <h3>💡 Проверка:</h3>
        <p>Откройте исходный код страницы (Ctrl+U) и найдите эти мета-теги в &lt;head&gt;.
        Они были добавлены на сервере и доступны поисковикам!</p>
      </div>
    </div>
  `
})
export class SeoComponent implements OnInit {
  private meta = inject(Meta);
  private title = inject(Title);
  
  pageTitle = 'SEO с Angular SSR | Пример мета-тегов';
  
  metaTags = {
    description: 'Пример использования мета-тегов для SEO в Angular приложении с Server-Side Rendering',
    ogTitle: 'SEO с Angular SSR',
    ogDescription: 'Узнайте, как работают мета-теги в Angular SSR для оптимизации поисковых систем',
    ogImage: 'https://angular.io/assets/images/logos/angular/angular.svg',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'SEO с Angular SSR',
    twitterDescription: 'Пример мета-тегов для социальных сетей'
  };
  
  codeExample = `export class SeoComponent implements OnInit {
  private meta = inject(Meta);
  private title = inject(Title);
  
  ngOnInit() {
    // Устанавливаем title
    this.title.setTitle(this.pageTitle);
    
    // Устанавливаем мета-теги
    this.meta.updateTag({
      name: 'description',
      content: this.metaTags.description
    });
    
    // Open Graph для Facebook, LinkedIn
    this.meta.updateTag({ property: 'og:title', content: '...' });
    this.meta.updateTag({ property: 'og:description', content: '...' });
    
    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: '...' });
  }
}`;

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    
    this.meta.updateTag({
      name: 'description',
      content: this.metaTags.description
    });
    
    this.meta.updateTag({ name: 'keywords', content: 'Angular, SSR, SEO, Server-Side Rendering' });
    
    this.meta.updateTag({ property: 'og:title', content: this.metaTags.ogTitle });
    this.meta.updateTag({ property: 'og:description', content: this.metaTags.ogDescription });
    this.meta.updateTag({ property: 'og:image', content: this.metaTags.ogImage });
    this.meta.updateTag({ property: 'og:type', content: this.metaTags.ogType });
    
    this.meta.updateTag({ name: 'twitter:card', content: this.metaTags.twitterCard });
    this.meta.updateTag({ name: 'twitter:title', content: this.metaTags.twitterTitle });
    this.meta.updateTag({ name: 'twitter:description', content: this.metaTags.twitterDescription });
  }
}
