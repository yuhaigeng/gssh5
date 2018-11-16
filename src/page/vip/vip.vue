<template>
   <div class="vip common-wrap">
        <app-header :type="headerMsg" :logined="logined"   v-show="logined"></app-header>
        <div class="vip_main_top" v-show="userVipInfo.monthExp">
            <div class="vip_main_growValue" >
                <div class="vip_growValue_top">
                    <span class="vip_growValue_tit">当月成长值</span><span class="vip_growValue_desc" v-text="'当月成长值为'+userVipInfo.firmMonthExp+'点,再积'+userVipInfo.needExp+'点可享受下个月VIP服务'"></span>
                </div>
                <div class="vip_growValue_progress">
                    <p class="growInfo_progressAll"></p>
                    <p class="growInfo_progressTrue" v-bind:style="{width: getWidth+'px'}"></p>
                </div>
                <div class="vip_growValue_progress_subscript clearfloat">
                    <span class="float_left" v-text='0'></span>
                    <span class="float_right" v-text='userVipInfo.firmMonthExp > userVipInfo.monthExp ? userVipInfo.firmMonthExp : userVipInfo.monthExp'></span>
                </div>
            </div>
            <div class="vip_main_growValue vip_grow_all" :class="{'active':userVipInfo.vip >0}" v-show="userVipInfo.monthExp">
                <div class="vip_growValue_top">
                    <span class="vip_growValue_tit" ></span><span class="vip_activation" v-text="userVipInfo.vip > 0 ? '已激活' : '未激活'"></span> <span class="vip_growValue_desc" v-text="'累积成长值为'+userVipInfo.firmExp+'点，还差'+userVipInfo.upExp+'点到下一等级'" ></span>
                </div>
                <div class="vip_prowValue_grade_box clearfloat">
                    <div class="float_left" v-for = "(item,index) in vipGradeList" :key="index">
                        <dl :class="['grade'+(index+1),{'active':userVipInfo.vipGrade >= (index+1)}]" >
                            <dt></dt><dd v-text="'成长值满'+item.start+'点'"></dd>
                        </dl>
                        <div class="line_box" :class="[{'active':userVipInfo.vipGrade >= (index+1)},{'active1':userVipInfo.vipGrade >= (index+2)}]"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="vip_main_center" v-show="userVipInfo.monthExp">
            <div class="vip_main_icon cont cont4">
                <div class="vip_main_icon_tit cont_tit" :class="{'noactive':isActive}">VIP特权</div>
                <div class="vip_main_icon_boxs clearfloat">
                    <dl class="float_left" v-for="(item,index) in vipPrivilege" @click="goToNext(item)" :key="index">
                        <dt><img :src="item.state == 1 ? item.onLogo : item.offLogo"/></dt>
                        <dd v-text="item.name"></dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="vip_main_bottom" v-show="userVipInfo.monthExp">
            <div class="vip_main_introduce">
                <div class="vip_main_introduce_item">
                    <div class="vip_main_introduce_title">
                        1.VIP享受条件
                    </div>
                    <div class="vip_main_introduce_content">
                        <p>当月成长值达到<span v-text="system.month_exp"></span>点，享受下月相应等级VIP会员服务，<b>有效期一个月</b></p>
                    </div>
                </div>
                <div class="vip_main_introduce_item">
                    <div class="vip_main_introduce_title">
                        2.VIP会员成长值
                    </div>
                    <div class="vip_main_introduce_content">
                        <p>VIP成长值是基于用户一定时期内使用果速送平台的下单实付金额、下单频次以及合作情况决定；用户达到相应的成长值享受VIP服务以及提升VIP等级</p>
                        <p class="formula">当月成长值=实付金额成长值+下单频次成长值+不良记录下降值</p>
                        <div class="table">
                            <div class="table_tr clearfloat">
                                <div class="table_td">实付金额成长值</div>
                                <div class="table_td">实付金额<span v-text="system.exp_of_pay_money"></span>元=1点</div>
                            </div>
                            <div class="table_tr clearfloat">
                                <div class="table_td">下单频次成长值（每日）</div>
                                <div class="table_td">下单=<span v-text="system.order_add_exp"></span>点/次，未下单= -<span v-text="system.order_ueduce_exp"></span>点/次</div>
                            </div>
                            <div class="table_tr clearfloat">
                                <div class="table_td">不良记录下降值</div>
                                <div class="table_td">逾期付款（隔夜）= -<span v-text="system.two_night_not_pay"></span>点/天</div>
                            </div>
                        </div>
                        <p class="notes">注：一个月三次以上逾期付款(隔夜)或无理由退货，取消其下月VIP资格</p>
                    </div>
                </div>
                <div class="vip_main_introduce_item">
                    <div class="vip_main_introduce_title">
                        3.VIP等级
                    </div>
                    <div class="vip_main_introduce_content">
                        <p>VIP等级是所有月份累积的成长值，达到相应标准即可升级；一旦升级，<b>一年内有效；</b>如果一年内没有升级，次年将降一级（保留等级最低值）</p>
                        <div class="table">
                            <div class="table_tr clearfloat">
                                <div class="table_td">等级</div>
                                <div class="table_td">相应累积成长值</div>
                            </div>
                            <div class="table_tr clearfloat" v-for="(item,index) in vipGradeList" :key="index">
                                <div class="table_td" v-text="item.name"></div>
                                <div class="table_td" v-text="item.start+'点'"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
