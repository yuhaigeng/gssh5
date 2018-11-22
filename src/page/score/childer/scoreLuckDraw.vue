<template>
    <div class="scoreGame"> 
        <app-header :type ="headerMsg"></app-header>
        <div class="main-wrap">
            <section id="scroll_section" class="scroll_container">
                <div class="main score_active">
                    <div class="score_active_main">
                        <div class="gonggao-wrap icon_ad2">
                            <gg-banner :imgList = "ggList" :type = "'scoreActive'" v-if="ggList.length"></gg-banner>
                        </div>
                        <div class="score_active_center">
                            <div class="score_active_turntable">
                                <img class="pointer1" src="../../../assets/img/img_Pointer@2x.png" alt="" />
                                <canvas class="item animation0 transform0" id="wheelcanvas" ref="luckyCanvas" width="680px" height="680px" @transitionend="transitionend" @webkitTransitionend="transitionend"></canvas>
                                <img class="pointer" src="../../../assets/img/btn_Start draw@2x.png" @click="btn_Start"/>
                            </div>
                        </div>
                        <p class="active_count" v-text="'还剩余'+count+'次抽奖机会'"></p>
                    </div>
                    <div class="score_active_box score_active_rule sprite_login bg_Headline">
                        <p class="title">活动规则</p>
                        <div class="box">
                            <dl v-html="titleList1"></dl>
                        </div>
                    </div>
                    <!--<div class="score_active_box score_active_prize">
                        <p class="title"></p>
                    </div>-->
                    <div class="score_active_box score_active_matter sprite_login bg_Headline">
                        <p class="title">注意事项</p>
                        <ul class="box">
                            <dl v-html="titleList2"></dl>
                        </ul>
                    </div>
                    <div class="score_active_copy" v-text="activeCopy"></div>
                </div>
            </section>
		</div>
    </div>
</template>

<script>

