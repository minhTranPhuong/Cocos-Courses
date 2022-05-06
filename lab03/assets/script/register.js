cc.Class({
    extends: cc.Component,

    properties: {
        _email: "",
        _passWord:"",
        _numberPhone:"",
        _passWordAgain: "",
        prefabItem: cc.Prefab,
        registerAgain: cc.Component,
        content: cc.Component,
        btndelete: cc.Component,
        _countCheck:0
    },

    // onLoad () {},

    getInfoRegister(){
        let register = this.node.getChildByName("register");
        this._email = this.getString(register,"Email");
        this._passWord =  this.getString(register,"Password"); 
        this._numberPhone = this.getString(register,"numberPhone");
        this._passWordAgain = this.getString(register,"PasswordAgain");
    },

    handlerRegister(){
        this.node.getChildByName("register").active= false;
        this.node.getChildByName("showUser").active = true;
        this.btndelete.node.active = true;
        let item = cc.instantiate(this.prefabItem);
        item.getChildByName("userName").getComponent(cc.Label).string  = this._email;
        item.parent = this.content.node;
        item.x = 22.208;
        this.registerAgain.node.active = true;
    },

    handlerRegisterAgain(){
        this.node.getChildByName("register").active= true;
        this.node.getChildByName("showUser").active = false;
        this.registerAgain.node.active = false;
        this.btndelete.node.active = false;
    },

    handleDelete(){
        var item = this.content.node;
        for(var i =0 ; i< item.children.length ; i++){
            cc.log(item.children)
            var checkitem = item.children[i].getChildByName("checkBox").getComponent(cc.Toggle).isChecked;
            if(checkitem == true){
                item.children[i].destroy();
            }
        }
    },

    getString(nodeString, labelName){
        var content =  nodeString.getChildByName(labelName).getChildByName("TEXT_LABEL").getComponent(cc.Label).string;
        return content;
    },

    start () {

    },

    // update (dt) {},
});