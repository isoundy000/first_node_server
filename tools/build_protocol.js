/**
 * Created by Administrator on 2018/9/15.
 */
var fs = require('fs');
var xml2js = require('xml2js');
require("../codes/libs/core/CBaseHelper");

var helper = {
    cfg:{
        src:"./protocol/",
        des:"../"
    },
    start:function(){
        var tmp= "front/";
        var files = fs.readdirSync(this.cfg.src + tmp);
        for(var i=0;i<files.length;i++){
            this.buildXml(this.cfg.src + tmp + files[i],tmp);
        }

        tmp= "rpc/";
        files = fs.readdirSync(this.cfg.src + tmp);
        for(var i=0;i<files.length;i++){
            if(files[i].endWith(".xml")){
                this.buildXml(this.cfg.src + tmp + files[i],tmp);
            }
        }
    },
    buildXml:function(file,relative){
        var parser = new xml2js.Parser();
        var content = fs.readFileSync(file,"utf8");
        while(true){
            var r =  /\{\[(.+?)\]\}/g;
            var rFiles = r.exec(content);
            if(null == rFiles){
                break;
            }
            var files = rFiles[1].split(",");
            var str = "\n";
            for(var i=0;i<files.length;i++){
                str += fs.readFileSync("protocol/"+ relative +files[i],"utf8");
            }
            str +="\n";
            var lstr = "{\\[{0}]\\}".Format(rFiles[1]);
            content = content.replaceAll(lstr,str);
        }

        var self = this;
        parser.parseString(content, function (err, result) {
            var data = result.protocol;
            var structs = data.struct;
            var items = data.item;
            for(var i=0;i<data.languages.length;i++){
                var info = data.languages[i].language[0];
                var language = info["_"];
                var cfg = info["$"];
                if(structs){
                    self[cfg.lang]["create_files_struct"](cfg,structs);
                }
                if(items){
                    self[cfg.lang]["create_files_item"](cfg,self[cfg.lang]["create_files_imports"](data.import,relative),items);
                }
            }
        });
        console.log("buildXml :"+file)
    },
    javascript:{
        create_files_struct:function(cfg,data) {
            var file = helper.cfg.des + cfg.path;
            if(fs.existsSync(file)){
                fs.unlinkSync(file);
            }

            var messages = {
                package: "proto",
                messages:[]
            };
            for(var i=0;i<data.length;i++){
                var obj = this.create_struct(data[i]);
                messages.messages.push(obj);
            }
            var str = "require('../../libs/CAppSystem');\n\n";
            str += "App.Pb = App.Pb || {};\n"
            str += cfg.namespace + " = {}\n";
            str += cfg.namespace +".Structs = App.System.protobuf.newBuilder({})['import']("+JSON.stringify(messages, null, 2)+").build().proto;"
            fs.writeFileSync(file,str,"utf8");
        },
        create_struct:function(struct)
        {
            var name = struct.$.name;
            var required = struct.required;
            var repeated = struct.repeated;
            var optional = struct.optional;
            var ret = {
                name:name,
                fields:[]
            };

            this.create_filed("required",required,ret.fields);
            this.create_filed("repeated",repeated,ret.fields);
            this.create_filed("optional",optional,ret.fields);

            return ret;
        },
        create_filed:function(specifiers,values,ay){
            if(values == null){
                return;
            }

            for(var i=0;i<values.length;i++){
                var value = values[i].$;
                ay.push({
                    "rule": specifiers,
                    "type": value.type,
                    "name": value.name,
                    "id": ay.length+1
                });
            }
        },
        create_files_imports:function(data,relative)
        {
            var ret = {};
            for(var i=0;i<data.length;i++){
                var struct = ret[data[0].split(".")[0]] = {};
                this.create_files_import(helper.cfg.src + relative + data[i],struct);
            }
            return ret;
        },
        create_files_import:function(file,ret)
        {
            var parser = new xml2js.Parser();
            var content = fs.readFileSync(file,"utf8");
            var self = this;
            parser.parseString(content, function (err, result) {
                var data = result.protocol;
                var namespaces = data.languages[0].language;
                var namespace;
                for(var i=0;i<namespaces.length;i++){
                    if(namespaces[i].$.lang == "javascript"){
                        namespace = namespaces[i].$.namespace;
                    }
                }
                var structs = data.struct;
                for(var i=0;i<structs.length;i++){
                    ret[structs[i].$.name] = "{0}.Structs.{1}".Format(namespace,structs[i].$.name);
                }
            });
        },
        create_files_item:function(cfg,imports,data) {
            var file = helper.cfg.des + cfg.path;
            if(fs.existsSync(file)){
                fs.unlinkSync(file);
            }

            var ret = {};
            var startId = 0;
            var idKeys = {};
            for(var i=0;i<data.length;i++){
                var info =data[i];
                if(info.$.hasOwnProperty("struct")){
                    var name = info.$.name;
                    var value = startId;
                    if(info.$.hasOwnProperty("value")){
                        if(idKeys.hasOwnProperty(info.$.value)){
                            value = idKeys[info.$.value];
                        }else{
                            value = parseInt(info.$.value) || value;
                        }
                    }
                    if(info.$.struct.length>0 ){
                        var struct = info.$.struct.split(".");
                        if(!imports.hasOwnProperty(struct[0])){
                            throw "not import:{0}.xml".Format(struct[0]);
                            return;
                        }
                        var cs = imports[struct[0]];
                        if(!cs.hasOwnProperty(struct[1])){
                            throw "{0}.xml not have".Format(struct[1]);
                            return;
                        }
                        ret[name] = {
                            id:startId,
                            struct:cs[struct[1]]
                        }
                    }else{
                        ret[name] = {
                            id:startId
                        }
                    }
                    startId++;
                }else{
                    if(info.$.hasOwnProperty("value")){
                        startId = parseInt(info.$.value);
                    }
                    idKeys[info.$.name] = startId;
                }
            }

            var str = "\n";
            str += "Core.$AlwaysDefines('{0}',{1})".Format(cfg.namespace,JSON.stringify(ret, null, 2));
            str = str.replaceAll("\"","");
            fs.writeFileSync(file,str,"utf8");
        }
    }
}

helper.start();

//var str = "123{[common/rpc_adf.xml]}456{[common/rpc_adf.xml]}4456";
//var d = "common/rpc_adf.xml";
//var lstr = "{\\[{0}]\\}".Format(d);
//var re = new RegExp(lstr)
//var lb = str.replaceAll(lstr,"----")
//console.log(lstr )
//console.log(lb )