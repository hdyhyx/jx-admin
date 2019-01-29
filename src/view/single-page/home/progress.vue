<template>
  <div class="progress">
    <div class="progress-count" :style="{background:color,width:widthVal*100+'%'}"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    color: {
      type: String,
      default: "#2196F3"
    },
    widthVal: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style>
.progress {
  width: 100%;
  height: 20px;
  line-height: 20px;
  background: #eeeeee;
}
.progress-count {
  height: 20px;
}
</style>
