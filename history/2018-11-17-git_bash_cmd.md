---
create_time_raw: 2018-11-17 19:13:31 +0800
---
# Git bash 中使用 cmd 命令 乱码的探究
## 缘起
安装 Ruby 的时候需要选择 32位还是64位 的安装包，原来都是现查，就想着整理记录一下，方便以后查阅。
1. 自己最常用的：[控制面板] > [系统和安全] > [系统]，可以看到**系统类型**是`64位操作系统，基于64位处理器`
2. win10下：点击操作系统最下角的[开始]田字标识，然后点[设置]齿轮标识 > [系统] > [ 关于 ]
3. 命令行：`systeminfo`，**在Git Bash 中执行时出现了乱码**

## Why
1. Git Bash 本质上是只一个壳(Shell)，Core 依然是系统自带的指令，只是部分命令进行了包装
> 所以：Git Bash 中可以运行 cmd 中的一些命令: 包括 `systeminfo`, `ipconfig` 等
2. 默认的 cmd 的活动代码页（active codepage）是 936 代表的`GBK`编码，在 CMD 中执行 `chcp` 即可查看
3. git bash 默认的编码是 `utf8`，安装的时候的初始设置
> 所以：在 git bash 中执行 cmd 中的命令，例如 `systeminfo`，会出现乱码问题

## How
> 因为 cmd 是操作系统的基础工具，如果贸然改动其编码会遇到不可知问题，所以正确的做法是修改 Git Bash 展示中文时的编码

在 Git Bash 中右键选中 `options`，在左侧栏目中点击`Text`，在右侧最下方，点击 `Locale` 选中 `zh_CN`， Charactor set 选中 `GBK (chinese)` ， 点击 `Apply`

## 悲惨的消息
Git Bash 默认 utf8 的时候已经解决了诸如 `文件夹为中文` 等问题；而将其改成 `GBK` 时，本机用户名，和中文路径都出问题了。。。

## 缘灭
本文实际意义不大，主要是探寻的过程。知其所以然，才能在遇到问题时不再手足无措。既然没法直接解决，那就绕过去，这也是一种解决方案。
经过测试之后也明确的知道了： Git Bash 不是一个很好的 CMD 的替代者，不要因为TA 可以执行 CMD 中的指令，就认为TA是万能的，
- 如果你想找的是一个 CMD 的替代者：`Babun`, `cmder`或者 `PowerShell` 是你不错的选择
- 如果你遇到的是 `Git` 使用时的乱码问题，可以跳转到[扩展阅读](#reading)


## 扩展阅读 {#reading}
[解决 Git 在Windows上的中文乱码问题](https://devopshub.cn/2018/01/07/g4e-faq-4-git-encoding-error/)

## 参考

[windows git-bash 设置](https://www.cnblogs.com/a-ray-of-sunshine/p/4973836.html)