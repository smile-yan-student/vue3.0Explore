<template>
    <div class="navbar" :style="{ padding: padding }">
        <span class="title">
            <span class="marker" v-if="marker"></span>
            {{ title }}
        </span>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "PASSENGER_TITLE",
    props: {
        title: {
            default: "示例title",
            type: String,
        },
        marker: {
            default: true,
            type: Boolean,
        },
        padding: {
            default: "0",
            type: String,
        },
    },
};
</script>

<style lang="less" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  background: #fff;
}
.title {
  display: inline-block;
  color: rgba(56, 56, 56, .85);
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  .marker {
    content: "";
    display: inline-block;
    width: 4px;
    height: 18px;
    margin-right: 4px;
    vertical-align: sub;
    background: #3883f4;
    border-radius: 2px;
  }
}
</style>
