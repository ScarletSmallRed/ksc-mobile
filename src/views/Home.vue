<template>
  <div>
    <el-header style="position: fixed; top: 0px; left: 0; background: #409EFF; color: white;padding: 15px; width: 100%; z-index: 5">
      <el-row :gutter="20">
        <el-col :span="9">
          <el-dropdown trigger="click"
                       @command="setArea"
                       style="position: relative; top: -5px;">


            <el-button>
              {{checkedAreaName ? checkedAreaName : '选择区域'}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in areaNames"
                :key="item"
                :command="item">{{item}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>

        <!--<el-col :span="15"><div>-->
          <!--<el-input-->
            <!--placeholder="请输入内容"-->
            <!--style="position: relative; top: -5px">-->
            <!--<i slot="suffix" class="el-input__icon el-icon-search"></i>-->
          <!--</el-input>-->
        <!--</div></el-col>-->
      </el-row>
    </el-header>

    <div style="margin-bottom: 70px"></div>

    <div class="block">
      <el-carousel trigger="click" height="180px" style="z-index: 1; border-radius: 10px">
        <el-carousel-item v-for="item in 4" :key="item">
          <img src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?w=940&h=650&dpr=2&auto=compress&cs=tinysrgb" class="image">
        </el-carousel-item>
      </el-carousel>
    </div>

    <el-row class="grid-content countdown" style="border-radius: 23px">
			<div>
        距离 <span style="font-weight: bold">{{checkedAreaName}}</span> 本期团购下单截止日期：
			</div>
      <div style="font-weight: bold">
        {{timeInteval.days}} 天 {{timeInteval.hours}} 时 {{timeInteval.minutes}} 分 {{timeInteval.seconds}} 秒
      </div>
    </el-row>

    <div style="margin-bottom: 10px; margin-top: 10px; color: #d9d9d9">
      <span style="font-weight: bold">商家推荐</span>
    </div>

    <el-row :gutter="10">
      <el-col :span="12" v-for="(o, index) in products.slice(0, 2)" :key="o.goodsName">
        <el-card :body-style="{ padding: '0px'}">
          <img src="http://element-cn.eleme.io/static/hamburger.50e4091.png" class="image">
          <div style="padding: 14px;">
            <span class="goods-name">{{o.goodsName}}</span>
            <div class="bottom clearfix">
              <span class="goods-price">{{ o.goodsPrice|currency('$') }}</span>
              <el-button type="text" class="button cart" @click="addCart(o)">购物车</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>



    <div style="margin-bottom: 10px; margin-top: 10px; color: #d9d9d9">
      <span style="font-weight: bold">热销产品</span>
    </div>

    <el-row :gutter="10">
      <el-col :span="12" v-for="(o, index) in products.slice(0,2)" :key="o.goodsName">
        <el-card :body-style="{ padding: '0px'}">
          <img src="/static/1比1/61火锅粉.jpg" class="image">
          <div style="padding: 14px;">
            <span class="goods-name">{{o.goodsName}}</span>
            <div class="bottom clearfix">
              <span class="goods-price">{{ o.goodsPrice|currency('$') }}</span>
              <el-button type="text" class="button cart" @click="addCart(o)">购物车</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <add-cart-dialog
      :addCartDialogVisible="addCartDialogVisible"
      :item="checkedProduct" v-on:closeDialog="closeDialog"></add-cart-dialog>

    <login-dialog :visible="loginDialogVisible"
                  v-on:closeDialog="closeDialog"></login-dialog>


    <div style="margin-bottom: 60px"></div>


  </div>
</template>

<script>
    import axios from 'axios'
    import AddCartDialog from '@/components/products/AddCartDialog'
    import LoginDialog from '@/components/products/LoginDialog'
    import {currency} from "@/util/currency";

    export default {
      name: "home",
      components: {
        AddCartDialog,
        LoginDialog
      },
      data() {
          return {
            currentDate: new Date(),
            timeInteval: {},
            areaInfo: [],
            areaNames: [],
            checkedAreaName: '团购区域',
            checkedDaysOfWeek: [6],
            checkedProduct: {},
            addCartDialogVisible: false,
            loginDialogVisible: false,

            products: []
          }
      },
      filters: {
        currency: currency
      },
      mounted() {
        setInterval(this.countdown, 1000)
        this.getAraeInfo()
        this.getProducts()
        this.checkedAreaName = this.$store.state.checkedAreaName
      },
      computed: {
        getCheckedDaysOfWeek() {
          this.checkedDaysOfWeek = this.areaInfo.filter(item => {
            return item.areaName === this.checkedAreaName
          }).map(item => {
            return item.areaTime
          })[0].map(item1 => {
            console.log('#######')
            console.log(item1)


            switch (item1) {
              case '星期日':
                return 0
                break
              case '星期一':
                return 1
                break
              case '星期二':
                return 2
                break
              case '星期三':
                return 3
                break
              case '星期四':
                return 4
                break
              case '星期五':
                return 5
                break
              case '星期六':
                return 6
                break
            }
          }).sort()

          return this.checkedDaysOfWeek
        }
      },
      methods: {
        countdown() {

          var startTime = new Date()

          var daysNeeded = this.getCheckedDaysOfWeek.filter(function (item) {
            return item > startTime.getDay()
          })
          var interval = daysNeeded.length === 0 ? (this.getCheckedDaysOfWeek[0] + 7 - startTime.getDay()) :(daysNeeded[0] - startTime.getDay())
          var endTimeDate = new Date(interval * 24 * 3600 * 1000 + startTime.valueOf())
          var endTimeString = endTimeDate.getFullYear() + '/' + (endTimeDate.getMonth() + 1) + '/' + endTimeDate.getDate()
          // console.log(endTimeString)
          // console.log(daysNeeded)
          console.log('#######')
          console.log(endTimeDate)

          var endTime = new Date(endTimeString)
          var timeInterval = endTime - startTime

          var days = Math.floor(timeInterval / (24 * 3600 * 1000))

          var leave1 = timeInterval % (24 * 3600 * 1000)
          var hours = Math.floor(leave1 / (3600 * 1000))

          var leave2 = leave1 % (3600 * 1000)
          var minutes = Math.floor(leave2 / (60 * 1000))

          var leave3 = leave2 % (60 * 1000)
          var seconds = Math.round(leave3 / 1000)
          // console.log(`days: ${days} hours: ${hours} minutes: ${minutes} seconds: ${seconds}`)

          this.timeInteval =  {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
          }
        },
        getAraeInfo() {
          axios.get('/areas').then(res => {
            this.areaInfo = res.data
            this.areaNames = this.areaInfo.map(item => {
              return item.areaName
            })

          })
        },
        setArea(command) {
          this.checkedAreaName = command
          this.$store.dispatch('store_checkedAreaName',this.checkedAreaName)

          axios({
            method: 'post',
            url: '/users/editUserInfo',
            data: {
              userAreaAddress: this.checkedAreaName
            }
          })
        },
        getProducts() {
          let condition = {
            category: '全部',
            isPriceUp: 1,
            search: ''
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

        closeDialog() {
          this.addCartDialogVisible = false
          this.loginDialogVisible = false
        },

        addCart(item) {
          axios.get("/users/checkLogin").then((response)=>{
            var res = response.data;
            if(res.status === '0'){
              this.checkedProduct = item
              this.addCartDialogVisible = true
            } else {
              this.loginDialogVisible = true
            }
          });
        },
      }
    }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    margin-top: 10px;
    text-align: center;
  }

  .image {
    width: 100%;
    display: block;
  }
  .countdown {
    background: linear-gradient(-33deg,#ff0000,#ff7f24,#ff0000);
    color: white;
  }
  .goods-name {
    font-weight: bold;
  }
  .goods-price {
    margin-top: 45px;
    color: red;
  }
  .cart {
    margin-left: 40px;
  }
</style>
