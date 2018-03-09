## CSS
### 什么是CSS
CSS(Cascading Style Sheets)是一门指定文档该如何呈现给用户的语言。  

### 为什么使用CSS
* 避免重复
* 更容易维护
* 为不同的目的，使用不同的样式而内容相同

### CSS如何工作
两个过程：  
1.浏览器先将标记语言和CSS转换成DOM结构，这时DOM就代表了电脑内存中的相应文档。  
2.浏览器把DOM的内容展示处理。

### CSS的语法
基本语言  
```
p{
  color: red;
}
```

CSS语句： 
@-规则在CSS中被用来传递元数据、条件信息或其他描述信息   
1.@charset 指定样式表中使用的字符编码，它必须是样式表中的第一个元素。  
```
@charset "UTF-8";
```
2.@import 用于从其他样式表导入样式规则  
```
@import url; url是资源位置的字符串或者uri，不需要指明一个文件，可以值指明包名
@import url list-of-media-queries;list-of-media-queries是媒体查询条件列表，决定通过URL引入的CSS规则在什么条件下使用    
//示例
@import url("custom.css");
@import "custom.css"
```  
3.@media 只有在运行浏览器的设备匹配其表达条件时才会使用该规则内容  
```
//当在浏览器的宽度大于801px时，使用规则
@media (min-width: 801px){
  body{
    margin: 0 auto;
  }
}
```
4.@supports 只有浏览器确实支持被测试功能时，才使用该规则  
5.@document 只有当前页面匹配一些条件时才会使用该规则  
6.@font-face 指定自定义的字体  
```
@font-face{
  font-family: family-name //指定字体的名称
  src: url //字体文件位置的url或者用户计算机上的字体名称，可使用local语法通过字体名称指定字体
  font-weight: xxx
  font-style: xxx
  ... 
}
//使用示例：
@font-face{
  font-family: "NB";
  src: url("./NB.ttf");
}
@font-face{
  font-family: "NB";
  src: local("Times New Roman");
}
```

### 创建可读性良好的CSS
* 使用空白符，例如空格、tab、换行
* 注释，使用/*  */
* 选择器组，组内用逗号分隔

## 选择器
### 简单选择器：    
1.标签选择器  
```
p{
  text-decoration: underline;
}
```

2.类选择器  
```
.key{
  text-decoration: underline;
}
```

3.ID选择器，在文档范围类必须唯一  
```
 #id{
  font-weight: bolder;
}
```
4.通过选择器  
```
* {
  
}
```

如果相同的属性应用到同一个元素上，那么确定度高的选择器优先级更高。ID选择器确定度高于类选择器，类选择器确定度高于标签选择器。如果确定度相同，那么后出现的优先级高。  

多个选择器可以组合使用：  
```
//标签和类选择器组合使用
p.key //表示拥有key类的p标签

//还可以通过方括号的形式指定其他属性
input[type='button']
```

### 关系选择器
* A E //元素A的任一后代元素E  
* A > E //元素A的直系后代E  
* B + E //位于元素B后面的相邻兄弟元素E(相邻兄弟选择器，向后选择)  
* B ~ E //B元素后面的拥有共同父元素的兄弟元素E(通用兄弟选择器，向后选择)  

### 伪类选择器和伪元素选择器
CSS伪类是加在选择器后面的用来指定元素状态的关键字。  
伪类列表：

* :link
* :visited
* :active
* :hover
* :focus
* :first-child
* :nth-child
* :nth-last-child
* :nth-of-type
* :first-of-type
* :last-of-type
* :empty //表示没有子元素的元素
* :target
* :checked
* :enabled
* :disabled 

*:first-child和:first-of-type的区别*  
```
:first-child描述的是我是父元素中的第一个子元素
:first-of-type描述的是我是父元素中第一次出现的某种类型的元素

例如
<div class="parent">
  <div>1</div> //div:first-child,div:first-of-type
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

<div class="parent">
  <h1>1</h1> //h1:first-child,h1:first-of-type
  <div>2</div> //div:nth-child(2),div:first-of-type
  <div>3</div>
  <div>4</div>
</div>

//使用.parent :first-of-type(等价于.parent *:first-of-type)
<div class="parent">
  <h1>1</h1> //.parent :first-of-type
  <div>2</div> //.parent :first-of-type
  <div>3</div>
  <div>4</div>
</div>
```