import appHeader from "../../components/public/header.vue";
import { getSystem  , getIsLogin , getTokenId , getUserData, getSecretKey } from "../../common/common.js";
export default {
   name: 'vip',
   data() {
       return {
            headerMsg:{
                type:"common",
                left:'返回',
                title:'VIP服务',
            },
            logined: true,
            userInfo:{
              faceImgUrl: "zhangshuoinfo.b0.upaiyun.com/2018/8/1535597472",
              firmName: "掌烁测试-朱高飞",
              linkTel: "18315318515"
            },
            vipPrivilege:[
                {"id":"2","onLogo":"http://testboss.guoss.cn/gss_img_root/img_vip/2/20180930104330.png","createTime":"2018-09-19 17:10:47","linkUrl":"","status":-1,"name":"商品券","state":"2","type":2,"offLogo":"http://testboss.guoss.cn/gss_img_root/img_vip/2/20180930104337.png"},
                {"id":"1","onLogo":"http://testboss.guoss.cn/gss_img_root/img_vip/1/20180930104355.png","createTime":"2018-09-19 17:07:56","linkUrl":"","status":-1,"name":"普通优惠券","state":"2","type":1,"offLogo":"http://testboss.guoss.cn/gss_img_root/img_vip/1/20180930104401.png"},
                {"id":"4","onLogo":"http://testboss.guoss.cn/gss_img_root/img_vip/4/20180930104308.png","createTime":"2018-09-25 19:08:16","linkUrl":"","status":-1,"name":"特权商品","state":"2","type":4,"offLogo":"http://testboss.guoss.cn/gss_img_root/img_vip/4/20180930104314.png"},
                {"id":"5","onLogo":"http://testboss.guoss.cn/gss_img_root/img_vip/5/20180930104227.png","createTime":"2018-09-25 19:17:14","linkUrl":"","status":-1,"name":"类目券","state":"2","type":3,"offLogo":"http://testboss.guoss.cn/gss_img_root/img_vip/5/20180930104234.png"}
            ],
            vipGradeList:[
                {"id":"7","createTime":"2018-10-09 10:50:31","start":110,"name":"VIP1","grade":1,"end":880,"creator":"曹晓琴"},
                {"id":"4","createTime":"2018-09-21 11:52:26","start":880,"name":"VIP2","grade":2,"end":1880,"creator":"系统管理员"},
                {"id":"5","createTime":"2018-09-21 11:52:48","start":1880,"name":"VIP3","grade":3,"end":3288,"creator":"系统管理员"},
                {"id":"6","createTime":"2018-09-25 19:15:51","start":3288,"name":"VIP4","grade":4,"end":999999,"creator":"系统管理员"}
            ],
            system:{"buyer_app_qr_code_ios_url":"http://app.guoss.cn/app_qr/guoss_buyer.png","alipay_app_id_new":"2016042401331490","activity_upload_path":"img_activity/","ads_upload_path2":"img_ads2/","buyer_app_qr_code_android_url":"http://app.guoss.cn/app_qr/guoss_buyer_android.png","after_sales_drop_firm_date":"30","alipay_rsa_alipay_public":"MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEjHMeDLkRnb2D3KKa3qBB22lYDJiTYSndbN+vaqQgVDBqbHJw3inn/9vUpmfaL3RFwZr2g5OpFTC/+QTxPGJ+yr358FQBKau+TuQK2uxRyp4yMiwXOl3VI4/LhNM0c3EzFSjmWKcW1NhQiXSgOA0QJYB12p9Rnt5nZDx2CFIwcQIDAQAB","sms_system_config":"2","firm_expand_day":"60","cuser_upload_path":"img_firm/","alipay_rsa_private_new":"MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCdQO8yDjhVc14nPCvz+QwH/BuAI5+Q4JgMPMjPA4/ys2K7SRDdVxOO1Mo9Ls2Ae2MFlPA8Wesex+RT2TTJOXBiQMxLIW0HQAVw/n24hq2x/mGlpZvBUqoyK/586QAi6Ogunfm5bMJDLdrmsY3QQ3f86pzO3J5axkcVnHpkh3jAA6npDqeJXN/horTxsaLm68K2kF7jpggmCVUq/cMGOw2JCFBChyEw9/ZkbRB5skJ9W+7ImKhZB17L0VIrzCLt6co83GgI9aTAERiCZEQG55h8pjRxqJxS9AS8AcBMyb0SQ2dB2shAyQuGJtpjNELpSgri4b8YIK1YTRVCuPXOpjbLAgMBAAECggEAVSIKXPcF2H0Uw/j3cqWptcjuuniOskhlCHr/29L541LqaKotzyaNGA5rTqQ/7QbfnO39AS9M8uUU36//u9C03vxlnWcDN6GZUIr2VSfUcUBebOczY331ViQrKkSaJkwhJtuvjosqwGPa1nnZZJ6iHvKE4hjeQhaF9VU5jaMp5Ak9vPYP+Rr6d9agqCbINfALb8RH1Zf/RYB+Vj9BX4zkOzjoL9nWHOyDvK8n6BOy8p+3rclBDaiyGkSrgv+Ni1z/UvxulJeIMGKnkmEjvvVLapmbvzNv7T920ERLaHKQPIQNNtLj7T3HuGld4+vVAocMaqj+OPG3jbIYZWXEMb4wgQKBgQDZ+cV0am+t+L0PLhBXSE6RzfKwROqckRmlmyN9hCZKG1Er9o/cHD0cwMUxMsvyyxvbDcxbYAlK7lXnjFcKtRRqYkHFt/kwBsuUmdUytsj/XVFvDj+aYCIwzO18Oc8c5X6n9c/jMpPJPOvnnyHpuDQfrvqrdheQa1ByAGEEa+5E2QKBgQC4r3mX6RuUBJiVjYxIH0anpUFxtYilnHEhSN8B7Gs0ZBirIaP9oRep1hWgp0U+RrGZ1mH74VBGwVKB1Gy4jfTBlBj6Rz6hHPAkzYod9Boi6Do7BXGOjlQxrW0TF1Kl1p2KhI1ixkX2c5dCU8nmVeImLtd8NmIeJGODZmAvjnSCQwKBgQCSC12WwHGPOKdDcnOUZ2ftHPXL0ID44eczJBzFTjNxV5gtQofkzC7OAwKcEhK/3AIP5NDVMCVJxSJdf5QaInVJSggTd05INWVVbTSBRCKrplSXeg53Wo3N8J/1qa3xCHqyAmqFKTAHlv/gMqjANaEG0XA2TWtAYgaGO2bFVaNREQKBgDxak+jx8+I+UkLlXAehuOxGVAm94mcEpe/TqZUuVqZrY6hhOP9EqsAEx1KV90nvvlBgv+qZaiuFN9pXuiPhuC+enz8DE1OBanUMemtpfzUTIRxynfaRSrBlVXTctVSeuyMuSCoUU37DrZWuXheYz2vc+OyNtSjWiXLCfQJtkmOTAoGBAJYVQTa/YHCiN9h1deWxd1QZLcndD1HZ1Gknv6SGjfcelJ5YymsTfVFS9chjnZYy671BAf7UW0Q07nTRKWSQauWIqkj6SeQE6drOfJXRRfKQCHfmeb+IId9u646Mcmw0de0DmqSi7BN0L2AIVVEsuhN3YTSVIUCck7m3GaGIzoII","default_vip_discount":"0.99","firm_regist_notice_mobile":"18758862122","feedback_method":"400-0169-682","app_secret":"19cf57c8735c4f02dc8a7855f0d41be9","quotation_first_time":"00:00:00-11:00:00","default_dispatch_time":"07:00-13:00","crm_app_qr_code_android_url":"http://app.guoss.cn/app_qr/guoss_crm_android.png","about_us":"果速送","alipay_partner":"2088011977659919","how_much_money_dispatch":"400","vip_attain_money":"90000","order_add_exp":"1","alipay_rsa_alipay_public_new":"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhRokv28WHMwdV7IchEDeZTkMzdNI+S5VFYTRq+v/+1sDU3vHTIMqZNtwzACvXZzmfVJx0j1A1tNL0uNwZnoecb9TOlew2sK3L9N1NNKUBqOGh88VA3Xko2Q4e6+jKeEpcyCvoKyLyEksKEg9D4Hpdc8iIpmIggR8WMG82Z2obNpIWxOVy2DGk7jsoF15FGOQat8/3uy72SuqtPkTd91NQZAMCQ9cJwTSO/sK7ueDYqvDBAMeaszWs6a/12Xc+ibyFePGFywZNQgHPh8S0pLzBTG9AXEW5mRLJcgkkByI+PPc66WkR7bN4gqpcPLBKHIvgy6F5c+kvSjpiT21ynJmtQIDAQAB","alipay_partner_new":"2088011977659919","guoss_app_qr_code_android_url":"http://app.guoss.cn/app_qr/guoss_app_android.png","app_submchid":"","image_upload_root_path":"/gss_img_root/","quotation_second_time":"12:00:00-20:00:00","app_id":"wx4e26ee7446c5aa37","pack_default_buyer":"2","register_gift_score":"1000","vip_privilege_path":"img_vip/","month_exp":"110","app_certpassword":"1252835601","no_after_sales_drop_firm_date":"20","goods_upload_path":"img_goods/","system_alipay_account_new":"hzzs_info@163.com","app_mchid":"1252835601","default_post_cost":"30","ads_upload_path":"img_ads/","create_order_end_date":"23:59:59","order_ueduce_exp":"0.5","system_alipay_account":"hzzs_info@163.com","two_night_not_pay":"10","inspector_app_qr_code_ios_url":"http://app.guoss.cn/app_qr/gss_quality.png","actionpage_ads_upload_path":"img_actionPage/","app_certlocalpath":"/opt/webapps/gss_api/apiclient_cert.p12","exp_of_pay_money":"250","ios_download_uri":"https://itunes.apple.com/cn/app/果速送/id1102270311?mt=8","app_key":"9e3f7482d3494a55cd69c6b15f60dbc4","website_http":"guoss.cn","be_about_drop_firm_date":"7","alipay_rsa_private":"MIICdAIBADANBgkqhkiG9w0BAQEFAASCAl4wggJaAgEAAoGBAMYIEa4OiY8n+FIyKk7k5yWtpzejLeOtts7k4Iq69+gf01kd87xaCp3xGvrTk+W1bqOQRK2hqWyjg/wLPyHUnSSnyp5GEk+l85wGjlfnGgikVlolFFHAfWKjN4qGTmOIyX8yKlP2MNedhcY2S6ZApGZWiQObgAGA58nGeWhHVQT1AgMBAAECgYAFVVBMlL2lqljotcsn5shG3n9jYzSoLhR/S/C0K8bjbH//pWvcBbzFdinY2XvhMtqw8wC2gGUUtO6oChGAMr6soulUvhmYxkusWcnwxqhPRuSAJrtCLvktBiEhkIRc/M9Ea24u69hG1/Lt2MgJs5ozcuQMJmHaa+HCjqhL+/shAQJBAOm3Esc6mU6zokBFj9pC9KKPQ/7ZqZy3a5zSaFAXr+TW8LN1NHXUcDz7GFXZ6lXfZGabraFIMfxwjPXX483Tr7UCQQDY6ffHmtAHaV006NORG0H0wZGL/VDvgYFZ6sMdbAERauicNW9FTMjQHMRBWXEgmC6Y1GH0IDJ5j6+gyb8IEMhBAkBi7NbJ9YfGxEo9IjSNkiGyXSnOyZr9drXaH0WAAUa2ejRQAaA+77jCVxYp4J9L0c7Rj7uitMhTreA8fzExghSxAj8x/bodRpCrJJ1WlFIuHxoUTog8uyTsDezBzFkrbrjQStNRLP93+TpOvFJ+vR5VZL1Ye5oXqVP4sCTJ6bUdJsECQC4rPyDLhjOh4MhrHMWpus9pspu0mf+d6eVmfhQWkBH6djc33UzaA52owCr/UagRARCrcajRSwzyWuLtOz+ertA=","guoss_app_qr_code_url":"http://app.guoss.cn/app_qr/guoss_app.png","create_order_start_date":"14:00:00","android_download_uri":"http://a.app.qq.com/o/simple.jsp?pkgname=com.zhangshuo.gss","crm_app_qr_code_url":"http://app.guoss.cn/app_qr/guoss_crm.png","app_share":"选择果速送，开店很轻松！@大家一起来分享","inspector_app_qr_code_android_url":"http://app.guoss.cn/app_qr/guoss_buyer_android.png","end_cancel_payorder_time":"00:00-06:00","customer_service_telephone_numbers":"4000169682","image_server_http":"http://img.guoss.cn","h5_vip_page_url":"http://wxhz.guoss.cn/html/vip.html?v=20181013"},
            userVipInfo:{"surplusScore":18,"vip":-1,"needExp":110,"coupons":0,"firmExp":81,"monthExp":110,"firmId":"132","vipGrade":0,"lastMonthExp":81.5,"firmMonthExp":0,"upExp":29}

        }
    },
    components: {
        appHeader,
    },
    computed:{
        // 计算属性width
        getWidth: function () {
            if (this.userVipInfo.firmMonthExp >= this.userVipInfo.monthExp ) {
                return "690"
            }else{
                if (this.userVipInfo.firmMonthExp == 0) {
                    return '0'
                }else{
                    var coefficient = this.userVipInfo.firmMonthExp / this.userVipInfo.monthExp
                    return (coefficient * 690).toFixed(2);
                }
            }
        },
        isActive:function(){
            var isTrue = true;
            if (this.vipPrivilege) {
                for (var i = 0; i < this.vipPrivilege.length ; i++ ) {
                    if (this.vipPrivilege[i].state == 1) {
                        isTrue = false;
                        break;
                    }
                }
            }
            return isTrue;
        },
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
            // this.get_coupon_list();
        }
    }
}

