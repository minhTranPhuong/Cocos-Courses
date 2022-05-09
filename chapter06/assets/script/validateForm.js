const Emitter = require("mEmitter");
const emitterName = require("emitterName");
cc.Class({
    extends: cc.Component,

    properties: {
        data: null,
        richText: cc.Component,
        slider:cc.Component,
        _evtActiveForm:null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.data = {email:"" , password:"" , numberPhone:""};
        this._evtActiveForm = this.activeForm.bind(this);
        Emitter.instance.registerEvent(emitterName.activeValidateForm, this._evtActiveForm);
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
            Emitter.instance.emit(emitterName.activeBtnRegister,false)
            return false; 
        }
        else{ 
            cc.log("true")
            Emitter.instance.emit(emitterName.activeBtnRegister,true)
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
    },

    loading(){
        this.richText.node.active = true;
        this.slider.node.active = true
        this.slider.getComponent(cc.ProgressBar).progress = 0
        var interval = setInterval(() => {
            this.slider.getComponent(cc.ProgressBar).progress += 0.01;
            if (this.slider.getComponent(cc.ProgressBar).progress >= 1) {
                this.slider.getComponent(cc.ProgressBar).progress = 0;
                Emitter.instance.emit(emitterName.submitForm, this.data , this);
                Emitter.instance.emit(emitterName.activeBtn, true);
                this.slider.node.active = false;
                this.richText.node.active = false;
                clearInterval(interval);
            }
        }, 30)
    },



    activeForm(){
        this.node.active = true;
    },

    update (dt) {
    },
});
