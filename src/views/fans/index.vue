<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <my-Breadcrumb>粉丝管理</my-Breadcrumb>
      </div>
      <!-- 选项卡 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="fansList">
          <div class="fans_list">
            <div class="fans_item" v-for="item of fans" :key="item.id.toString()">
              <!-- 头像 -->
              <el-avatar :size="80" :src="item.photo"></el-avatar>
              <!-- 用户名 -->
              <p>{{item.name}}</p>
              <!-- 关注 -->
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="pager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="fansPhoto">
          <div ref="dom" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import circleUrl from '../../assets/avatar.jpg'
export default {
  data () {
    return {
      activeName: 'fansPhoto',
      // 默认头像
      circleUrl,
      fans: [],
      reqParams: {
        page: 1,
        per_page: 21
      },
      total: 0
    }
  },
  created () {
    this.getFansList()
  },
  mounted () {
    const dom = this.$refs.dom
    const myEcharts = echarts.init(dom)
    var option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    myEcharts.setOption(option)
  },
  methods: {
    async getFansList () {
      const {
        data: { data }
      } = await this.$axios.get('followers', { params: this.reqParams })
      this.fans = data.results
      this.total = data.total_count
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getFansList()
    }
  }
}
</script>

<style scoped lang='less'>
.fans_item {
  width: 150px;
  height: 190px;
  border: 1px dashed #ddd;
  display: inline-block;
  padding-top: 20px;
  margin-bottom: 20px;
  margin-right: 20px;
  text-align: center;
}
</style>
