// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var whiteRabbit = require("whiteRabbit");
cc.Class({
    extends: whiteRabbit,

    properties: {
        _timeScale: 1,
        _oldScale: 0,
        _flip: false,
        _oldPosition: 0,
        _move: false,
        _limitScale: 3
    },

    onLoad () {
        this.node.active=false;
    },

    start() {
        cc.log("Hello");
        this._oldScale = this.node.scale;
        this._oldPosition = this.node.x;
    },

    update(dt) {
        cc.log("update black Rabbit !!!");
        if (this._timeScale < this._limitScale) {
            this._timeScale += 0.01;
            this.node.scale = this._oldScale * this._timeScale;
        }
        else if (!this._move && this.node.x < 100) {
            this.move();
        }
        else if (this._flip == false) {
            this.node.scaleX *= (-1);
            this._flip = true;
            this._move = true;
        }
        else {
            this.node.x -= 3;
            if (this.node.x == this._oldPosition) {
                this.node.scaleX *= (-1);
                this.enabled = false;
            }
        }
    },
});