</script>

<style scoped >
.vip{
    margin-top: 90px;
}
.vip_main_bottom,.vip_main_center,.vip_main_top {
    margin-bottom: 22px;
    background: #FFF
}

.vip_main_top {
    background: #ebebeb
}

.vip_main_growValue {
    margin-bottom: 20px;
    padding: 30px 30px 0;
    background: #FFF
}

.vip_growValue_top {
    padding-bottom: 30px
}

.vip_growValue_top .vip_growValue_tit {
    font-size: 40px;
    font-weight: 800;
    color: #f6c500;
    line-height: 56px;
    padding-right: 20px
}

.vip_growValue_top .vip_growValue_desc {
    font-size: 20px;
    color: #999
}

.vip_growValue_progress {
    width: 100%;
    height: 16px;
    position: relative;
    margin-bottom: 14px
}
.vip_growValue_progress {
    width: 100%;
    height: 16px;
    position: relative;
    margin-bottom: 14px
}

.vip_growValue_progress .growInfo_progressAll {
    background: #DDD;
    opacity: 1
}

.vip_growValue_progress .growInfo_progressTrue {
    background: #f6c500
}

.vip_main_top .vip_growValue_progress_subscript {
    font-size: 24px;
    color: #333
}

.vip_grow_all {
    padding: 30px
}

