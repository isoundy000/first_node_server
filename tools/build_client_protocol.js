/**
 * Created by Administrator on 2018/9/15.
 */
var fs = require('fs');
var xml2js = require('xml2js');
require("../server/codes/libs/core/CBaseHelper");

var helper = {
    cfg:{
        src:"./protocol/",
        des:"../client/ccc/yht/assets/Script/Libs/Net/",
        protocolFile:"protocol.js",
    },
    start:function(){
        var tmp= "front/";
        var files = fs.readdirSync(this.cfg.src + tmp);
        for(var i=0;i<files.length;i++){
            this.buildXml(this.cfg.src + tmp + files[i],tmp);
        }

        this.protocolToOne();
    },
    protocolToOne:function(){
        var desPath = this.cfg.des;
        if(fs.existsSync(desPath+this.cfg.protocolFile)){
            fs.unlinkSync(desPath+this.cfg.protocolFile);
        }

        files = fs.readdirSync(desPath);
        var jsonData={
            Client:[],
            Server:[],
        }
        for(var i=0;i<files.length;i++){
            if(files[i].endWith(".json")){
                var data = fs.readFileSync(desPath+files[i],"utf8");
                data = JSON.parse(data);
                for(var j=0;j<data.Client.length;j++){
                    jsonData.Client.push(data.Client[j]);
                }
                for(var j=0;j<data.Server.length;j++){
                    jsonData.Server.push(data.Server[j]);
                }
                fs.unlinkSync(desPath+files[i])
            }
        }

        var jsonContent = "module.exports = {\n";
        jsonContent += "\t\"Client\":[\n";
        var first = true;
        for(var i=0;i<jsonData.Client.length;i++){
            if(!first){
                jsonContent+=",\n";
            }
            first = false;
            jsonContent+="\t\t";
            var tempClientData =  jsonData.Client[i];
            if(tempClientData.parameters){
                jsonContent += "{\"id\":{0},\"name\":\"{1}\",\"parameters\":\"{2}\"}".Format(tempClientData.id,tempClientData.name,tempClientData.parameters);
            }else {
                jsonContent += "{\"id\":{0},\"name\":\"{1}\"}".Format(tempClientData.id,tempClientData.name);
            }
        }
        jsonContent+="\n\t],\n";
        jsonContent += "\t\"Server\":[\n";
        first = true;
        for(var i=0;i<jsonData.Server.length;i++){
            if(!first){
                jsonContent+=",\n";
            }
            first = false;
            jsonContent+="\t\t";
            var tempClientData =  jsonData.Server[i];
            if(tempClientData.data){
                jsonContent += "{\"id\":{0},\"name\":\"{1}\",\"data\":\"{2}\"}".Format(tempClientData.id,tempClientData.name,tempClientData.data);
            }else {
                jsonContent += "{\"id\":{0},\"name\":\"{1}\"}".Format(tempClientData.id,tempClientData.name);
            }
        }
        jsonContent+="\n\t]\n}";
        fs.writeFileSync(desPath+this.cfg.protocolFile,jsonContent,"utf8");
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
                var scfg = data.languages[i];
                if(scfg.client){
                    scfg = scfg.client[0];
                }
                var info = scfg.language[0];
                var language = info["_"];
                var cfg = info["$"];
                if(structs){
                    self[cfg.lang]["create_files_struct"](cfg,structs);
                }
                if(items){
                    var filePaths = file.split("/");
                    cfg.path = filePaths[filePaths.length-1]+".json";
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
            var str = "/*----- protocl -----*/\n";
            str += cfg.namespace +".Structs = Bitch.PB.newBuilder({})['import']("+JSON.stringify(messages, null, 2)+").build().proto;"
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

                var scfg = data.languages[0];
                var namespace = null;
                if(scfg.client){
                    let languagess = scfg.client[0].language;
                    for(var i=0;i<languagess.length;i++){
                        if(languagess[i].$.lang == "javascript") {
                            namespace = languagess[i].$.namespace;
                            break;
                        }
                    }
                }
                if(null == namespace){
                    console.error("not find javascript");
                    return;
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
                        if(info.$.table){
                            ret[name].table = info.$.table;
                        }else{
                            console.error("name must has table property");
                            return;
                        }
                    }else{
                        ret[name] = {
                            id:startId
                        }
                        if(info.$.table){
                            ret[name].table = info.$.table;
                        }else{
                            console.error("name must has table property");
                            return;
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

            console.log(JSON.stringify(ret))

            var jsonContent = "{\n";
            jsonContent += "\t\"Client\":[\n";
            var first = true;
            for(var key in ret){
                if(ret[key].table == "client"){
                    if(!first){
                        jsonContent+=",\n";
                    }
                    first = false;
                    jsonContent+="\t\t";
                    var tempClientData =  ret[key];
                    if(tempClientData.struct && tempClientData.struct!=""){
                        jsonContent += "{\"id\":{0},\"name\":\"{1}_{2}\",\"parameters\":\"{3}\"}".Format(tempClientData.id,cfg.flag,key,tempClientData.struct);
                    }else {
                        jsonContent += "{\"id\":{0},\"name\":\"{1}_{2}\"}".Format(tempClientData.id,cfg.flag,key);
                    }
                }
            }
            jsonContent+="\n\t],\n";
            jsonContent += "\t\"Server\":[\n";
            first = true;
            for(var key in ret){
                if(ret[key].table == "server"){
                    if(!first){
                        jsonContent+=",\n";
                    }
                    first = false;
                    jsonContent+="\t\t";
                    var tempClientData =  ret[key];
                    if(tempClientData.struct && tempClientData.struct!=""){
                        jsonContent += "{\"id\":{0},\"name\":\"{1}_{2}\",\"data\":\"{3}\"}".Format(tempClientData.id,cfg.flag,key,tempClientData.struct);
                    }else {
                        jsonContent += "{\"id\":{0},\"name\":\"{1}_{2}\"}".Format(tempClientData.id,cfg.flag,key);
                    }
                }
            }
            jsonContent+="\n\t]\n}";
            fs.writeFileSync(file,jsonContent,"utf8");
        }
    }
}

helper.start();
