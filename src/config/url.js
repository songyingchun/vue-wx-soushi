/**
 * Created by songyingchun on 2017/7/20.
 */
var path = require("path");
var dataPath = path.resolve(__dirname, "src/data");
var online = false;
var local = true;

module.exports = {
    getMyProfile: "http://user.backend.soushi88.com/userWx/getMyProfile",
    index: "http://slab.backend.soushi88.com/onsale/query",
    gallery: "http://lib.backend.soushi88.com/stoneLibWx/search",
    galleryDetail: "http://lib.backend.soushi88.com/stoneLibWx/detail",
    boutique: "http://slab.backend.soushi88.com/onsale/query",
    boutiqueDetail: "http://slab.backend.soushi88.com/onsale/detail",
    search: "http://slab.backend.soushi88.com/onsale/query",
    searchDetail: "http://slab.backend.soushi88.com/onsale/detail",
    send: "http://user.backend.soushi88.com/userDeliveryWx/getMyDelivery",
    delivery: "http://template.backend.soushi88.com/templateWx/delivery",
    searchPrev: "http://lib.backend.soushi88.com/stoneLibWx/searchPrev",
    setShowPrice: "http://user.backend.soushi88.com/userWx/setShowPrice",
    updateMyProfile: "http://user.backend.soushi88.com/userWx/updateMyProfile",
    getMyDelivery: "http://user.backend.soushi88.com/userWx/getMyDelivery",
    deleteDelivery: "http://user.backend.soushi88.com/userDeliveryWx/del",
    addDelivery: "http://user.backend.soushi88.com/userDeliveryWx/add",
    getDelivery: "http://user.backend.soushi88.com/userDeliveryWx/get",
    updateDelivery: "http://user.backend.soushi88.com/userDeliveryWx/update",
    changePassword: "http://user.backend.soushi88.com/userWx/changePassword",
    logout: "http://user.backend.soushi88.com/userWx/logout",
    login: "http://user.backend.soushi88.com/accountWx/login",
    sendRegCode: "http://user.backend.soushi88.com/accountWx/sendRegCode",
    register: "http://user.backend.soushi88.com/accountWx/register",
    resetPasswordPre: "http://user.backend.soushi88.com/accountWx/resetPasswordPre",
    resetPassword: "http://user.backend.soushi88.com/accountWx/resetPassword",
};

if(process.env.NODE_ENV === "production") {
    dataPath = "assets/data";
}

if(local) {
    module.exports = {
        getMyProfile_fail: dataPath + "/getMyProfile_fail.json",
        getMyProfile_success: dataPath + "/getMyProfile_success.json",
        getMyProfile: dataPath + "/getMyProfile.json",
        index: dataPath + "/index.json",
        galleryDetail: dataPath + "/galleryDetail.json",
        gallery: dataPath + "/gallery.json",
        boutique: dataPath + "/boutique.json",
        boutiqueDetail: dataPath + "/boutiqueDetail.json",
        search: dataPath + "/search.json",
        searchDetail: dataPath + "/searchDetail.json",
        send: dataPath + "/send.json",
        delivery: dataPath + "/delivery.json",
        searchPrev: dataPath + "/searchPrev.json",
        setShowPrice: dataPath + "/setShowPrice.json",
        updateMyProfile: dataPath + "/updateMyProfile.json",
        getMyDelivery: dataPath + "/getMyDelivery.json",
        deleteDelivery: dataPath + "/deleteDelivery.json",
        addDelivery: dataPath + "/addDelivery.json",
        getDelivery: dataPath + "/getDelivery.json",
        updateDelivery: dataPath + "/updateDelivery.json",
        changePassword: dataPath + "/changePassword.json",
        logout: dataPath + "/logout.json",
        login: dataPath + "/login.json",
        sendRegCode: dataPath + "/sendRegCode.json",
        register: dataPath + "/register.json",
        resetPasswordPre: dataPath + "/resetPasswordPre.json",
        resetPassword: dataPath + "/resetPassword.json",
    };
}

