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
        component: 'assess/assesslist',
      },
      {
        path: '/employee/list',
        component: 'employee/List'
      },
      {
        path: '/oa/employee/list',
        component: 'employee/List'
      },
      { path: '/assess/assesslist', component: 'assess/assesslist' },
      { path: '/project/list', component: 'Dashboard/Monitor' },
      { path: '/department/list', component: 'department/departmentList' },
      {
        path: '/login',
        component: 'login/Login'
      },
      // { path: '/oa/assess/assesslist', component: 'assess/assesslist' },
      // { path: '/oa/project/list', component: 'Dashboard/Monitor' },
      // { path: '/oa/department/list', component: 'department/departmentList' }
    
    ]
  }
],
  proxy: {
    '/oa': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: { '^/oa': '/' },  //因为我们项目的接口前面并没有api所以直接去掉
    },
  },
  // history: 'hash',
  singular: true,
  // exportStatic: true
  // base: '/oa',
//   devServer: {
//   historyApiFallback: true
// }
};

