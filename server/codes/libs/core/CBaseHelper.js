/**
 * Created by Administrator on 2016/11/24.
 */
require("./Core");
if(!String.prototype.Format)
{
    String.Parse = function(a) {
        if (void 0 === a || null === a) return "(" + String(a) + ")";
        if (a.constructor === String || a.constructor === Number) return a;
        if (a instanceof Function) return  "[" + a.toString() + "]";
        if (a instanceof Array) try {
            return JSON.stringify(a)
        } catch(c) {
            Class.Assert(!1, c)
        }
        try {
            return JSON.stringify(a)
        } catch(e) {
            Class.Assert(!1, e)
        }
        return "(error)"
    };
    String.prototype.Format = function(){
        var a = arguments;
        if (1 === a.length) {
            var c = a[0];
            if (c instanceof Array) a = c;
            else if (c.constructor === Object) {
                var e = /{([^{}]+)}/gm;
                return this.replace(e,
                    function(a, b) {
                        return c.hasOwnProperty(b) ? String.Parse(c[b]) : a
                    })
            }
        }
        e = /{(\d+)}/gm;
        return this.replace(e,
            function(c, d) {
                return~~d < a.length ? String.Parse(a[~~d]) : c
            })
    }
    String.prototype.replaceAll = function(s1,s2){
        return this.replace(new RegExp(s1,"gm"),s2);
     }
    String.prototype.endWith = function(str){
        if(str==null || str=="" || this.length == 0 ||str.length > this.length){
            return false;
        }
        if(this.substring(this.length - str.length) == str){
            return true;
        }else{
            return false;
        }
        return true;
    };

    String.prototype.startWith = function(str){
        if(str == null || str== "" || this.length== 0 || str.length > this.length){
            return false;
        }
        if(this.substr(0,str.length) == str){
            return true;
        }else{
            return false;
        }
        return false;
    };

    function a(a, c, e, f) {
        var g;
        return g = function() {
            c ? a.apply(c, e) : a.apply(null, e);
            f && clearTimeout(g)
        }
    }
    function c(b) {
        return function(c, e, f, g) {
            c = a(c, f, g);
            return b(c, e)
        }
    }
    global.setTimeout = c(setTimeout);
    global.setInterval = c(setInterval)
}

Object.redefineFunction = function(p,n,f)
{
    var of = p[n];
    p[n] = function()
    {
        f.apply(this,arguments);
        if(of)
            of.apply(this,arguments);
    }
}