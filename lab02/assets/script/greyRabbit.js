// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        _time : 0,
        _Ystart: 0,
        _Yend:0,
        _state: "up",
        blackGrabbit:{
            default: null,
            type:cc.Component
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.active = false;
    },

    start () {
        cc.log("Hmmm")
        this._Ystart = this.node.y;
        this._Yend = this.node.y + 49;
    },

    update (dt) {
        cc.log("update greyRabbit");
        if(this._time == 3){
            this.enabled = false;
            this.blackGrabbit.node.active = true;
            return;
        } 
        if(this._state === "up")
        {
            if(this.node.y == this._Yend) this._state = "down";
            this.node.y +=1;
        }
        else{
            if(this.node.y == this._Ystart)
            {
                this._state = "up";
                this._time++;
            } 
            this.node.y -=1;
        }
    },
});
// 10 => 20 => 30 => 40 => 50