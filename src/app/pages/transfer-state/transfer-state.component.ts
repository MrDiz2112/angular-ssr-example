import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/core';
import { DataService } from '../../services/data.service';
import { User } from '../../data/mock-data';

const USERS_KEY = makeStateKey<User[]>('users');

@Component({
  selector: 'app-transfer-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <h1>Transfer State Example</h1>
      <p>
        Transfer State позволяет передавать данные с сервера на клиент,
        избегая повторных HTTP запросов после гидрации.
      </p>
      
      <h2>Как это работает:</h2>
      <ol>
        <li>На сервере данные загружаются и сохраняются в Transfer State</li>
        <li>Transfer State сериализуется в HTML внутри тега &lt;script&gt;</li>
        <li>На клиенте данные извлекаются из Transfer State</li>
        <li>HTTP запрос не выполняется повторно</li>
      </ol>
      
      <h2>Пользователи ({{ loadedFrom }}):</h2>
      
      @if (loading) {
        <div class="loading">Загрузка данных...</div>
      } @else {
        <div class="user-list">
          @for (user of users; track user.id) {
            <div class="user-card">
              <h3>{{ user.name }}</h3>
              <p>{{ user.email }}</p>
              <p><small>{{ user.company }}</small></p>
            </div>
          }
        </div>
      }
      
      <div class="card" style="margin-top: 2rem; background: #f5f5f5;">
        <h3>Код компонента:</h3>
        <pre><code>{{ codeExample }}</code></pre>
      </div>
    </div>
  `
})
export class TransferStateComponent implements OnInit {
  private transferState = inject(TransferState);
  private dataService = inject(DataService);
  
  users: User[] = [];
  loading = true;
  loadedFrom = '';
  
  codeExample = `const USERS_KEY = makeStateKey<User[]>('users');

ngOnInit() {
  const cachedUsers = this.transferState.get(USERS_KEY, null);
  
  if (cachedUsers) {
    // Данные уже есть из Transfer State
    this.users = cachedUsers;
    this.loadedFrom = 'Transfer State (без HTTP запроса)';
    this.loading = false;
  } else {
    // Загружаем данные и сохраняем в Transfer State
    this.dataService.getUsers().subscribe(users => {
      this.users = users;
      this.transferState.set(USERS_KEY, users);
      this.loadedFrom = 'HTTP запрос';
      this.loading = false;
    });
  }
}`;

  ngOnInit() {
    const cachedUsers = this.transferState.get(USERS_KEY, null);
    
    if (cachedUsers) {
      this.users = cachedUsers;
      this.loadedFrom = 'Transfer State (без HTTP запроса)';
      this.loading = false;
    } else {
      this.dataService.getUsers().subscribe(users => {
        this.users = users;
        this.transferState.set(USERS_KEY, users);
        this.loadedFrom = 'HTTP запрос';
        this.loading = false;
      });
    }
  }
}
