# npm知识点

**package.json和package-lock.json**  
package.json定义了版本的范围，具体安装什么样的版本需要解析之后才能确定。例如^8.0.1的版本表示向后兼容，只要大版本号8相同，那么就会下载最新的版本。  
package-lock.json中描述了node_modules中所安装的每个包的具体版本和来源，只要按照package-lock.json中的依赖进行安装，就能确保安装的包是完全一样的。  
