const Emitter = require("mEmitter");
const emitterName = require("emitterName");
cc.Class({
    extends: cc.Component,

    properties: {
        _countCheck:0,
        _evtActiveNode: null,
        _evtIsCheck: null,
    },

    onLoad () {
        this._evtActiveNode = this.activeNode.bind(this)
        this._evtIsCheck = this.isCheck.bind(this)
        Emitter.instance.registerEvent(emitterName.activeBtn,this._evtActiveNode);
        Emitter.instance.registerEvent(emitterName.activeValidateForm, this._evtActiveNode);
        Emitter.instance.registerEvent(emitterName.isChecked, this._evtIsCheck);
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
        this._countCheck = 0;
        Emitter.instance.emit(emitterName.deleteItem);
        this.getComponent(cc.Button).interactable = false;
    },

    hello(){
        cc.log(1234)
    },

    start () {

    },

    // update (dt) {},
});
