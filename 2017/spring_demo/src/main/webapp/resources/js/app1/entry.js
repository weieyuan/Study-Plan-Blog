/**
 * Created by Administrator on 2017/4/7.
 */
require.config({
    baseUrl: BASE_URL + "js",
    paths: {
        jquery: 'lib/jquery/jquery-2.1.4',
        bootstrap: 'lib/bootstrap-3.3.7/js/bootstrap.min',
        less: 'lib/less-v2.7.2-1/less.min',
        bootstrapFileInput: 'lib/bootstrap-fileinput-4.3.8/js/fileinput.min',
        tinymce: 'lib/tinymce-4.5.5/js/tinymce/tinymce.min',
        widget: 'widget',
        app1: 'app1'
    },
    shim: {
        'bootstrap':{
            deps:['jquery']
        }
    }
});

require(["app1/test","bootstrap", "less"], function(Test){
    var oTest = new Test();
    oTest.init();
});
