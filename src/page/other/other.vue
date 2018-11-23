<template>
  <div class="details common-wrap">
    <dHeader :type = headerMsg ></dHeader>
		<div class="main-wrap">
			<div class="main">
				<iframe class="win" name="win" src=""  width="100%"  v-if='isShow'></iframe>
				<img class ="photo" src="" v-else/>
			</div>
		</div>
  </div>
</template>

<script>
import dHeader from "../../components/public/header.vue";
   export default {
      name:'other',
      components:{
        dHeader
      },
      data() {
        return {
          headerMsg:{
            type:"common",
            title:'',
            left:'返回'
          },
          isShow:true
        }
      },
      mounted(){
        let bodyHeight = document.body.offsetHeight;
        let win = document.getElementsByClassName("win")[0];
        let photo = document.getElementsByClassName("photo")[0];
        win.height = bodyHeight +'px';
        this.headerMsg.title = this.$route.query.title;

        let reg = /^(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
        let regImg = /.*\.(gif|jpg|jpeg|png|GIF|JPG|PNG)/g;

        let linkUrl =this.$route.query.typeCode;
          linkUrl = linkUrl.replace(/^\s+(.*?)\s+$/, "");
        if(!reg.test(linkUrl)){
          linkUrl = "http://"+linkUrl;
        }
        if (regImg.test(linkUrl)) {
          this.isShow = false
          photo.src = linkUrl
        }else{
          win.src = linkUrl;
        }
      },
   }
</script>

<style scoped>
  html,body{height: 100%;width: 100%;background: #E5E5E5;}
  .main-wrap{width: 100%;height: 100%;background: #ebeaea;margin-top: 87px;}
  .main{width: 100%;height: 100%;text-align: center;}
  .moreDoogs_header_left{text-indent: 55px;z-index: 100}
  .arrow_left_orange{background-position: 21px -352px;}
  .sprite{background-image: url(../../assets/img/sprite.png);background-repeat: no-repeat}
  iframe{border: none;width: 100%;text-align: center;}
  .main img{width: 100%;}
</style>
