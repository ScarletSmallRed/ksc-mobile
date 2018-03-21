<template>
  <div>
    <el-header style="position: fixed; top: 0px; left: 0; background: #409EFF; color: white;padding: 15px; width: 100%; z-index: 1">
      <el-row :gutter="100" style="text-align: center">
          <span style="color: white;font-size: 20px">购物车</span>
      </el-row>
    </el-header>
    <div style="margin-bottom: 40px">#################</div>

    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedProducts" @change="handleCheckedCitiesChange">
        <el-row v-for="product in products" :key="product.name" :gutter="25" style="text-align: left; font-size: 13px; margin-bottom: 20px">
          <el-col :span="11">
            <el-checkbox :label="product" @change="editCart('check', product)">{{product.goodsInfo.goodsName}}</el-checkbox>
          </el-col>
          <el-col :span="5">
            {{product.goodsInfo.goodsPrice|currency('$')}}
          </el-col>
          <el-col :span="7" style="font-size: 13px; margin-right: 0px">



            <el-row :gutter="5">
              <el-col class="num-button" :span="7">
                <a @click="editCart('minus', product)">-</a>
              </el-col>
              <el-col :span="10" style="border-top: 1px #d9d9d9 solid;border-bottom: 1px #d9d9d9 solid; text-align: center">
                {{product.goodsNum}}
              </el-col>
              <el-col :span="7" class="num-button">
                <a @click="editCart('add', product)">+</a>
              </el-col>
            </el-row>




          </el-col>
          <!--<el-col :span="6">-->



          <!--</el-col>-->
        </el-row>
    </el-checkbox-group>






    <el-row class="sum-counter">
      <el-col :span="6">
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">
          <p style="text-align: left">
            全选
          </p>
        </el-checkbox>
      </el-col>
      <el-col :span="12" style="height: 45px; line-height: 45px; text-align: center; font-size: 15px">
        总价：{{totalPrice|currency('$')}}
      </el-col>
      <el-col :span="6">
        <el-button type="danger" :disabled="checkedCount === 0" @click="openOrderDialog">生成订单</el-button>
      </el-col>
    </el-row>

    <order-dialog :visible="orderDialogVisible"
                  :totalPrice="totalPrice"
                  :checkedProducts="checkedProducts"
                  v-on:deleteCheckedProducts="deleteCheckedProducts"
                  v-on:closeDialog="closeDialog"></order-dialog>


    <el-dialog
    :visible.sync="dialogVisible"
    width="60%">
    <span>确认删除？</span>
    <span slot="footer" class="dialog-footer">
    <el-row>
    <el-col :span="12">
    <el-button @click="dialogVisible = false" size="mini">取消</el-button>
    </el-col>
    <el-col :span="12">
    <el-button type="primary" @click="delCart()" size="mini">确认</el-button>
    </el-col>
    </el-row>
    </span>
    </el-dialog>


    <div style="margin-bottom: 60px"></div>
  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";
  import axios from 'axios';
  import {currency} from "@/util/currency";
  import OrderDialog from '@/components/carts/OrderDialog'

	export default {
    components: {
      ElRow,
      OrderDialog,
    },
    name: "cart",
		data() {
			return {
        checkAll: undefined,
        checkedProducts: [],
        products: [],
        isIndeterminate: true,
        dialogVisible: false,
        delItem: {},
        isDisable: false,
        orderDialogVisible: false,
        productNum: 0
			}
		},
    mounted() {
      this.init()
    },
    filters: {
      currency: currency
    },
    computed: {
      totalPrice() {
        var sumMoney = 0
        this.products.forEach((item) => {
          if (item.goodsChecked === '1') {
            sumMoney += item.goodsInfo.goodsPrice * item.goodsNum
          }
        })
        return sumMoney
      },
      checkedCount() {
        var i = 0
        this.products.forEach((item) => {
          if (item.goodsChecked === '1')
            i++
        })
        return i
      },
      checkAllFlag() {
        return this.checkedCount === this.products.length
      }
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedProducts = val ? this.products : []
        this.products.forEach((item) => {
          this.editCart('checkAll', item)
        })
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.products.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.products.length;
      },
      init() {
        // this.checkAll = this.checkAllFlag()
        axios.get('/users/cartList').then((response) => {
          let res = response.data
          // this.products = res.result.map(function (a) {
          //   return a.name
          // })

          if (res.status === '0') {
            this.checkedProducts = res.result.filter(function (a) {
              return a.goodsChecked === '1'
            })

            this.products = res.result
          }
        })
      },
      editCart(flag, item) {
        if (flag === 'add') {
          item.goodsNum++
        } else if (flag === 'minus') {
          // if (item.goodsNum > 1) {
          //   item.goodsNum--
          // }
          item.goodsNum--
          if (item.goodsNum === 0) {
            this.delConfirm(item)
          }
        } else if (flag === 'check') {
          console.log(item)
          item.goodsChecked = item.goodsChecked === '1' ? '0' : '1'
        } else if (flag === 'checkAll') {
          item.goodsChecked = this.checkAll ? '1' : '0'
        }

        axios.post('/users/cartEdit', {
          goodsId: item.goodsInfo._id,
          goodsNum: item.goodsNum,
          goodsChecked: item.goodsChecked
        })
      },
      delCart(){
        this.dialogVisible = false
        axios.post("/users/cartDel",{
          goodsId: this.delItem.goodsInfo._id
        }).then((response)=>{
          let res = response.data;
          if(res.status == '0'){
            this.init();
          }
        });
      },
      delConfirm(item) {
        this.delItem = item
        this.dialogVisible = true
      },
      openOrderDialog(){
        if(this.checkedCount>0){
          this.orderDialogVisible = true
        }
      },
      deleteCheckedProducts() {
        if(this.checkedCount>0){
          this.checkedProducts.forEach((item) => {
            this.delItem = item
            this.delCart()
          })

          this.closeDialog()
        }
      },

      closeDialog() {
        this.orderDialogVisible = false
      },
      test() {
        alert('Test')
      }
    }
	}
</script>

<style scoped>
  .sum-counter {
    border-top: 1px solid #dcdfe6;
    position: fixed;
    bottom: 50px;
    left: 0;
    width: 100%;
    padding: 5px 20px 0px 20px;
  }

  .num-button {
    border: 1px solid #d9d9d9;
    background: #f5f7fa;
    text-align: center
  }
</style>
