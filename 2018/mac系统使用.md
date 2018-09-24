## 常用的命令
* vim  
```
在命令模式下按i进入输入模式
在输入模式下按ESC切换到命令模式

在命令模式下按:就进入底线命令模式，在底线命令模式下：
q 退出程序
q! 强制离开不存储档案
w 保存文件
wq 存储后离开
wq! 强制存储后离开

```

* 文件  
```
touch： 文件名称
rmdir 目录： 删除空目录
rm -rf 目录： 删除该目录以及该目录的子目录，-f表示强制删除，-r表示递归
rm -f 文件：强制删除文件
```
* 剪切文件  
```
command + c：复制
command + option + v: 剪切
```
* 按键  
```
home = Fn + 左箭头
end = Fn + 右箭头
PageUp = Fn + 上方向
PageDown = Fn + 下方向
fn + delete: 向后删除一个字符
Fn + 上/下方向：切换标签页
control + table: 切换标签页
command + 加号: 放大页面
command + 减号: 缩小页面
command + w: 关闭页面
command + q: 退出程序
command + h: 最小化页面
```

* 安装全局npm包没有权限的解决方法。
```
//sudo 表示管理员权限
sudo install package-name -g
```

* 常用命令  
```
clear: 清除内容
cd /: 跳转到根目录
ls -a: 显示所有的文件和目录
```

* 浏览器相关的快捷键  
```
command + R: 刷新浏览器页面
command + option + 向左箭头: 向左切换浏览器标签页
command + option + 向右箭头: 向右切换浏览器标签页
command + option + i: 打开浏览器的调试工具
command + 向左的方向键：浏览器后退
command + 向右的方向键：浏览器前进
command + 向下的方向键：跳转到页面的最底部
command + 向上的方向键：跳转到页面的最上部
```
* mac上使用sourceTree  
```
//配置用户名和邮箱
git config --global user.name "xxx"
git config --global user.email "xxxx"
//生成秘钥，生成的秘钥的存放地址是~/.ssh
ssh-keygen -t rsa -C "邮箱地址"
```
* 系统快捷键
```
command + 空格：全局搜索

```
