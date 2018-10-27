<template>
  <div ref="dom" class="charts chart-radar"></div>
</template>

<script>
import echarts from 'echarts';
import { on, off } from '@/libs/tools';
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
          text: '县绩效考核得分情况',
          x: 'left'
        },
        radar: [
          {
            indicator: [
              {
                text: '经济发展',
                max: 235,
                percent: 10
              },
              {
                text: '有效投资',
                max: 170,
                percent: 30
              },
              {
                text: '机制创新 ',
                max: 55,
                percent: 12
              },
              {
                text: '创新驱动',
                max: 90,
                percent: 20
              },
              {
                text: '生态文明',
                max: 110,
                percent: 30
              },
              {
                text: '民生保障',
                max: 169,
                percent: 30
              },
              {
                text: '政务服务',
                max: 171,
                percent: 30
              }
            ],
            center: ['50%', '50%'],
            radius: '80%',
            shape: 'circle',
            name: {
              formatter: function (value, indicator) {
                var npercent = indicator.max;
                console.log(value, indicator);
                return value + ':' + indicator.max + '分';
              },
              textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 5,
                padding: [5, 9],
                fontSize: 15
              }
            }
          }
        ],
        series: [
          {
            name: '成绩单',
            type: 'radar',
            lineStyle: {
              normal: {
                color: '#32CAF6',
                type: 'solid',
                width: 5
              },
              emphasis: {}
            },
            itemStyle: {
              borderColor: 'rgba(50,202,246,0.1);',
              borderWidth: 10
            },
            data: [
              {
                value: [150, 113, 30, 55, 90, 135, 120],
                label: {
                  normal: {
                    show: true,
                    fontSize: 20,
                    formatter: function (params, index = 1) {
                      return params.value + '分';
                    }
                  }
                },
                areaStyle: {
                  normal: {
                    opacity: 0.8,
                    color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                      {
                        color: '#32CAF6',
                        offset: 1
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
      this.$nextTick(() => {
        this.dom = echarts.init(this.$refs.dom);
        this.dom.setOption(option);
        on(window, 'resize', this.resize);
      });
    });
  },
  beforeDestroy () {
    off(window, 'resize', this.resize);
  }
};
</script>
