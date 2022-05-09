const Emitter = require("mEmitter");
const emitterName = require("emitterName");
cc.Class({
    extends: cc.Component,

    properties: {
        checkbox: cc.Component,
        _evtDelete: null,
        _evtChangeSize : null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._evtDelete = this.deleteItem.bind(this);
        this._evtChangeSize = this.changeSize.bind(this)
        Emitter.instance.registerEvent(emitterName.deleteItem,this._evtDelete);
        Emitter.instance.registerEvent(emitterName.changeSize,this._evtChangeSize);
    },

    changeSize(value){
        this.node.getChildByName("userName").getComponent(cc.Label).fontSize = 8 + (0.125 * value * 64);
    },

    isCheck(){
        Emitter.instance.emit(emitterName.isChecked, this.checkbox.isChecked);
    },

    deleteItem(){
        let check = this.checkbox || false;
        if(check.isChecked == true){
            Emitter.instance.removeEvent(emitterName.deleteItem,this._evtDelete)
            Emitter.instance.removeEvent(emitterName.changeSize,this._evtChangeSize)
            this.node.parent.removeChild(this.node)
            this.node.destroy();
            this.destroy();
            cc.log(this.node);
        }
    },

    start () {

    },

    // update (dt) {},
});
