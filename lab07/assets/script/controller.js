const Emitter = require("mEmitter");
cc.Class({
    extends: cc.Component,

    properties: {
        _keys: null,
        _isAction: false,
        _isDone: false
    },

    onKeyDown(e) {
        if (!this._keys.has(e.keyCode) && this._isDone == true) {
            this._isAction = false;
        }
        this._keys.set(e.keyCode, e);

        if (this._isAction == true) {
            return;
        }
        this._isAction = true;
        this._isDone = false;
        this.catchEvent(e.keyCode);
    },

    catchEvent(keyCode) {
        switch (keyCode) {
            case cc.macro.KEY.up:
                if (this._keys.has(cc.macro.KEY.right)) {
                    Emitter.instance.emit("jumpRight","right");
                }
                else if (this._keys.has(cc.macro.KEY.left)) {
                    Emitter.instance.emit("jumpRight","left");
                }
                else{
                    Emitter.instance.emit("jump");
                }
                break;
            case cc.macro.KEY.right:
                Emitter.instance.emit("goRight","right");
                break;
            case cc.macro.KEY.space:
                if (this._keys.has(cc.macro.KEY.right)) {
                    Emitter.instance.emit("runRight","right");
                }
                else if(this._keys.has(cc.macro.KEY.left)){
                    Emitter.instance.emit("runRight","left");
                }
                break;
            case cc.macro.KEY.left:
                Emitter.instance.emit("goRight","left");
                break;
            case cc.macro.KEY.q:
                Emitter.instance.emit("shoot");
            default: break;
        }
    },

    onKeyUp(e) {
        Emitter.instance.emit("keyUp")
        this._keys.delete(e.keyCode);
        for(const value of this._keys.values()){
            if(this._keys.size > 1) return;
            this.onKeyDown(value)
            return;
        }
    },
    onLoad() {
        this._keys = new Map();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,
            this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,
            this.onKeyUp, this);
        Emitter.instance.registerEvent("doneEvent", this.dontEvent.bind(this));
    },

    dontEvent() {
        this._isAction = false;
        this._isDone = true;
    },

    start() {

    },

    update(dt) {
    },
});