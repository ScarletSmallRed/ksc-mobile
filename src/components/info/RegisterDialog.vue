<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      width="80%"
      title="注册"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      center>
      <el-form>
        <el-form-item label="用户名" label-width="100px">
          <input v-model="userName">
        </el-form-item>
        <el-form-item label="手机号(ID)" label-width="100px">
          <input v-model="userPhone">
        </el-form-item>
        <el-form-item label="区域" label-width="100px">
          <select v-model="checkedAreaName">
            <option v-for="item in areaNames" :key="item" :value="item">{{item}}</option>
          </select>
        </el-form-item>
        <el-form-item label="地址" label-width="100px">
          <input v-model="userAddress">
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <input type="password" v-model="userPwd">
        </el-form-item>
        <el-form-item label="确认密码" label-width="100px">
          <input type="password" v-model="userRepeatedPwd">
        </el-form-item>
        <div>
          <span v-show="errorTip" style="color: red;">不能有字段为空</span>
        </div>
        <div>
          <span v-show="errorTip1" style="color: red;">密码不一致</span>
        </div>
        <div>
          <span v-show="errorTipForPhone" style="color: red;">手机号码格式不正确</span>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer" style="padding: 0">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="registerUser">注册</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
	export default {
    props: ['visible'],
    name: "register-dialog",
    data() {
      return {
        userName: '',
        userPhone: '',
        userRepeatedPwd: '',
        userPwd: '',
        errorTip: false,
        errorTip1: false,
        errorTipForPhone: false,
        checkedAreaName: '',
        areaNames: [],
        userAddress: ''

      }
    },
    mounted() {
      this.getAraeInfo()
    },
    methods: {
      closeDialog() {
        this.$emit('closeDialog')
      },
      registerUser() {
        if(!this.userName || !this.userPwd || !this.userRepeatedPwd || !this.userPhone || !this.checkedAreaName){
          this.errorTip = true;
          return;
        }
        if (this.userPwd !== this.userRepeatedPwd) {
          this.errorTip1 = true
          return
        }

        var reg = /^\d{8}$/;
        if (!reg.test(this.userPhone)) {
          console.log(reg.test(this.userPhone))
          this.errorTipForPhone = true
          return
        }

        const userRegistered = {
          userName: this.userName,
          userPwd: this.userPwd,
          userId: this.userPhone,
          userAreaAddress: this.checkedAreaName,
          userAddress: this.userAddress
        }
        axios({
          method: 'post',
          url: '/users/register',
          data: userRegistered
        }).then(res => {
          let response = res.data
          if (response.status === '0') {
            this.closeDialog()
          } else if (response.status === '403') {
            alert('电话号码已经被注册')
          }
        })
      },
      getAraeInfo() {
        axios.get('/areas').then(res => {
          this.areaInfo = res.data
          this.areaNames = this.areaInfo.map(item => {
            return item.areaName
          })

        })

      },
    }
	}
</script>

<style scoped>

</style>