.vip_grow_all .vip_growValue_tit {
    font-size: 48px;
    color: #999;
    padding-top: 14px;
    background: url(../../../static/img/icon_vip_big.png) left center no-repeat;
    padding-left: 80px
}

.vip_grow_all .vip_activation {
    border: 1px solid #cacaca;
    background: #F5F5F5;
    border-radius: 17px;
    padding: 5px 16px;
    font-size: 20px;
    color: #999
}

.vip_grow_all.active .vip_growValue_tit {
    background: url(../../../static/img/icon_vip_big_active.png) left center no-repeat;
    color: #f6c500
}

.vip_grow_all.active .vip_activation {
    border-color: #f6c500;
    background: #000;
    color: #f6c500
}

.vip_prowValue_grade_box {
    padding-top: 36px
}

.vip_prowValue_grade_box .line_box,.vip_prowValue_grade_box dl {
    float: left
}

.vip_prowValue_grade_box dl {
    width: 100px;
    text-align: center
}

.vip_prowValue_grade_box dl dt {
    height: 40px;
    margin-bottom: 12px
}

.vip_prowValue_grade_box dl dd {
    font-size: 24px;
    line-height: 30px
}
.vip_prowValue_grade_box .float_left:last-child .line_box,.wo_top_info dd.active .user_vip_msg {
    display: none
}
.vip_prowValue_grade_box dl.grade1 dt {
    background: url(../../../static/img/icon_vip1.png) center no-repeat
}