import appHeader from "../../../components/public/header.vue";
import BScroll from 'better-scroll'
import ggBanner from "../../banner/gonggaoBanner.vue";
import { getIsLogin , getTokenId , getUserData, getSecretKey } from "../../../common/common.js";
import { setTimeout } from 'timers';
export default {
    name:'scoreGame',
    data() {
        return {
            headerMsg:{
                type:"common",
                title:'果币抽奖',
                left:'返回'
            },
            isLast:false,
            pageSize:this.pageSize,
            pageNo:this.pageNo,
            websiteNode:this.websiteDate['code'],
            titleList1:null,
            titleList2:null,
            activeCopy:null,
            count:null,
            id:null,
            ggList:[],
            // 转盘
            d:0, // d 表示元素目前上边的角度
            a:null, // a 表示每次后台返回计算的转动角度
            b:null, // b 是实际需要转动的角度
            n:null, // 最终输出为n
            index:[],
            lucky:[],//大转盘奖品名称
            luckyInfo:[],//奖品内容
            colors:[],//大转盘奖品区块对应背景颜色
            goodsimgArr:[],//奖品图片页面标签
            outsideRadius:280,//大转盘外圆的半径
            textRadius:200,//大转盘奖品位置距离圆心的距离
            insideRadius:68,//大转盘内圆的半径
            startAngle:0,//开始角度
            isRotate:false//false:停止;ture:旋转
        }
    },
    components: {
        appHeader,
        ggBanner
    },
    mounted(){
        console.log(getUserData())
        if(getIsLogin()) {
            this.tokenId = getTokenId();
            const userInfo = JSON.parse(getUserData());
        
            this.userBasicParam = {
                firmId : userInfo.firmInfoid,
                source : 'firmId'+userInfo.firmInfoid,
                sign : this.$md5('firmId'+userInfo.firmInfoid+"key"+getSecretKey()).toUpperCase(),
                tokenId : getTokenId()
            }
            this.draw_prizes_activity()
        }
    },
    methods:{
        draw_prizes_activity:function(){
            let obj = Object.assign({
                    method: "draw_prizes_activity",
                    websiteNode: this.websiteNode,
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
                    this.count = data.data.number
                    let gameActive = data.data.drawPrizesActivity;
                    this.initGgList(data.data.scoreUseRcds)
                    let prizesList = gameActive.prizesList;
                    this.id = gameActive.id
                    prizesList.forEach((element,i) => {
                        this.index.push(element.id)
                        this.lucky.push(element.prizesName)
                        this.luckyInfo.push(element.prizesDesc)
                        if(i %2==0){
							this.colors.push("#fbf080");
						}else{
							this.colors.push("#1dc1ba");
						}
                    });
                    this.titleList1 = (gameActive.desc.toString()).replace(/\r\n/g, '<br/>')
                    this.titleList2 = (gameActive.attention.toString()).replace(/\r\n/g, '<br/>')
                    this.activeCopy = gameActive.statement
                    this.drawRouletteWheel()
                } else {
                    console.log(data.statusStr)
                }
            });
        },
        initGgList(arr){
            let ggList = [];
            arr.forEach(element => {
                ggList.push({
                    noticeTitle:element.account.substring(0,3)+'****'+element.account.substring(7,11)+'的'+JSON.parse(getUserData()).websiteNodeName+'用户获得了'+element.goodsName
                })
            });
            this.ggList = ggList;
        },
        //绘制转盘
        drawRouletteWheel:function() {
            let canvas = document.getElementById("wheelcanvas");
            let t = new Date();
            console.log(t)
            if(canvas.getContext){
                //根据奖品个数计算圆周角度
                const arc =Math.PI /(this.lucky.length /2);
                console.log(arc)
                let ctx = canvas.getContext("2d");
                //在给定矩形内清空一个矩形
                ctx.clearRect(0,0,680,680);
                //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
                ctx.strokeStyle ="#FF00FF";
                //font 属性设置或返回画布上文本内容的当前字体属性
                ctx.font ='bold 36px Microsoft YaHei';
                for(let i =0; i < this.lucky.length; i++){
                    //根据当前奖品索引 计算绘制的扇形开始弧度
                    let angle = this.startAngle + i * arc;
                    //根据奖品参数 绘制扇形填充颜色
                    ctx.fillStyle = this.colors[i];
                    //开始绘制扇形
                    ctx.beginPath();
                    //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
                    //绘制大圆
                    ctx.arc(340,340, this.outsideRadius, angle, angle + arc,false);
                    //绘制小圆
                    ctx.arc(340,340, this.insideRadius, angle + arc, angle,true);
                    ctx.stroke();
                    ctx.fill();
                    //锁画布(为了保存之前的画布状态)
                    ctx.save();
                    //----绘制奖品开始----
                    //奖品默认字体颜色
                    ctx.fillStyle ="#fff";
                    let text = this.lucky[i];
                    let lukyname = this.luckyInfo[i];
                    let line_height =17;
                    //translate方法重新映射画布上的 (0,0) 位置
                    ctx.translate(340+Math.cos(angle + arc/2) * this.textRadius,340+Math.sin(angle + arc /2)* this.textRadius);
                    //rotate方法旋转当前的绘图
                    ctx.rotate(angle + arc /2+Math.PI /2);
                    //绘制奖品图片
                    //let img =new Image();
                    //img.src = this.goodsimgArr[i];
                    //由于设计的转盘色块是交错的，所以这样可以实现相邻奖品区域字体颜色不同
                    if(i %2==0){
                        ctx.fillStyle ="#f7452f";
                    }
                    //将字体绘制在对应坐标
                    ctx.fillText(text,-ctx.measureText(text).width /2,0);
                    //设置字体
                    ctx.font =' 14px Microsoft YaHei';
                    //绘制奖品名称
                    if(text !="优胜奖"){
                        ctx.fillText(lukyname,-ctx.measureText(lukyname).width /2,25);
                    }else{
                        ctx.fillText("优麦币",-ctx.measureText("优麦币").width /2,25);
                    }
                    //把当前画布返回（插入）到上一个save()状态之前
                    ctx.restore();
                    ctx.save();
                    //----绘制奖品结束----
                }
            }
        },
        draw_prizes:function(id){
            let obj = Object.assign({
                    method: "draw_prizes",
                    websiteNode: this.websiteNode,
                    firmId:this.firmId,
                    drawPrizesActivityId:this.id,
                    tokenId:this.tokenId,
                    sign:this.sign,
                    source:this.source
                },this.userBasicParam)
            this.$ajax.get(this.HOST, {
                params:obj
            }).then(result => {
                return result.data;
            }).then(data => {
                console.log(data);
                if (data.statusCode == 100000) {
                    let item = parseInt(this.getArrayIndex(this.index, data.data.id))
                    this.count = this.count - 1
                    this.item = item
                    this.prizesName = data.data.prizesName
                    this.rotateFn(this.item ,this.itemText);
                }else if(data.statusCode == "100619"){
                    this.isRotate =!tshi.isRotate;
                    console.log(data.statusStr);
                }else {
                    this.isRotate =!this.isRotate;
                    this.$refs.luckyCanvas.css({
                        'animation-name': '',
                        '-moz-animation-name': '',
                        '-webkit-animation-name': '',
                        '-o-animation-name': '',
                    });
                    console.log(data.statusStr)
                }
            });
        },
        getArrayIndex:function(arr,item){
            for (let i in arr) {
                if (arr[i] == item) {
                    return i;
                }
            }					
        },
        rotateFn:function(item,text){
            // console.log(item)
            let deg = eval('this.get'+this.$refs.luckyCanvas.css("transform"));//当前元素的角度
            let l = this.lucky.length;
            let a = item *(360/ l );
            //6个奖品
            if (deg == 0) {
                if (a < 240) {
                    this.n = this.d + 240 - a;
                }else{
                    this.n = this.d + 240 - a + 360;
                }
            } else if (deg == 60) {
                if (a < 180) {
                    this.n = this.d + 180 - a;
                }else{
                    this.n = this.d + 180 - a + 360;
                }
            } else if (deg == 120) {
                if (a < 120) {
                    this.n = this.d + 120 - a;
                }else{
                    this.n = this.d + 120 - a + 360;
                }
            } else if (deg == 180) {
                if (a < 60) {
                    this.n = this.d + 60 - a;
                }else{
                    this.n = this.d + 60 - a + 360;
                }
            } else if (deg == 240) {
                if (a < 360) {
                    this.n = this.d + 360 - a;
                }
            } else if (deg == 300) {
                if (a < 300) {
                    this.n = this.d + 300 - a;
                }else{
                    this.n = this.d + 300 - a + 360;
                }
            }
            this.n = this.n + 1800;
            this.d = this.n;
            this.$refs.luckyCanvas.classList.remove("animation_name").css({
                "webkitTransform":'rotate('+this.n+'deg)',
                "MozTransform":'rotate('+this.n+'deg)',
                "msTransform":'rotate('+this.n+'deg)',
                "OTransform":'rotate('+this.n+'deg)',
                "transform":'rotate('+this.n+'deg)',
            });
        },
        /* 
        * 解析matrix矩阵，0°-360°，返回旋转角度 
        * 当a=b||-a=b,0<=deg<=180 
        * 当-a+b=180,180<=deg<=270 
        * 当a+b=180,270<=deg<=360 
        * 
        * 当0<=deg<=180,deg=d; 
        * 当180<deg<=270,deg=180+c; 
        * 当270<deg<=360,deg=360-(c||d); 
        */  
        getmatrix:function(a,b,c,d,e,f) {
            let aa=Math.round(180*Math.asin(a)/ Math.PI);  
            let bb=Math.round(180*Math.acos(b)/ Math.PI);  
            let cc=Math.round(180*Math.asin(c)/ Math.PI);  
            let dd=Math.round(180*Math.acos(d)/ Math.PI);  
            let deg=0;  
            if(aa==bb||-aa==bb){  
                deg=dd;  
            }else if(-aa+bb==180){  
                deg=180+cc;  
            }else if(aa+bb==180){  
                deg=360-cc||360-dd;  
            }  
            return deg>=360?0:deg;
            //return (aa+','+bb+','+cc+','+dd);  
        },
        btn_Start() {
            if(this.count == null) {
                this.$messagebox({
                    title:'',
                    message: '暂无抽奖活动'
                })
            }else {
                if(this.count <= 0) {
                    this.$messagebox({
                        title:'',
                        message: '果币不足'
                    })
                }else {
                    if(this.isRotate)return;
                    this.isRotate = !this.isRotate;
                    this.draw_prizes(this.attr('data'))
                }
            }
        },
        // 结束旋转
        transitionend() {
            this.isRotate = !this.isRotate;
            this.$messagebox({
                title:'',
                message: '恭喜获得' + this.prizesName
            })
        }
    }
}
</script>

