const Emitter = require("mEmitter");
const emitterName = require("emitterName");
cc.Class({
    extends: cc.Component,

    properties: {
        _countCheck:0
    },

    onLoad () {
        Emitter.instance.registerEvent("activeBtn",this.activeNode.bind(this));
        Emitter.instance.registerEvent("activeValidateForm", this.activeNode.bind(this));
        Emitter.instance.registerEvent("isChecked", this.isCheck.bind(this));
    },

    isCheck(check){
        this._countCheck = check? this._countCheck + 1 : this._countCheck - 1;
        cc.log(this._countCheck)
        if(this._countCheck == 0){
            this.getComponent(cc.Button).interactable = false;
            return;
        }
        this.getComponent(cc.Button).interactable = true;
    },

    activeNode(bool = false) {
        this.node.active = bool;
    },

    handleClick(){
        Emitter.instance.emit("deleteItem");
    },

    hello(){
        cc.log(1234)
    },

    start () {

    },

    // update (dt) {},
});
