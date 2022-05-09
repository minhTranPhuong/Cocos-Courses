const Emitter = require("mEmitter");
const emitterName = require("emitterName");
cc.Class({
    extends: cc.Component,
    properties: {
        dataSubmit: cc.Node,
        showUser: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    },

    eventClick(){
        let data = this.dataSubmit.getComponent("validateForm").data;
        Emitter.instance.emit(emitterName.submit, data);
        this.node.active = false;
        this.showUser.active = true
    },

    onDisable(){
    },

    update (dt) {
    },
});
