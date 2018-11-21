<template>
     <div class="common-wrap">
        <setHeader :type="headerMsg"></setHeader>
         <div class="main-wrap chang_password_main_wrap">
            <div class="main">
                <ul class="chang_password_content">
                    <li class="zhanghao">
                        <label>登录账号：</label><input type='text' value="18315318515" disabled="disabled">
                    </li>
                    <li class="old">
                        <label>原始密码：</label><input type='text' value="" v-model="oldPassword" placeholder="请输入原始密码">
                    </li>
                    <li class="new">
                        <label>新设密码：</label><input type='text' value="" v-model='newPassword'  placeholder="请输入新密码">
                    </li>
                    <li class="queren">
                        <label>确认密码：</label><input type='text' value="" v-model="confirmPassword" placeholder="确认新密码">
                    </li>
                </ul>
                <div class="chang_password_save_wrap">
                    <button @click="save">保存</button>
                </div>
            </div>
        </div>
     </div>
</template>

<script>
import setHeader from "../../components/public/header.vue";
import { getSystem , getMessage , getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
    export default {
        name:'revise',
        components:{
           setHeader
        },
         data() {
             return {
                 headerMsg:{
                    type:"common",
                    title:'修改密码',
                    left:'返回'
                },
                firmId:  JSON.parse(getUserData()) ? JSON.parse(getUserData()).firmInfoid : "" ,
                userBasicParam:{
                    source:'firmId'+ this.firmId,
                    tokenId: getTokenId(),
                    sign :this.$md5('firmId'+ this.firmId + "key" + getSecretKey()).toUpperCase()
                },
                oldPassword:null,
                newPassword:null,
                confirmPassword:null,
             }
         },
         methods:{
             changePassword:function(){
                this.$ajax.get(this.HOST, {
                    params:Object.assign({
                        method:'user_update_pwd',
                        oldPassword:this.$md5(this.oldPassword),
                        newPassword:this.$md5(this.newPassword),
                        confirmPassword:this.$md5(this.confirmPassword),
                    },this.userBasicParam)
                }).then(resp => {
                   if(resp.data.statusCode ==  "100000"){
                        this.$toast({
                          message: '修改成功',
                          center: true,
                          duration: 2000,
                      });
                   }
                }).catch(err => {
                });
             },
            save:function(){
                if(this.oldPassword == null){
                    this.$message({
                        message: '请输入旧密码',
                        center: true,
                    });
                }else if(this.newPassword ==  null){
                     this.$message({
                        message: '请输新密码',
                        center: true,
                    });
                }else if(this.confirmPassword ==  null){
                    this.$message({
                        message: '请再次输入密码',
                        center: true,
                    });
                }else if(this.newPassword != this.confirmPassword){
                     this.$message({
                        message: '密码不一致，请重新输入',
                        center: true,
                    });
                }else{
                    this.changePassword();
                     this.$router.push({path:"/my"})
                }
            }
         }
    }
</script>

<style scoped>
.chang_password_main_wrap {
    height: 1244px;
    margin-top: 107px;
}
.chang_password_content {
    width: 100%;
    background: #fff;

}
.chang_password_content li {
    width: 728px;
    height: 80px;
    margin-left: 22px;
    font-size: 30px;
    line-height: 78px;
}
.chang_password_content li input {
    width: 570px;
    height: 75px;
    line-height: 30px;
    color: #000;
    background: #FFF;
}
.chang_password_save_wrap {
    width: 100%;
    height: 90px;
    margin-top: 20px;
    text-align: center;
}
.chang_password_save_wrap button {
    width: 630px;
    height: 90px;
    border-radius: 50px;
    background: #f47c30;
    font-size: 35px;
    color: #fff;
}
</style>
