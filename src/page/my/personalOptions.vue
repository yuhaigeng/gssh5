<template>
     	<div class="cont cont2">
            <div class="cont_tit" v-text="title"></div>
            <div class="cont_order_box clearfloat">
                <router-link :to="item.linkUrl"   tag="dl" v-for = "(item,index) in orderList" :key="index">
                    <dt><img :src="item.icon"/></dt>
                    <dd v-text="item.name"></dd>
                </router-link>
            </div>
		</div>
</template>

<script>
    export default {
        name:'personalOptions',
        props:['orderList', 'title'],
         data() {
             return {
               
             }
         },
    }
</script>

<style scoped>
.cont2{
    padding: 32px 0;
    width: 100%;
    background: #fff;
    margin-bottom: 22px;
}
.cont_tit {
    font-size: 32px;
    line-height: 48px;
    color: #333;
    text-align: center;
}
.cont2 dl, .cont3 dl, .cont4 dl {
    float: left;
    width: 25%;
    text-align: center;
}
.cont2 dl dt, .cont3 dl dt, .cont4 dl dt {
    padding-top: 28px;
    padding-bottom: 4px;
}
.cont2 dl dd, .cont3 dl dd, .cont4 dl dd {
    font-size: 24px;
    color: #333;
    line-height: 40px;
}
</style>
