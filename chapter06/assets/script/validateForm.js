const Emitter = require("mEmitter");
const emitterName = require("emitterName");
cc.Class({
    extends: cc.Component,

    properties: {
        data: null,
        richText: cc.Component,
        slider:cc.Component
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.data = {email:"" , password:"" , numberPhone:""};
        Emitter.instance.registerEvent("activeValidateForm", this.activeForm.bind(this));
    },

    start () {
    },

    onHello(data){
        cc.log(data)
    },


    checkEmail(edtEmail){
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
        if (!filter.test(edtEmail.string)) { 
            alert("email khong hợp lệ: example@gmail.com");
            Emitter.instance.emit("activeBtnRegister",false)
            return false; 
        }
        else{ 
            cc.log("true")
            Emitter.instance.emit("activeBtnRegister",true)
            return true; 
        } 
    },


    getStringEmail(edtEmail){
        this.data.email = edtEmail.string.trim();
    },

    getStringPassword(edtPassword){
        this.data.password = edtPassword.string.trim();
    },

    getStringNumberPhone(edtNumberPhone){
        this.data.numberPhone = edtNumberPhone.string.trim();
    },

    submitButton(){
        this.loading();
        Emitter.instance.emit("submitForm", this.data , this);
        Emitter.instance.emit("activeBtn", true);
    },

    loading(){
        this.richText.node.active = true;
        this.slider.node.active = true
        this.slider.getComponent(cc.ProgressBar).progress = 0
        var interval = setInterval(() => {
            this.slider.getComponent(cc.ProgressBar).progress += 0.01;
            if (this.slider.getComponent(cc.ProgressBar).progress >= 1) {
                this.slider.getComponent(cc.ProgressBar).progress = 0;
                this.slider.node.active = false;
                this.richText.node.active = false;
            }
        }, 50)
    },



    activeForm(){
        this.node.active = true;
    },

    update (dt) {
    },
});
