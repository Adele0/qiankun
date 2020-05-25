/**
 * 整体项目设置相关的 store
 */

import Cookies from 'js-cookie'
import { setTheme, setLive2d } from '@/utils'

const app = {
  state: {
    sidebar: {
      opened: Cookies.get('sidebarStatus')
        ? !!+Cookies.get('sidebarStatus')
        : true,
      withoutAnimation: false
    },
    device: 'desktop',
    drawer: false,
    themeColor: Cookies.get('themeColor') || '',
    theme: Cookies.get('theme') || 'blackgold',
    // themePicker: '',
    sex: [{ value: false, label: '女' }, { value: true, label: '男' }]
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    TOGGLE_DRAWER: (state, opened = true) => {
      state.drawer = opened
    },
    CHANGE_THEME: (state, theme = state.theme) => {
      Cookies.set('theme', theme)
      state.theme = theme
      setTheme(theme)
    },
    CHANGE_THEME_COLOR: (state, color) => {
      Cookies.set('themeColor', color)
      state.themeColor = color
    }
  },
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    toggleDrawer({ commit }, opened) {
      commit('TOGGLE_DRAWER', opened)
    },
    changeTheme({ commit }, { theme }) {
      return commit('CHANGE_THEME', theme)
    },
    changeThemeColor({ commit }, color) {
      return commit('CHANGE_THEME_COLOR', color)
    }
  }
}

export default app