<style scoped>
.icon_ad2 {
	background: url(../../../assets/img/icon_ad@3x.png) no-repeat 20px center;
}
.sprite_login {
	background-image: url(../../../assets/img/sprite_login.png);
	background-repeat: no-repeat;
}

.bg_Headline {
	background-position: -96px -449px;
}
.scoreGame{
    padding-top: 87px;
    background-color: #ebebeb;
    z-index: 19;
}
.scroll_container{
    width: 100%;
    height: 100%;
}
.main-wrap{max-width: 750px;width: 100%;margin: 0 auto;background: #ebeaea;}
.score_active{background-color: #ff4812;}
.score_active_main{width: 100%;}
.active_count{width: 100%;height: 40px;margin-bottom:20px;margin-top: -32px;text-align: center;color: #FFF;line-height: 40px;font-size: 24px;}
.gonggao-wrap{height: 60px;overflow: hidden;}
.score_active_center{height: 814px;background:url(../../../assets/img/img_bg_money@2x.png) no-repeat center ;}
.score_active_turntable{width: 750px; height: 814px; background: url(../../../assets/img/img_Lottery_turntable_a@2x.png) no-repeat center;position: relative;overflow: hidden;}
.score_active_turntable .pointer1{width: 88px;height: 120px;position: relative;left: 50%;margin-left: -44px;top:60px ;z-index: 2;}
.score_active_turntable .pointer{position: absolute;width: 180px;height: 180px;left: 50%;top: 50%;margin-left: -90px;margin-top: -90px;}
.score_active_turntable .item{width: 684px;height: 684px;position: absolute;left: 30px;top: 70px;transition: all 5s;}/*transition: all 2s;*/
.score_active_turntable .transition0{
	transition: transform 2s;
	/*-webkit-transition: -webkit-transform 2s;
	-moz-transition: -moz-transform 2s; 
	-o-transition: -o-transform 2s; */
}
.score_active_turntable .animation_name{
	animation-name: myfirst;
}
.score_active_turntable .animation0{
	animation-duration: 1s;
	animation-timing-function: linear;
	animation-iteration-count: 5;
	/*animation-play-state: paused;*/
	/*animation-play-state: running;*/
}
.score_active_turntable .transform0{
	transform: rotate(0deg);
}
@keyframes myfirst{
	0%   {transform: rotate(0deg)}
	50%  {transform: rotate(180deg)}
	100% {transform: rotate(360deg)}
}
.score_active_box p{height: 82px;line-height: 50px;text-align: center;color: #FFF;font-size: 30px;}
.score_active_box .box{padding: 0 54px;color: #FFFDDA;line-height: 46px;font-size: 30px;padding-bottom: 40px;}
.score_active_matter .box li span{display: inline-block; width: 20px; height: 20px;border-radius: 10px;background: #FFF; vertical-align: middle;}
.score_active_copy{height: 146px;border-top: 2px dashed #FFF;line-height: 146px;color: #FFF;padding: 0 40px;font-size: 28px;text-align: center;}
</style>
