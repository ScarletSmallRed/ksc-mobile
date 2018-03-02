<template>
  <div>
    <el-header style="position: fixed; top: 0px; left: 0; background: white; padding: 15px; width: 100%; z-index: 1">
      <el-row :gutter="20">
        <el-col :span="9">
          <el-dropdown trigger="click" @command="setCategoriesFilter">
            <el-button type="primary">
              {{categoryChecked}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="全部">全部菜品</el-dropdown-item>
              <el-dropdown-item v-for="(item) in categories"
                                :key="item.name"
                                :command="item.name">{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>

        <el-col :span="15"><div class="grid-content bg-purple">
          <el-input
            placeholder="请输入内容"
            v-model="input23">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
          </el-input>
        </div></el-col>
      </el-row>
    </el-header>
    <div style="margin-bottom: 40px">#################</div>

    <el-container>
      <el-row :gutter="10" style="margin-bottom: 20px">
        <el-col :span="12" v-for="(item) in products" :key="item.name" style="margin-bottom: 20px">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="'static/1比1/' + item.name + '.jpg'" class="image">
            <div style="padding: 14px;">
              <span>{{item.name}}</span>
              <div class="bottom clearfix">
                <time class="time">单价：{{item.price|currency('$')}}</time>
                <el-button type="text"
                           class="button"
                           @click="addCart(item.name)">
                  <i class="fa fa-cart-plus" style="font-size: 20px"></i>
                </el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-container>

    <el-dialog
      :visible.sync="centerDialogVisible"
      width="60%"
      center>
      <span>商品添加成功！</span>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
    <div style="margin-bottom: 70px">#################</div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {currency} from "../util/currency";
	export default {
		name: "products",
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
        centerDialogVisible: false
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
				var params = {}

				axios.get('/categories/list', {
					params: params
				}).then((response) => {
					var res = response.data
					if (res.status === '0') {
						this.categories = res.result.list[0].categories
					} else {
						this.categories = []
					}
				})
			},
      setCategoriesFilter(command) {
        this.categoryChecked = command
        this.input23 = ''
        this.getProducts()
      },
      getProducts() {
        var params = {
          category: this.categoryChecked,
          isPriceUp: this.isPriceUp,
          search: this.input23
        }
        axios.get('/products/list', {
          params: params
        }).then((response) => {
          var res = response.data
          if (res.status === '0') {
            this.products = res.result.list
          } else {
            this.products = []
          }
        })
      },
      addCart(productName) {
        axios.post('/products/addCart', {
          productName: productName
        }).then((response) => {
          var res = response.data
          if (res.status === '0') {
            this.popupVisible = true
            this.centerDialogVisible = true
          } else {
            alert(res.msg)
          }
        })
      }
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
</style>
