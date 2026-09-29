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
    path: 'users/new',
    component: DynamicForm,
    title: 'Add User'
  },

  {
    path: 'users/:id',
    component: DynamicForm,
    title: 'Edit User'
  }
];
