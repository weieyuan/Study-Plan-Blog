## 环境搭建
```
//安装命令
npm install -g react-native-cli

//初始化项目
react-native init ProjName

//运行项目
react-native run-android
```

## 尺寸
* 固定尺寸，无单位  
```
<View style={{width: 50}} />
```

* 弹性尺寸  
```
flex
<View style={{flex: 1}} />

flexDirection:
默认值column

justifyContent:
flex-start、center、flex-end、space-around、space-between、space-evenly

alignItems:
flex-start、center、flex-end、stretch
注意：当设置为stretch时，子元素在交叉轴上不能设置固定尺寸，否则该属性不生效
```

## 常用组件
* Image
* Text
* TextInput  
```
import {TextInput} from "react-native"

<TextInput style={{height: 40}} placeholder="" onChangeText={(text) => {this.setState({text})}} />
```

* Button  
```
<Button onPress={() => this.onPress} title="press me" />
```

* TouchableHighlight  
当按压按钮时，背景色会发生变化  

* TouchableNativeFeedback  
在Android平台上使用，按压时会生成水波纹的效果

* TouchableOpacity  
按压时会降低按钮的透明度  

* TouchableWithoutFeedback  
无任何反馈效果

* ScrollView  
ScrollView中所有的元素都会被渲染，即使元素不在视图中。  
当ScrollView中只有一个子元素时，通过设置maximumZoomScale、minimumZoomScale参数可以允许用户放大或者缩小内容。

* FlatList  
仅仅渲染当前在屏幕中展示的元素，其他元素不会渲染。  
```
//需要传递data和renderItem参数
<FlatList
  data={[
    {key: "devin"}
    {key: "jackson"}
  ]}
  renderItem={({item}) => <Text>{item.key}</Text>}
/>
```

* SectionList

* Picker

* Slider

* Switch

* 

## 网络交互
* fetch
* XMLHttpRequest
* 第三方库，例如axois