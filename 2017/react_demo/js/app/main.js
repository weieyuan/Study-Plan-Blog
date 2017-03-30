/**
 * Created by Administrator on 2017/3/29.
 */
var AppMain = function(){

    var oArticleList;

    this.init = function(strPanelId){
        var HeadComponent = _initHead();
        var InfoComponent = _initInfoPanel();
        var FileUploadComponent = _initFileUpload();
        var ButtonComponent = _initButton();
        var ArticlesComponent = _initArticlesPanel();
        var RootComponent = React.createClass({
            getInitialState: function(){
                return {
                    articles: []
                };
            },
            render: function(){
                return (
                    <div>
                        <div className="body_head">
                            <HeadComponent />
                        </div>
                        <div className="container">
                            <InfoComponent />
                            <FileUploadComponent />
                            <ButtonComponent clickShowArticles={this.clickShowArticles}/>
                            <ArticlesComponent articles={this.state.articles}/>
                        </div>
                    </div>
                );
            },
            clickShowArticles: function(){
                var articles = _getArticlesList();
                this.setState({
                    articles: articles
                });
            }
        });

        ReactDOM.render(<RootComponent />, document.getElementById(strPanelId));

    };

    var _getArticlesList = function(){
        var arrArticle = [];
        for (var i = 1; i <= 4; i++) {
            if (i == 1) {
                arrArticle.push({
                    title: "Spring",
                    content: "Study Spring Study Spring Study Spring Study Spring Study Spring Study Spring Study Spring Study Spring Study Spring Study Spring",
                    id: i
                });
            }
            else {
                arrArticle.push({
                    title: "Spring",
                    content: "Spring Cloud provides tools for developers to quickly build some of the common patterns in distributed systems (e.g. configuration management, service discovery, circuit breakers, intelligent routing, micro-proxy, control bus, one-time tokens, global locks, leadership election, distributed sessions, cluster state). Coordination of distributed systems leads to boiler plate patterns, and using Spring Cloud developers can quickly stand up services and applications that implement those patterns. They will work well in any distributed environment, including the developer's own laptop, bare metal data centres, and managed platforms such as Cloud Foundry.",
                    id: i
                });
            }
        }
        return arrArticle;
    };

    var _initHead = function(){

        var HeadComponent = React.createClass({
            render: function(){
                return(
                    <nav className="navbar navbar-default navbar-fixed-top">
                        <div className="container">
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <a className="navbar-brand" href="#">Wei Blog</a>
                            </div>
                            <div id="navbar" className="navbar-collapse collapse">
                                <ul className="nav navbar-nav">
                                    <li className="active"><a href="#">Home</a></li>
                                    <li><a href="#about">About</a></li>
                                    <li><a href="#contact">Contact</a></li>
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">Action</a></li>
                                            <li><a href="#">Another action</a></li>
                                            <li><a href="#">Something else here</a></li>
                                            <li role="separator" className="divider"></li>
                                            <li className="dropdown-header">Nav header</li>
                                            <li><a href="#">Separated link</a></li>
                                            <li><a href="#">One more separated link</a></li>
                                        </ul>
                                    </li>
                                </ul>
                                <ul className="nav navbar-nav navbar-right">
                                </ul>
                            </div>
                        </div>
                    </nav>
                );
            }
        });

        return HeadComponent;
    };

    var _initInfoPanel = function(){
        var InfoComponent = React.createClass({
            render: function(){
                return (
                    <div className="panel panel-default">
                        <div className="panel-body">
                        Basic panel example
                        </div>
                    </div>
                );
            }
        });

        return InfoComponent;
    };

    var _initFileUpload = function(){
        var FileUploadComponent = React.createClass({
            render: function(){
                return (
                    <div>
                        <input ref="file-1" name="kartik-input-701[]" type="file" multiple="true" className="file-loading" />
                    </div>
                );
            },
            componentDidMount: function(){
                var dom = this.refs["file-1"];
                var $dom = $(dom);
                $dom.fileinput({
                    showRemove: true,
                    showPreview: false,
                    uploadUrl: "/spring_demo/uploadFile", // server upload action
                    uploadAsync: true
                });
            }
        });

        return FileUploadComponent;
    };

    var _initButton = function(){
        var ButtonComponent = React.createClass({
            render: function(){
                return (
                    <div className="panel panel-success" style={{padding: '10px', marginTop: '10px'}}>
                        <button id="button_success" type="button" className="btn btn-success" style={{marginRight: '2px'}} onClick={this.clickShowCustomer}>Show Customer List</button>
                        <button id="button_articles" type="button" className="btn btn-success" style={{marginRight: '2px'}} onClick={this.clickShowArticles}>Show Articles List</button>
                        <button id="button_save_article" type="button" className="btn btn-success" style={{marginRight: '2px'}} onClick={this.clickSaveArticle}>Save Article</button>
                    </div>
                );
            },
            clickShowCustomer: function(e){
                console.log("clickShowCustomer");
                e.stopPropagation();
            },
            clickShowArticles: function(e){
                console.log("clickShowArticles");
                this.props.clickShowArticles();
                e.stopPropagation();
            },
            clickSaveArticle: function(e){
                console.log("clickSaveArticle");
                e.stopPropagation();
            }
        });

        return ButtonComponent;
    };

    var _initArticlesPanel = function(){
        var ArticlesComponent = React.createClass({
            render: function(){
                var articles = this.props.articles;
                var articleDoms = null;
                if(articles.length){
                    var ArticleComponent = _article();
                    articleDoms = articles.map(function(article, index){
                        return <ArticleComponent article={article} key={article.id}/>
                    });
                }
                return (
                    <div className="panel panel-default" id="articles_container">
                        <div className="row article_list" id="article_list">
                            {articleDoms}
                        </div>
                    </div>
                );
            },
            componentDidMount: function(){
//                oArticleList = new ArticleList();
//                oArticleList.init({
//                    containerId: "articles_container",
//                    clickReadMore: function (articleId) {
//                        console.log(articleId);
//                    }
//                });
            }
        });
        return ArticlesComponent;
    };

    var _article = function(){
        var ArticleComponent = React.createClass({
            render: function(){
                return (
                    <div className="col-md-12">
                        <div className="thumbnail">
                            <img className="img-rounded" alt="ssssss" src={"../image/blog" + this.props.article.id % 4 + ".png"} style={{width:'100%', height:'300px'}} />
                                <div className="caption">
                                    <h3>{this.props.article.title}</h3>
                                    <p>{this.props.article.content}</p>
                                    <p style={{textAlign:'right'}}>
                                        <button type="button" className="btn btn-info" style={{marginRight: '2px'}} onClick={this.clickReadMore}>Read More</button>
                                        <button type="button" className="btn btn-info" onClick={this.clickEdit}>Edit</button>
                                    </p>
                                </div>
                        </div>
                    </div>
                );
            },
            clickReadMore: function(e){
                console.log("clickReadMore: " + this.props.article.id);
                e.stopPropagation();
            },
            clickEdit: function(e){
                console.log("clickEdit: " + this.props.article.id);
                e.stopPropagation();
            }
        });

        return ArticleComponent;
    };
};

var oAppMain = new AppMain();
oAppMain.init("body");
