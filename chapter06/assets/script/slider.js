const Emitter = require("mEmitter");
const emitterName = require("emitterName");

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onChange(vl){
        Emitter.instance.emit("changeSize" , vl.progress)
    }

    // update (dt) {},
});
