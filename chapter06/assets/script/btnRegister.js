const Emitter = require("mEmitter");
const emitterName = require("emitterName");
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance.registerEvent("activeBtnRegister", this.checkForm.bind(this))
    },

    checkForm(value) {
        if(value){
            this.getComponent(cc.Button).interactable = true
        }
        else{
            this.getComponent(cc.Button).interactable = false
        }
    },

    start () {
    },

    // update (dt) {},
});
