import { 
    INIT_DATA,
    INIT_BUYCART,
    ADD_CART,
    REDUCE_CART,
    CLEAR_CART,
    SAVE_LOGIN_INFO,
    SAVE_AUTO_LOGIM,
    SAVE_MESSAGE,
    SAVE_SYSTEM
 } from "./mutation-types";

import { setStore , getStore ,setSession , getSession } from "../config/mUtils";

export default {
    [INIT_DATA](state) {
        let tokenId = getStore('tokenId'),
            secretKey = getStore('secretKey'),
            userData = getStore('user_data'),
            system = getSession('system'),
            newMessage = getSession('NewMessage');
        state.system = system ? JSON.parse(system) : '';
        state.tokenId = tokenId ? tokenId : '';
        state.secretKey = secretKey ? secretKey : '';
        state.isLogin = tokenId ? true : false;
        if (userData) {
            let o = JSON.parse(userData);
            state.userData = o;
            state.firmId = o.firmInfoid;
            state.usreId = o.cuserInfoid;
        }
        if (state.isLogin) {
            if (newMessage == 'true') {
                state.isNewMessage = true;
            }
        }
    },
    [INIT_BUYCART](state){
        let list = getStore('good') ? JSON.parse(getStore('good')) : []
        state.goShopCart = list;
    },
    [SAVE_LOGIN_INFO](state , {
        tokenId,
        secretKey,
        userData
    }){
        setStore('tokenId',tokenId),
        setStore('secretKey',secretKey),
        setStore('user_data', JSON.stringify(userData));
        state.tokenId = tokenId ;
        state.secretKey = secretKey ;
        state.userData = userData;
        state.isLogin = true ;
        state.firmId = userData.firmInfoid;
        state.usreId = userData.cuserInfoid;
    },
    [SAVE_AUTO_LOGIM](state){
        state.isAutoLogin = true;
    },
    [SAVE_MESSAGE](state, isNew) {
        state.isNewMessage = isNew;
        setSession('NewMessage', isNew)

    },
    [SAVE_SYSTEM](state, system) {
        state.system = system;
        setSession("system",JSON.stringify(system));
    }
}