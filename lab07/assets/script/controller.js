const Emitter = require("mEmitter");
cc.Class({
    extends: cc.Component,

    properties: {
        isActionMove : false,
        isActionJump: false,
        arrKey:null
    },

    onLoad () {
        this.arrKey = new Map();
        // this.input.on(cc.Input.EventType.KEY_DOWN, this.onKeyDown , this)
        this.onEvent();
        Emitter.instance.registerEvent("doneEvent", this.dontEvent.bind(this));
    },

    dontEvent(){
        cc.log(this)
        this.isActionJump = false;
        this.isActionMove = false;
    },

    onEvent(){
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyJump, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDownMove, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    // onKeyUp(evt){
    //     Emitter.instance.emit("onKeyUp");
    //     this.arrKey.delete(evt.keyCode)
    //     for(const [key,value] of this.arrKey){
    //         cc.log(this.isActionJump,this.isActionMove);
    //         if(key == 38){
    //             this.onKeyJump(value);
    //             return;
    //         }
    //         this.onKeyDownMove(value);
    //     }
    // },

    onKeyDownMove(evt){
        cc.log(evt)
        this.arrKey.set(evt.keyCode , evt)
        if(this.isActionMove == true){
            return;
        }
        this.isActionMove = true;
        switch(evt.keyCode){
            case cc.macro.KEY.left:
                break;
            case cc.macro.KEY.right:
                Emitter.instance.emit("goRight", Emitter);
                break;
            default : 
                this.isActionMove = false;
                break;
        }
    },  

    onKeyJump(evt){
        if(this.isActionJump == true){
            return;
        }
        this.isActionJump = true;
        switch(evt.keyCode){
            case cc.macro.KEY.up: 
            Emitter.instance.emit("jump", Emitter);
            break;
        default :
            this.isActionJump= false;
            break;
        }
    },

    start () {

    },

    update (dt) {
    },
});
