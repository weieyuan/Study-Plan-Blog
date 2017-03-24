/**
 * Created by Administrator on 2017/3/22.
 */
/**
 * Created by Administrator on 2017/3/22.
 */
require.config({
    baseUrl: "resources/js",
    paths: {
        jquery: 'lib/jquery/jquery-2.1.4',
        bootstrap: 'lib/bootstrap-3.3.7/js/bootstrap.min',
        bootstrapFileInput: 'lib/bootstrap-fileinput-4.3.8/js/fileinput.min',
        tinymce: 'lib/tinymce/js/tinymce/tinymce.min',
        widget: 'widget',
        app: 'app'
    },
    shim: {
        'bootstrap':{
            deps:['jquery']
        }
    }
});

require(['app/main','bootstrap'], function(AppMain){
    var main = new AppMain();
    main.init("main_container");
});
