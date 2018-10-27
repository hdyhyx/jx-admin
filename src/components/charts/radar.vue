<template>
  <div ref="dom" class="charts chart-radar"></div>
</template>

<script>
import echarts from 'echarts';
import tdTheme from './theme.json';
import { on, off } from '@/libs/tools';
echarts.registerTheme('tdTheme', tdTheme);
export default {
  name: 'ChartRadar',
  props: {
    value: Object,
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null
    };
  },
  methods: {
    resize () {
      this.dom.resize();
    }
  },
  mounted () {
    this.$nextTick(() => {
      // let xAxisData = Object.keys(this.value);
      // let seriesData = Object.values(this.value);
      let option = {
        title: {
          text: '雷答',
          x: 'center'
        },
        radar: [
          {
            indicator: [
              { text: '语文', max: 150 },
              { text: '数学', max: 150 },
              { text: '英语', max: 150 },
              { text: '物理', max: 120 },
              { text: '化学', max: 108 },
              { text: '生物', max: 72 }
            ],
            center: ['75%', '50%'],
            radius: 120,
            shape: 'circle'
          }
        ],
        series: [
          {
            name: '成绩单',
            type: 'radar',
            radarIndex: 1,
            data: [
              {
                value: [90, 113, 140, 30, 70, 60],
                areaStyle: {
                  normal: {
                    opacity: 0.9,
                    color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                      {
                        color: '#B8D3E4',
                        offset: 0
                      },
                      {
                        color: '#72ACD1',
                        offset: 1
                      }
                    ])
                  }
                }
              }
            ]
          }
        ]
      };
      this.dom = echarts.init(this.$refs.dom, 'tdTheme');
      this.dom.setOption(option);
      on(window, 'resize', this.resize);
    });
  },
  beforeDestroy () {
    off(window, 'resize', this.resize);
  }
};
</script>
