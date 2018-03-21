<script src="../store.js"></script>
<template>
	<div>
    <el-header style="position: fixed; top: 0px; left: 0; background: #409EFF; color: white;padding: 15px; padding-right: 0;width: 100%; z-index: 1">
      <div style="float:right;width: 100px; margin: 3px 0 0 0" v-if="!nickName">

        <a href="javascript:void(0)" class="login-a" @click="dialogFormVisible=true" v-if="!nickName">
          登录
        </a>
        <span>/</span>
        <a href="javascript:void(0)"
           class="login-a"
           @click="registerDialogVisible=true"
           v-if="!nickName">
          注册
        </a>


      </div>
      <div v-if="nickName" style="margin: 3px 0 0 0">
        <el-row>
          <el-col :span="12">
            <span class="navbar-link" v-text="nickName" style="color: white;"></span>
          </el-col>

          <el-col :span="12" style="text-align: right; padding-right: 10px">
            <a href="javascript:void(0)" class="login-a" @click="logOut">
              <i class="fa fa-sign-out" style="font-size: 20px"></i> 登出
            </a>
          </el-col>
        </el-row>



      </div>
    </el-header>
    <div style="margin-bottom: 95px">#################</div>

    <mt-navbar fixed v-model="selected" style="top: 60px">
      <mt-tab-item id="1"><span style="font-size: 16px">地址</span></mt-tab-item>
      <mt-tab-item id="2"><span style="font-size: 16px">订单</span></mt-tab-item>
    </mt-navbar>

    <div style="margin-bottom: 20px"></div>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <el-row :gutter="20" style="margin-bottom: 10px">
          <el-col :span="12">
            <div style="padding-left: 10px; color: #9d9696;font-size: 12px">个人信息</div>
          </el-col>
          <el-col :span="12" style="text-align: right">
          </el-col>
        </el-row>


        <el-card style="width: 99%; margin-bottom: 10px"
                 class="address-check"
                 body-style="padding: 5px 10px 0px 10px">
          <div slot="header" class="clearfix">
        <span style="font-weight: bold">
          {{userInfo.userName}} <a style="margin-left: 12px; color: #409EFF" @click="editUserInfoConfirm" type="text"><i class="fa fa-edit"></i> </a>
        </span>
            <el-button style="float: right; padding: 3px 0; font-size: 20px; border: none;color: #d9d9d9" plain>
            </el-button>
          </div>
          <div style="position: relative">
            <div>
              <span style="color: rgb(64, 158, 255)">电话 <i class="fa fa-phone" aria-hidden="true"></i></span>:  {{userInfo.userId}}
            </div>
            <div>
              <span style="color: rgb(64, 158, 255)">地址 <i class="fa fa-home" aria-hidden="true"></i></span>: {{userInfo.userAddress}}
            </div>
            <div>
              <span style="color: rgb(64, 158, 255)">区域 <i class="fa fa-home" aria-hidden="true"></i></span>: {{userInfo.userAreaAddress}}
            </div>


          </div>
        </el-card>
      </mt-tab-container-item>



      <mt-tab-container-item id="2">

        <el-row :gutter="20" style="margin-bottom: 10px">
          <el-col :span="12">
            <div style="padding-left: 10px; color: #9d9696;">订单列表</div>


          </el-col>
        </el-row>


        <el-card v-for="item in orderListFilter"
                 :key="item.billInfo._id"
                 class="box-card"
                 style="margin-bottom: 10px"
                 :body-style="{ padding: '15px 0 0 20px' }"
                 v-if="item.billInfo.state !== 3">
          <div slot="header" class="clearfix">
            <el-button v-if="item.billInfo.state === 0" style="float: right; padding: 3px 0" type="text" @click="billStateDialogVisible=true, changedBillId=item.billInfo._id,flag=0">取消订单</el-button>
            <el-button v-if="item.billInfo.state === 1" style="float: right; padding: 3px 0" type="text" @click="changeBillState(item.billInfo._id, 1)">确认收货</el-button>
            <span style="font-weight: bold; font-size: 14px">订单号：</span>
            <span style="font-size: 14px;">{{item.billInfo.doNumber}}</span>

            <div>
              <span style="font-weight: bold; font-size: 14px">订单时间：</span>
              <span style="font-size: 14px">{{new Date(item.billInfo.orderDate).Format('yyyy-MM-dd hh:mm:ss')}}
            </span>

            </div>

            <div v-if="item.billInfo.completeDate">
              <span style="font-weight: bold; font-size: 10px">完成时间：</span>
              <span style="font-size: 10px">{{new Date(item.billInfo.completeDate).Format('yyyy-MM-dd hh:mm:ss')}}
            </span>

            </div>
            <div>
              <span style="font-weight: bold; font-size: 14px">订单状态：</span>
              <span v-if="item.billInfo.state === 0" style="font-size: 14px; color: red">等待处理</span>
              <span v-if="item.billInfo.state === 666" style="font-size: 14px; color: red">正在配送中</span>
              <span v-if="item.billInfo.state === 1" style="font-size: 14px; color: orange">已发货</span>
              <span v-if="item.billInfo.state === 2" style="font-size: 14px; color: green">交易完成</span>
            </div>

          </div>
          <div class="text item">
            <div style="margin-bottom: 10px">
              <span style="font-weight: bold">商品列表</span>
            </div>
            <el-row v-for="(item1, index) in item.billInfo.goodsList"
                    :key="index"
                    style="font-size: 13px; margin-left: 10px">
              <el-col :span="12">
                <span>{{item1.goodsInfo.goodsName}}</span>
              </el-col>
              <el-col :span="8">
								<span>{{item1.goodsInfo.goodsPrice|currency('$')}}</span>
              </el-col>
              <!--<el-col :span="3">-->
                <!--<span> x </span>-->
              <!--</el-col>-->
              <el-col :span="4">
                <span>x {{item1.quantity}}</span>
              </el-col>
            </el-row>
            <div style="margin-top: 10px;">
              <span style="font-weight: bold; color: #409EFF">总价 <i class="fa fa-calculator"> : </i></span> <span style="color: red">{{item.billInfo.totalPrice|currency('$')}}</span>
            </div>
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
        <el-form-item label="账户/手机" label-width="80px">
          <el-input v-model="userId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" style="text-align: left">
          <el-input type="password" v-model="userPwd" auto-complete="off"></el-input>
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

    <el-dialog
      :visible.sync="billStateDialogVisible"
      width="60%">
      <span>确认取消？</span>
      <span slot="footer" class="dialog-footer">
                <el-row>
                  <el-col :span="12">
                    <el-button @click="billStateDialogVisible = false" size="mini">取消</el-button>
                  </el-col>
                  <el-col :span="12">
                    <el-button type="primary" @click="changeBillState(changedBillId, flag)" size="mini">确认</el-button>
                  </el-col>
                </el-row>
              </span>
    </el-dialog>

    <register-dialog
      :visible="registerDialogVisible"
      v-on:closeDialog="closeRegisterDialog"></register-dialog>

    <edit-user-info-dialog
      :visible="editUserInfoDialogVisible"
      :userName="userInfo.userName"
      :userAddress="userInfo.userAddress"
      :userPwd="userInfo.userPwd"
      v-on:closeDialog="closeEditInfoDialog"
      v-on:init="init"></edit-user-info-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import {currency} from "../util/currency";
  import ElCard from "element-ui/packages/card/src/main";
  import RegisterDialog from '@/components/info/RegisterDialog'
  import EditUserInfoDialog from '@/components/info/EditUserInfoDialog'
  require('../util/util')
	export default {
    components: {
      ElCard,
      RegisterDialog,
      EditUserInfoDialog
    },
    name: "info",
		data() {
			return {
        addressList:[],
        orderList: [],

				userId:'11112222',
				userPwd:'123456',
				errorTip: false,
				loginModalFlag:false,
        selected: '2',


        editUserInfoDialogVisible: false,
				dialogFormVisible: false,
        billStateDialogVisible: false,
        registerDialogVisible: false,

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

        userInfo: {},

        changedBillId: '',
        flag: -1
			}
		},
    mounted() {
		  this.checkLogin()
      this.init()
    },
    filters: {
      currency: currency,
    },
    computed:{
      addressListFilter(){
        return this.addressList.slice(0,this.limit);
      },
      orderListFilter() {
        let legalOrderList = this.orderList.filter(item => {
          return item.billInfo.state !== 3
        })
        return legalOrderList.slice(0, this.limit)
      }
    },
		methods: {
      init(){
        axios.get("/users/infoList").then((response)=>{
          let res = response.data;
          // this.orderList = res.result.orderList.reverse()
          this.checkedProducts = this.$route.query.checkedProducts
          this.totalCheckedProductsPrice = this.$route.query.totalPrice
          this.userInfo = res.result
          this.orderList = this.userInfo? this.userInfo.userBills.reverse() : []
          this.$store.dispatch('store_checkedAreaName', this.userInfo.userAreaAddress)
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
				if(!this.userId || !this.userPwd){
					this.errorTip = true;
					return;
				}
				axios.post("/users/login",{
					userId:this.userId,
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

      editUserInfoConfirm() {
        this.editUserInfoDialogVisible = true
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
      changeBillState(id, flag) {
        let state = 0
        let completeDate = null
        if (flag === 0) {
          state = 3
        } else if (flag === 1) {
          state = 2
          completeDate = new Date()
        }
        const billData = {
          state: state,
          completeDate: completeDate
        }
        axios({
          method: 'patch',
          url: '/bills/' + id,
          data: billData
        }).then(res => {
          this.init()
          this.billStateDialogVisible=false
        })
      },
      closeRegisterDialog() {
        this.registerDialogVisible = false
      },
      closeEditInfoDialog() {
        this.editUserInfoDialogVisible = false
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
