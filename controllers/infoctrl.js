var User = require("../models/User.js");
//Ajax提供用户信息
exports.checkoutInfo = function(req,res){
		//得到前端提交的email
		if(req.session.email){
			var mail = req.session.email
		}else{
			return;
		}
		//检索数据库
		User.find({"mail" : mail} , function(err , results){
			res.json(err? 'no' : {
				"mail" : results[0].mail ,
				"name" : results[0].nickname ,
				"introduction" : results[0].introduction ,
				"avatar" : results[0].avatar
			});
		});
}

