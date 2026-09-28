import { Routes } from '@angular/router';
import { Home } from './core/home/home.component';
import { DynamicForm } from './features/dynamic-form/form.component';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home'
  },

  {
    path: 'create-form',
    component: DynamicForm,
    title: 'Create Form'
  },
];
