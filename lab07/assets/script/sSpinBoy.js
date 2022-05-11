const Emitter = require("mEmitter");
cc.Class({
    extends: cc.Component,

    properties: {
        spinBoy: sp.Skeleton
    },

    onLoad () {
        Emitter.instance.registerEvent("jump",this.spinBoyJump.bind(this));
        Emitter.instance.registerEvent("goRight",this.spinBoyGoRight.bind(this));
        Emitter.instance.registerEvent("onKeyUp",this.onkeyUp.bind(this));
    },

    onkeyUp(){
        this.spinBoy.setCompleteListener(()=>{
            // this.spinBoy.addAnimation(0,"idle",false);
            this.spinBoy.clearTracks();    
            this.spinBoy.setToSetupPose();
            this.spinBoy.addAnimation(0,'idle',true);
        })
    },

    spinBoyJump(emitter){
        this.spinBoy.setAnimation(0,"jump",false);
        this.spinBoy.setCompleteListener(()=>{
            Emitter.instance.emit("doneEvent");
            this.spinBoy.setAnimation(0,"idle",false);
            this.spinBoy.clearTracks();
            
        })
    },

    spinBoyGoRight(emitter){
        var moveLeft = cc.moveBy(0.8,cc.v2(200,0));
        this.node.runAction(moveLeft);
        this.spinBoy.setAnimation(0,"run",false);
        this.spinBoy.setCompleteListener(()=>{
            Emitter.instance.emit("doneEvent");
            this.spinBoy.setAnimation(0,"idle",false);
            this.spinBoy.clearTracks();
            
        })
    },

    start () {

    },

    // update (dt) {},
});