*:link :visited :hover :active(LVHA顺序)*  
```
a:link //未访问的链接
a:visited //已访问的链接
a:hover //鼠标悬停
a:active //激活，表示按下鼠标到松开鼠标这段时间
```

伪元素选择器  

* ::after
* ::before
* ::first-letter //第一个字符
* ::first-line //第一行
* ::selection //样式会应用于被用户选择或者高亮的文本(例如通过鼠标选中)  
* ::backdrop

## 层叠和继承
浏览器中主要有三种样式来源：  
1.浏览器的默认样式  
2.用户定义的样式  
3.开发者定义的样式  

* 外联样式
* 内联样式
* 行内样式

子元素会继承父元素的样式，子元素的样式优先级高于父元素。

style标签中的级别高于ID选择器

!important 标识这条规则优先于其他规则，优先级高于style中的内联样式；不建议使用，因为会改变样式的继承关系。

控制继承，三种继承  
1.inherit 子元素继承于父元素的属性  
2.initial 元素的属性设置为浏览器的默认样式，如果浏览器没有设置默认样式，并且该属性是自然继承的，那么该属性就被设置为inherit  
3.unset 重置为自然值，如果属性时自然继承的，那么就为inherit，否则就是initial  

## 文本样式
### 字体样式
font-family，字体  
```
font-family: "微软雅黑"， "serif";
```

font-size，字号  
```
//设置方式，
//1
font-size: 14px;
//2
font-size: 150%;
//3
font-size: 1.5em（1.5倍的父元素字号大小）
```

font-style，字体样式  
```
font-style: normal|italic|oblique;
```

font-weight，字体粗细  
```
font-weight: normal|bold|ligher|bolder|数字;
```

### 文本样式
line-height，行高，指定行与行之间的距离    
```
line-height: 10px|1.5; //1.5表示是字体的1.5倍  
```

text-transform，文本转换  
```
text-transform可选值：
none
uppercase
lowercase
capitalize 首字母大写
full-width
```

text-decoration，文本装饰，例如下划线，删除线等  
```
text-decoration: none|underline|overline|line-through;
```

text-shadow，文本阴影  
```
text-shadow: 4px 4px 5px red;
第一个参数：阴影的横向偏移
第二个参数：阴影的纵向偏移
第三个参数：阴影的半径，值越大，阴影越大
第四个参数：阴影的颜色
```

text-align  
```
text-align: left|right|center|justify
```

letter-spacing和word-spacing，设置字母之间、单词之间的间隔  
```
letter-spacing: 2px;
word-spacing: 4px;
```

text-indent, 指定首行文本的缩进    
```
text-indent: 50px;
```

text-overflow，需要结合overflow，white-space一起使用  
```
text-overflow: clip|ellipsis|"string";
overflow: hidden;
white-space: nowrap;
```

word-wrap，为了避免溢出，浏览器是否可以在单词之间加换行符  
```
word-wrap: normal|break-word
```

## 颜色
可以如下几种颜色方式：  
* 名字，例如red,lime
* 16进制，例如#000，#FFFFFF
* rgb/rgba，例如rgb(128,0,0)/rgba(128,0,0,0.1)

文本颜色使用color  
背景颜色使用background-color，可以通过设置为transparent来呈现父元素的背景色

## 内容
文本内容，在选择器的后面加上::before或者::after，在声明中指定content属性并设置文本内容  
```
.ref::before{
  font-weight: bold;
  color: gray;
  content: "Reference"
}
```

图片内容，将content属性值设置为图片的url，可以将图片插入到元素的前面或者后面  
```
//在a标签后面加上图片
a.glossary::after {
  content: "" url("./image/golssary-icon.gif")
}
```

