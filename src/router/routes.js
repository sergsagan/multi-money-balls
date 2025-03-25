const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/EntriesPage.vue') },
      { path: 'settings', component: () => import('pages/SettingsPage.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'logout', component: () => import('pages/Login.vue') },
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
