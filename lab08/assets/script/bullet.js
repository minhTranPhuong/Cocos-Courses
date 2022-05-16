
cc.Class({
    extends: cc.Component,

    properties: {
        direction:1,
    },

    onLoad () {
        this.node.x  = this.node.x  + 50;
        this.node.y  = this.node.y  + 50;

        var action = cc.moveBy(0.1,cc.v2(this.direction * 1000,0)).repeatForever();
        this.node.runAction(action);
    },

    start () {
    },

    onCollisionEnter(ortherCol , selfCol){
        if(ortherCol.name == "monter<BoxCollider>"){
            this.node.destroy();
        }
        if(ortherCol.name == "fire<BoxCollider>"){
            ortherCol.node.destroy();
            this.node.destroy();
        }
    },

    update (dt) {
    },
});
