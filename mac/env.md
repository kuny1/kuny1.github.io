## 

### iTem2
- 下载地址：https://iterm2.com/downloads.html
- 双击安装文件，按照指示即可

### MacOS 命令行工具
> Git 等命令依赖 xcode-select
- xcode-select --install
- 提示网络错误
- 登录 https://developer.apple.com/download/all/?q=Command%20Line%20Tools
- 下载合适的 Command Tools 版本 15.1，速度非常慢
- 修改 DNS 为 114.114.114.114

### Git
- 执行 git -v
- 返回：git version 2.39.3 (Apple Git-145)
- 如显示命令未找到，可前往：https://git-scm.com/ 下载 Git


### Oh My Zsh
- 运行：`sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"`
> https://ohmyz.sh/#install


### 初始化 SSH 配置
> 参考：https://git-scm.com/book/zh/v2/%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E7%9A%84-Git-%E7%94%9F%E6%88%90-SSH-%E5%85%AC%E9%92%A5

- ssh-keygen -o
- 输入你想存放的密钥位置，直接回车（使用默认目录）
- 提示输入密码，直接回车（如填写则进行后续操作可能都需要输入密码）
- 一路回车，则会创建完成存放在 .ssh 目录下的公钥和私钥

### GitHub 配置
- 点击 GitHub 右上角头像，在弹出菜单中点击 Settings
- 在左侧菜单栏中找到 `SSH and GPG keys`，点击
- 在新打开的页面，点击 `New SSH Key`
- 将自己Mac上面通过 cat .ssh/id_rsa.pub 获取的公钥，填写到 `Key` 下方的输入框
- 点击最下面的 `Add SSH Key`

### 安装 HomeBrew
`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
- 网络异常
- 通过 https://github.com/Homebrew/brew/releases/tag/5.1.11 直接下载
- 显示版本与 MacOS 版本不兼容
- 配置代理
```shell
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
```
- 使用国内镜像（注意需要排队，耐心等待）
`/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"`


### 安装 fnm
#### 通过 Curl（暂时跳过）
- curl -fsSL https://fnm.vercel.app/install | bash
- 提示 `Could not resolve host: fnm.vercel.app`
- 添加谷歌公共 CDN `8.8.8.8`
  
#### 通过 Brew
`brew install fnm`



### 安装 Node
- fnm ls-remote
- 报错：`error: can't get remote versions file: error sending request for url (https://nodejs.org/dist/index.json)`
- 配置国内镜像：export FNM_NODE_DIST_MIRROR="https://mirrors.tuna.tsinghua.edu.cn/nodejs-release/"