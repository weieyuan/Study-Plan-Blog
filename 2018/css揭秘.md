# css揭秘

#### 前言
查询浏览器的兼容性：  
* [http://caniuse.com](http://caniuse.com)
* [http://webplatform.org](http://webplatform.org)
* [http://developer.mozilla.org](http://developer.mozilla.org)

#### 引言
不带前缀的CSS属性，是W3C组织发布的标准属性。

**浏览器的前缀**  
来源：每个浏览器都可以实现这些实验性质(甚至是私有的)的特性，但是需要在这些特性上添加自己的前缀。例如：  
* Firefox的-moz-
* IE的-ms-
* Opera的-o-
* Safari和Chrome的-webkit-
浏览器前缀带了很多额外的工作量，因此自动添加浏览器的工具应运而生，例如Autoprefixer

设置行高是字号的1.5倍：  
```
font-size: 20px;
line-height: 1.5;
```

可以设置和父级字号的比例关系:
```
font-size: 125%;
```

**w3c中的单位**

|单位|描述|
|----|------|
|%|百分比|
|in|英寸|
|cm|厘米|
|mm|毫米|
|em|当前字体的尺寸|
|rem|根元素的字体尺寸，在web中根元素是html|
|ex|一个字体的x-height(通常是字体尺寸的一半)|
|pt|1/72英寸|
|pc|12点活字|
|px|像素(计算机屏幕上的一个点)|

em单位非常重要，它可以用于自适应当前的字体。

