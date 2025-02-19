export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/mine/index',
    'pages/album/index',
    'pages/login/index',
    'pages/explore/index',
    'pages/spec-detail/index',
    'pages/search/index',
    'pages/preview/index',
    'pages/save-image/index',
    'pages/camera/index',
    'pages/cutout/index',
    'pages/album-detail/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarTextStyle: 'black',
    backgroundColor: "#F6F6F6",
    navigationBarBackgroundColor: "#F6F6F6",
    navigationBarTitleText: "Photo",
    navigationStyle: "custom"
  },
  tabBar: {
    custom: false,
    color: "#2c2c2c",
    selectedColor: "#2c2c2c",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath: "images/index-grey.png",
        selectedIconPath: "images/index-click.png"
      },
      {
        pagePath: "pages/album/index",
        text: "我的证照",
        iconPath: "images/photo-grey.png",
        selectedIconPath: "images/photo-click.png"
      }
    ]
  },
  lazyCodeLoading: 'requiredComponents'
})
