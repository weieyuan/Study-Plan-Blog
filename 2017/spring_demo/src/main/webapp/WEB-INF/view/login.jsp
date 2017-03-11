<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="resources/js/lib/bootstrap-3.3.7/css/bootstrap.min.css" rel="stylesheet">
<link href="resources/css/login.css" rel="stylesheet">
<title>Insert title here</title>
</head>
<body>
<div class="container">
      <form class="form-signin" id="form-signin" action="/spring_demo/userlogin" method="post">
        <h2 class="form-signin-heading">Please sign in</h2>
       <!--  <label for="inputEmail" class="sr-only">Email address</label> -->
        <input type="username" name="userName" id="inputUsername" class="form-control" placeholder="user name" required autofocus>
        <!-- <label for="inputPassword" class="sr-only">Password</label> -->
        <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required>
        <div class="checkbox">
          <label>
            <input type="checkbox" id="remember" value="remember-me"> Remember me
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>
</div> <!-- /container -->
<!--  
	<form action="/spring_demo/userlogin" method="post">
		userName:<input type="text" name="userName"/>
		password:<input type="password" name="password"/>
		<input type="submit" value="login"/>
	</form>
-->
<script type="text/javascript" src="resources/js/lib/jquery/jquery-2.1.4.js"></script>
<script type="text/javascript" src="resources/js/lib/bootstrap-3.3.7/js/bootstrap.min.js"></script>	
<script type="text/javascript">
  $(document).ready(function(){
    $("#form-signin").on("submit", function(){
      var userName = $("#inputUsername").val();
      var password = $("#inputPassword").val();
      //这里可以对用户名和密码进行校验
      if($("#remember").isChecked()){
        //这里可以把用户名和密码存到cookie中
      }
      else{

      }
      return true;

    });
  });
</script>
</body>
</html>