## 列表
无序列表(ul/li)  
list-style-type  
<ul>
  <li style="list-style-type:disc">list-style-type:disc</li>
  <li style="list-style-type:circle">list-style-type:circle</li>
  <li style="list-style-type:square">list-style-type:square</li>
</ul>

list-style-image，可以指定图片url来自定义标记样式
<ul>
  <li style="list-style-image:url(./demo.png)">list-style-image:url(./demo.png)</li>
</ul>

list-style-position，设置文本是在标记号的外面还是里面  
```
list-style-position: outside|inside //outside(默认值)文本在标号外面；inside文本在标号的里面
```


有序列表(ol/li)  
在ol标签中start标识列表的起始编号  
<ol>
  <li style="list-style: decimal">list-style: decimal</li>
  <li style="list-style: lower-roman">list-style: lower-roman</li>
  <li style="list-style: upper-roman">list-style: upper-roman</li>
  <li style="list-style: lower-latin">list-style: lower-latin</li>
  <li style="list-style: upper-latin">list-style: upper-latin</li>
</ol>

<ol start="5">
  <li style="list-style: decimal">list-style: decimal</li>
  <li style="list-style: decimal">list-style: decimal</li>
</ol>

reversed标识编号递减  
<ol start="5" reversed>
  <li style="list-style: decimal">list-style: decimal</li>
  <li style="list-style: decimal">list-style: decimal</li>
</ol>

value，手动设置项目的编号  
<ol>
  <li value="7" style="list-style: decimal">list-style: decimal</li>
  <li value="10" style="list-style: decimal">list-style: decimal</li>
</ol>

计数器（不推荐使用)    
```
.bcd{
    counter-reset: mynum;
}
.cde:before{
    content: "(" counter(mynum) "):";
    counter-increment: mynum;
    font-weight: bold;
}

<h3 class="bcd">
	<p class="cde">a</p>
	<p class="cde">b</p>
	<p class="cde">c</p>
</h3>
```

## 盒模型
浏览器展示元素时，这个元素占用的空间分为4个部分，中间是元素的内容、往外是内边距、往外是边框、往外是外边距。  

**盒模型的几个关键点**  
1.width和height设置的是内容(content)的宽度和高度  
2.Box height是不会理会百分比的高度的，它的高度就是内容的高度，除非你显示第设置绝对高度
	> 也就是默认情况，元素的高度是由内容决定的  
3.边框会忽略百分比的宽度设置  
4.margin存在"margin collapsing"，当两个box元素相邻时，它们之间的距离是这两个box中margin值最大的那个距离，而不是两者相加。  

可以修改盒模型类型为border-box，这样盒子的宽高包含内容、padding、border  
```
box-sizing: border-box;
```

box-shadow，盒子阴影  
```
box-shadow: (inset) 5px 5px 5px rgba(0,0,0,0.7);  //inset可选，表示是内阴影
第一个参数：阴影的横向偏移  
第二个参数：阴影的纵向偏移  
第三个参数：阴影的半径，值越大，阴影越大  
第四个参数：阴影的颜色  
```

颜色：内边距和元素的背景色是一样的；外边距总是透明的。

border，边框的样式： 
 
* solid
* dotted
* dashed
* double
* inset
* outset
* ridge
* groove

border-radius, 圆角  
```
border-radius: x y z w //表示四个角的半径
border-radius: x / y | x y / z w //绘制椭圆，x和y的半径不一样
```

border-image  
```
border-image-source: url("./demo.png");
border-iamge-slice: 40;
border-image-repeat: round;
```

outline，类似于border但是不占用空间，绘制在border以外，margin以内  
```
outline: 1px solid red;
```

overflow  
```
auto: 内容太多，那么内容隐藏，出现滚动条
hidden: 内容太多，那么内容隐藏
visible: 默认值，内容太多，超出的内容展示在box的外面，
```

background-clip，用于确定背景的边界，默认情况下以border为边界  
```
background-clip: border-box;
background-clip: padding-box;
background-clip: content-box;
background-clip: text;
```