.vip_prowValue_grade_box dl.grade2 dt {
    background: url(../../../static/img/icon_vip2.png) center no-repeat
}

.vip_prowValue_grade_box dl.grade3 dt {
    background: url(../../../static/img/icon_vip3.png) center no-repeat
}

.vip_prowValue_grade_box dl.grade4 dt {
    background: url(../../../static/img/icon_vip4.png) center no-repeat
}

.vip_prowValue_grade_box dl.grade1.active dt {
    background: url(../../../static/img/icon_vip1_active.png) center no-repeat
}

.vip_prowValue_grade_box dl.grade2.active dt {
    background: url(../../../static/img/icon_vip2_active.png) center no-repeat
}

.vip_prowValue_grade_box dl.grade3.active dt {
    background: url(../../../static/img/icon_vip3_active.png) center no-repeat
}

.vip_prowValue_grade_box dl.grade4.active dt {
    background: url(../../../static/img/icon_vip4_active.png) center no-repeat
}

.vip_prowValue_grade_box .line_box {
    width: 96px;
    height: 8px;
    border-radius: 4px;
    background: #ddd;
    margin-top: 16px
}

.vip_prowValue_grade_box .line_box.active {
    background: url(../../../static/img/line_now.png) center no-repeat;
    height: 26px;
    margin-top: 7px
}

