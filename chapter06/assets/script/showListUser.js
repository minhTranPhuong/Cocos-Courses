const Emitter = require("mEmitter");
const emitterName = require("emitterName");
cc.Class({
    extends: cc.Component,

    properties: {
        itemUser: cc.Prefab,
        _loginCom: null
    },

    // LIFE-CYCLE CALLBACKS:

    onEnable(){
    },

    onLoad () {
       
    },

    start () {
        this.enabled = false;
    },

    onDisable(){
        Emitter.instance.registerEvent("showListUser", this.getInfoUser.bind(this))
    },

    getInfoUser(data , loginCom){
        this._loginCom = loginCom;
        let item = cc.instantiate(this.itemUser);
        item.getChildByName("userName").getComponent(cc.Label).string = data.email; 
        item.parent = this.node.getChildByName("NewScrollView").getChildByName("view").getChildByName("content");
        item.x = 22.208;
        //cc.log(data, loginCom);
    }



    // update (dt) {},


});
