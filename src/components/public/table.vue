<template>
    <div class="table_box">
        <ul class="table_tit table_list">
            <li class="table_tit_item" v-for="(item,index) in titleList" :key="index" v-text="item.title"></li>
        </ul>
        <ul class="table_list" v-for="(item,index) in tableDate" :key="index">
            <li v-text="item.scoreFrom ? item.scoreFrom : item.goodsName"></li>
            <li v-text="((item.incDnc == undefined) ? item.score : (item.incDnc == 1 ? '+'+item.score : '-'+item.score))"></li>
            <li v-text="item.createTime ? item.createTime : item.useTime"></li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ["titleList","tableDate"],
    data() {
        return {
            logined:true,
        }
    },

}
</script>
<style scoped>



.table_box {
    text-align: center;
    color: #000;
    font-size: 26px
}
.table_tit {
    font-size: 32px
}

.table_list {
    height: 88px;
    border-bottom: 1px solid #c8c7cc;
    line-height: 88px;
    display: -webkit-box;
    display: flex;
    display: -ms-flexbox;
    display: -webkit-flex;
    -webkit-box-orient: horizontal;
    -ms-flex-flow: row wrap;
    flex-flow: row wrap
}

.table_list:nth-child(2n-1) {
    background: #d0d0d0
}

.table_list:nth-child(2n) {
    background: #FFF
}

.table_list li:nth-child(3n+1) {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1
}

.table_list li:nth-child(3n+2) {
    width: 180px;
    border-left: 1px solid #c8c7cc;
    border-right: 1px solid #c8c7cc;
    overflow: hidden
}

.table_list li:nth-child(3n) {
    width: 280px
}
</style>

