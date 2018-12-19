export default {
    
    getAllNum: (state) =>{
        let goodsList = state.goShopCart,
            num = 0;
        if (goodsList.lenght) {
            goodsList.forEach(element => {
                num += element.sum;
            });
        }
        return num;
    },
    getGoodNum:( state , getters ) =>(id) => {
        let goodsList = state.goShopCart,
            num = 0;
        let tag = goodsList.find(element => {
           element.id == id;
        });
        if (tag.lenght) {
            num = tag[0].sum
        }
        return num;
    }
}