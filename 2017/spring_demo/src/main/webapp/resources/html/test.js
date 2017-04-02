/**
 * Created by Administrator on 2017/4/1.
 */
var Test = function(){

    this.init = function(){
        _initHead();
        _initContent();
        _initFoot();
    };

    var _initHead = function(){
        var strHtml = '\
        <nav class="navbar navbar-default navbar-fixed-top custom_nav">\
        </nav>';
        $("#wrapper").prepend(strHtml);
    };

    var _initContent = function(){
        var strHtml = '\
        <div class="container" id="container"></div>';

        $("#wrapper").append(strHtml);

        for(var i = 0; i < 100; i++){
            strHtml = '<div style="width: 100%; height: 100px; border: 1px solid #d5d5d5; margin: 10px 0 10px 0;">' + i +'</div>';
            $("#container").append(strHtml);
        }
    };

    var _initFoot = function(){
        var strHtml = '\
        <div class="panel-footer footer">Panel footer</div>';

        $("#wrapper").append(strHtml);
    };

};
