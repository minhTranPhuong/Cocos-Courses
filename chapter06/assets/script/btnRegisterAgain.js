const Emitter = require("mEmitter");
const emitterName = require("emitterName");
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {
        Emitter.instance.registerEvent("activeBtn",this.activeNode.bind(this));
    },

    activeNode(bool){
        this.node.active = bool;
    },

    handleClick(){
        this.node.active = false;
        Emitter.instance.emit("activeValidateForm")
    },

    start () {

    },

    // update (dt) {},
});
