cc.Class({
    extends: cc.Component,

    properties: {
        brownRabbit:{
            default: null,
            type: cc.Component
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.log("Hello");
    },

    update (dt) {
        cc.log("white greyRabbit");
        this.move();
    },

    move(){
        if(this.node.x >= 100){
            this.enabled = false;
            this.brownRabbit.node.active = true;
        }
        else{
            this.node.x = this.node.x + 3;
        }
    }
});
