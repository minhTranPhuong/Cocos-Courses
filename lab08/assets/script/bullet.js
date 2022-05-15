
cc.Class({
    extends: cc.Component,

    properties: {
        direction:1,
    },

    onLoad () {
        var action = cc.moveBy(0.01,cc.v2(this.direction * 1000,0)).repeatForever();
        this.node.runAction(action);
    },

    start () {
    },

    onCollisionEnter(ortherCol , selfCol){
        if(ortherCol.name == "monter<BoxCollider>"){
            this.node.destroy();
        }
    },

    update (dt) {
    },
});
