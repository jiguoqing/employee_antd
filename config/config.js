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
    '/employee': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: { '^/employee/': '' },  //因为我们项目的接口前面并没有employee所以直接去掉
    },
  },
  singular: true,
  base: '/employee',
};

