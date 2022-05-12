const Emitter = require("mEmitter");
cc.Class({
    extends: cc.Component,

    properties: {
        spinBoy: sp.Skeleton,
        _scaleX : 0,
        _directed : "right",
        _action: null,
        _y:0,
        _x:0
    },

    onLoad () {
        this._y = this.node.y;
        this._x = this.node.x;
        this._scaleX = this.node.scaleX;
        Emitter.instance.registerEvent("jump",this.spinBoyJump.bind(this));
        Emitter.instance.registerEvent("jumpRight",this.spinBoyJumpRight.bind(this));
        Emitter.instance.registerEvent("runRight",this.spinBoyRunRight.bind(this));
        Emitter.instance.registerEvent("goRight",this.spinBoyGoRight.bind(this));
        Emitter.instance.registerEvent("keyUp",this.keyUp.bind(this));
        Emitter.instance.registerEvent("shoot",this.shoot.bind(this));
    },

    shoot(){
        this.spinBoy.setAnimation(0,"shoot",false);
        cc.log(this.spinBoy)
        this.spinBoy.setCompleteListener(()=>{
            Emitter.instance.emit("doneEvent");
       })
    },

    keyUp(){
        //this.spinBoy.setCompleteListener(()=>{
            this.node.stopAction(this._action)
            Emitter.instance.emit("doneEvent");
            this.spinBoy.clearTracks();    
            this.spinBoy.setToSetupPose();
            this.spinBoy.setAnimation(0,'idle',true);
        //})
    },

    spinBoyJumpRight(act){
        cc.log(this.node.y)
        var direction = this.spinBoyTurn(act)
        cc.tween(this.node)
            .to(0.2,{position: cc.v2(this.node.x + direction*25, this.node.y + 50)}).call(()=>{
                cc.log(this.node.x,this.node.y)
            })
            .to(0.2,{position: cc.v2(this.node.x + direction*50, this.node.y + 80)})
            .call(()=>{
                cc.log(this.node.x,this.node.y)
            })
            .to(0.2,{position: cc.v2(this.node.x + direction*100, this.node.y + 50)})
            .call(()=>{
                cc.log(this.node.x,this.node.y)
            })
            .to(0.2,{position: cc.v2(this.node.x + direction*125, this.node.y)})
            .call(()=>{
                cc.log(this.node.x,this.node.y)
            })
            .start();
        this.spinBoy.setAnimation(0,"run",false);
        this.spinBoy.setAnimation(0,"hoverboard",false);
        this.spinBoy.setCompleteListener(()=>{
             Emitter.instance.emit("doneEvent");
        })
        cc.log(this.node.y)
    },

    spinBoyJump(){
        cc.log(this.node.y)
        cc.tween(this.node)
            .to(0.4,{position: cc.v2(this.node.x , this.node.y + 70)})
            .to(0.4,{position: cc.v2(this.node.x , this._y)})
            .start();
        this.spinBoy.setAnimation(0,"hoverboard",false);
        this.spinBoy.setCompleteListener(()=>{
            Emitter.instance.emit("doneEvent");
       })
    },


    spinBoyRunRight(act){
        var direction = this.spinBoyTurn(act)
        let action = cc.moveBy(0.8,cc.v2(direction * 100,0));
        this._action = this.node.runAction(action);
        this.spinBoy.setAnimation(0,"run",false);
        this.spinBoy.setCompleteListener(()=>{
            Emitter.instance.emit("doneEvent");
       })
    },

    spinBoyGoRight(act){
        var direction = this.spinBoyTurn(act)
        let action = cc.moveBy(0.9,cc.v2(direction * 50,0));
        this._action = this.node.runAction(action);
        this.spinBoy.setAnimation(0,"walk",false);
        this.spinBoy.setCompleteListener(()=>{
            Emitter.instance.emit("doneEvent");
       })
    },

    spinBoyTurn(act){
        var direction = 1;
        if(act == "right"){
            this.node.scaleX = this._scaleX;
        }
        else{
            this.node.scaleX = -this._scaleX;
            direction = -1;
        }
        return direction;
    },

    start () {

    },

    update (dt) {
    },
});