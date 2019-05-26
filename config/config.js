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
      { path: '/assess/assesslist', component: 'assess/assesslist' },
      { path: '/project/list', component: 'Dashboard/Monitor' },
      { path: '/employee/list', component: 'employee/List' },
      { path: '/department/list', component: 'department/departmentList' }
    
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

