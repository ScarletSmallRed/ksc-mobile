<template>
  <div>


    <el-header style="position: fixed; top: 0px; left: 0; background: white; padding: 15px; width: 100%; z-index: 1; background: #409EFF">
      <el-row :gutter="20">
        <el-col :span="9">
          <el-dropdown trigger="click"
                       @command="setCategoriesFilter"
                       style="position: relative; top: -5px;">


            <el-button>
              {{categoryChecked}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="全部">全部菜品</el-dropdown-item>
              <el-dropdown-item v-for="(item) in categories"
                                :key="item"
                                :command="item">{{item}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>

        <el-col :span="15"><div class="grid-content bg-purple">
          <el-input
            placeholder="请输入内容"
            v-model="input23" style="position: relative; top: -5px">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
          </el-input>
        </div></el-col>
      </el-row>
    </el-header>
    <div style="margin-bottom: 40px;text-align: center">_(:3」∠)_</div>

    <!--<el-container>-->
      <!--<el-row :gutter="10" style="padding-bottom: 10px">-->
        <!--<el-col :span="12" v-for="(item) in products" :key="item.name" style="margin-bottom: 20px">-->
          <!--<el-card :body-style="{ padding: '0px' }">-->
            <!--<img src="/static/1比1/05年糕条.jpg"-->
                 <!--class="image"-->
                 <!--@click="goodDetailVisible=true, checkedGood=item">-->
            <!--<div style="padding:5px 14px;">-->
              <!--<span>{{item.goodsName}}</span>-->
              <!--<div class="bottom clearfix">-->
                <!--<div style="padding-bottom: 5px">-->
                  <!--<time class="time">规格：{{item.goodsSize}}</time>-->
                <!--</div>-->
                <!--<div>-->
                  <!--<time class="time">单价：{{item.goodsPrice|currency('$')}}</time>-->
                <!--</div>-->







                <!--<el-button type="text"-->
                           <!--class="button"-->
                           <!--style="position: relative; bottom: 10px" @click="addCartDialogVisible=true, checkedGood=item">-->
                  <!--<i class="fa fa-cart-plus" style="font-size: 20px"></i>-->
                <!--</el-button>-->









              <!--</div>-->
            <!--</div>-->
          <!--</el-card>-->
        <!--</el-col>-->
      <!--</el-row>-->
    <!--</el-container>-->

    <el-container v-for="(item) in products"
                  :key="item.name">
      <el-row :gutter="10"
              class="goods-showcase">
        <el-col :span="8" style="padding: 0">
          <img class="image"
               src="/static/1比1/05年糕条.jpg"
               @click="goodDetailVisible=true, checkedGood=item">
        </el-col>
        <el-col :span="16">
          <div style="margin: 5px 0 20px 20px">{{item.goodsName}}</div>
          <div style="margin: 50px 0 0 20px;font-size: 10px">规格：{{item.goodsSize}}</div>
          <el-row>
            <el-col :span="16">
              <div style="margin: 0 0 0 20px;font-size: 10px">单价：{{item.goodsPrice|currency('$')}}</div>
            </el-col>
            <el-col :span="8" style="padding: 0 10px 0 0">
              <el-button type="text"
                         style="position: relative; bottom: 10px"
              class="button" @click="addCart(item)">
              <i class="fa fa-cart-plus" style="font-size: 25px;"></i>
              </el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-container>



    <add-cart-dialog
      :addCartDialogVisible="addCartDialogVisible"
      :item="checkedGood"
      v-on:closeDialog="closeDialog"></add-cart-dialog>

    <good-detail-dialog
      :visible="goodDetailVisible"
      :item="checkedGood"
      v-on:closeDialog="closeDialog"></good-detail-dialog>

    <login-dialog :visible="loginDialogVisible"
                  v-on:closeDialog="closeDialog"></login-dialog>



    <div style="margin-bottom: 30px; text-align: center">见底啦 >.< (:3[___]=</div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {currency} from "../util/currency";
  import AddCartDialog from './../components/AddCartDialog'
  import GoodDetailDialog from './../components/GoodDetailDialog'
  import LoginDialog from './../components/LoginDialog'

	export default {
		name: "products",
    components: {
		  AddCartDialog,
      GoodDetailDialog,
      LoginDialog
    },
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1',
				input23: '',
				currentDate: new Date(),
				categories: [],
        categoryChecked: '全部',
        products: [],
        isPriceUp: 1,
        centerDialogVisible: false,
        goodsNum: 1,
        visible2: false,
        addCartDialogVisible: false,
        goodDetailVisible: false,
        loginDialogVisible: false,
        checkedGood: {}

			}
		},
		mounted() {
			this.getCategories()
      this.getProducts()
		},

    filters: {
		  currency: currency
    },
		methods: {
      search() {
        console.log(`Search: ${this.input23}`)
        this.getProducts()
      },
			getCategories() {
				axios.get('/categories/').then((response) => {
          this.categories = response.data.map(item => {
            return item.categoriesName
          })
				})

			},
      setCategoriesFilter(command) {
        this.categoryChecked = command
        this.input23 = ''
        this.getProducts()
      },
      getProducts() {
        let condition = {
          category: this.categoryChecked,
          isPriceUp: this.isPriceUp,
          search: this.input23
        }


        axios({
          method:'get',
          url:'/goods/list',
          params:condition
        })
          .then((res)=>{
            this.products=res.data
          })
          .catch((err)=>{
            console.log(err)
          })
      },
      addCart(item) {
        axios.get("/users/checkLogin").then((response)=>{
          var res = response.data;
          if(res.status === '0'){
            this.checkedGood = item
            this.addCartDialogVisible = true
          } else {
            this.loginDialogVisible = true
          }
        });
        /*
        axios.post('/users/addCart', {
          goodsName: goodsName,
          goodsNum: this.goodsNum
        }).then((response) => {
          var res = response.data
          if (res.status === '0') {
            this.getProducts()
            alert('添加到购物车成功！')
            this.goodsNum = 1
          } else {
            alert(res.msg)
          }
        })*/
      },
      closeDialog() {
        this.addCartDialogVisible = false
        this.goodDetailVisible = false
        this.loginDialogVisible = false
        this.goodsNum = 1
      },
		}
	}
</script>

<style scoped>
  el-menu {
    margin-top: 0px;
    position: fixed;
    top: 0px;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .goods-showcase {
    border: 1px solid #ebeef5;
    width: 100vh;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    border-radius: 4px;
    margin-bottom: 10px;
  }
</style>
