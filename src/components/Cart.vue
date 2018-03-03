<template>
  <div>
    <el-header style="position: fixed; top: 0px; left: 0; background: #409EFF; color: white;padding: 15px; width: 100%; z-index: 1">
      <el-row :gutter="100">
        <el-col :span="12">
          <span style="color: #d9d9d9; padding-left: 20px; font-size: 20px">购物车</span>
        </el-col>
        <el-col :span="12">
          <el-button style="position: relative; top: -5px; right: -30px" :disabled="checkedCount === 0" @click="checkOut">生成订单</el-button>
        </el-col>
      </el-row>
    </el-header>
    <div style="margin-bottom: 40px">#################</div>

    <el-checkbox v-model="checkAll"  @change="handleCheckAllChange">
      <p style="font-size: 30px; text-align: left">
        全选 <span style="padding-left: 100px; font-size: 25px"><span style="color: #409EFF">总价：</span>{{totalPrice}}</span>
      </p>
    </el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedProducts" @change="handleCheckedCitiesChange">
        <el-row v-for="product in products" :key="product.name + ''" :gutter="25" style="text-align: left; font-size: 13px; margin-bottom: 20px">
          <el-col :span="7">
            <el-checkbox :label="product" @change="editCart('check', product)">{{product.name}}</el-checkbox>
          </el-col>
          <el-col :span="4">
            {{product.price|currency('$')}}
          </el-col>
          <el-col :span="2">
            x
          </el-col>
          <el-col :span="5" style="font-size: 13px">
            <el-row :gutter="5">
              <el-col :span="6">
                <a @click="editCart('add', product)"><i class="el-icon-plus"></i></a>
              </el-col>
              <el-col :span="6">
                {{product.num}}
              </el-col>
              <el-col :span="6">
                <a @click="editCart('minus', product)"><i class="el-icon-minus"></i></a>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">
            <el-button type="primary"
                       icon="el-icon-delete"
                       size="mini"
                       @click="delConfirm(product)">删除</el-button>

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
          </el-col>
        </el-row>
    </el-checkbox-group>

    <div style="margin-bottom: 40px"></div>
  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";
  import axios from 'axios';
  import {currency} from "../util/currency";

	export default {
    components: {ElRow},
    name: "cart",
		data() {
			return {
        checkAll: false,
        checkedProducts: [],
        products: [],
        isIndeterminate: true,
        dialogVisible: false,
        delItem: {},
        isDisable: false,
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
          if (item.checked === '1') {
            sumMoney += item.price * item.num
          }
        })
        return sumMoney
      },
      checkedCount() {
        var i = 0
        this.products.forEach((item) => {
          if (item.checked === '1')
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
              return a.checked === '1'
            })

            this.products = res.result
          }
        })
      },
      editCart(flag, item) {
        if (flag === 'add') {
          item.num++
        } else if (flag === 'minus') {
          if (item.num > 1) {
            item.num--
          }
        } else if (flag === 'check') {
          console.log(item)
          item.checked = item.checked === '1' ? '0' : '1'
        } else if (flag === 'checkAll') {
          item.checked = this.checkAll ? '1' : '0'
        }

        axios.post('/users/cartEdit', {
          name: item.name,
          num: item.num,
          checked: item.checked
        })
      },
      delCart(){
        this.dialogVisible = false
        axios.post("/users/cartDel",{
          name: this.delItem.name
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
      checkOut(){
        if(this.checkedCount>0){
          this.checkedProducts.forEach((item) => {
            this.delItem = item
            this.delCart()
          })
          this.$router.push({
            path:"/info",
            query: {
              'checkedProducts': this.checkedProducts,
              'totalPrice': this.totalPrice}
          });
        }
      }
    }
	}
</script>

<style scoped>

</style>
