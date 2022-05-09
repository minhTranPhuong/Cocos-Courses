const Emitter = require("mEmitter");
const emitterName = require("emitterName");
cc.Class({
    extends: cc.Component,

    properties: {
        data: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.data = {email:"" , password:"" , numberPhone:""};
    },

    start () {
        Emitter.instance.registerEvent(emitterName.submit , this.onHello.bind(this));
    },

    onHello(data){
        cc.log(data)
    },


    checkEmail(edtEmail){
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
        if (!filter.test(edtEmail.string)) { 
            cc.log("false");
            return false; 
        }
        else{ 
            cc.log("true")
            return true; 
        } 
    },

    getStringEmail(edtEmail){
        this.data.email = edtEmail.string;
    },

    getStringPassword(edtPassword){
        this.data.password = edtPassword.string;
    },

    getStringNumberPhone(edtNumberPhone){
        this.data.numberPhone = edtNumberPhone.string;
    },

    update (dt) {

    },
});
