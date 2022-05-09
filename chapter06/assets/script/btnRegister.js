const Emitter = require("mEmitter");
const emitterName = require("emitterName");
cc.Class({
    extends: cc.Component,

    properties: {
        _evtCheckForm:null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._evtCheckForm = this.checkForm.bind(this)
        Emitter.instance.registerEvent(emitterName.activeBtnRegister, this._evtCheckForm)
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
