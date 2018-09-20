/**
 * Created by Administrator on 2018/9/17.
 */
Class({
    ClassName: "App.Lib.Protocol.CProtoSystem",
    msgs:null,
    handlers:null,
    init:function(){
        this.msgs={};
        this.handlers = {};
    },
    clear:function(){
        this.handlers = {};
    },
    initMsg:function(){

    },
    onMessage:function(msg) {
        var id = msg.id;
    },
    encode:function(id,msg){

    },
    decode:function(msg){

    }
})