<template>
  <div class="home" v-if="!loading">
    <div class="datav-wrapper">
      <top-header/>
      <sales-bar :data="data"/>
      <sales-line :data="data"/>
      <sales-pie :data="data"/>
      <sales-map/>
      <sales-sun :data="data"/>
      <sales-radar :data="data"/>
    </div>
  </div>
  <div class="home" v-else>
    <div class="loading-wrapper">{{loadingText}}</div>
  </div>
</template>

<script>
import { getScreenMobileData } from '../api'
import TopHeader from '../components/TopHeader/index'
import SalesBar from '../components/SalesBar/index'
import SalesLine from '../components/SalesLine/index'
import SalesPie from '../components/SalesPie/index'
import SalesMap from '../components/SalesMap/index'
import SalesSun from '../components/SalesSun/index'
import SalesRadar from '../components/SalesRadar/index'

export default {
  name: 'Home',
  components: {
    SalesRadar,
    SalesSun,
    SalesMap,
    SalesPie,
    SalesBar,
    TopHeader,
    SalesLine
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
