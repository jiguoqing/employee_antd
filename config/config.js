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
      { path: '/department/list', component: 'department/departmentList' }
    
    ]
  }],
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      // pathRewrite: { '^/api/': 'employee' },  //因为我们项目的接口前面并没有api所以直接去掉
    },
  },
  singular: true,
  // base: '/employee',
};

