<template>
    <div class="score_goods_list"> 
        <app-header :type ="headerMsg"></app-header>
        <div class="score_goods_main_wrap">
            <div class="main">
                <ul class="product clearfloat" v-if="goodsList.length">
                    <li v-for="(item,index) in goodsList" :key="index" @click="goGoods(index)">
                        <!-- <router-link :to="{path: '/score/goodsList/good',query:{id:item.id}}" tag="dl"> -->
                            <dl>
                                <dt>
                                    <img :src="item.goodsLogo"/>
                                </dt>
                                <dd>
                                    <p class="name" v-text="item.goodsName"></p>
                                    <p class="describe" v-text="item.sizeDesc"></p>
                                    <p class="info">
                                        <span v-text="item.score"></span>
                                        <span class="font22" v-text="'币'"></span>
                                        <del class="original_price" v-text="'￥'+item.gssPrice"></del>
                                    </p>
                                </dd>
                            </dl>
                        <!-- </router-link> -->
                    </li>
                </ul>
                <p class="lodemore" v-text="!goodsList.length ? '暂无商品' : (isLast ? '没有更多数据了' : '点击加载更多')" @click="getMore()"></p>
            </div>
        </div>
        <transition name="fade">
            <section class="license_container" v-if="showlicenseImg" @click="showlicenseImg = false">
                <img :src="imgBaseUrl + licenseImg">
            </section>
        </transition>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import appHeader from "../../../components/public/header.vue";
export default {
    name:'goodsList',
    data() {
        return {
            headerMsg:{
                type:"common",
                title:'果币兑换商品',
                left:'返回'
            },
            licenseImg: null,
            showlicenseImg: false,
            imgBaseUrl:'',
            isLast:false,
            goodsList:[],
            scoreGoods_desc:{}//商品详情注意事项
        }
    },
    components: {
        appHeader,
    },
    mounted(){
        console.log('mounted')
        this.get_score_goodsList();
        this.get_gss_desc();
    },
    methods:{
        get_score_goodsList:function(){
            this.$ajax.get(this.HOST, {
                params:{
                    method: "score_goods_show",
                    websiteNode: "3301",
                    pageSize:'10',
				    pageNo:'1'
                }
            }).then(result => {
                // return JSON.parse(JSON.stringify(result));
                return result.data;

                // console.log(data);
            }).then(data => {
                console.log(data);
                if (data.statusCode == 100000) {
                    
                    this.isLast = data.data.isLast;
                    if (data.data.pageNo == 1) {
                        this.goodsList = data.data.objects;
                    } else {
                        this.goodsList = this.goodsList.concat(data.data.objects);
                    }
                } else {
                    console.log(data.statusStr)
                }
            });
        },
        get_gss_desc:function () {
            this.$ajax.get(this.HOST, {
                params:{
                    method: "gss_desc",
                    websiteNode: "3301",
                    code:'3301#JFSP-DESC',
                }
            }).then(result => {
                // return JSON.parse(JSON.stringify(result));
                return result.data;

                // console.log(data);
            }).then(data => {
                console.log(data);
                if (data.statusCode == 100000) {
                    this.scoreGoods_desc = data.data;
                    localStorage.setItem("scoreGoods_desc",JSON.stringify(data.data))
                } else {
                    console.log(data.statusStr)
                }
            });
        },
        goGoods:function (index) {
            const id = this.goodsList[index].id;
            localStorage.setItem("scoreGoods",JSON.stringify(this.goodsList[index]))
            this.$router.push({path:'/score/goodsList/good',query:{id:id}})
        },
        getMore:function () {
            if (!this.isLast) {
                this.pageNo = this.pageNo+1 ;
                this.get_score_goodsList();
            } 
        }
    }
}
</script>

<style scoped>
.score_goods_list{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 87px;
    background-color: #ebebeb;
    z-index: 18;
}
.score_goods_main_wrap {
    width: 100%;
    background: #FFF;
    padding-top: 20px
}

.score_goods_main_wrap .product {
    margin-top: 20px;
    width: 100%;
    padding: 0 20px
}

.product li {
    float: left;
    width: 50%;
    border-bottom: 2px solid #c8c7cc
}

.product li:nth-child(2n) {
    padding-left: 10px;
    border-left: 1px solid #C8C7CC
}

.product li:nth-child(2n+1) {
    padding-right: 10px;
    border-right: 1px solid #C8C7CC
}

.product dl dt {
    background: url(../../../..//static/img/pic_logo@2x.png) center no-repeat;
    position: relative
}

.product dl dt .seal {
    position: absolute;
    top: 0;
    left: 0;
    width: 178px;
    height: 140px
}

.product dl dt img {
    width: 344px;
    height: 350px
}

.product .name {
    padding: 18px 0;
    font-size: 32px;
    color: #000;
    height: 96px;
    overflow: hidden;
    line-height: 60px
}

.product .describe {
    font-size: 22px;
    color: #6f6f6f;
    height: 44px
}

.product .info {
    height: 76px;
    padding: 12px 0;
    font-size: 32px;
    position: relative;
    color: #F76A10
}

.original_price {
    position: absolute;
    right: 6px;
    font-size: 28px;
    color: #6F6F6F
}

.license_container{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 101;
    
}
.license_container img{
    width: 100%;
    position: absolute;
	top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-active {
    opacity: 0;
}
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
</style>
