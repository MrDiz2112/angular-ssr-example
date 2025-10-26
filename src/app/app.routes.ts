import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TransferStateComponent } from './pages/transfer-state/transfer-state.component';
import { PlatformCheckComponent } from './pages/platform-check/platform-check.component';
import { SeoComponent } from './pages/seo/seo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'transfer-state', component: TransferStateComponent },
  { path: 'platform-check', component: PlatformCheckComponent },
  { path: 'seo', component: SeoComponent }
];
