<template>
 <div class="search">
     <div class="header-wrap clearfloat">
			<div class="searchCallback sprite arrow_left">
				
			</div>
			<div class="search">
				<input type="text" id="search" class="sprite icon_search_grey" placeholder="请输入商品名称" v-model="searchVal"/>
				<div class="delete sprite delete_b" @click="del()"></div>
			</div>
		</div>
        <div class="main-wrap">
			<div class="search_star" v-if="isHot">
				<p class="search_tit">热门搜索</p>
				<ul class="search_item">
					<li v-for="(item,index) in searchList" :key="index">
                        {{item.name}}
                    </li>
				</ul>
			</div>
			<div class="search_none hidden">
				<dl>
					<dt>
						<img src="../../assets/img/pic_logo@2x.png"/>
					</dt>
					<dd>
						<p>非常抱歉，暂时没有您需要的水果！</p>
						<p>400-0169-682</p>
					</dd>
				</dl>
			</div>
            <div class="search_resurt">
				<div class="search_goods" v-for="(item,index) in goodsList" :key="index">
					<dl>
						<dt>
							<img :src="item.img"/>
						</dt>
						<dd>
							<h3 class="moreGoods_goods_name">{{item.tit}}</h3>
							<p class="moreGoods_goods_text">{{item.det}}</p>
							<p class="moreGoods_goods_price">
								<span class="fontColor">1212</span>元/箱 &nbsp; &nbsp;约<span>121</span>元/斤
							</p>
							<div class="moreGoods_goods_icon">
											
							</div>
						</dd>
					</dl>
				</div>
			</div>
        </div>
 </div>
</template>

<script>
// 节流函数
const delay = (function() {
    let timer = 0;
    return function(func, delay) {
      clearTimeout(timer);
      timer = setTimeout(func, delay);
    };
})();
export default {
 data() {
 return {
     isHot: false,
     searchVal:'',
     searchList:[
         {name:'千禧'},{name:'千禧'},{name:'千禧'},
         {name:'千禧'},{name:'千禧'},{name:'千禧'},
         {name:'千禧'},{name:'千禧'},{name:'千禧'},
         {name:'千禧'},{name:'千禧'},{name:'千禧'},
     ],
     goodsList:[
         {
             img:'http://img.guoss.cn/gss_img_root/img_goods/14826/20181025144850.jpg',
             tit:'橙子',
             det:'口感酸甜',
         },
         {
             img:'http://img.guoss.cn/gss_img_root/img_goods/14424/20181019130326.jpg',
             tit:'苹果',
             det:'口感酸甜',
         },
         {
             img:'http://img.guoss.cn/gss_img_root/img_goods/14364/20181016151331.jpg',
             tit:'香蕉',
             det:'口感酸甜',
         },
     ]
 }
 },
 watch:{
	 searchVal() {
		 delay(() => {
			 this.search();
		 },300)
	 }
 },
 methods:{
	 search() {
		 let that = this;
		//  api.get(url,params{words:that.searchVal}).then(res=>{
        //     that.results = res.data.data;
        // })
	 },

    //  clearTimer () {
    //   if (this.timer) {
    //     clearTimeout(this.timer)
    //   }
    // },
    // searchEvent (event) {
    //   this.clearTimer()
    //   console.log(event.timeStamp)
    //   this.timer = setTimeout(() => {
    //     console.log(event.timeStamp)
    //     this.$http.post('/api/vehicle').then(res => {
    //       console.log(res.data.data)
    //       this.changeColor(res.data.data)
    //     })
    //   }, 2000)
    // },
     searchHot(){
            if(this.searchVal.length == ''){
                this.isHot = false
            }else{
                this.isHot = true
            }
        },
     del(){
        var $ele = $('#search');
        $ele.val('').attr("placeholder","请输入商品名称").focus();
        // this.isHot = true
        },
        
 },
 mounted() {
     this.searchHot()
 }
}
</script>