background相关属性  
```
background-color
background-image: line-gradient(to bottom, yellow, orange 50%, yellow);//使用渐变
background-repeat： repeat|repeat-x|repeat-y|no-repeat
background-position: (x, y) //x轴，y轴方向的位置
background-size: 16px 16px;
background-attachment: scroll|fixed|local 用于确定当内容滚动的时候，背景是否滚动
```

## 布局
文档结构

大小单位  
推荐使用em

文本布局  

默认情况下，块级元素的内容宽度是父元素的宽度的100%，高度由其内容决定；内联元素的宽高和其内容的宽高一样，不能对内联元素设置宽高。

position  

* relative 元素相对于其原来位置移动
* fixed 相对于窗口的确定位置
* absolute 相对于父元素的确定位置，父元素为relative,fixed,absolute时才生效
* static 默认值

```
//relative的作用
1. 当元素设置为relative时，top/left/top/bottom这些位置属性会生效(在static时，是不会生效的)
2. 当元素设置为relative时，z-index属性会生效(在static时，是不会生效的)
3. 能够作为子元素的坐标参考点，例如子元素设置为absolute
```

z-index

display  
```
display: block|inline|inline-block;
```

float  
float使元素脱离正常的文档布局流，并吸附到父容器的左/右边，在正常布局中位于该元素下方的内容，将会围绕着浮动元素。  
当在浮动元素之间留有多余的空间时，这些多余的空间总是出现在左浮动和右浮动之间。  
所有在浮动元素下面的自身不浮动的元素都将围绕着浮动元素进行包装，可以通过clear属性来避免其它元素受到浮动效果的影响  
非浮动元素的外边距不能用于它们和浮动元素之间来创建空间，可以在非浮动元素和浮动元素之间加一个空的元素(并且让这个元素清除浮动)来解决。  

## 表格
信息显示在一个单元格(cell)中；横向组成行(row)；行可以被分组，例如表头(header)，表体(body)，表尾(footer)

th(table header)一般用于表头中，有些浏览器会自动将th的字体加粗；td(table data)一般用于表体中。

单元格是没有外边距的，但是有边框和内边距，默认情况下，单元格的边框被表格的border-spacing属性值间隔。可以在table上设置border-collapse:collapse来消除间隔。  
```
<table style="border-collapse:collapse;">
</table>
```

table-layout，表格布局  
```
//默认情况
table-layout: auto; //默认值，列的宽度被设置为这一列的单元格中内容最宽的那个单元格的宽度

table-layout: fixed; //列的宽度是根据表格的宽度和列的宽度来计算的，而不是单元格的内容
```

table的高度，如果设置了table的高度，那么标题caption的高度是不包含在内的，也就是table的实际占高等于设置的高度+caption的高度

可以在空单元格上设置empty-cells属性来控制单元格的边框和背景是否显示  
```
<td style="empty-cells: show"></td>
<td style="empty-cells: hide"></td>
```

单元格上的属性值：  
```
colspan： int //表示这个单元格占用几列
rowspan: int //表示这个单元格占用几行
scope: row|col|rowgroup|colgroup|auto //应用在th上表示这个单元格是列还是行的表头
```

## Media
CSS为文档提供了在不同媒介上展示的适配方法。  

常见的媒介类型：

* screen 彩色计算机显示
* print 打印(分页式媒体)
* projection 投影
* all 所有媒体(默认)

使用示例：    
```
@media print{
  #nav-area {
    display: none;
  }
}
```

## 弹性盒子
Flex(Flexible Box)，弹性布局，由于为盒模型提供灵活性。  

任何一个容器都可以定义为Flex布局  
```
display: flex|inline-flex;//flex表示容器类似于block布局，inline-flex表示容器类似于inline-block布局(flex容器可以在一行内)，两者并不影响容器内部元素的布局
```

**设置flex布局后，float、clear、vertical-align属性将失效**

