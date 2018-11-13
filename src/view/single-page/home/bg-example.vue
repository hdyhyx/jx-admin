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
  created () {},
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
      grid: {
        top: '10%',
        left: '0%',
        right: '5%',
        bottom: '0%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          show: false,
          boundaryGap: false,
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
        }
      ],
      yAxis: [
        {
          type: 'value',
          show: false
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
              color: '#eeeeee',
              width: 2
            }
          },

          itemStyle: {
            normal: {
              color: '#eeeeee', // 折线点的颜色
              lineStyle: {
                color: '#ffffff' // 折线的颜色
              }
            }
          },
          areaStyle: {
            normal: {
              color: 'rgba(86, 216, 151, 0)'
            }
          },
          data: [0, 150, 0, 300, 90, 230, 210, 120, 132, 101]
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
