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
    <div style="margin-bottom: 40px">#################</div>

    <el-row :gutter="20" style="margin-bottom: 10px">
      <el-col :span="12">
        <div style="padding-left: 10px; color: #9d9696;">地址列表</div>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <i class="el-icon-circle-plus" style="font-size: 23px; color: #409EFF; padding-right: 20px" @click="editAddrDialogVisible=true"></i>
      </el-col>
    </el-row>





    <el-card v-for="(item, index) in addressListFilter"
             :key="item.name"
             style="width: 99%; margin-bottom: 10px" :class="{'address-check': checkIndex === index}">
      <div slot="header" class="clearfix">
        <span style="font-weight: bold">
          {{item.userName}} <a style="margin-left: 12px; color: #409EFF" @click="editAddressConfirm(item)" type="text"><i class="fa fa-edit"></i></a>
        </span>
        <el-button style="float: right; padding: 3px 0; font-size: 20px; border: none;color: #d9d9d9" @click="checkIndex=index" plain>
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
          <i class="fa fa-trash" style="font-size: 20px; position: absolute; right: 0px; bottom: 0px"></i>
        </el-button>

      </div>
    </el-card>
    <div style="color: #409EFF; text-align: center" @click="handleLimitChange">
      ------------------------ <i v-if="this.limit <= 2" class="fa fa-chevron-circle-down"></i><i v-else class="fa fa-chevron-circle-up"></i> ------------------------
    </div>




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
	export default {
		name: "info",
		data() {
			return {
				userName:'user1',
				userPwd:'123456',
				errorTip: false,
				loginModalFlag:false,


        editAddrDialogVisible: false,
				dialogFormVisible: false,
        delAddrDialogVisible: false,


				formLabelWidth: '50px',
        nickName: '',
        addressList:[],
        limit: 2,
        checkIndex:0,



        addressId: '',
        addrString: '',
        addrUserName: '',
        addrTel: '',
        addrPost: ''
			}
		},
    mounted() {
		  this.checkLogin()
      this.init()
    },
    computed:{
      addressListFilter(){
        return this.addressList.slice(0,this.limit);
      }
    },
		methods: {
      init(){
        axios.get("/users/addressList").then((response)=>{
          let res = response.data;
          this.addressList = res.result;
        });
      },
      handleLimitChange(){
        if(this.limit === 2){
          this.limit = this.addressList.length;
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

      editAddress() {

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
          }
        })
      },

      editAddressConfirm(item) {
        this.editAddrDialogVisible = true

        this.addrString = item.streetName
        this.addrUserName = item.userName
        this.addrTel = item.tel
        this.addrPost = item.postCode
        this.addressId = item._id
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
</style>