[参考学习材料](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

### 基本概念：  
采用Flex布局的元素，称为容器；容器内的子元素自动称为容器的成员，称为Item(项目)  
容器存在两根轴，水平抽(main axis)和垂直的交叉轴(cross axis)，每个轴都有起始位置，单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size  

### 容器的属性：  
容器有6个属性，flex-direction、flex-wrap、flex-flow、justify-content、align-items、align-content  

flex-direction，主轴方向(定义了项目的排列方向)  
```
flex-direction: row|row-reverse|column|column-reverse
row:主轴为水平方向，左端为起点(默认值)
row-reverse:主轴为水平方向，右端为起点
column:主轴为垂直方向，上端为起点
column-reverse:主轴为垂直方向，下端为起点
```

flex-wrap，定义项目如何换行  
```
flex-wrap: nowrap|wrap|wrap-reverse
nowrap:不换行，默认值
wrap:换行，第一行在上方(也就是所换的行在下方)
wrap-reverse:换行，第一行在下方
```

flew-flow，是flex-direction和flex-wrap的简写  
```
flex-flow: <flex-direction>||<flex-wrap>
```

justify-content，定义了项目在主轴上的对齐方式  
```
justify-content: flex-start|flex-end|center|space-between|space-around;
//假设轴从左到右
flex-start: 左对齐，默认值
flex-end: 右对齐
center: 居中
space-between: 两端对齐，项目之间的间隔都相等
space-around: 每个项目两侧的间隔相等，所以项目之间的间隔比项目与边框之间的间隔大一倍
```

align-items，定义了项目在交叉轴上如何对齐  
```
align-items: flex-start|flex-end|center|baseline|stretch;
//假设交叉轴从上到下
flex-start: 向上（起点）对齐
flex-end: 向下（终点）对齐
center: 中点对齐
baseline: 项目的第一行文字的基线对齐
stretch: 如果项目没有设置高度或者设置为auto，那么项目将占满整个容器的高度，默认值
```

align-content，多跟轴线的对齐方式  
```
align-content: flex-start|flex-end|center|space-between|space-around|stretch;
flex-start: 与交叉轴的起点对齐
flex-end: 与交叉轴的终点对齐
center: 与交叉轴的中点对齐
space-between: 与交叉轴的两端对齐，轴线之间的间隔相等
space-around:每根轴线两侧的间隔都相等
stretch: 轴线占满整个交叉轴，默认值
```

### 项目的属性
项目有6个属性，order、flex-grow、flex-shrink、flex-basis、flex、align-self  

order，定义了项目的顺序，数值越小，排列越靠前，默认为0  
```
order: 1;
```

flex-grow，定义项目的放大比例，默认是0(如果存在剩余空间，也不放大)  
```
flex-grow: <number>;
//如果一个项目为2，其余的为1，那么这个项目占据的空间是其他项目的两倍
```

flex-shrink，定义项目的缩小比例，默认值为1(如果空间不足，项目缩小)    
```
flex-shrink: <number>;
```

flex-basis，在分配多余空间之前，项目占据的主轴空间。默认值为auto，即项目的本来大小。  
```
flex-basis: <length>|auto;
//如果设置为固定数值或者百分比，例如300px，那么将占据固定空间
```

flex，是flex-grow、flex-shrink、flex-basis的缩写，建议优先使用这个值  
```
flex: <flex-grow>||<flex-shrink>||<flex-basis>;
//快捷值
auto(1 1 auto)
none(0 0 auto)
```

align-self，用于设置项目的对齐方式，用于覆盖align-items的属性，默认为auto，继承父元素的属性  
```
align-self: auto|flex-start|flex-end|center|baseline|stretch
```

使用示例：  
```
<style>
	.h1_class{
		font-size: 2;
		line-height: 2;
		background-color: purple;
		text-align: center;
		font-weight: bold;
		color: #FFFFFF;
		text-transform: capitalize;
		margin: 0;
	}
	.flex_class{
		display: flex;
		width: 100%;
		height: 400px;
		background-color: #ffffff;
		border: 1px solid purple;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: stretch;
		padding: 10px;
		box-sizing: border-box;
	}
    .flex_class > div:nth-child(1){
		background-color: red;
		flex-grow: 0;
		flex-shrink: 1;
		width: 30%;
	}
	.flex_class > div:nth-child(2){
		background-color: blue;
		flex-grow: 0;
		flex-shrink: 1;
		width: 30%;
	}
	.flex_class > div:nth-child(3){
		background-color: lime;
		flex-grow: 0;
		flex-shrink: 1;
		width: 30%;
	}
</style>
<h1 class="h1_class">Title</h1>
<div class="flex_class">
	<div>内容1</div>
	<div>内容2</div>
	<div>内容3</div>
</div>
```

## 网格布局
自定义实现网格系统  

第三方的网格系统  

## transitions
CSS transitions提供了一种在更改CSS属性时控制动画速度的方法，可以让属性变化成为一个持续一段时间的过程，而不是立即生效。  

CSS transitions可以决定哪些属性发生动画效果、何时开始(设置delay)、持续多久(duration)、如何动画(定义timing function)。

transition-property:  
指定哪些CSS属性用于过渡。

transition-duration：  
指定过渡的时长，可以为所有属性指定一个值，也可以为不同属性指定不同的值。

transition-timing-function:  
指定一个函数，定义属性值怎么变化。可取值如"ease"、"linear"等。

transition-delay:  
延迟，属性开始变化与过渡开始发生时之间的时长。


transition:  
简写： `<property> <duration> <timing-function> <delay>`

可以监听过渡是否完成：  
```
el.addEventListener("transitioned", updateTransiton);
```

使用示例：  
```
<style>
.div_1{
  width: 100px;
  height: 100px;
  color: red;
  background-color: blue;
  font-size: 1em;
  transition: width 2s, height 4s, color 2s, background-color 2s, ease, 1s;
}
.div_1:hover{
  width: 200px;
  height: 200px;
  color: lime;
  background-color: yellow;
}
</style>

<div class="div_1">
<p>Test</p>
</div>
```

## animation
### animation
CSS animations使得可以将一个CSS样式配置转换到另一个CSS样式配置。  
动画包含两个部分：  
1.描述动画的样式规则  
2.指定动画开始、中间点和结束的关键帧

### animation的子属性
animation-delay:  
延时

animation-direction:  
方向

animation-duration:  
周期时长

animation-iteration-count:  
动画重复次数，infinite表示无限次重复

animation-name:  
关键帧的名称，由@keyframes定义

animation-play-state:  
允许暂停和恢复动画

animation-timing-function:  
动画速度

animation-fill-mode:  
指定动画执行前后如何为目标元素应用样式

### @keyframes
用于定义动画帧。

规则：  
1.必须包含对0%(from)和100%(to)帧的定义。  
2.如果多个关键帧使用同一个名称，以最后一次定义为准。    
3.只有同时出现在from和to中的属性才会在动画中使用。  
4.如果一个关键帧中出现了重复定义，以最后一次定义为准。  
5.关键帧中!important会被忽略。  
```
@keyframes test{
  0% {margin-top: 5px;}
  10% {margin-top: 10px !important;} //!important会被忽略
  100% {margin-topo: 20px;}
}
```

使用示例：  
```
<style>
.div_2{
  width: 100px;
  height: 100px;
  border-radius: 40% 80%;
  background-color: red;
  text-align: center;
  line-height: 100px;
  animation-duration: 2s;
  animation-name: test;
  animation-iteration-count: infinite;
  animation-timing-function: linear
}
@keyframes test{
  0% {
    transform: rotate(90deg);
  }
  40% {
    transform: rotate(180deg);
  }
  80% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<div class="div_2">
xxxx
</div>
```

## transform属性
transform属性只对block元素生效。  

transform属性允许修改CSS视觉格式模型的坐标控件，例如转换(translate)、旋转(rotate)、缩放(scale)、倾斜(skew)。  

## CSS属性选择器
```
[attr]：表示有attr属性的元素
[attr=value]：表示有值为value的attr属性的元素
```

## visibility/display
```
//即使元素不可见，也会占据页面上的空间
visibility: visible | hidden
//none，元素不会占据页面空间
display: none | block
```

## javascript和css
可以使用javascript来控制元素的样式，使用示例：  
```
var element = ...;
element.style.backgroundColor = "#FFFFFF";
```