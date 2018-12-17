export default {
    isLogin: (state) => {
        return !!state.tokenId;
    }
}