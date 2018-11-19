import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录',
    hideInMenu: true
  },
  component: () =>
      import('@/view/login/login.vue')
},
{
  path: '/',
  name: '_home',
  redirect: '/home',
  component: Main,
  meta: {
    hideInMenu: true,
    notCache: true
  },
  children: [{
    path: '/home',
    name: 'home',
    meta: {
      hideInMenu: true,
      title: '首页',
      notCache: true,
      icon: 'md-home'
    },
    component: () =>
        import('@/view/single-page/home')
  }]
},
{
  path: '/city_county_assessment',
  name: 'city_county_assessment',
  meta: {
    icon: 'md-menu',
    title: '市对县绩效考核指标'
  },
  component: Main,
  children: [{
    path: '/city_index_management',
    name: 'city_index_management',
    meta: {
      icon: 'md-trending-up',
      title: '市对县指标管理'
    },
    component: () =>
          import('@/view/city-county-assessment/city-index-management/city-index-management.vue')
  },
  {
    path: '/city_index_data',
    name: 'city_index_data',
    meta: {
      icon: 'md-stats',
      title: '市对县的指标考核数据'
    },
    component: () =>
          import('@/view/city-county-assessment/city-index-data/city-index-data.vue')
  },
  {
    path: '/city_index_audit',
    name: 'city_index_audit',
    meta: {
      icon: 'md-checkbox-outline',
      title: '指标审核审批'
    },
    component: () =>
          import('@/view/city-county-assessment/city-index-audit/city-index-audit.vue')
  }
  ]
},
{
  path: '/county_town_assessment',
  name: 'county_town_assessment',
  meta: {
    icon: 'md-menu',
    title: '市对县绩效考核指标'
  },
  component: Main,
  children: [{
    path: '/county_index_management',
    name: 'county_index_management',
    meta: {
      icon: 'md-trending-up',
      title: '市对县指标管理'
    },
    component: () =>
          import('@/view/county-town-assessment/county-index-management/county-index-management.vue')
  },
  {
    path: '/county_index_data',
    name: 'county_index_data',
    meta: {
      icon: 'md-stats',
      title: '市对县的指标考核数据'
    },
    component: () =>
          import('@/view/county-town-assessment/county-index-data/county-index-data.vue')
  },
  {
    path: '/county_index_audit',
    name: 'county_index_audit',
    meta: {
      icon: 'md-checkbox-outline',
      title: '指标审核审批'
    },
    component: () =>
          import('@/view/county-town-assessment/county-index-audit/county-index-audit.vue')
  }
  ]
},
{
  path: '/six_game',
  name: 'six_game',
  meta: {
    hide: true
  },
  component: Main,
  children: [{
    path: 'six_game_page',
    name: 'six_game_page',
    meta: {
      icon: 'md-checkbox-outline',
      title: '六抓六赛考核指标'
    },
    component: () =>
        import('@/view/six-game/six-game-page.vue')
  }]
},
  // {
  //   path: '/target_management',
  //   name: 'target_management',
  //   meta: {
  //     hide: true
  //   },
  //   component: Main,
  //   children: [{
  //     path: 'target_management_page',
  //     name: 'target_management_page',
  //     meta: {
  //       icon: 'md-trending-up',
  //       title: '指标管理'
  //     },
  //     component: () =>
  //         import('@/view/target-management/target-management.vue')
  //   }]
  // },
  // {
  //   path: '/city_assess',
  //   name: 'city_assess',
  //   meta: {
  //     hide: true
  //   },
  //   component: Main,
  //   children: [{
  //     path: '/city_assess_page',
  //     name: 'city_assess_page',
  //     meta: {
  //       icon: 'md-clipboard',
  //       title: '市对县指标考核数据'
  //     },
  //     component: () =>
  //         import('@/view/city-assess/city-assess.vue')
  //   }]
  // },
  // {
  //   path: '/county_assess',
  //   name: 'county_assess',
  //   meta: {
  //     hide: true
  //   },
  //   component: Main,
  //   children: [{
  //     path: '/county_assess_page',
  //     name: 'county_assess_page',
  //     meta: {
  //       icon: 'md-clipboard',
  //       title: '县对乡镇指标考核数据'
  //     },
  //     component: () =>
  //         import('@/view/county-assess/county-assess.vue')
  //   }]
  // },
{
  path: '/incentive',
  name: 'incentive',
  meta: {
    hide: true,
    icon: 'md-flame'
  },
  component: Main,
  children: [{
    path: '/incentive_page',
    name: 'incentive_page',
    meta: {
      icon: 'md-flame',
      title: '正向激励'
    },
    component: () =>
          import('@/view/incentive/incentive-page/incentive.vue')
  },
  {
    path: '/incentive_audit',
    name: 'incentive_audit',
    meta: {
      icon: 'md-checkbox-outline',
      title: '正向激励审批'
    },
    component: () =>
          import('@/view/incentive/incentive-audit/incentive-audit.vue')
  }
  ]
},
{
  path: '/dynamic_news',
  name: 'dynamic_news',
  meta: {
    hide: true
  },
  component: Main,
  children: [{
    path: '/dynamic_news_page',
    name: 'dynamic_news_page',
    meta: {
      icon: 'logo-twitter',
      title: '动态新闻'
    },
    component: () =>
        import('@/view/dynamic-news/dynamic-news.vue')
  }]
},
{
  path: '/investigate',
  name: 'investigate',
  meta: {
    icon: 'ios-search',
    title: '察访工作'
  },
  component: Main,
  children: [{
    path: 'investigate_outbox',
    name: 'investigate_outbox',
    meta: {
      icon: 'md-funnel',
      title: '已发送文件'
    },
    component: () =>
          import('@/view/investigate/investigate-outbox/investigate-outbox.vue')
  },
  {
    path: 'investigate_ide',
    name: 'investigate_ide',
    meta: {
      icon: 'ios-create-outline',
      title: '编辑文件'
    },
    component: () =>
          import('@/view/investigate/investigate-ide/investigate-ide.vue')
  },
  {
    path: 'investigate_inbox',
    name: 'investigate_inbox',
    meta: {
      icon: 'ios-mail-outline',
      title: '已收到文件'
    },
    component: () =>
          import('@/view/investigate/investigate-inbox/investigate-inbox.vue')
  }
  ]
},
{
  path: '/work_supervision',
  name: 'work_supervision',
  meta: {
    hide: true
  },
  component: Main,
  children: [{
    path: 'work_supervision_page',
    name: 'work_supervision_page',
    meta: {
      icon: 'md-eye',
      title: '专项工作督查'
    },
    component: () =>
        import('@/view/work-supervision/work-supervision.vue')
  }]
},
{
  path: '/no_entry_unit',
  name: 'no_entry_unit',
  meta: {
    icon: 'ios-search',
    title: '未录入单位'
  },
  component: Main,
  children: [{
    path: 'no_entry_unit_county',
    name: 'no_entry_unit_county',
    meta: {
      icon: 'md-funnel',
      title: '乡镇指标未录入'
    },
    component: () =>
          import('@/view/no-entry-unit/no-entry-unit-county/no-entry-unit-county.vue')
  },
  {
    path: 'no_entry_unit_game',
    name: 'no_entry_unit_game',
    meta: {
      icon: 'ios-create-outline',
      title: '六抓六赛未录入'
    },
    component: () =>
          import('@/view/no-entry-unit/no-entry-unit-game/no-entry-unit-game.vue')
  },
  {
    path: 'no_entry_unit_all',
    name: 'no_entry_unit_all',
    meta: {
      icon: 'ios-mail-outline',
      title: '所以有未录入'
    },
    component: () =>
          import('@/view/no-entry-unit/no-entry-unit-all/no-entry-unit-all.vue')
  }
  ]
},
{
  path: '/components',
  name: 'components',
  meta: {
    icon: 'logo-buffer',
    title: '组件'
  },
  component: Main,
  children: [{
    path: 'count_to_page',
    name: 'count_to_page',
    meta: {
      icon: 'md-trending-up',
      title: '数字渐变'
    },
    component: () =>
          import('@/view/components/count-to/count-to.vue')
  },
  {
    path: 'drag_list_page',
    name: 'drag_list_page',
    meta: {
      icon: 'ios-infinite',
      title: '拖拽列表'
    },
    component: () =>
          import('@/view/components/drag-list/drag-list.vue')
  },
  {
    path: 'tables_page',
    name: 'tables_page',
    meta: {
      icon: 'md-grid',
      title: '多功能表格'
    },
    component: () =>
          import('@/view/components/tables/tables.vue')
  },
  {
    path: 'split_pane_page',
    name: 'split_pane_page',
    meta: {
      icon: 'md-pause',
      title: '分割窗口'
    },
    component: () =>
          import('@/view/components/split-pane/split-pane.vue')
  },
  {
    path: 'markdown_page',
    name: 'markdown_page',
    meta: {
      icon: 'logo-markdown',
      title: 'Markdown编辑器'
    },
    component: () =>
          import('@/view/components/markdown/markdown.vue')
  },
  {
    path: 'editor_page',
    name: 'editor_page',
    meta: {
      icon: 'ios-create',
      title: '富文本编辑器'
    },
    component: () =>
          import('@/view/components/editor/editor.vue')
  },
  {
    path: 'icons_page',
    name: 'icons_page',
    meta: {
      icon: '_bear',
      title: '自定义图标'
    },
    component: () =>
          import('@/view/components/icons/icons.vue')
  }
  ]
},
{
  path: '/update',
  name: 'update',
  meta: {
    icon: 'md-cloud-upload',
    title: '数据上传'
  },
  component: Main,
  children: [{
    path: 'update_table_page',
    name: 'update_table_page',
    meta: {
      icon: 'ios-document',
      title: '上传Csv'
    },
    component: () =>
          import('@/view/update/update-table.vue')
  },
  {
    path: 'update_paste_page',
    name: 'update_paste_page',
    meta: {
      icon: 'md-clipboard',
      title: '粘贴表格数据'
    },
    component: () =>
          import('@/view/update/update-paste.vue')
  }
  ]
},
{
  path: '/excel',
  name: 'excel',
  meta: {
    icon: 'ios-stats',
    title: 'EXCEL导入导出'
  },
  component: Main,
  children: [{
    path: 'upload-excel',
    name: 'upload-excel',
    meta: {
      icon: 'md-add',
      title: '导入EXCEL'
    },
    component: () =>
          import('@/view/excel/upload-excel.vue')
  },
  {
    path: 'export-excel',
    name: 'export-excel',
    meta: {
      icon: 'md-download',
      title: '导出EXCEL'
    },
    component: () =>
          import('@/view/excel/export-excel.vue')
  }
  ]
},
  // {
  //   path: '/tools_methods',
  //   name: 'tools_methods',
  //   meta: {
  //     hide: true
  //   },
  //   component: Main,
  //   children: [{
  //     path: 'tools_methods_page',
  //     name: 'tools_methods_page',
  //     meta: {
  //       icon: 'ios-hammer',
  //       title: '工具方法',
  //       beforeCloseName: 'before_close_normal'
  //     },
  //     component: () =>
  //         import('@/view/tools-methods/tools-methods.vue')
  //   }]
  // },
  // {
  //   path: '/i18n',
  //   name: 'i18n',
  //   meta: {
  //     hide: true
  //   },
  //   component: Main,
  //   children: [{
  //     path: 'i18n_page',
  //     name: 'i18n_page',
  //     meta: {
  //       icon: 'md-planet',
  //       title: '国际化'
  //     },
  //     component: () =>
  //         import('@/view/i18n/i18n-page.vue')
  //   }]
  // },
{
  path: '/error_store',
  name: 'error_store',
  meta: {
    hide: true
  },
  component: Main,
  children: [{
    path: 'error_store_page',
    name: 'error_store_page',
    meta: {
      icon: 'ios-bug',
      title: '错误收集'
    },
    component: () =>
        import('@/view/error-store/error-store.vue')
  }]
},
{
  path: '/error_logger',
  name: 'error_logger',
  meta: {
    hide: true,
    hideInMenu: true
  },
  component: Main,
  children: [{
    path: 'error_logger_page',
    name: 'error_logger_page',
    meta: {
      icon: 'ios-bug',
      title: '错误收集'
    },
    component: () =>
        import('@/view/single-page/error-logger.vue')
  }]
},
  // {
  //   path: '/directive',
  //   name: 'directive',
  //   meta: {
  //     hide: true
  //   },
  //   component: Main,
  //   children: [{
  //     path: 'directive_page',
  //     name: 'directive_page',
  //     meta: {
  //       icon: 'ios-navigate',
  //       title: '指令'
  //     },
  //     component: () =>
  //         import('@/view/directive/directive.vue')
  //   }]
  // },
{
  path: '/argu',
  name: 'argu',
  meta: {
    hideInMenu: true
  },
  component: Main,
  children: [{
    path: 'params/:id',
    name: 'params',
    meta: {
      icon: 'md-flower',
      title: route => `动态路由-${route.params.id}`,
      notCache: true,
      beforeCloseName: 'before_close_normal'
    },
    component: () =>
          import('@/view/argu-page/params.vue')
  },
  {
    path: 'query',
    name: 'query',
    meta: {
      icon: 'md-flower',
      title: route => `带参路由-${route.query.id}`,
      notCache: true
    },
    component: () =>
          import('@/view/argu-page/query.vue')
  }
  ]
},
{
  path: '/401',
  name: 'error_401',
  meta: {
    hideInMenu: true
  },
  component: () =>
      import('@/view/error-page/401.vue')
},
{
  path: '/500',
  name: 'error_500',
  meta: {
    hideInMenu: true
  },
  component: () =>
      import('@/view/error-page/500.vue')
},
{
  path: '*',
  name: 'error_404',
  meta: {
    hideInMenu: true
  },
  component: () =>
      import('@/view/error-page/404.vue')
}
]