<style scoped>
.moreGoods_box_list .moreGoods_goods_name {
	font-size: 30px;
	width: 400px;
	color: #000;
	height: 34px;
	line-height: 34px;
	font-weight: 500;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}
.moreGoods_box_list .moreGoods_goods_text {
	height: 64px;
	font-size: 24px;
	line-height: 32px;
	padding-right: 24px;
	overflow: hidden
}

.moreGoods_box_list .moreGoods_goods_price {
	height: 38px;
	line-height: 38px;
	font-size: 26px
}
.moreGoods_box_list .fontColor {
	color: #eb5c2b;
	font-size: 34px;
	height: 60px;
}
.main-wrap {
	max-width: 750px;
	width: 100%;
	margin: 0 auto;
	background: #ebeaea;
    margin-top: 87px;
}
.delete_b {
	background-position: -888px 0;
}
.icon_search_grey {
	background-position: -1084px -78px;
}
.sprite {
	background-image: url(../../assets/img/sprite.png);
	background-repeat: no-repeat;
}
.search {
	width: 666px;
	height: 76px;
	float: left;
	padding-top: 11px;
}

.search input {
	width: 628px;
	height: 64px;
	background-color: #E5E5E5;
	border-radius: 20px;
	color: #999999;
	font-size: 28px;
	line-height: 64px;
	text-indent: 56px;
}

.delete {
	width: 64px;
	height: 64px;
	position: relative;
	right: -564px;
	top: -64px;
	border: none;
}

.search_star {
	width: 100%;
	height: 100%;
	padding: 30px 44px;
	background: #ebeaea;
}

.search_tit {
	font-size: 28px;
	height: 43px;
}

.search_item li {
	float: left;
	width: 200px;
	height: 64px;
	background: #FFFFFF;
	color: #666666;
	font-size: 30px;
	text-align: center;
	border-radius: 32px;
	line-height: 64px;
    margin: 15px 0 15px 30px;
	display: inline;
}

.search_item li:nth-child(3n+1) {
	margin-left: 0;
}

.search_none {
	width: 100%;
	height: 100%;
	background: #ebeaea;
}

.search_none dl dt {
	width: 100%;
	height: 450px;
	padding-top: 148px;
	text-align: center;
}

.search_none dl dd {
	line-height: 38px;
	font-size: 30px;
	text-align: center;
}

.search_none {
	width: 100%;
	height: 100%;
	overflow: auto;
}

.search_goods {
	padding-top: 20px;
}

.search_goods dl {
	width: 100%;
	height: 257px;
	background: #FFF;
	border-bottom: 1px solid #e7e7e7;
	padding-top: 2px;
}

.search_goods dl dt,
.search_goods dl dd {
	float: left;
}

.search_goods dl dt {
	width: 276px;
	height: 256px;
}

.search_goods dl dt img {
	width: 250px;
	height: 250px;
}

/* .search_goods dl dd {
	width: 474px;
} */

.search_goods .moreGoods_goods_name {
	font-size: 30px;
	color: #000000;
	height: 56px;
	line-height: 56px;
	font-weight: 500;
}

.search_goods .moreGoods_goods_text {
	height: 100px;
	font-size: 24px;
	line-height: 36px;
	color: #999999;
	padding-right: 70px;
}

.search_goods .moreGoods_goods_price {
	height: 50px;
	line-height: 50px;
	font-size: 24px;
	color: #999999;
}

.search_goods .fontColor {
	color: #eb5c2b;
	font-size: 28px;
}

.search_goods .moreGoods_goods_icon {
	height: 50px;
}
.searchCallback {
	width: 84px;
	height: 87px;
	float: left;
}
.header-wrap {
	max-width: 750px;
	width: 100%;
	margin: 0 auto;
	height: 87px;
	border-bottom: 1px solid #d8d8d8;
	position: fixed;
	background: #f6f6f6;
	z-index: 3;
	top: 0;
}
.arrow_left {
	background-position: 21px -210px;
}
</style>
