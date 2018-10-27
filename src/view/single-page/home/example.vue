<template>
    <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts';
import { on, off } from '@/libs/tools';
export default {
  name: 'serviceRequests',
  data () {
    return {
      dom: null
    };
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  created () {
    console.log(this.title);
  },
  methods: {
    resize () {
      this.dom.resize();
    }
  },
  mounted () {
    const option = {
      title: {
        text: this.title,
        x: 'left'
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{a}',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: 'rgba(86, 216, 151, 1)'
          }
        }
      },
      grid: {
        top: '13%',
        left: '2%',
        right: '1%',
        bottom: '1%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: [
            '葛岭镇',
            '城峰镇',
            '嵩口镇',
            '清凉镇',
            '梧桐镇',
            '樟城镇',
            '长庆镇',
            '同安镇',
            '大洋镇',
            '塘前乡',
            '富泉乡',
            '岭路乡',
            '赤锡乡',
            '洑口乡',
            '盖洋乡',
            '东洋乡',
            '霞拔乡',
            '盘谷乡',
            '红星乡',
            '白云乡',
            '丹云乡'
          ]
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '运营商/网络服务',
          type: 'line',
          stack: '总量',
          symbol: 'circle',
          symbolSize: 10,
          lineStyle: {
            normal: {
              color: 'rgba(86, 216, 151,1)',
              width: 3
            }
          },

          itemStyle: {
            normal: {
              color: 'rgba(86, 216, 151,1)', // 折线点的颜色
              lineStyle: {
                color: '#386db3' // 折线的颜色
              }
            }
          },
          areaStyle: {
            normal: {
              color: 'rgba(86, 216, 151, 0.4)'
            }
          },
          data: [
            120,
            132,
            101,
            134,
            90,
            230,
            210,
            120,
            132,
            101,
            134,
            90,
            230,
            210,
            120,
            132,
            101,
            134,
            90,
            230,
            210
          ]
        }
      ]
    };
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom);
      this.dom.setOption(option);
      on(window, 'resize', this.resize);
    });
  },
  beforeDestroy () {
    off(window, 'resize', this.resize);
  }
};
</script>
