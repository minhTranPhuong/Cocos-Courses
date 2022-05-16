const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        Emitter.instance.registerEvent("gameOver" , this.gameOver.bind(this));
    },

    gameOver(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown(evt) {
        switch (evt.keyCode) {
            case cc.macro.KEY.left:
                Emitter.instance.emit("move",'left');
                break;
            case cc.macro.KEY.right:
                Emitter.instance.emit("move",'right');
                break;
            case cc.macro.KEY.up:
                Emitter.instance.emit("jump");
                break;
            case cc.macro.KEY.space:
                Emitter.instance.emit("shoot");
                break;
            default:break;
        }
    },

    onKeyUp(evt) {
        switch (evt.keyCode) {
            case cc.macro.KEY.left:
            case cc.macro.KEY.right:
                Emitter.instance.emit("dontMove");
                break;
            case cc.macro.KEY.up:
                Emitter.instance.emit("dontJump");
                break;
            case cc.macro.KEY.space:
                Emitter.instance.emit("dontShoot");
                break;
            default:break;
        }
    },

    start() {

    },

    // update (dt) {},
});
