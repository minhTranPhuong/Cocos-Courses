const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        _action: null,
        _handleMove: null,
        _handleDontMove: null,
        _handleJump: null,
        _handleDontJump: null,
        _handleShoot: null,
        spinboy: sp.Skeleton,
        hpProgressBar: cc.Component,
        prefabBullet: cc.Prefab,
        _isMove: false,
        _isJump: false,
        _scaleX: 0,
        _worldX: 0,
        _worldY: 0,
        _actionCollider: null,
        _isDead: false,
    },

    onLoad() {

        var fl = cc.follow(this.hpProgressBar.node, cc.rect(0, 0, 300, 15));
        this.node.runAction(fl)

        this._scaleX = this.node.scaleX;
        this.registerEmitter();
        this.spinboy.setAnimation(0, 'portal', false);

        this.spinboy.setMix('run', "idle", 0.3);
        this.spinboy.setMix('portal', "run", 0.3);
        this.spinboy.setMix('run', "jump", 0.1);
        this.spinboy.setMix('jump', "idle", 0.1);
        this.spinboy.setMix('idle', "jump", 0.1);
        this.spinboy.setMix('jump', "run", 0.1);
        this.spinboy.setMix('jump', "shoot", 0.1);
        this.spinboy.setMix('jump', "death", 0.1);
        this.spinboy.setMix('run', "death", 0.1);
    },

    registerEmitter() {
        this._handleMove = this.handleMove.bind(this);
        Emitter.instance.registerEvent("move", this._handleMove);

        this._handleDontMove = this.handleDontMove.bind(this);
        Emitter.instance.registerEvent("dontMove", this._handleDontMove);

        this._handleJump = this.handleJump.bind(this);
        Emitter.instance.registerEvent("jump", this._handleJump);

        this._handleDontJump = this.handleDontJump.bind(this);
        Emitter.instance.registerEvent("dontJump", this._handleDontJump);

        this._handleShoot = this.handleShoot.bind(this);
        Emitter.instance.registerEvent("shoot", this._handleShoot);
    },

    handleShoot() {
        let item = cc.instantiate(this.prefabBullet);
        item.parent = this.node;
        let direction = 1;
        if (this.node.scaleX < 0) {
            direction = -1;
        }
        item.getComponent("bullet").direction = direction;
        item.y = this.node.y / 2 + this._worldY;
        item.x = this.node.x + this._worldX;
    },

    handleDontJump() {
        this.spinboy.setEventListener((vl1) => {
            if (vl1.animationEnd >= 1.3) {
                this._isJump = false;
                if (this._isMove == true) {
                    this.spinboy.setAnimation(0, 'run', true);
                } else {
                    this.spinboy.setToSetupPose();
                    this.spinboy.setAnimation(0, 'idle', false);
                    this.node.stopAllActions();
                }
            }
        });
    },

    handleJump() {
        if (this._isJump == true) return;
        this._isJump = true;
        this.spinboy.setAnimation(0, 'jump', true);
    },

    handleDontMove() {
        if (this._isJump == true) {
            this._isMove = false;
            this.spinboy.setEventListener((vl1) => {
                if (vl1.animationEnd >= 1.3) {
                    this.spinboy.setToSetupPose();
                    this.spinboy.setAnimation(0, 'idle', false);
                    this._isJump = false;
                    this.node.stopAllActions();
                }
            })
        }
        else {
            this.spinboy.setToSetupPose();
            this.spinboy.setAnimation(0, 'idle', false);
            this._isMove = false;
            this._isJump = false;
            this.node.stopAllActions();
        }
    },

    handleDead() {
        
        this._isMove = true;
        this._isJump = true;
        this.spinboy.setCompleteListener((vl) => {
            if (vl.animationEnd <= 1.7) {
                this.node.opacity = 255;
                this.node.stopAllActions();
                this.spinboy.clearTracks();
                this.spinboy.setToSetupPose();
                this.spinboy.setAnimation(0, "death", false);
            }
        })
    },

    spinBoyTurn(act) {
        cc.log(act)
        var direction = 1;
        if (act == "right") {
            this.node.scaleX = this._scaleX;
        }
        else {
            this.node.scaleX = -this._scaleX;
            direction = -1;
        }
        return direction;
    },

    handleMove(act) {
        cc.log(act)
        if (this._isJump) return;
        if (this._isMove == true) return;
        this._isMove = true;
        this.spinboy.setAnimation(0, 'run', true);
        let turn = this.spinBoyTurn(act);
        this._action = cc.moveBy(0.8, cc.v2(turn * 100, 0)).repeatForever();
        this.node.runAction(this._action);
    },

    start() {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        manager.enabledDrawBoundingBox = true;
    },

    update(dt) {
        this._worldX = this.spinboy.findBone("torso3").worldX;
        this._worldY = this.spinboy.findBone("torso3").worldY;
        this.node.getComponent(cc.BoxCollider).offset = cc.v2(this._worldX, this._worldY);
    },

    onCollisionEnter(orther,self) {
        if(orther.name.indexOf("margin") >= 0){
            this.node.stopAllActions();
            return;
        }
        if(this._isDead == true) return;
        this.node.stopAction(this._actionCollider)
        let action1 = cc.blink(1, 50);
        let action2 = cc.tintTo(0.5, 255, 0, 0)
        this._actionCollider = cc.spawn(action1, action2);
        this.node.runAction(this._actionCollider);
    },

    onCollisionStay(orther, self) {
        if(orther.name.indexOf("margin") >= 0){
            this.node.stopAllActions();
            return;
        }
        let hp = this.hpProgressBar.getComponent(cc.ProgressBar);
        hp.progress -= 0.01;
        if (hp.progress <= 0 && this._isDead == false) {
            cc.log(1);
            this._isDead = true;
            this.handleDead();
        }
    },

    onCollisionExit(orther) {
        if(orther.name.indexOf("margin") >= 0){
            return;
        }
        this.node.opacity = 255;
        this.node.stopAction(this._actionCollider);
        this._actionCollider = cc.tintTo(1, 255, 255, 255)
        this.node.runAction(this._actionCollider);
    }
});
