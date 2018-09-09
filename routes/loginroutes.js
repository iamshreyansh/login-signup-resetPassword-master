var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '****', //Use Your SQL Password
  database : 'one'   //Use Your Database Name
});

connection.connect(function(err)
{
	if(!err) 
	{
	    console.log("Database is connected");
	} else 
	{
	    console.log(err);
	}
});

exports.create = function(req,res)
{
  var users={
    "name":req.body.name,
    "email":req.body.email,
    "password":req.body.password
  }
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
  if (error) 
  {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }
  else
  {
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
  }
  });
}

exports.login = function(req,res){
  var email= req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = '+email+';', function (error, results, fields) {
  if (error) 
  {
 
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }
  else
  {
    if(results.length >0){
      if(results[0].password == password){
        res.send({
          "code":200,
          "success":"login sucessfull"
            });
      }
      else{
        res.send({
          "code":204,
          "success":"Email and password does not match"
            });
      }
    }
    else{
      res.send({
        "code":204,
        "success":"Email does not exits"
          });
    }
  }
  });
}

exports.reset = function(req,res)
{
  var email= req.body.email;
  var password = req.body.password;
  connection.query('UPDATE users SET password='+password+' WHERE email = '+email+';', function (error, results, fields) {
  if (error) 
  {
 
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }
  else
  {
    res.send({
      "code":200,
      "failed":"password changed successfully"
    })
   
  }
  });
}