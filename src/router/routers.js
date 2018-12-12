import Main from "@/components/main";
import parentView from "@/components/parent-view";

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
  path: "/login",
  name: "login",
  meta: {
    title: "Login - 登录",
    hideInMenu: true
  },
  component: () => import("@/view/login/login.vue")
},
{
  path: "/",
  name: "_home",
  redirect: "/home",
  component: Main,
  meta: {
    hideInMenu: true,
    notCache: true
  },
  children: [{
    path: "/home",
    name: "home",
    meta: {
      hideInMenu: true,
      title: "首页",
      notCache: true,
      icon: "md-home"
    },
    component: () => import("@/view/single-page/home")
  }]
},
{
  path: "/city_county_assessment",
  name: "city_county_assessment",
  meta: {
    icon: "md-menu",
    title: "市对县绩效考核指标"
  },
  component: Main,
  children: [{
    path: "/city_index_management",
    name: "city_index_management",
    meta: {
      icon: "md-trending-up",
      title: "市对县指标管理",
      access: ["admin"]
    },
    component: () =>
          import("@/view/city-county-assessment/city-index-management/city-index-management.vue")
  },
  {
    path: "/city_index_data",
    name: "city_index_data",
    meta: {
      icon: "md-stats",
      title: "市对县的指标考核数据"
    },
    component: () =>
          import("@/view/city-county-assessment/city-index-data/city-index-data.vue")
  },
  {
    path: "/city_index_audit",
    name: "city_index_audit",
    meta: {
      icon: "md-checkbox-outline",
      title: "指标审核审批",
      access: ["admin", "responsible"]
    },
    component: () =>
          import("@/view/city-county-assessment/city-index-audit/city-index-audit.vue")
  }
  ]
},
{
  path: "/county_town_assessment",
  name: "county_town_assessment",
  meta: {
    icon: "md-menu",
    title: "市对县绩效考核指标"
  },
  component: Main,
  children: [{
    path: "/county_index_management",
    name: "county_index_management",
    meta: {
      icon: "md-trending-up",
      title: "市对县指标管理",
      access: ["admin"]
    },
    component: () =>
          import("@/view/county-town-assessment/county-index-management/county-index-management.vue")
  },
  {
    path: "/county_index_data",
    name: "county_index_data",
    meta: {
      icon: "md-stats",
      title: "市对县的指标考核数据"
    },
    component: () =>
          import("@/view/county-town-assessment/county-index-data/county-index-data.vue")
  },
  {
    path: "/county_index_audit",
    name: "county_index_audit",
    meta: {
      icon: "md-checkbox-outline",
      title: "指标审核审批",
      access: ["admin", "responsible"]
    },
    component: () =>
          import("@/view/county-town-assessment/county-index-audit/county-index-audit.vue")
  }
  ]
},
{
  path: "/six_game_assessment",
  name: "six_game_assessment",
  meta: {
    icon: "md-menu",
    title: "六抓六赛绩效指标考核"
  },
  component: Main,
  children: [{
    path: "/six_game_management",
    name: "six_game_management",
    meta: {
      icon: "md-trending-up",
      title: "市对县指标管理",
      access: ["admin"]
    },
    component: () =>
          import("@/view/six-game-assessment/six-game-management/six-game-management.vue")
  },
  {
    path: "/six_game_data",
    name: "six_game_data",
    meta: {
      icon: "md-stats",
      title: "市对县的指标考核数据"
    },
    component: () =>
          import("@/view/six-game-assessment/six-game-data/six-game-data.vue")
  },
  {
    path: "/six_game_audit",
    name: "six_game_audit",
    meta: {
      icon: "md-checkbox-outline",
      title: "指标审核审批",
      access: ["admin", "responsible"]
    },
    component: () =>
          import("@/view/six-game-assessment/six-game-audit/six-game-audit.vue")
  }
  ]
},
{
  path: "/incentive",
  name: "incentive",
  meta: {
    hide: true,
    icon: "md-flame"
  },
  component: Main,
  children: [{
    path: "/incentive_page",
    name: "incentive_page",
    meta: {
      icon: "md-flame",
      title: "正向激励"
    },
    component: () => import("@/view/incentive/incentive-page/incentive.vue")
  },
  {
    path: "/incentive_audit",
    name: "incentive_audit",
    meta: {
      icon: "md-checkbox-outline",
      title: "正向激励审批",
      access: ["admin"]
    },
    component: () =>
          import("@/view/incentive/incentive-audit/incentive-audit.vue")
  },
  {
    path: "/incentive_details/:id",
    name: "incentive_details",
    meta: {
      icon: "md-checkbox-outline",
      title: "正向激励审批",
      hideInMenu: true
    },
    component: () =>
          import("@/view/incentive/incentive-details/incentive-details.vue")
  }
  ]
},
{
  path: "/dynamic_news",
  name: "dynamic_news",
  meta: {
    icon: "logo-twitter",
    hide: true
  },
  component: Main,
  children: [{
    path: "/dynamic_news_page",
    name: "dynamic_news_page",
    meta: {
      icon: "logo-twitter",
      title: "动态新闻"
    },
    component: () => import("@/view/dynamic-news/dynamic-news-page/dynamic-news-page.vue")
  }, {
    path: "/dynamic_news_edi",
    name: "dynamic_news_edi",
    meta: {
      icon: "ios-create-outline",
      title: "动态编辑",
      access: ["admin"]
    },
    component: () => import("@/view/dynamic-news/dynamic-news-edi/dynamic-news-edi.vue")
  }]
},
{
  path: "/investigate",
  name: "investigate",
  meta: {
    icon: "ios-search",
    title: "察访工作",
    access: ["hide"]
  },
  component: Main,
  children: [{
    path: "investigate_outbox",
    name: "investigate_outbox",
    meta: {
      icon: "md-funnel",
      title: "已发送文件"
    },
    component: () =>
          import("@/view/investigate/investigate-outbox/investigate-outbox.vue")
  },
  {
    path: "investigate_ide",
    name: "investigate_ide",
    meta: {
      icon: "ios-create-outline",
      title: "编辑文件"
    },
    component: () =>
          import("@/view/investigate/investigate-ide/investigate-ide.vue")
  },
  {
    path: "investigate_inbox",
    name: "investigate_inbox",
    meta: {
      icon: "ios-mail-outline",
      title: "已收到文件"
    },
    component: () =>
          import("@/view/investigate/investigate-inbox/investigate-inbox.vue")
  }
  ]
},
{
  path: "/work_supervision",
  name: "work_supervision",
  meta: {
    icon: "ios-search",
    title: "工作督查"
  },
  component: Main,
  children: [{
    path: "/work_management",
    name: "work_management",
    meta: {
      icon: "md-trending-up",
      title: "督查指标管理"
    },
    component: () => import("@/view/work-supervision/work-management/work-management.vue")
  },
  {
    path: "/work_data",
    name: "work_data",
    meta: {
      icon: "md-stats",
      title: "督查数据考核"
    },
    component: () => import("@/view/work-supervision/work-data/work-data.vue")
  },
  {
    path: "/work_audit",
    name: "work_audit",
    meta: {
      icon: "md-checkbox-outline",
      title: "督查审核审批"
    },
    component: () => import("@/view/work-supervision/work-audit/work-audit.vue")
  }
  ]
},
{
  path: "/no_entry_unit",
  name: "no_entry_unit",
  meta: {
    icon: "ios-search",
    title: "未录入单位",
    access: ["hide"]
  },
  component: Main,
  children: [{
    path: "no_entry_unit_county",
    name: "no_entry_unit_county",
    meta: {
      icon: "md-funnel",
      title: "乡镇指标未录入"
    },
    component: () =>
          import("@/view/no-entry-unit/no-entry-unit-county/no-entry-unit-county.vue")
  },
  {
    path: "no_entry_unit_game",
    name: "no_entry_unit_game",
    meta: {
      icon: "ios-create-outline",
      title: "六抓六赛未录入"
    },
    component: () =>
          import("@/view/no-entry-unit/no-entry-unit-game/no-entry-unit-game.vue")
  },
  {
    path: "no_entry_unit_all",
    name: "no_entry_unit_all",
    meta: {
      icon: "ios-mail-outline",
      title: "所以有未录入"
    },
    component: () =>
          import("@/view/no-entry-unit/no-entry-unit-all/no-entry-unit-all.vue")
  }
  ]
},
{
  path: "/401",
  name: "error_401",
  meta: {
    hideInMenu: true
  },
  component: () => import("@/view/error-page/401.vue")
},
{
  path: "/500",
  name: "error_500",
  meta: {
    hideInMenu: true
  },
  component: () => import("@/view/error-page/500.vue")
},
{
  path: "*",
  name: "error_404",
  meta: {
    hideInMenu: true
  },
  component: () => import("@/view/error-page/404.vue")
}
];
