<template>
	<div>
    <el-dialog
      :visible.sync="visible"
      width="80%"
      title="修改个人信息"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      center>

      <el-form>
        <el-form-item label="名字" label-width="50px">
          <el-input v-model="userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="50px" style="text-align: left">
          <el-input v-model="userAddress" auto-complete="off" type="textarea" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="旧密码" label-width="70px">
          <el-input type="password" v-model="userPwd1" auto-complete="off"></el-input>
        </el-form-item>
        <div >
          <span v-show="errorTip" style="color: red;">旧密码错误</span>
        </div>
        <el-form-item label="新密码" label-width="70px">
          <el-input type="password" v-model="newUserPwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" label-width="70px">
          <el-input type="password" v-model="repeatedUserPwd" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>


      <div >
        <span v-show="errorTip1" style="color: red;">两次密码不一致</span>
      </div>
      <div >
        <span v-show="errorTip2" style="color: red;">不能有字段为空</span>
      </div>

      <div slot="footer" class="dialog-footer" style="padding: 0">
        <el-button @click="closedialog">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
	export default {
    props: ['visible', 'userName', 'userAddress', 'userPwd'],
    name: "edit-user-info-dialog",
    data() {
      return {
        newUserPwd: '',
        repeatedUserPwd: '',
        userPwd1: '',
        errorTip: false,
        errorTip1: false,
        errorTip2: false
      }
    },
    methods: {
      closedialog() {
        this.$emit('closeDialog')
      },
      editUserInfo() {
        if (this.userPwd !== this.userPwd1) {
          this.errorTip = true
          return
        }

        if (this.newUserPwd !== this.repeatedUserPwd) {
          this.errorTip1 = true
          return
        }

        if (!this.userName || !this.userAddress || !this.userPwd1 || !this.newUserPwd || !this.repeatedUserPwd) {
          this.errorTip2 = false
          return
        }

        axios.post('/users/editUserInfo', {
          userName: this.userName,
          userPwd: this.newUserPwd,
          userAddress: this.userAddress
        }).then(res => {
          if (res.data.status === '0') {
            this.$emit('closeDialog')
          }
        })
      }
    }
	}
</script>

<style scoped>

</style>
