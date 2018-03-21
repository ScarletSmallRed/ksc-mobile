<template>
  <div>
    <el-dialog
      :visible.sync="visible"
      width="80%"
      title="登录"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      center>
      <el-form>
        <el-form-item label="账户/手机" label-width="80px">
          <input v-model="userId">
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
          <input type="password" v-model="userPwd">
        </el-form-item>
        <div >
          <span v-show="errorTip" style="color: red;">用户名或者密码错误</span>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer" style="padding: 0">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
      props: ['visible'],
      name: "login-dialog",
      data() {
        return {
          errorTip: false,
          userId: '',
          userPwd: '',
        }
      },
      methods: {
        closeDialog() {
          this.$emit('closeDialog')
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
              alert('登录成功')
              axios({
                method: 'get',
                url: '/users/infoList'
              }).then(res => {
                this.$store.dispatch('store_checkedAreaName', res.data.result.userAreaAddress)
              })
              this.$emit('closeDialog')
            }else{
              this.errorTip = true;
            }
          });
        },
      }
    }
</script>

<style scoped>

</style>
