<template>
    <div ref="dom">
    </div>
</template>

<script>
import echarts from 'echarts';
import { on, off } from '@/libs/tools';
export default {
  name: 'serviceRequests',
  data () {
    return {
      dom: null,
      barData: 0,
      colors: [
        '#14CC82',
        '#0C418C',
        '#FF9800',
        '#D56363',
        '#B860DC',
        '#22CF8C',
        '#58A1E5',
        '#FFC107'
      ]
    };
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    yName: {
      type: String,
      default: '权数'
    }
  },
  watch: {
    barData (val) {
      console.log(val);
    }
  },
  created () {},
  methods: {
    resize (val) {
      console.log(val);
      this.dom.resize();
    },
    barDatas (val) {
      console.log(val);
    },
    bar () {
      const option = {
        color: this.colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: [
            '权数',
            '经济发展',
            '有效投资',
            '创新驱动',
            '生态文明',
            '创新机制',
            '政务服务',
            '民生保障'
          ],
          x: 'right'
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
            data: [
              '鼓楼区',
              '台江区',
              '仓山区',
              '晋安区',
              '长乐市',
              '福清市',
              '闽侯县',
              '连江县',
              '罗源县',
              '闽清县',
              '永泰县'
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
            name: '权数',
            type: 'bar',
            data: [
              862,
              1018,
              964,
              1026,
              1679,
              1600,
              1570,
              650,
              1200,
              680,
              1100
            ],
            markLine: {
              lineStyle: {
                normal: {
                  type: 'dashed'
                }
              }
            }
          },
          {
            name: '经济发展',
            type: 'bar',
            barWidth: 8,
            stack: '权数',
            data: [
              300,
              732,
              701,
              734,
              1090,
              1130,
              1120,
              100,
              200,
              100,
              200,
              100
            ]
          },
          {
            name: '有效投资',
            type: 'bar',
            stack: '权数',
            data: [150, 132, 101, 134, 290, 230, 220, 100, 200, 100, 200, 200]
          },
          {
            name: '创新驱动',
            type: 'bar',
            stack: '权数',
            data: [110, 72, 71, 74, 190, 130, 110, 100, 200, 50, 100, 100]
          },
          {
            name: '生态文明',
            type: 'bar',
            stack: '权数',
            data: [92, 82, 91, 84, 109, 110, 120, 100, 200, 50, 300]
          },
          {
            name: '创新机制',
            type: 'bar',
            stack: '权数',
            data: [72, 82, 91, 84, 109, 110, 120, 100, 100, 100, 100]
          },
          {
            name: '政务服务',
            type: 'bar',
            stack: '权数',
            data: [69, 82, 91, 84, 109, 110, 120, 100, 200, 200, 200]
          },
          {
            name: '民生保障',
            type: 'bar',
            stack: '权数',
            data: [62, 82, 91, 84, 109, 110, 120, 50, 100, 80, 10]
          }
        ]
      };
      this.$nextTick(() => {
        this.dom = echarts.init(this.$refs.dom);
        this.dom.setOption(option, true);
        on(window, 'resize', this.resize);
        this.dom.on('click', params => {
          this.$emit('clickData', params);
        });
      });
    }
  },
  mounted () {
    this.bar();
  },
  beforeDestroy () {
    off(window, 'resize', this.resize);
  }
};
</script>
