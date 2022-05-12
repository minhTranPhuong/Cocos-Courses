const Emitter = require("mEmitter");
cc.Class({
    extends: cc.Component,

    properties: {
        hpMonter:cc.Component,
        winner:cc.Component
    },

    onLoad () {
        cc.log(this.winner)
        Emitter.instance.registerEvent("bingo", this.binGo.bind(this));
    },

    binGo(){
        
        cc.log(this.hpMonter.node.getComponent(cc.ProgressBar).progress )
       this.hpMonter.node.getComponent(cc.ProgressBar).progress -= 0.1;
       if(this.hpMonter.node.getComponent(cc.ProgressBar).progress <= 0){
           this.winner.node.active = true;
           this.node.destroy();
       }
    },

    start () {

    },

    // update (dt) {},
});
