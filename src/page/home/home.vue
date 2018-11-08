<template>
   <div class="home">
        <app-header type="home"></app-header>
        <app-banner1 class="topHeight"></app-banner1>
         <app-banner2 ></app-banner2>
        <homeGoods v-for="(item,index) in mainActivityList" :key="index" :mainActivityList = 'item'></homeGoods>
        <!-- <homeGoods :mainActivityList = 'mainActivityList'></homeGoods> -->
        <app-footer></app-footer>
   </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import appFooter from "../../components/public/footer.vue";
import appBanner1 from "../../page/banner/banner1.vue";
import appBanner2 from "../../page/banner/banner2.vue";


import homeGoods from "./homeGoods.vue";
export default {
   name: 'home',
   data() {
       return {
           mainActivityList:null,
           websiteNode: "3301",
              
       }
    },
    components: {
        appHeader,
        appFooter,
        appBanner1,
        appBanner2,
        alert,
        homeGoods
    },
    mounted(){
      this.get_main_page();
      this.autoLogin();
    },
    methods:{
        get_main_page:function () {
            this.$ajax.get(this.HOST, {
                params:{
                    method: "main_page_show_three",
                    websiteNode:this.websiteNode
                }
            }).then(resp => {
                // return JSON.parse(JSON.stringify(result));
                // return JSON.stringify(data.data);
                  this.mainActivityList = resp.data.data.mainActivityList;
           
                // console.log(resp.data);
            }).catch(err => {
                // console.log(JSON.parse(data).data.mainActivityList);
                  console.log('请求失败：'+ err.statusCode);
                
            });
        },
        autoLogin:function(){
                this.$ajax.get(this.HOST,{
                    params:{
                        method:'user_login',
				        tokenId:''
                    }
                }).then(resp =>{

                }).catch(err =>{
                      console.log('请求失败：'+ err.statusCode);   
                });   

                


        }
    }
}
</script>

<style scoped >
    .topHeight{
        margin-top:87px; 
    }

</style>
