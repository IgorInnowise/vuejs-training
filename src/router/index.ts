import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import type { Component } from 'vue';
import { useLists } from '../composables/lists.ts';
const { listsHaveChanges } = useLists();

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'lists' },
    component: (): Promise<Component> => import('../pages/ListsPages.vue'),
    children: [
      {
        path: '/lists',
        name: 'lists',
        component: (): Promise<Component> => import('../pages/ListsPage.vue'),
      },
      {
        path: '/list/:id',
        name: 'list',
        component: (): Promise<Component> => import('../pages/ListPage.vue'),
      },
    ],
  },
];

export const routerHistory = createWebHistory();

export const router = createRouter({
  strict: true,
  history: routerHistory,
  routes,
});

window.addEventListener('beforeunload', (event) => {
  if (listsHaveChanges()) {
    event.preventDefault();
    // Chrome requires returnValue to be set.
    event.returnValue = '';
  }
});
