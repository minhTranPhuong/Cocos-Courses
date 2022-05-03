
cc.Class({
    extends: cc.Component,

    properties: {
        greyRabbit:{
            default: null,
            type: cc.Component
        },
        _moveLimit:100
    },

    onLoad () {
        this.node.active = false;
    },

    start () {
        cc.log("Hello");
        cc.log("I'm Brownie");
    },

    update (dt) {
        cc.log("update brow Rabbit!!!");
        if(this.node.x < this._moveLimit){
            this.node.angle -= 9;
            this.node.x+=3   
        }
        else{
            this.node.angle = 0;
            this.enabled = false;
            this.greyRabbit.node.active = true;
        }
    },
});
