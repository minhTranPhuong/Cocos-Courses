cc.Class({
    extends: cc.Component,

    properties: {
        _email: "",
        _passWord: "",
        _numberPhone: "",
        _passWordAgain: "",
        prefabItem: cc.Prefab,
        registerAgain: cc.Component,
        content: cc.Component,
        btnRegister:cc.Component,
        btndelete: cc.Component,
        wellcome: cc.Component,
        slider: cc.Component,
        loading: cc.Component,
        _countCheck: 0
    },

    // onLoad () {},

    getInfoRegister() {
        let register = this.node.getChildByName("register");
        this._email = this.getString(register, "Email");
        this._passWord = this.getString(register, "Password");
        this._numberPhone = this.getString(register, "numberPhone");
        this._passWordAgain = this.getString(register, "PasswordAgain");
    },

    handlerRegister() {
        this.enabled= false;
        let item = cc.instantiate(this.prefabItem);
        item.getChildByName("userName").getComponent(cc.Label).string = this._email;
        item.parent = this.content.node;
        item.x = 22.208;
        this.loading.node.active = true;
        this.loadingProgressBar();
    },

    loadingProgressBar() {
        this.wellcome.node.active = true;
        var interval = setInterval(() => {
            this.loading.getComponent(cc.ProgressBar).progress += 0.01;
            if (this.loading.getComponent(cc.ProgressBar).progress >= 1) {
                this.loading.node.active = false;
                this.activeNode(true)
                clearInterval(interval);
            }
        }, 50)
    },

    activeNode(bool) {
        this.wellcome.node.active = false;
        this.node.getChildByName("register").active = !bool;
        this.node.getChildByName("showUser").active = bool;
        this.registerAgain.node.active = bool;
        this.btndelete.node.active = bool;
        this.slider.node.active = bool;
    },

    handleSlider() {
        var item = this.content.node;
        for (var i = 0; i < item.children.length; i++) {
            let labelPrefab =  item.children[i].getChildByName("userName").getComponent(cc.Label);
            labelPrefab.fontSize = 8 + (0.125 * this.slider.progress * 64);
        }
    },

    handlerRegisterAgain() {
        this.loading.getComponent(cc.ProgressBar).progress = 0;
        this.activeNode(false);
    },

    handleDelete() {
        var item = this.content.node;
        for (var i = 0; i < item.children.length; i++) {
            cc.log(item.children)
            var checkitem = item.children[i].getChildByName("checkBox").getComponent(cc.Toggle).isChecked;
            if (checkitem == true) {
                item.children[i].destroy();
            }
        }
    },

    getString(nodeString, labelName) {
        var content = nodeString.getChildByName(labelName).getChildByName("TEXT_LABEL").getComponent(cc.Label).string;
        return content;
    },

    start() {

    },

    update (dt) {
        this.getInfoRegister();
        if(this._email.trim() != "" && this._passWord.trim() != "" && this.checkEmail() == true) 
        {
            this.btnRegister.getComponent(cc.Button).interactable = true;
        }
        else{
            this.btnRegister.getComponent(cc.Button).interactable = false;
        }
    },

    checkEmail(){
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
        if (!filter.test(this._email)) { 
                 return false; 
        }
        else{ 
                 return true; 
        } 
    }
});