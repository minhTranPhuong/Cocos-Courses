const Emitter = require("mEmitter");
const emitterName = require("emitterName");
cc.Class({
    extends: cc.Component,

    properties: {
        _evtSendData: null,
    },


    onLoad () {
        this._evtSendData = this.sendData;
    },

    start () {
        Emitter.instance.emit(emitterName.activeBtn, false);
    },

    onEnable(){
        Emitter.instance.registerEvent(emitterName.submitForm, this._evtSendData)
    },

    sendData(data, loginCom){
        loginCom.node.active = false;
        Emitter.instance.emit(emitterName.showListUser , data , loginCom);
    }

    // update (dt) {},
});
