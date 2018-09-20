/**
 * Created by Administrator on 2018/9/14.
 */
var log_level = {
    log:0,
    info:1,
    warn:2,
    error:3
}
Class({
    ClassName: "App.Lib.Log.CLogSystem",
    file:null,
    isInTerminal:true,
    logLevel:0,
    Base:"App.Lib.CBaseSystem",
    init: function () {
        var self = this;
        self._log = console.log;
        self._info = console.info;
        self._warn = console.warn;
        self._error = console.error;
        for(var key in log_level){
            (function(key){
                console[key] = function(str){
                    if(log_level[key]<self.logLevel){
                        return;
                    }
                    if(self.isInTerminal){
                        self["_"+key](str);
                    }
                    self[key](str);
                }
            })(key)
        }
    },
    config:function(logLevel,isInTerminal){
        this.isInTerminal = isInTerminal;
        this.logLevel = logLevel;
    },
    log:function(str){

    },
    info:function(str){

    },
    warn:function(str){

    },
    error:function(str){

    }
}).Static({
    Instance: Core.Instance
})