const EventEmitter = require('events');
class mEmitter {
    constructor() {
        this._emiter = new EventEmitter();
        this._emiter.setMaxListeners(100);
    }
    emit(...args)// => phat
    {
        this._emiter.emit(...args);
    }
    registerEvent(event, listener) {// dang ky
        this._emiter.on(event, listener);
    }
    registerOnce(event, listener) { // dang ky  1 lan
        this._emiter.once(event, listener);
    }
    removeEvent(event, listener) { // xoa event
        this._emiter.removeListener(event, listener);
    }
    destroy() {
        this._emiter.removeAllListeners();
        this._emiter = null;
        mEmitter.instance = null;
    }
}
mEmitter.instance = mEmitter.instance == null ? new mEmitter() : mEmitter.instance;
module.exports = mEmitter;