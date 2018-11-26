<template>
    <div class="scoreRecord">
        <app-header :type="headerMsg">
            <div class="header_right login_top_right" slot="sure" v-text="'筛选'" @click="openPicker(type)"></div>
        </app-header>
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
        <vue-pickers
            v-if="pickData"
            :show="isShow"
            :columns="columns"
            :defaultData="defaultData"
            :selectData="pickData"
            @cancel="close"
            @confirm="confirmFn">
        </vue-pickers>
    </div>
</template>
<script>
import appHeader from "../../../components/public/header.vue";
import sTable from "../../../components/public/table.vue";
import vuePickers from '../../../components/public/picker.vue';

import { getIsLogin , getTokenId , getUserData, getSecretKey } from "../../../common/common.js";
export default {
    name:'scoreRecord',
    data() {
        return {
            headerMsg:{
                type:"common",
                title:null,
                left:'返回'
            },
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
            pageSize:this.pageSize,
            pageNo:this.pageNo,
            time:null,
            incDnc:null,
            isShow:false,
            columns:0,
            isLink:false,
            defaultData:[],
            pickData:null,

        }
    },
    async beforeMount(){
		if (!this.$route.query.type) {
			this.type = '0'
		}else{
			this.type = this.$route.query.type
        }
        this.headerMsg.title = this.dataPage[this.type].tit
    },
    components: {
        sTable,
        vuePickers,
        appHeader
    },
    mounted(){
        if (getIsLogin()) {
            const userInfo = JSON.parse(getUserData());
            this.userBasicParam = {
                firmId : userInfo.firmInfoid,
				source : 'firmId'+userInfo.firmInfoid,
				sign : this.$md5('firmId'+userInfo.firmInfoid+"key"+getSecretKey()).toUpperCase(),
				tokenId : getTokenId()
            }
            this.get_record_list();
            this.initData(this.type)
        }
    },
    methods:{
        get_record_list:function () {
            const obj = Object.assign({
                method: this.dataPage[this.type].port,
                pageSize:this.pageSize,
                pageNo:this.pageNo,
                scoreUseRcdTime:this.time,
                scoreDetailsTime:this.time,
                incDnc:this.incDnc
            },this.userBasicParam)
            this.$ajax.get(this.HOST, {
                params:obj
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
                  this.$toast({
                    message :data.statusStr,
                    position: 'middle',//top bottom middle
                    duration: 2000,//延时多久消失
                  })
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
        openPicker(type){
            this.isShow = true;
        },
        getMore:function () {
            if (!this.isLast) {
                this.pageNo = this.pageNo+1 ;
                this.get_record_list();
            }
        },
        close(){
            this.isShow = false;
        },
        confirmFn(val){
            this.isShow = false;
            if (this.type == 1) {
                this.incDnc = null;
                this.time = val['select1']['value']
            } else {
                this.incDnc = val['select1']['value'];
                this.time = val['select2']['value']
            }
            this.pageNo = 1;
            this.get_record_list();
            console.log(val)
        },
        getDate:function (){
			var n = new Date(),y = n.getFullYear(),m = n.getMonth() + 1;
			var arr=[];
			arr.push({value:'0',text:"全部"});
			for(var i = y; i >= 2015; i--){
				for (var j = ( i==y ? m : 12) ; j > 0; j--) {
					var o = {};
					var n = i +"-"+ (j>9 ? j.toString() : "0"+j);
					o.value = n,o.text = n;
					arr.push(o)
				}
            };
            return arr;
        },
        initData:function(type){
            var _this = this;
            const arr =  _this.getDate()
            if (type == 1) {
                this.columns = 1;
                this.pickData = {
                    data1:arr
                }
            } else {
                this.columns = 2;
                this.pickData = {
                    data1:[
                        {'text':'全部','value':'0'},
                        {'text':'加','value':'1'},
                        {'text':'减','value':'2'},
                        ],
                    data2:arr
                }
            }
        }
    }
}
</script>
<style scoped>
@import "../../../common/sprite.css";
.scoreRecord{
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
