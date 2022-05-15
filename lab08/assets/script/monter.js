

cc.Class({
    extends: cc.Component,

    properties: {
        hpMonterProgress: cc.Component,
        _actionCollider: null,
    },

    // onLoad () {},

    start () {

    },

    onCollisionEnter(ortherCol , selfCol){
        if(ortherCol.name == "bullet<BoxCollider>"){
            this.hpMonterProgress.getComponent(cc.ProgressBar).progress -= 0.1
            this.bingo();
        }
    },

    onCollisionExit(){
        this.node.opacity =255;
    },

    bingo(){
        let action1 = cc.blink(1, 50);
        let action2 = cc.tintTo(0.5, 255, 0, 0)
        this._actionCollider = cc.sequence(cc.spawn(action1, action2),cc.tintTo(2,255,255,255));
        this.node.runAction(this._actionCollider);
    },

    // update (dt) {},
});
