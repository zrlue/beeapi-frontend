export default [
  { path: '/', name: '主页', icon: 'smile',component:'./Index' },
  { path: '/interface_info/:id', name: '查看接口', icon: 'smile',component:'./InterfaceInfo',hideInMenu: true },
  {
    path: '/user',
    layout: false,
    routes: [
      { name: '登录', path: '/user/login', component: './User/Login' },
      { name: '注册', path: '/user/register', component: './User/Register' }
    ],
  },
  {
    path: '/admin',
    name: '管理页',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin/interface_info', name: '接口管理', component: './Admin/InterfaceInfo' },
      { path: '/admin/interface_analysis', name: '接口分析', component: './Admin/InterfaceAnalysis' },
    ],
  },
  { path: '*', layout: false, component: './404' },
];
