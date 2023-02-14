import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import type { Component } from 'vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: (): Promise<Component> => import('../pages/HomePage.vue'),
  },
  {
    path: '/note/:id',
    name: 'noteEdit',
    component: (): Promise<Component> => import('../pages/NoteEdit.vue'),
  },
];

export const routerHistory = createWebHistory();

export const router = createRouter({
  strict: true,
  history: routerHistory,
  routes,
});
