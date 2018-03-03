<template>
	<div>
    <el-header style="position: fixed; top: 0px; left: 0; background: #409EFF; color: white;padding: 15px; width: 100%; z-index: 1">
      <span class="navbar-link" v-text="nickName" v-if="nickName" style="color: #d9d9d9;">
      </span>
      <i class="fa fa-user-circle" style="font-size: 20px; color: #d9d9d9"></i>
      <a href="javascript:void(0)" class="login-a" @click="dialogFormVisible=true" v-if="!nickName">
        登录
      </a>
      <a href="javascript:void(0)" class="login-a" @click="logOut" v-else style="padding-left: 20px">
        <i class="fa fa-sign-out" style="font-size: 20px"></i> 登出
      </a>
    </el-header>
    <div style="margin-bottom: 95px">#################</div>

    <mt-navbar fixed v-model="selected" style="top: 60px">
      <mt-tab-item id="1">地址</mt-tab-item>
      <mt-tab-item id="2">订单</mt-tab-item>
    </mt-navbar>

    <div style="margin-bottom: 20px"></div>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <el-row :gutter="20" style="margin-bottom: 10px">
          <el-col :span="12">
            <div style="padding-left: 10px; color: #9d9696;">选择地址</div>
          </el-col>
          <el-col :span="12" style="text-align: right">
            <i class="el-icon-circle-plus" style="font-size: 23px; color: #409EFF; padding-right: 20px" @click="editAddrDialogVisible=true"></i>
          </el-col>
        </el-row>





        <el-card v-for="(item, index) in addressList"
                 :key="item.name"
                 style="width: 99%; margin-bottom: 10px"
                 :class="{'address-check': checkIndex === index}"
                 body-style="padding: 5px 10px 0px 10px">
          <div slot="header" class="clearfix">
        <span style="font-weight: bold">
          {{item.userName}} <a style="margin-left: 12px; color: #409EFF" @click="editAddressConfirm(item)" type="text"><i class="fa fa-edit"></i></a>
        </span>
            <el-button style="float: right; padding: 3px 0; font-size: 20px; border: none;color: #d9d9d9" @click="chooseAddress(item, index)" plain>
              <i :class="['el-icon-success', {'icon-check': checkIndex === index}]" style=""></i>
            </el-button>
          </div>
          <div style="position: relative">
            <div>
              <span style="color: rgb(64, 158, 255)">地址 <i class="fa fa-home" aria-hidden="true"></i></span>: {{item.streetName}}
            </div>
            <div>
              <span style="color: rgb(64, 158, 255)">电话 <i class="fa fa-phone" aria-hidden="true"></i></span>:  {{item.tel}}
            </div>
            <div>
              <span style="color: rgb(64, 158, 255)">邮编 <i class="fa fa-envelope-square" aria-hidden="true"></i></span>: {{item.postCode}}
            </div>
            <el-button type="text" @click="delAddressConfirm(item._id)">
              <i class="fa fa-trash" style="font-size: 20px; position: absolute; right: 0px; bottom: 10px"></i>
            </el-button>

          </div>
        </el-card>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">

        <div v-if="addrUserName && totalCheckedProductsPrice" style="margin-bottom: 10px">
          <el-row :gutter="20" style="margin-bottom: 10px">
            <el-col :span="12">
              <div style="padding-left: 10px; color: #9d9696;">待确认</div>


            </el-col>
          </el-row>

          <el-card class="box-card" style="border: 2px #409EFF solid">
            <div slot="header" class="clearfix">
              <span style="font-weight: bold">待生成订单</span>
              <el-button style="float: right; padding: 3px 0"
                         type="text"
                         @click="addOrder">确认</el-button>
              <el-button style="float: right; padding: 3px 10px"
                         type="text"
                         @click="totalCheckedProductsPrice=0"
                         plain>取消</el-button>

              <div style="margin-top: 5px">
                <span style="color: rgb(64, 158, 255)">姓名 <i class="fa fa-user" aria-hidden="true"></i></span>: {{addrUserName}}
              </div>
              <div>
                <span style="color: rgb(64, 158, 255)">地址 <i class="fa fa-home" aria-hidden="true"></i></span>: {{addrString}}
              </div>
              <div>
                <span style="color: rgb(64, 158, 255)">电话 <i class="fa fa-phone" aria-hidden="true"></i></span>:  {{addrTel}}
              </div>
              <div>
                <span style="color: rgb(64, 158, 255)">邮编 <i class="fa fa-envelope-square" aria-hidden="true"></i></span>: {{addrPost}}
              </div>
            </div>

            <div style="margin-bottom: 5px; font-weight: bold">
              <span>商品列表</span>
            </div>
            <div v-for="item in checkedProducts">
              <el-row style="font-size: 12px">
                <el-col :span="12">
                  <span>{{item.name}}</span>
                </el-col>
                <el-col :span="12">
                  <span>{{item.price|currency('$')}}</span>
                  <span> x </span>
                  <span>{{item.num}}</span>
                </el-col>
              </el-row>
            </div>

            <div style="margin-top: 5px">
              <span style="font-weight: bold; color: #409EFF">总价 <i class="fa fa-calculator"></i> ：</span>{{totalCheckedProductsPrice|currency('$')}}
            </div>
          </el-card>


        </div>







        <el-row :gutter="20" style="margin-bottom: 10px">
          <el-col :span="12">
            <div style="padding-left: 10px; color: #9d9696;">订单列表</div>


          </el-col>
        </el-row>
        <el-card class="box-card"
                 v-for="(item, index) in orderListFilter"
                 style="margin-bottom: 15px"
                 :key="item._id">
          <div slot="header" class="clearfix">
            <span style="font-weight: bold">订单</span>
            <span style="margin-left: 20px; font-size: 12px"> {{item.createDate}} </span>

            <div style="margin-top: 5px">
              <span style="color: rgb(64, 158, 255)">姓名 <i class="fa fa-user" aria-hidden="true"></i></span>: {{item.addressInfo.userName}}
            </div>
            <div>
              <span style="color: rgb(64, 158, 255)">地址 <i class="fa fa-home" aria-hidden="true"></i></span>: {{item.addressInfo.streetName}}
            </div>
            <div>
              <span style="color: rgb(64, 158, 255)">电话 <i class="fa fa-phone" aria-hidden="true"></i></span>:  {{item.addressInfo.tel}}
            </div>
            <div>
              <span style="color: rgb(64, 158, 255)">邮编 <i class="fa fa-envelope-square" aria-hidden="true"></i></span>: {{item.addressInfo.postCode}}
            </div>
          </div>

          <div style="margin-bottom: 5px; font-weight: bold">
            <span>商品列表</span>
          </div>
          <div v-for="item1 in item.goodsList">
            <el-row style="font-size: 12px">
              <el-col :span="12">
                <span>{{item1.name}}</span>
              </el-col>
              <el-col :span="12">
                <span>{{item1.price|currency('$')}}</span>
                <span> x </span>
                <span>{{item1.num}}</span>
              </el-col>
            </el-row>
          </div>

          <div style="margin-top: 5px">
            <span style="font-weight: bold; color: #409EFF">总价 <i class="fa fa-calculator"></i> ：</span>{{item.totalPrice|currency('$')}}
          </div>
        </el-card>


        <div style="color: #409EFF; text-align: center" @click="handleLimitChange">
          ------------------------ <i v-if="this.limit <= 2" class="fa fa-chevron-circle-down"></i><i v-else class="fa fa-chevron-circle-up"></i> ------------------------
        </div>

      </mt-tab-container-item>
    </mt-tab-container>





    <div style="margin-bottom: 60px"></div>




    <el-dialog :visible.sync="dialogFormVisible" width="75%" height="20vh">
      <el-form>
        <el-form-item label="账户" :label-width="formLabelWidth">
          <el-input v-model="userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" style="text-align: left">
          <el-input v-model="userPwd" auto-complete="off"></el-input>
        </el-form-item>
        <div >
          <span v-show="errorTip" style="color: red;">用户名或者密码错误</span>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer" style="padding: 0">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="editAddrDialogVisible" width="75%" height="20vh">
      <el-form>
        <el-form-item label="名字" :label-width="formLabelWidth">
          <el-input v-model="addrUserName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" style="text-align: left">
          <el-input v-model="addrTel" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮编" :label-width="formLabelWidth" style="text-align: left">
          <el-input v-model="addrPost" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" style="text-align: left">
          <el-input v-model="addrString" auto-complete="off" type="textarea" :rows="3"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer" style="padding: 0">
        <el-button @click="editAddrDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAddress">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog
      :visible.sync="delAddrDialogVisible"
      width="60%">
      <span>确认删除？</span>
      <span slot="footer" class="dialog-footer">
                <el-row>
                  <el-col :span="12">
                    <el-button @click="delAddrDialogVisible = false" size="mini">取消</el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="primary" @click="delAddress" size="mini">确认</el-button>
                  </el-col>
                </el-row>
              </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import {currency} from "../util/currency";
  require('./../util/util')
	export default {
		name: "info",
		data() {
			return {
        addressList:[],
        orderList: [],

				userName:'user1',
				userPwd:'123456',
				errorTip: false,
				loginModalFlag:false,
        selected: '1',


        editAddrDialogVisible: false,
				dialogFormVisible: false,
        delAddrDialogVisible: false,


				formLabelWidth: '50px',
        nickName: '',
        limit: 2,
        checkIndex: undefined,



        addressId: '',
        addrString: '',
        addrUserName: '',
        addrTel: '',
        addrPost: '',

        checkedProducts: [],
        totalCheckedProductsPrice: 0,
			}
		},
    mounted() {
		  this.checkLogin()
      this.init()
    },
    filters: {
      currency: currency
    },
    computed:{
      addressListFilter(){
        return this.addressList.slice(0,this.limit);
      },
      orderListFilter() {
        return this.orderList.slice(0, this.limit)
      }
    },
		methods: {
      init(){
        axios.get("/users/infoList").then((response)=>{
          let res = response.data;
          this.addressList = res.result.addressList;
          this.orderList = res.result.orderList.reverse()
          this.checkedProducts = this.$route.query.checkedProducts
          this.totalCheckedProductsPrice = this.$route.query.totalPrice
        });
      },
      handleLimitChange(){
        if(this.limit === 2){
          this.limit = this.orderList.length;
        }else{
          this.limit = 2;
        }
      },
			login(){
				if(!this.userName || !this.userPwd){
					this.errorTip = true;
					return;
				}
				axios.post("/users/login",{
					userName:this.userName,
					userPwd:this.userPwd
				}).then((response)=>{
					let res = response.data;
					if(res.status=="0"){
						this.errorTip = false;
						this.dialogFormVisible = false;
						this.nickName = res.result.userName
            this.init()
					}else{
						this.errorTip = true;
					}
				});
			},
      addAddress() {
        axios.post('/users/addAddress', {
          addrString: this.addrString,
          addrUserName: this.addrUserName,
          addrTel: this.addrTel,
          addrPost: this.addrPost,
          addrId: this.addressId
        }).then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.editAddrDialogVisible = false
            this.init()
            this.handleLimitChange()

            this.addrString = ''
            this.addrUserName = ''
            this.addrTel = ''
            this.addrPost = ''
            this.addressId = ''
          }
        })
      },


      editAddressConfirm(item) {
        this.editAddrDialogVisible = true
        this.checkAddress(item)
      },

      checkAddress(item) {
        this.addrString = item.streetName
        this.addrUserName = item.userName
        this.addrTel = item.tel
        this.addrPost = item.postCode
        this.addressId = item._id
      },

      chooseAddress(item, index) {
        if (index || index === 0) {
          this.checkIndex = index
        }
        this.checkAddress(item)
      },


      checkLogin(){
        axios.get("/users/checkLogin").then((response)=>{
          var res = response.data;
          if(res.status=="0"){
            this.nickName = res.result;
          }
        });
      },
      logOut(){
        axios.post("/users/logout").then((response)=>{
          let res = response.data;
          if(res.status=="0"){
            this.nickName = '';
            this.init()
          }
        })
      },
      delAddressConfirm(addressId){
        this.delAddrDialogVisible = true;
        this.addressId = addressId;
      },
      delAddress(){
        axios.post("/users/delAddress",{
          addressId:this.addressId
        }).then((response)=>{
          let res = response.data;
          if(res.status=="0"){
            console.log("del suc");
            this.delAddrDialogVisible = false;
            this.init();
            this.handleLimitChange()
          }
        })
      },

      addOrder() {
        axios.post('/users/addOrder', {
          order: {
            "createDate": new Date().Format('yyyy-MM-dd hh:mm:ss'),
            "totalPrice": this.totalCheckedProductsPrice,
            "addressInfo": {
              "userName": this.addrUserName,
              "streetName": this.addrString,
              "postCode": this.addrPost,
              "tel": this.addrTel
            },
            "goodsList": this.checkedProducts
          }
        }).then((response) => {
          let res = response.data

          if (res.status === '0') {
            this.totalCheckedProductsPrice = 0
            alert('操作成功');
            this.$router.push('/info')
            this.init()
          }
        })
      }
		}
	}
</script>

<style scoped>
  .login-a {
    color: white;
  }
  .login-a:hover {
    text-decoration: underline;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .address-check {
    border: 2px #409EFF solid;
  }
  .icon-check {
    color: #409EFF;
  }

  el-card {
    width: 99%; margin-bottom: 10px
  }
</style>
