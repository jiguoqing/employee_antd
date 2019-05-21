export default {
  plugins: [
    ['umi-plugin-react', {
      antd: true
    }],
  ],
  routes: [{
    path: '/',
    component: '../layout',
    routes: [
      {
        path: '/',
        component: 'employee/List',
      },
      {
        path: '/employee/list',
        component: 'employee/List'
      },
      {
        path: '/日常管理',
        routes: [
          { path: '/assess/list', component: 'Dashboard/Analysis' },
          { path: '/project/list', component: 'Dashboard/Monitor' }
        ]
      },
      {
        path: '/管理员',
        routes: [
          { path: '/employee/list', component: 'employee/List' },
          { path: '/department/list', component: 'department/DepartmentList' }
        ]
      },
    ]
  }],
  proxy: {
    '/oa': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
  singular: true,
};

