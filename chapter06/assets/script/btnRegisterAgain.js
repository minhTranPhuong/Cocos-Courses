const Emitter = require("mEmitter");
const emitterName = require("emitterName");
cc.Class({
    extends: cc.Component,

    properties: {
        _evtActiveNode: null,
    },

    onLoad () {
        this._evtActiveNode = this.activeNode.bind(this);
        Emitter.instance.registerEvent(emitterName.activeBtn,this._evtActiveNode);
    },

    activeNode(bool){
        this.node.active = bool;
    },

    handleClick(){
        this.node.active = false;
        Emitter.instance.emit(emitterName.activeValidateForm)
    },

    start () {

    },

    // update (dt) {},
});
