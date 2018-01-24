## CSS
#### 什么是CSS
CSS(Cascading Style Sheets)是一门指定文档该如何呈现给用户的语言。  

#### 为什么使用CSS
* 避免重复
* 更容易维护
* 为不同的目的，使用不同的样式而内容相同

#### CSS如何工作
两个过程：  
1.浏览器先将标记语言和CSS转换成DOM结构，这时DOM就代表了电脑内存中的相应文档。  
2.浏览器把DOM的内容展示处理。

#### 层叠和继承
浏览器中主要有三种样式来源：  
1.浏览器的默认样式  
2.用户定义的样式  
3.开发者定义的样式  

* 外联样式
* 内联样式
* 行内样式

子元素会继承父元素的样式，子元素的样式优先级高于父元素。

#### 选择器
常用的选择器：  
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

如果相同的属性应用到同一个元素上，那么确定度高的选择器优先级更高。ID选择器确定度高于类选择器，类选择器确定度高于标签选择器。如果确定度相同，那么后出现的优先级高。  

多个选择器可以组合使用：  
```
//标签和类选择器组合使用
p.key //表示拥有key类的p标签

//还可以通过方括号的形式指定其他属性
input[type='button']
```

##### 伪类选择器
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

关系选择器：

* A E //元素A的任一后代元素E  
* A > E //元素A的直系后代E  
* B + E //元素B的任一下一个兄弟元素E  
* B ~ E //B元素后面的拥有共同父元素的兄弟元素E  

#### 创建可读性良好的CSS
* 使用空白符，例如空格、tab、换行
* 注释，使用/*  */
* 选择器组，组内用逗号分隔

#### 文本样式
font

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
font-style: italic;
```

font-weight，字体粗细  
```
font-weight: bold;
```

line-height，行高，指定行与行之间的距离    
```
line-height: 10px;
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
text-decoration: underline;
```

text-shadow，文本阴影  
```
text-shadow: 4px 4px 5px red;
第一个参数：阴影的横向偏移
第二个参数：阴影的纵向偏移
第三个参数：阴影的半径，值越大，阴影越大
第四个参数：阴影的颜色
```

letter-spacing和word-spacing，设置字母之间、单词之间的间隔  
```
letter-spacing: 2px;
word-spacing: 4px;
```

#### 颜色
可以如下几种颜色方式：  
* 名字，例如red,lime
* 16进制，例如#000，#FFFFFF
* rgb/rgba，例如rgb(128,0,0)/rgba(128,0,0,0.1)

文本颜色使用color  
背景颜色使用background-color，可以通过设置为transparent来呈现父元素的背景色

#### 内容
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

#### 列表
无序列表(ul/li)，使用list-style来设置，支持三种样式，还可以指定图片url来自定义标记样式  
<ul>
  <li style="list-style:disc">list-style:disc</li>
  <li style="list-style:circle">list-style:circle</li>
  <li style="list-style:square">list-style:square</li>
  <li style="list-style:url(./demo.png)">list-style:url(./demo.png)</li>
</ul>

有序列表(ol/li)  
<ol>
  <li style="list-style: decimal">list-style: decimal</li>
  <li style="list-style: lower-roman">list-style: lower-roman</li>
  <li style="list-style: upper-roman">list-style: upper-roman</li>
  <li style="list-style: lower-latin">list-style: lower-latin</li>
  <li style="list-style: upper-latin">list-style: upper-latin</li>
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

#### 盒模型
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
box-shadow: (inset) 5px 5px 5px raba(0,0,0,0.7);  //inset可选，表示是内阴影
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

#### 布局
文档结构

大小单位  
推荐使用em

文本布局  
```
text-align: left|right|center|justify

//指定首行文本的缩进
text-indent: 50px;
```

浮动  
可以通过clear属性来避免其它元素受到浮动效果的影响

位置，position有如下的值：  

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

#### 表格
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

#### Media
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

#### javascript和css
可以使用javascript来控制元素的样式，使用示例：  
```
var element = ...;
element.style.backgroundColor = "#FFFFFF";
```

