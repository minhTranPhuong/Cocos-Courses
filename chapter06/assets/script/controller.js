const Emitter = require("mEmitter");
const emitterName = require("emitterName");
cc.Class({
    extends: cc.Component,

    properties: {
    },


    onLoad () {
    },

    start () {
        Emitter.instance.emit("activeBtn", false);
    },

    onEnable(){
        Emitter.instance.registerEvent("submitForm", this.sendData)
    },

    sendData(data, loginCom){
        loginCom.node.active = false;
        Emitter.instance.emit("showListUser" , data , loginCom);
    }

    // update (dt) {},
});
