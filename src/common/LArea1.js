/**
 * LArea移动端城市选择控件
 */
window.LArea1 = (function() {
	//对象
    var MobileArea = function() {
        this.gearArea;
        this.data;
        this.index = 0;
        this.value = [0, 0, 0];
    };
    //对象原型
    MobileArea.prototype = {
    	//初始话
        init: function(params) {
        	//console.log(params)
            this.params = params;
            this.trigger = document.querySelector(params.trigger);
            if(params.valueTo){
              this.valueTo=document.querySelector(params.valueTo);
            };
            this.keys = params.keys;
            this.type = params.type||1;
            switch (this.type) {
                case 1:
                case 2:
                    break;
                default:
                    throw new Error('错误提示: 没有这种数据源类型');
                    break;
            };
            this.bindEvent();
        },
        //获取数据
        getData: function(callback) {
            var _self = this;
            if (typeof _self.params.data == "object" && typeof callback == "function") {
                _self.data = _self.params.data;
                callback();
            } else if (typeof callback == "object") {
            	_self.data = callback;	
            } 
        },
        //绑定事件
        bindEvent: function() {
            var _self = this;
            //呼出插件
            function popupArea(e) {
            	//添加判断是否选择省市
              var a = document.getElementById("province")
              if(a.value.length != 0){
                _self.gearArea = document.createElement("div");
                _self.gearArea.className = "gearArea";
                _self.gearArea.innerHTML = 
                	'<div class="area_ctrl slideInUp">' +
                    	'<div class="area_btn_box">' +
	                    	'<div class="area_btn larea_cancel">取消</div>' +
	                    	'<div class="area_btn larea_finish">确定</div>' +
                    	'</div>' +
	                    '<div class="area_roll_mask">' +
	                    	'<div class="area_roll">' +
	                    		'<div>' +
	                    			'<div class="gear area_province" data-areatype="area_province"></div>' +
	                    			'<div class="area_grid">' +
	                    			'</div>' +
	                    		'</div>' +
	                    		'<div>' +
			                    	'<div class="gear area_city" data-areatype="area_city"></div>' +
			                    	'<div class="area_grid">' +
			                    	'</div>' +
		                    	'</div>' +
	                    		/*'<div>' +
	                    			'<div class="gear area_county" data-areatype="area_county"></div>' +
	                    			'<div class="area_grid">' +
	                    			'</div>' +
                    			'</div>' +*/
                    		'</div>' +
                    	'</div>' +
                    '</div>';
                document.body.appendChild(_self.gearArea);
                areaCtrlInit();
                //取消
                var larea_cancel = _self.gearArea.querySelector(".larea_cancel");
                larea_cancel.addEventListener('touchstart', function(e) {
                    _self.close(e);
                });
                //确认
                var larea_finish = _self.gearArea.querySelector(".larea_finish");
                larea_finish.addEventListener('touchstart', function(e) {
                    _self.finish(e);
                });
                //添加事件
                var area_province = _self.gearArea.querySelector(".area_province");
                var area_city = _self.gearArea.querySelector(".area_city");
                //var area_county = _self.gearArea.querySelector(".area_county");
                
                area_province.addEventListener('touchstart', gearTouchStart);
                area_city.addEventListener('touchstart', gearTouchStart);
                //area_county.addEventListener('touchstart', gearTouchStart);
                area_province.addEventListener('touchmove', gearTouchMove);
                area_city.addEventListener('touchmove', gearTouchMove);
                //area_county.addEventListener('touchmove', gearTouchMove);
                area_province.addEventListener('touchend', gearTouchEnd);
                area_city.addEventListener('touchend', gearTouchEnd);
                //area_county.addEventListener('touchend', gearTouchEnd);
               }
            };
            //初始化插件默认值
            function areaCtrlInit() {
                _self.gearArea.querySelector(".area_province").setAttribute("val", _self.value[0]);
                _self.gearArea.querySelector(".area_city").setAttribute("val", _self.value[1]);
                //_self.gearArea.querySelector(".area_county").setAttribute("val", _self.value[2]);

                switch (_self.type) {
                    case 1:
                        _self.setGearTooth(_self.data);
                        break;
                }
            };
            //触摸开始
            function gearTouchStart(e) {
                e.preventDefault();
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break
                    }
                };
                clearInterval(target["int_" + target.id]);
                target["old_" + target.id] = e.targetTouches[0].screenY;
                target["o_t_" + target.id] = (new Date()).getTime();
                var top = target.getAttribute('top');
                if (top) {
                    target["o_d_" + target.id] = parseFloat(top.replace(/em/g, ""));
                } else {
                    target["o_d_" + target.id] = 0;
                };
                target.style.webkitTransitionDuration = target.style.transitionDuration = '0ms';
            };
            //手指移动
            function gearTouchMove(e) {
                e.preventDefault();
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break
                    }
                };
                target["new_" + target.id] = e.targetTouches[0].screenY;
                target["n_t_" + target.id] = (new Date()).getTime();
                var f = (target["new_" + target.id] - target["old_" + target.id]) * 30 / window.innerHeight;
                target["pos_" + target.id] = target["o_d_" + target.id] + f;
                target.style["-webkit-transform"] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
                target.setAttribute('top', target["pos_" + target.id] + 'em');
                if(e.targetTouches[0].screenY<1){
                    gearTouchEnd(e);
                };
            };
            //离开屏幕
            function gearTouchEnd(e) {
                e.preventDefault();
                var target = e.target;
                while (true) {
                    if (!target.classList.contains("gear")) {
                        target = target.parentElement;
                    } else {
                        break;
                    }
                };
                var flag = (target["new_" + target.id] - target["old_" + target.id]) / (target["n_t_" + target.id] - target["o_t_" + target.id]);
                if (Math.abs(flag) <= 0.2) {
                    target["spd_" + target.id] = (flag < 0 ? -0.08 : 0.08);
                } else {
                    if (Math.abs(flag) <= 0.5) {
                        target["spd_" + target.id] = (flag < 0 ? -0.16 : 0.16);
                    } else {
                        target["spd_" + target.id] = flag / 2;
                    }
                };
                if (!target["pos_" + target.id]) {
                    target["pos_" + target.id] = 0;
                };
                rollGear(target);
            };
            //缓动效果
            function rollGear(target) {
                var d = 0;
                var stopGear = false;
                function setDuration() {
                    target.style.webkitTransitionDuration = target.style.transitionDuration = '200ms';
                    stopGear = true;
                };
                clearInterval(target["int_" + target.id]);
                target["int_" + target.id] = setInterval(function() {
                    var pos = target["pos_" + target.id];
                    var speed = target["spd_" + target.id] * Math.exp(-0.03 * d);
                    pos += speed;
                    if (Math.abs(speed) > 0.1) {
                    	
                    } else {
                        var b = Math.round(pos / 2) * 2;
                        pos = b;
                        setDuration();
                    }
                    if (pos > 0) {
                        pos = 0;
                        setDuration();
                    }
                    var minTop = -(target.dataset.len - 1) * 2;
                    if (pos < minTop) {
                        pos = minTop;
                        setDuration();
                    }
                    if (stopGear) {
                        var gearVal = Math.abs(pos) / 2;
                        setGear(target, gearVal);
                        clearInterval(target["int_" + target.id]);
                    }
                    target["pos_" + target.id] = pos;
                    target.style["-webkit-transform"] = 'translate3d(0,' + pos + 'em,0)';
                    target.setAttribute('top', pos + 'em');
                    d++;
                }, 30);
            };
            //控制插件滚动后停留的值
            function setGear(target, val) {
            	//console.log(_self.data)
                val = Math.round(val);
                target.setAttribute("val", val);
                switch (_self.type) {
                    case 1:
                    _self.setGearTooth(_self.data);
                    break;
                }
            };
            _self.getData(function() {
            	
                	_self.trigger.addEventListener('click', popupArea )
            });
        },
        //重置节点个数
        setGearTooth: function(data) {
        	//console.log(data)
            var _self = this;
            //console.log(this);
            var item = data || [];
            var l = item.length;
            //geatChild 3个省市区
            var gearChild = _self.gearArea.querySelectorAll(".gear");
            //gearVal 3个省市区的val的值
            var gearVal = gearChild[_self.index].getAttribute('val');
            console.log(gearChild[_self.index])
            var maxVal = l - 1;
            //console.log(maxVal)
            if (gearVal > maxVal) {
                gearVal = maxVal;
            };
            gearChild[_self.index].setAttribute('data-len', l);
            if (l > 0) {
                var id = item[gearVal][this.keys['id']];
                var childData;
                switch (_self.type) {
                    case 1:
                    //console.log(gearVal)
                    //childData = item[gearVal].child
                    childData = item[gearVal].roadList;
                    //console.log(childData)
                    break;
                 
                };
                var itemStr = "";
                for (var i = 0; i < l; i++) {
                    itemStr += "<div class='tooth'  ref='" + item[i][this.keys['id']] + "'>" + item[i][this.keys['name']] + "</div>";
                };
                gearChild[_self.index].innerHTML = itemStr;
                gearChild[_self.index].style["-webkit-transform"] = 'translate3d(0,' + (-gearVal * 2) + 'em,0)';
                gearChild[_self.index].setAttribute('top', -gearVal * 2 + 'em');
                gearChild[_self.index].setAttribute('val', gearVal);
                _self.index++;
                if (_self.index > 1) {
                    _self.index = 0;
                    return;
                };
                _self.setGearTooth(childData);
            } else {
                gearChild[_self.index].innerHTML = "<div class='tooth'></div>";
                gearChild[_self.index].setAttribute('val', 0);
                if(_self.index==1){
                    gearChild[1].innerHTML = "<div class='tooth'></div>";
                    gearChild[1].setAttribute('val', 0);
                };
                _self.index = 0;
            }
        },
        //点击确定
        finish: function(e) {
            var _self = this;
            var area_province = _self.gearArea.querySelector(".area_province");
            var area_city = _self.gearArea.querySelector(".area_city");
            //var area_county = _self.gearArea.querySelector(".area_county");
            var provinceVal = parseInt(area_province.getAttribute("val"));
            var provinceText = area_province.childNodes[provinceVal].textContent;
            var provinceCode = area_province.childNodes[provinceVal].getAttribute('ref');
            var cityVal = parseInt(area_city.getAttribute("val"));
            console.log(cityVal)
            var cityText = area_city.childNodes[cityVal].textContent;
            var cityCode = area_city.childNodes[cityVal].getAttribute('ref');
            //var countyVal = parseInt(area_county.getAttribute("val"));
            //var countyText = area_county.childNodes[countyVal].textContent;
            //var countyCode = area_county.childNodes[countyVal].getAttribute('ref');
            _self.trigger.value = provinceText + ((cityText)?(',' + cityText):(''));
            _self.value = [provinceVal, cityVal];
            if(this.valueTo){
                this.valueTo.value= provinceCode +((cityCode)?(',' + cityCode):(''));
            };
            _self.close(e);
         	 document.getElementsByClassName("my_bg")[0].style.visibility="hidden";//隐藏遮罩
        },
        //点击取消
        close: function(e) {
            e.preventDefault();
            var _self = this;
            var evt = new CustomEvent('input');
            _self.trigger.dispatchEvent(evt);
            document.body.removeChild(_self.gearArea);
            _self.gearArea=null;
          document.getElementsByClassName("my_bg")[0].style.visibility="hidden";//隐藏遮罩
           
        }
    };
    return MobileArea;
})()
export{
    LArea1
}