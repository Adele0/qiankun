<template>
  <div id="portal-app">
    <Tips />
    <Layout v-if="showSubApp" />
    <!-- 如果没有登录信息 需要 进入router-view 登录页 -->
    <router-view v-else></router-view>
  </div>
</template>

<script>
import Tips from "./Layout/components/Tips";
import Cookies from "js-cookie";
import { changeLiveWH, pageIsClose } from "@/utils";
import Layout from "@/Layout";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth";
export default {
  components: { Tips, Layout },
  computed: {
    ...mapGetters(["showSubApp"])
  },
  created() {
    // 监听浏览器关闭 清除 登录 cookie
    pageIsClose();
  }
};
</script>
