const Emitter= require("mEmitter");
const emitterName = require("emitterName");
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance.registerEvent(emitterName.submit , this.onHello.bind(this));
    },


    start () {
        Emitter.instance.registerEvent(emitterName.submit , this.onHello.bind(this));
    },

    onHello(data){
        cc.log(data)
    },


    onEnable(){
        Emitter.instance.registerEvent(emitterName.submit , this.onHello.bind(this));
    },

    update (dt) {
    },
});
