<template>
  <el-color-picker
    v-model="themeColor"
    :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d', ]"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
    @change="colorChange"
  />
</template>

<script>
/* const themeColor = {
  blackgold: '#c17400',
  fox: '#fc753d',
  universe: '#38629c',
  naughtybear: '#36b2d4',
  peachblossom: '#f87595',
  minions: '#fed501',
  harvestjoy: '#fed501',
  thebigblue: '#2f8970',
  soot: '#9d8151',
  maidenheart: '#ee6f9c'
} */
const ORIGINAL_THEME = '#409EFF' // default color
export default {
  data() {
    return {
      chalk: '', // content of theme-chalk css
    }
  },
  computed: {
    themeColor() {
      return this.$store.state.app.themeColor
    },
    // themeName() {
    //   return this.$store.state.app.theme
    // },
  },
  watch: {
    themeColor(val) {
      this.changeStyle(val)
    }
  },
  mounted() {
    if (this.themeColor !== 'null') this.changeStyle(this.themeColor)
  },
  methods: {
    colorChange(e) {
      this.$store.dispatch('changeThemeColor', e).then(() => {
        this.$toast.success('更换主题颜色成功')
      })
    },
    async changeStyle(val) {
      const oldVal = this.chalk ? this.themeColor : ORIGINAL_THEME
      
      let styleTag = document.getElementById('theme_color_style')
      if (!styleTag) {
        styleTag = document.createElement('style')
        styleTag.type = 'text/css'
        styleTag.id = 'theme_color_style'
      }
      if (typeof val !== 'string') {
        styleTag.innerHTML = ''
        return
      }
      const themeCluster = this.getThemeCluster(val.replace('#', ''))
      const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
      const getHandler = (variable) => {
        return () => {
          const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
          const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)
          styleTag.innerHTML = newStyle
          if (!document.getElementById('theme_color_style')) {
            document.body.appendChild(styleTag)
          }
        }
      } 
      if (!this.chalk) {
        const url = `${window.location.origin}/element/element-ui@2.8.2-theme-picker.css`
        await this.getCSSString(url, 'chalk')
      }
      const chalkHandler = getHandler('chalk')
      chalkHandler()
      this.chalk = ''
    },
    updateStyle(style, oldCluster, newCluster) {
      let newStyle = style
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index] + ' !important')
      })
      return newStyle
    },
    getCSSString(url, variable) {
      return new Promise(resolve => {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
            resolve()
          }
        }
        xhr.open('GET', url)
        xhr.send()
      })
    },
    getThemeCluster(theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)
        if (tint === 0) { // when primary color is in its rgb space
          return [red, green, blue].join(',')
        } else {
          red += Math.round(tint * (255 - red))
          green += Math.round(tint * (255 - green))
          blue += Math.round(tint * (255 - blue))
          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)
          return `#${red}${green}${blue}`
        }
      }
      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)
        red = Math.round((1 - shade) * red)
        green = Math.round((1 - shade) * green)
        blue = Math.round((1 - shade) * blue)
        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)
        return `#${red}${green}${blue}`
      }
      const clusters = [theme]
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
      }
      clusters.push(shadeColor(theme, 0.1))
      return clusters
    }
  }
}
</script>

<style>
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}
.theme-picker .el-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}
</style>
