import dynamic from 'dva/dynamic';
// 异步加载
const dynamicWrapper = (app, models, component) => dynamic({
  app,
  models: () => models.map(m => import(`../models/${m}.js`)),
  component,
});
// nav data
export const getNavData = app => [
  {
    component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout.jsx')),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      {
        name: 'Dashboard',
        icon: 'pie-chart',
        path: 'dashboard',
        children: [
          {
            name: '分析页',
            path: 'analysis',
            component: dynamicWrapper(app, [], () => import('../columns/index/Index.js')),
          }
        ],
      },
      {
        name: '汽车销售',
        path: 'business',
        icon: 'global',
        children: [
          {
            name: '大表选车',
            path: 'sell',
            component: dynamicWrapper(app, ['carpickerModel','carshowModel'], () => import('../columns/sale/Dabiao.js')),
          },
          {
            name: '4s店',
            path: 'sis',
            component: dynamicWrapper(app, [], () => import('../columns/sale/Sisdian.js'))
          },
        ],
      },
      {
        name: '人员管理',
        path: 'people',
        icon: 'team',
        children: [
          {
            name: '人员管理',
            path: 'person',
            component: dynamicWrapper(app, [], () => import('../columns/people/PeopleIndex.js')),
          }
        ],
      },
      {
        name: '订单管理',
        path: 'order',
        icon: 'shopping-cart',
        children: [
          {
            name: '订单管理',
            path: 'advanced',
            component: dynamicWrapper(app, [], () => import('../columns/order/OrderIndex.js')),
          },
        ],
      }
    ],
  },
  {
    component: dynamicWrapper(app, [], () => import('../layouts/UserLayout.jsx')),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: '帐户',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: '登录',
            path: 'login',
            component: dynamicWrapper(app, ['login'], () => import('../components/User/Login.js')),
          },
          {
            name: '注册',
            path: 'register',
            component: dynamicWrapper(app, ['regist'], () => import('../components/User/Register.js')),
          },
          {
            name: '注册结果',
            path: 'register-result',
            component: dynamicWrapper(app, [], () => import('../components/User/Registerresult.jsx')),
          },
        ],
      },
    ],
  }
];
