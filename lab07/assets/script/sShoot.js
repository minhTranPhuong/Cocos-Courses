const Emitter = require("mEmitter");
cc.Class({
    extends: cc.Component,

    properties: {
        _x : 0,
        _y:0
    },

    onLoad () {
        this._x = this.node.x;
        this._y = this.node.y;
        Emitter.instance.registerOnce("bulletMove", this.bulletMove.bind(this));
    },

    bulletMove(){
        // cc.log(this.node.x , this.node.y)
        var callBack = new cc.CallFunc(()=>{
            this.node.destroy();
        })
        let action = cc.moveBy(0.8,cc.v2(this._x + 1000 , this._y +100))
        // cc.tween(this.node)
        //     .to(0.8,{ x: this._x + 500 , y:this._y}).call(()=>{
        //         this.node.destroy();
        //     })
        //     .start();
        this.node.runAction(new cc.sequence(action, callBack))
    },

    onCollisionEnter(val1 , val2){
        Emitter.instance.emit("bingo");
    },

    start () {

    },

    // update (dt) {},
});
