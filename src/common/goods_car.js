//本地购物车存储
//添加商品到本地
const addgoods = function(id, name, price, wholePriceSize, gssPrice, priceUnit, packageNum, maxCount) {
  const contact = new Object(); //单个商品的对象，暂时介质
  const goodobj = new Object(); //商品对象
  const memberfilter = new Array(); //商品信息
    memberfilter[0] = "id";
    memberfilter[1] = "name";
    memberfilter[2] = "sum";
    memberfilter[3] = "price";
    memberfilter[4] = "wholePriceSize";
    memberfilter[5] = "gssPrice";
    memberfilter[6] = "priceUnit";
    memberfilter[7] = "packageNum";
    memberfilter[8] = "maxCount";
  if (typeof (localStorage.good) == "undefined") {
    //console.log('之前没有任何商品')
    contact.id = parseInt(id);
    contact.name = name;
    contact.sum = 1;
    contact.price = parseFloat(price);
    contact.wholePriceSize = wholePriceSize;
    contact.gssPrice = parseFloat(gssPrice);
    contact.priceUnit = priceUnit;
    contact.packageNum = packageNum;
    contact.maxCount = maxCount;
    const good = new Array();
    const jsonText = JSON.stringify(contact, memberfilter);
    good[0] = JSON.parse(jsonText);
    localStorage.good = JSON.stringify(good, memberfilter);
    return 1;
    //console.log(localStorage.good)
  } else {
    const goodobj = JSON.parse(localStorage.good)
    const con = 0;
    for (let i in goodobj) {
      if (goodobj[i].id == id) {
        //之前已经有此类商品了
        //console.log("之前已经有此类商品了")
        goodobj[i].sum = 1 + parseInt(goodobj[i].sum);
        localStorage.good = JSON.stringify(goodobj, memberfilter);
        //console.log(localStorage.good)
        con++;
        return goodobj[i].sum;
        break;
      }
    }
    if (con == 0) {
      //console.log("之前没有这类商品")
      //直接创建一个引得商品对象放入进去
      contact.id = parseInt(id);
      contact.name = name;
      contact.sum = 1;
      contact.price = parseFloat(price);
      contact.wholePriceSize = wholePriceSize;
      contact.gssPrice = parseFloat(gssPrice);
      contact.priceUnit = priceUnit;
      contact.packageNum = packageNum;
      contact.maxCount = maxCount;
      const jsonText = JSON.stringify(contact, memberfilter);
      const goolen = goodobj.length;
      goodobj[goolen] = JSON.parse(jsonText);
      localStorage.good = JSON.stringify(goodobj, memberfilter);
      return 1;
      //console.log(localStorage.good)
    }
  }
}
const goodobj = new Object();
const money = 0;
const memberfilter = new Array();
  memberfilter[0] = "id";
  memberfilter[1] = "name";
  memberfilter[2] = "sum";
  memberfilter[3] = "price";
  memberfilter[4] = "wholePriceSize";
  memberfilter[5] = "gssPrice";
  memberfilter[6] = "priceUnit";
  memberfilter[7] = "packageNum";
  memberfilter[8] = "maxCount";
//商品数量减少
const cutgoods = function cutgoods(id) {
  goodobj = JSON.parse(localStorage.good)
  for (let i in goodobj) {
    if (goodobj[i].id == id) {
      //之前已经有此类商品了
      //console.log("已有次类商品数目"+goodobj[i].sum)
      if (goodobj[i].sum == 1) {
        const arr1 = goodobj.slice(0, i);
        const arr2 = goodobj.slice(++i);
        const arr = arr1.concat(arr2)
        localStorage.setItem('good', JSON.stringify(arr))
        return 0;
      } else {
        goodobj[i].sum = parseInt(goodobj[i].sum) - 1;
        localStorage.good = JSON.stringify(goodobj, memberfilter);
        //console.log(localStorage.good);
        return goodobj[i].sum;
      }
    }
  }
}
//检索本地数据单个商品 返回商品数目
const callbackgoodsnumber = function(id) {
  if (typeof (localStorage.good) == "undefined") {
    return 0;
  } else {
    goodobj = JSON.parse(localStorage.good);
    const con = false;
    for (let i in goodobj) {
      if (goodobj[i].id == id) {
        con = true;
        return goodobj[i].sum;
      }
    }
    if (!con) {
      return 0;
    }
  }
}
//获取商品品总数
const getgoodsNum = function() {
  const total = 0;
  if (typeof (localStorage.good) == "undefined") {
    return 0;
  } else {
    goodobj = JSON.parse(localStorage.good);
    for (let i in goodobj) {
      total += parseInt(goodobj[i].sum);
    }
    return total;
  }
}
//获取商品总价格;
const getgoodsMoney = function getgoodsMoney() {
  const totalMoney = 0.00;
  if (typeof (localStorage.good) == "undefined") {
    return 0;
  } else {
    goodobj = JSON.parse(localStorage.good);
    for (let i in goodobj) {
      totalMoney += parseInt(goodobj[i].sum) * parseFloat(goodobj[i].price);
    }
    return totalMoney.toFixed(2);
  }
}
//获取商品列表 id和sum
const goodlist1 = function goodlist1() {
  let id, num;
  arr = [];
  const goodsList1 = {
    'goodsList': arr
  }
  if (typeof (localStorage.good) == "undefined") {
    return 0;
  } else {
    const obj1;
    goodobj = JSON.parse(localStorage.good);
    for (let i in goodobj) {
      obj1 = new Object();
      obj1.goodsId = goodobj[i].id;
      obj1.count = goodobj[i].sum;
      arr.push(obj1)
    }
    //console.log(JSON.stringify(goodsList1))
    return JSON.stringify(goodsList1);
  }
}
//获取商品列表price sum 和 name
const goodlist2 = function goodlist2() {
  if (typeof (localStorage.good) == "undefined") {
    return 0;
  } else {
    return JSON.parse(localStorage.good);
  }
}

const getScore = function getScore() {
  const score = 0;
  if (typeof (localStorage.good) == "undefined") {
    return 0;
  } else {
    goodobj = JSON.parse(localStorage.good);
    for (let i in goodobj) {
      if (goodobj[i].bussinessType != undefined) {
        if (goodobj[i].bussinessType == 2) {
          score += parseInt(goodobj[i].sum) * parseFloat(goodobj[i].score);
        }
      }

    }
    return score;
  }
}
export {
  addgoods,
  cutgoods,
  getgoodsMoney,
  getgoodsNum,
  callbackgoodsnumber,
  goodlist1,
  goodlist2,

}