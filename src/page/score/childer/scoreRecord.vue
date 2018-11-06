<template>
    <div class="scoreRecord">
        <div class="header-wrap score_table">
			<div class="header_left header_back sprite arrow_left_orange" @click="goBack"></div>
			<div class="index_tit header_tit" v-text="dataPage[type].tit"></div>
			<div class="header_right login_top_right" id="">筛选</div>
			<input class="header_right login_top_right" id="date" type="text" name=""  value=""  readonly="readonly" style="-webkit-user-select:none;-webkit-touch-callout:none;" />
			<input type="hidden" name="" id="value_date" value="" />
		</div>
        <div class="main-wrap">
			<div class="main score_table">
				<div class="score_table_box" v-if="dataList.length">
					<s-table :titleList='dataPage[type].subtitle' :tableDate='dataList'></s-table>
				</div>
				<p class="lodemore" v-text="!dataList.length ? '暂无数据' : (isLast ? '没有更多数据了' : '点击加载更多')" @click="getMore()"></p>
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
            dataList:[],
            dataPage:[{
                tit:"果币明细",
                port:"score_details",
                subtitle:[{title:"途径"},{title:"果币"},{title:"操作时间"}]
            },{
                tit:"兑换记录",
                port:"score_use_rcd",
                subtitle:[{title:"兑换物品"},{title:"消费果币"},{title:"兑换时间"}]
            }],
            pageSize:'10',
            pageNo:'1',
            time:null,
            incDnc:null,
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
    mounted(){
        this.get_record_list();
    },
    methods:{
        get_record_list:function () {
            this.$ajax.get(this.HOST, {
                params:{
                    method: this.dataPage[this.type].port,
                    firmId: "132",
                    pageSize:this.pageSize,
                    pageNo:this.pageNo,
                    scoreUseRcdTime:this.time,
                    scoreDetailsTime:this.time,
                    incDnc:this.incDnc
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
                       this.dataList = data.data.objects;
                   } else {
                       this.dataList = this.dataList.concat(data.data.objects);
                   }
                } else {
                    console.log(data.statusStr);
                }
            });
        },
        goBack : function(){
            if (window.history.length <= 1) {
                    this.$router.push({path:'/my'})   
                    return false;
            } else {
                this.$router.go(-1)
            }
        },
        getMore:function () {
            if (!this.isLast) {
                this.pageNo = this.pageNo+1 ;
                this.get_record_list();
            } 
        }
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
