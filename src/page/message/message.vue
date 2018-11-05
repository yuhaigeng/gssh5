<template>
   <div class="message">
        <app-header :type="headerMsg"></app-header>
        <div v-cloak class="main-wrap">
          <div class="main message">
            <div class="message_box">
              <div class="message_item" v-for="(item,index) in objects" :key="index">
                <div class="message_item_top clearfloat">
                  <div class="message_tit" v-text="item.msgTitle"></div>
                  <div class="message_time" v-text="item.createTime"></div>
                </div>
                <div class="message_count" v-text="item.messageContent"></div>
              </div>
            </div>
            <p class="lodemore" v-text="messages.isLast? '没有更多数据了' :'点击加载更多' " @click="load_more"></p>
            
          </div>
			</div>
        <app-footer></app-footer>
   </div>
</template>

<script>
var pub ={
     pageSize: 10,
     pageNo: 1,
}
import appHeader from "../../components/public/header.vue";
import appFooter from "../../components/public/footer.vue";
export default {
   name: 'message',
   components: {
        appHeader,
        appFooter
   },
   data() {
       return {
         headerMsg:{
            type:"common",
            title:'消息',
            left:'返回'
         },
         messages:[],
         objects:null
       }
   },
  mounted(){
      this.get_meassage();
  },
  methods:{
       get_meassage:function () {
            this.$ajax.get(this.HOST, {
                params:{
                    method: 'mipush_msgrcd_show',
                    firmId: 132,
                    pageSize: pub.pageSize,
                    pageNo: pub.pageNo,
                }
            }).then(resp => {
                if(resp.data.data.pageNo == 1){
                     this.messages = resp.data.data;
                     this.objects = resp.data.data.objects
                }else{
                    this.messages = resp.data.data;
                    this.objects =  this.objects.concat(resp.data.data.objects);
                    console.log( this.messages.isLast);
                    //  console.log(this.objects);
                }
            }).catch(err => {
                // console.log(JSON.parse(data).data.mainActivityList);
                  console.log('请求失败：'+ err.statusCode);
                
            });
        },
        load_more:function(){
            if (!this.messages.isLast) {
							pub.pageNo ++ ;
						this.get_meassage();
						}
        }

  }
}
</script>

<style scoped >
.main-wrap {
  max-width: 750px;
  width: 100%;
  margin-top: 87px;
  background: #ebeaea;
}
.main {
    width: 100%;
    height: auto;
}
.message_box {
    padding: 20px;
}
.message_item {
    width: 100%;
    padding: 12px 32px;
    background: #FFF;
    margin-bottom: 20px;
    border-radius: 8px;
}
.message_item_top {
    width: 100%;
    line-height: 48px;
}
.message_tit {
    float: left;
    font-size: 32px;
    color: #000;
}
.message_time {
    float: right;
    font-size: 24px;
}
.message_count {
    font-size: 26px;
    line-height: 40px;
}
.lodemore {
    width: 100%;
    height: 100px;
    text-align: center;
    line-height: 80px;
    font-size: 30px;
    cursor: pointer;
    background: #FFF;
    margin-bottom: 10px;
}

</style>
