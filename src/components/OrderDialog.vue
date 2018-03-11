<template>
  <el-dialog
    :visible.sync="visible"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    style="padding: 0"
    width="80%" center>

    <div slot="title" style="padding: 0">确认订单</div>

    <el-card class="box-card" style="border: 2px #409EFF solid">
      <div slot="header" class="clearfix">

        <div style="margin-top: 5px">
          <span style="color: rgb(64, 158, 255)">姓名 <i class="fa fa-user" aria-hidden="true"></i></span>: {{userInfo.userName}}
        </div>
        <div>
          <span style="color: rgb(64, 158, 255)">地址 <i class="fa fa-home" aria-hidden="true"></i></span>: {{userInfo.userAddress}}
        </div>
        <div>
          <span style="color: rgb(64, 158, 255)">电话 <i class="fa fa-phone" aria-hidden="true"></i></span>:  {{userInfo.userPhone}}
        </div>
        <div>
          <span style="color: rgb(64, 158, 255)">邮箱 <i class="fa fa-at" aria-hidden="true"></i></span>:  {{userInfo.userEmail}}
        </div>
      </div>

      <div style="margin-bottom: 5px; font-weight: bold">
        <span>商品列表</span>
      </div>
      <div v-for="item in checkedProducts">
        <el-row style="font-size: 12px; margin-left: 10px">
          <el-col :span="12">
            <span>{{item.goodsInfo.goodsName}}</span>
          </el-col>
          <el-col :span="12">
            <span>{{item.goodsInfo.goodsPrice|currency('$')}}</span>
            <span> x </span>
            <span>{{item.goodsNum}}</span>
          </el-col>
        </el-row>
      </div>

      <div style="margin-top: 5px">
        <span style="font-weight: bold; color: #409EFF">总价 <i class="fa fa-calculator"></i> ：</span>{{totalPrice|currency('$')}}
      </div>
    </el-card>


    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">继续购物</el-button>
      <el-button type="primary" @click="addOrderToBills">提交订单</el-button>
    </div>
  </el-dialog>
</template>

<script>
    import axios from 'axios'
    import {currency} from "../util/currency";

    export default {
      props: ['visible', 'totalPrice', 'checkedProducts'],
      name: "order-dialog",
      data() {
        return {
          userInfo: {}
        }
      },
      mounted() {
        this.getUserInfo()
      },
      filters: {
        currency: currency
      },
      methods: {
        closeDialog() {
          this.$emit('closeDialog')
        },
        getUserInfo() {
          axios.get("/users/infoList").then((response)=>{
            let res = response.data;
            // this.orderList = res.result.orderList.reverse()
            this.userInfo = res.result
          });
        },
        addOrderToBills() {
          let goodsList = []
          this.checkedProducts.forEach(item => {
            goodsList.push({
              'goodsInfo': item.goodsInfo._id,
              'quantity': item.goodsNum
            })
          })
          axios.post('/users/addOrder', {

            bill: {
              'totalPrice': this.totalPrice,
              'userInfo': {
                'userEmail': this.userInfo.userEmail,
                'userName': this.userInfo.userName,
                'address': this.userInfo.userAddress,
                'phone': this.userInfo.userPhone,
                'postCode': this.userInfo.userPostCode
              },
              "goodsList": goodsList,
              'doNumber': 10000000000
            }
          }).then((response) => {
            let res = response.data

            if (res.status === '0') {
              this.totalCheckedProductsPrice = 0
              this.addOrderToUsers(res.result)
              // this.$emit('closeDialog')
              this.$emit('deleteCheckedProducts')
            }
          })
        },

        addOrderToUsers(billId) {
          axios.post('/users/addOrderToUsers', {
            billId: billId
          }).then(response => {
            if (status === '0') {
              this.$message('提交订单成功！')
            }
          })
        }
      }
    }
</script>

<style scoped>

</style>
