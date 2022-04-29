
cc.Class({
    extends: cc.Component,

    properties: {
        greyRabbit:{
            default: null,
            type: cc.Component
        }
    },

    onLoad () {
        this.node.active = false;
    },

    start () {
        cc.log("Hello");
        cc.log("I'm Brownie");
    },

    update (dt) {
        cc.log("update brownRabbit");
        if(this.node.x <100){
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
