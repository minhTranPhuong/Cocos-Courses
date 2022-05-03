cc.Class({
    extends: cc.Component,

    properties: {
        brownRabbit:{
            default: null,
            type: cc.Component
        },
        _moveLimit: 100
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.log("Hello");
    },

    update (dt) {
        cc.log("update White Rabbit !!!");
        this.move();
    },

    move(){
        if(this.node.x >= this._moveLimit){
            this.enabled = false;
            this.brownRabbit.node.active = true;
        }
        else{
            this.node.x = this.node.x + 3;
        }
    }
});
