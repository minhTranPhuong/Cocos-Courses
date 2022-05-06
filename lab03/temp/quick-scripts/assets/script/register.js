(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/register.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6d729fmli9DD6kYsgRZl9Ho', 'register', __filename);
// script/register.js

"use strict";

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
        btndelete: cc.Component,
        _countCheck: 0
    },

    // onLoad () {},

    getInfoRegister: function getInfoRegister() {
        var register = this.node.getChildByName("register");
        this._email = this.getString(register, "Email");
        this._passWord = this.getString(register, "Password");
        this._numberPhone = this.getString(register, "numberPhone");
        this._passWordAgain = this.getString(register, "PasswordAgain");
    },
    handlerRegister: function handlerRegister() {
        this.node.getChildByName("register").active = false;
        this.node.getChildByName("showUser").active = true;
        this.btndelete.node.active = true;
        var item = cc.instantiate(this.prefabItem);
        item.getChildByName("userName").getComponent(cc.Label).string = this._email;
        item.parent = this.content.node;
        item.x = 22.208;
        this.registerAgain.node.active = true;
    },
    handlerRegisterAgain: function handlerRegisterAgain() {
        this.node.getChildByName("register").active = true;
        this.node.getChildByName("showUser").active = false;
        this.registerAgain.node.active = false;
        this.btndelete.node.active = false;
    },
    handleDelete: function handleDelete() {
        var item = this.content.node;
        for (var i = 0; i < item.children.length; i++) {
            cc.log(item.children);
            var checkitem = item.children[i].getChildByName("checkBox").getComponent(cc.Toggle).isChecked;
            if (checkitem == true) {
                item.children[i].destroy();
            }
        }
    },
    getString: function getString(nodeString, labelName) {
        var content = nodeString.getChildByName(labelName).getChildByName("TEXT_LABEL").getComponent(cc.Label).string;
        return content;
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=register.js.map
        