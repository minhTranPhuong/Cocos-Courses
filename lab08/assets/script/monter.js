
cc.Class({
    extends: cc.Component,

    properties: {
        hpMonterProgress: cc.Component,
        _actionCollider: null,
        _isDead: false,
        bulletFire:cc.Prefab,
        spineBoy: cc.Component,
        breakSound: {
            default: null,
            type: cc.AudioClip
        },
        _intervalCreateFire:null,
        marginRight:cc.Component,
    },


    playSoundBreak() {
        cc.audioEngine.playEffect(this.breakSound, false);
    },

    onLoad() {
        this._isDead = false;
        this._intervalCreateFire = setInterval(() =>{
            this.shootFire();
        },2000)
    },

    shootFire(){
        let item = cc.instantiate(this.bulletFire);
        item.parent = this.node.parent;
        item.x = this.node.x - 80;
        item.y = this.node.y + 70;
        let action = cc.moveTo(2,this.spineBoy.node.x , this.spineBoy.node.y);
        item.runAction(action);
        cc.log(this.spineBoy)
    },

    start() {

    },

    onCollisionEnter(ortherCol, selfCol) {
        if (ortherCol.name == "bullet<BoxCollider>") {
            this.hpMonterProgress.getComponent(cc.ProgressBar).progress -= 0.1
            this.bingo();
            let actionSound = cc.callFunc(this.playSoundBreak, this);
            this.node.runAction(actionSound)
        }
        if (this.hpMonterProgress.getComponent(cc.ProgressBar).progress <= 0 && this._isDead == false) {
            this.node.opacity = 255
            this.node.angle = -90;
            this._isDead = true;
            clearInterval(this._intervalCreateFire);
            this.marginRight.node.active = true;
            this.node.destroy();
        }
    },

    onCollisionStay() {
        //this.node.opacity = 255;
        this.bingo();
    },

    onCollisionExit() {
        this.node.opacity = 255;
    },

    bingo() {
        let action1 = cc.blink(1, 50);
        let action2 = cc.tintTo(0.5, 255, 0, 0)
        this._actionCollider = cc.sequence(cc.spawn(action1, action2), cc.tintTo(2, 255, 255, 255));
        this.node.runAction(this._actionCollider);
    },

    // update (dt) {},
});
