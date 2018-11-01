<template>
     <div>
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
                        <label>确认密码：</label><input type='text' value="" v-model="newPassWord" placeholder="确认新密码">
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
    export default {
        name:'revise',
        components:{
           setHeader 
        },
         data() {
             return {
                 headerMsg:{
                    type:"common2",
                    title:'修改密码',
                    left:'返回'
                },
                oldPassword:null,
                newPassword:null,
                newPassWord:null,
             }
         },
         methods:{
            save:function(){
                console.log(this.oldPassword)
                 console.log(this.newPassword)
                  console.log(this.newPassWord)

                if(this.oldPassword == ""){
                    alert(1)
                }else if(this.newPassword == ""){
                    alert(2)
                }else if(this.newPassWord == ""){
                    alert(3)
                }else if(this.newPassword != this.newPassWord){
                     alert(4)
                }else{
                  
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
