const Emitter = require("mEmitter");
const emitterName = require("emitterName");

cc.Class({
    extends: cc.Component,

    properties: {
        slider:cc.Component
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    activeNode(){
    },

    start () {
        cc.log(123)
        this.slider.node.active = true
        this.slider.getComponent(cc.ProgressBar).progress = 0
        var interval = setInterval(() => {
            this.slider.getComponent(cc.ProgressBar).progress += 0.01;
            if (this.slider.getComponent(cc.ProgressBar).progress >= 1) {
                this.slider.getComponent(cc.ProgressBar).progress = 0
                this.slider.node.active = false;
                this.node.active = false;
                
            }
        }, 50)

    },

    // update (dt) {},
});