.vip_prowValue_grade_box .line_box.active1 {
    background: #f5c500;
    height: 8px;
    margin-top: 16px
}

.vip_main_icon .vip_main_icon_tit {
    position: relative
}

.vip_main_icon .vip_main_icon_tit.noactive:before {
    display: inline;
    content: '当前没有活动';
    position: absolute;
    top: 0;
    left: 0;
    font-size: 24px;
    color: #999;
    padding-left: 30px
}

.vip_main_icon_boxs dt img {
    width: 120px;
    height: 120px
}

.vip_main_bottom {
    padding: 50px 30px
}

.vip_main_introduce_title {
    text-align: left;
    font-size: 32px;
    color: #000;
    line-height: 48px;
    font-weight: 800
}

.set_main .signOut,.ticket_nav {
    text-align: center;
    background: #FFF
}

.vip_main_introduce_content {
    padding-top: 14px;
    padding-bottom: 68px;
    padding-left: 34px
}

.vip_main_introduce_content p {
    font-size: 26px;
    color: #666;
    line-height: 42px
}

.vip_main_introduce_content p.formula {
    color: #000;
    font-size: 24px;
    margin-top: 17px;
    margin-bottom: 12px
}

.vip_main_introduce_content b {
    color: #000
}

.vip_main_introduce_content .table {
    font-size: 26px;
    line-height: 42px;
    width: 600px;
    margin-top: 12px
}

.vip_main_introduce_content p.notes {
    font-size: 24px;
    color: #ee3c3c;
    line-height: 40px;
    margin-top: 20px
}



.growInfo_progressAll,.growInfo_progressTrue {
    height: 16px;
    border-radius: 8px;
    background: #FFF
}

.growInfo_progress {
    width: 100%;
    height: 16px;
    position: relative
}

.growInfo_progressAll {
    width: 100%;
    opacity: .4
}

.growInfo_progressTrue {
    min-width: 16px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 2
}

.growInfo_progress_subscript {
    padding-top: 20px
}

.growInfo_progress_subscript .float_left {
    font-size: 20px
}

.growInfo_progress_subscript .float_right {
    font-size: 24px
}

.table {
    border: 1px solid #666
}

.table .table_tr {
    border-bottom: 1px solid #666
}

.table .table_tr:last-child {
    border-bottom: none
}

.table .table_tr .table_td {
    border-left: 1px solid #666;
    float: left;
    padding: 8px 24px
}

.table .table_tr .table_td:last-child {
    width: 300px
}

.table .table_tr .table_td:first-child {
    width: 239px;
    border-left: none
}
.cont_tit {
    font-size: 32px;
    line-height: 48px;
    color: #333;
    text-align: center
}
.cont4 dl {
    float: left;
    width: 25%;
    text-align: center
}
.cont4 {
    background: #FFF;
    padding: 32px 0
}
.cont4 dl dt {
    padding-top: 28px;
    padding-bottom: 4px
}
.cont4 dl dd {
    font-size: 24px;
    color: #333;
    line-height: 40px
}
</style>
