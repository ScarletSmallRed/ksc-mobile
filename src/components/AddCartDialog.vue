<template>
  <el-dialog
    :title="item.goodsName"
    :visible.sync="addCartDialogVisible"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="70%" center>
    <div style="text-align: center">
      选择数量：<el-input-number size="small" v-model="goodsNum"></el-input-number>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="addCart(item.goodsName)">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "add-cart-dialog",
      props: ['addCartDialogVisible', 'item'],
      data() {
          return {
            goodsNum: 1
          }
      },
      methods: {
          closeDialog() {
            this.$emit('closeDialog')
            this.goodsNum = 1
          },

        addCart(goodsName) {
          console.log(goodsName)
          axios.post('/users/addCart', {
            goodsName: goodsName,
            goodsNum: this.goodsNum
          }).then((response) => {
            var res = response.data
            if (res.status === '0') {
              this.$message('添加到购物车成功！')
              this.$emit('closeDialog')
              this.goodsNum = 1
            } else {
              this.$message(res.msg)
            }
          })
        },

      }
    }
</script>

<style scoped>

</style>
