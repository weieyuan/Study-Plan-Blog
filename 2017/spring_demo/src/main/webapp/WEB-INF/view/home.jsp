<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Insert title here</title>
<link href="resources/js/lib/bootstrap-3.3.7/css/bootstrap.min.css" rel="stylesheet">
<link href="resources/js/lib/bootstrap-fileinput-4.3.8/css/fileinput.min.css" media="all" rel="stylesheet" type="text/css">
<!--<link href="resources/css/home.css" rel="stylesheet">-->
<link rel="stylesheet/less" type="text/css" href="resources/css/home1.less">
</head>
<body>

  <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Project name</a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
              <li class="dropdown">
                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                <ul class="dropdown-menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" class="divider"></li>
                  <li class="dropdown-header">Nav header</li>
                  <li><a href="#">Separated link</a></li>
                  <li><a href="#">One more separated link</a></li>
                </ul>
              </li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
              <li><a href="../navbar/">Default</a></li>
              <li><a href="../navbar-static-top/">Static top</a></li>
              <li class="active"><a href="./">Fixed top <span class="sr-only">(current)</span></a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
  </nav>


  <div class="container">
    <div class="jumbotron">
      <h1>Navbar example</h1>
      <p>This example is a quick exercise to illustrate how the default, static and fixed to top navbar work. It includes the responsive CSS and HTML, so it also adapts to your viewport and device.</p>
      <p>To see the difference between static and fixed top navbars, just scroll.</p>
      <p>
        <a class="btn btn-lg btn-primary" href="../../components/#navbar" role="button">View navbar docs &raquo;</a>
      </p>
    </div>
    <input id="file-1" name="kartik-input-701[]" type="file" multiple=true class="file-loading">
  </div>
    <!-- 
    <div>
    	 <form method="post" action="/spring_demo/uploadFile" enctype="multipart/form-data">
            <input type="text" name="name"/>
            <input type="file" name="file"/>
            <input type="submit" value="上传"/>
        </form>
    </div>
    -->
    <!-- 
    <form enctype="multipart/form-data">
    	<div class="form-group">
            <input id="file-1" type="file" multiple class="file" data-overwrite-initial="false" data-min-file-count="1">
        </div>
    </form>
     -->
<script type="text/javascript" src="resources/js/lib/less-v2.7.2-1/less.js"></script>     
<script type="text/javascript" src="resources/js/lib/jquery/jquery-2.1.4.js"></script>
<script type="text/javascript" src="resources/js/lib/bootstrap-fileinput-4.3.8/js/fileinput.min.js"></script>
<script type="text/javascript" src="resources/js/lib/bootstrap-3.3.7/js/bootstrap.min.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		$('#file-1').fileinput({
			showRemove: true,
		    showPreview: false,
		    uploadUrl: "/spring_demo/uploadFile", // server upload action
		    uploadAsync: true
		});
	});
	
</script>
</body>
</html>
