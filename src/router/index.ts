import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import type { Component } from 'vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Todo',
    component: (): Promise<Component> => import('../pages/HomePage.vue'),
  },
  {
    path: '/todo/:id',
    name: ':name',
    component: (): Promise<Component> =>
      import('../pages/components/ToDoItems.vue'),
  },
];

export const routerHistory = createWebHistory();

export const router = createRouter({
  strict: true,
  history: routerHistory,
  routes,
});
