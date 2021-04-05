<template>
  <div class="home" v-if="!loading">
    <div class="datav-wrapper">
      <top-header/>
      <sales-bar :data="data"/>
    </div>
  </div>
  <div class="home" v-else>
    <div class="loading-wrapper">{{loadingText}}</div>
  </div>
</template>

<script>
import TopHeader from '../components/TopHeader/index'
import SalesBar from '../components/SalesBar/index'
import { getScreenMobileData } from '../api'

export default {
  name: 'Home',
  components: {
    SalesBar,
    TopHeader
  },
  data () {
    return {
      loading: true,
      loadingText: '加载中.',
      data: null
    }
  },
  mounted () {
    this.task && clearInterval(this.task)
    this.task = setInterval(() => {
      if (this.loadingText === '加载中......') {
        this.loadingText = '加载中.'
      } else {
        this.loadingText += '.'
      }
    }, 200)
    getScreenMobileData().then(data => {
      this.loading = false
      this.task && clearInterval(this.task)
      this.$nextTick(() => {
        this.data = data
      })
    }).catch(() => {
      this.loading = false
    })
  }
}
</script>

<style lang="less" scoped>
  .home {
    height: 100%;
    position: relative;

    .datav-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1336px;
      z-index: 1;
      background-image: url("//www.youbaobao.xyz/datav-res/datav/datav-mobile-bg.jpg");
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    .loading-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40px;
      color: #fff;
    }
  }
</style>
