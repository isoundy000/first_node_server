Class({
    ClassName: "App.Lib.Filter.CFilterData",
    dic:null,
    ctor:function(){
        this.dic = {};
    },
    set: function (key) {
        if(this.dic.hasOwnProperty(key)){
            throw "CFilterData add {0} more times".Format(key);
            return ;
        }
        this.dic[key] = true;
    },
    check:function (key) {
        return this.dic[key];
    }
})