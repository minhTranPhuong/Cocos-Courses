const Emitter = require("mEmitter");
const emitterName = require("emitterName");
cc.Class({
    extends: cc.Component,

    properties: {
        checkbox: cc.Component,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance.registerEvent("deleteItem",this.deleteItem.bind(this));
        Emitter.instance.registerEvent("changeSize",this.changeSize.bind(this));
    },

    changeSize(value){
        this.node.getChildByName("userName").getComponent(cc.Label).fontSize = 8 + (0.125 * value * 64);
    },

    isCheck(){
        Emitter.instance.emit("isChecked", this.checkbox.isChecked);
    },

    deleteItem(){
        cc.log(this.checkbox);
        let check = this.checkbox || false;
        if(check.isChecked == true){
            this.node.parent.removeChild(this.node)
            this.node.destroy();
        }
    },

    start () {

    },

    // update (dt) {},
});
