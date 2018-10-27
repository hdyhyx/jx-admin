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
      color: ['#eeeeee'],
      grid: {
        top: '0%',
        left: '0%',
        right: '5%',
        bottom: '0%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          show: false,
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
          name: '直接访问',
          type: 'bar',
          barWidth: '30%',
          data: [150, 180, 200, 240, 300, 280, 220, 250, 230, 280]
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
