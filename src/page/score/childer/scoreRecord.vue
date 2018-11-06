<template>
    <div class="scoreRecord">
        <div class="header-wrap score_table">
			<div class="header_left header_back sprite arrow_left_orange" @click="goBack"></div>
			<div class="index_tit header_tit" v-text="(type == '0' ? '果币明细' : '兑换记录')"></div>
			<div class="header_right login_top_right" id="">筛选</div>
			<input class="header_right login_top_right" id="date" type="text" name=""  value=""  readonly="readonly" style="-webkit-user-select:none;-webkit-touch-callout:none;" />
			<input type="hidden" name="" id="value_date" value="" />
		</div>
        <div class="main-wrap">
			<div class="main score_table">
				<div class="score_table_box">
					<s-table :titleList='titleList' :tableDate='dataList'></s-table>
				</div>
				<p class="lodemore" v-text="!dataList.length ? '暂无数据' : (isLast ? '没有更多数据了' : '点击加载更多')"></p>
			</div>
		</div>
		<div class="order_refund">		
			<div class="refund_bg refund_bg_load"></div>
			<div class="loading_box">
				<div id="gavinPlay"></div>
			</div>
		</div>
    </div>
</template>
<script>
import sTable from "../../../components/public/table.vue";
export default {
    name:'scoreRecord',
    data() {
        return {
            type:'',
            isLast:false,
            dataList:[{
                    createTime:"2018-10-18 16:50:40",
                    id:"220013",
                    incDnc:2,
                    note:"抽奖消耗果币",
                    orderCode:"17240",
                    score:20,
                    scoreFrom:"抽奖消耗",
                    shopEntity:132,
                    shopEntityName:"",
                    websiteName:"",
                    websiteNode:"3301"
                },
                {
                    createTime:"2018-10-18 16:50:40",
                    id:"220013",
                    incDnc:1,
                    note:"抽奖消耗果币",
                    orderCode:"17240",
                    score:20,
                    scoreFrom:"抽奖消耗",
                    shopEntity:132,
                    shopEntityName:"",
                    websiteName:"",
                    websiteNode:"3301"
                },],
            titleList:[{
                title:"途径",
            },{
                title:"果币",
            },{
                title:"操作时间"
            }],
        }
    },
    async beforeMount(){
		if (!this.$route.query.type) {
			this.type = '0'
		}else{
			this.type = this.$route.query.type
		}
    },
    components: {
        sTable,
    },
    methods:{
        goBack : function(){
            if (window.history.length <= 1) {
                    this.$router.push({path:'/my'})   
                    return false;
            } else {
                this.$router.go(-1)
            }
        },
    }
}
</script>
<style scoped>
@import "../../../common/sprite.css";
.scoreRecord{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 87px;
    background-color: #ebebeb;
    z-index: 18;
}
.login_top_right {
    padding-right: 20px
}
.address_top_phone,.login_top_right {
    text-align: right
}
#date {
    opacity: 0;
    filter: alpha(opacity=0);
    color: transparent;
}

</style>
