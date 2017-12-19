var formidable = require("formidable");
var User = require("../models/User.js");
var crypto = require("crypto");

//执行登录
exports.doLogin = function(req,res){
	//解析前端请求报文体
	var form = new formidable.IncomingForm();
	form.parse(req , function(err , fields , files){
		var mail = fields.userName;
		var password = fields.password;
		//加密
		password = crypto.createHash('SHA256').update(password + "加密").digest("hex");
		//和数据库比对
		User.find({"mail" : mail , "password" : password} , function(err , results){
			if(results.length > 0){
				//登录成功，下发session
				req.session.login = true;
				req.session.email = mail;
				res.json({"status" : "ok"});
			}else{
				res.json({"result" : "no"});
			}
		});
	});
}

