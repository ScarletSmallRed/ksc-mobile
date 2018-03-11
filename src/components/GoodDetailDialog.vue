<template>
  <el-dialog
    :title="item.goodsName"
    :visible.sync="visible"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="70%" center>

    <p>
      {{item.goodsDescription}}
    </p>

    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="closeDialog">继续购物</el-button>
    </div>
  </el-dialog>
</template>

<script>
    export default {
      props: ['visible', 'item'],
      name: "good-detail-dialog",
      data() {
        return {
        }
      },
      methods: {
        closeDialog() {
          this.$emit('closeDialog')
        }
      }
    }
</script>

<style scoped>

</style>
