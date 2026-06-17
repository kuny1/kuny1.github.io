---
create_time_raw: 2018-11-19 19:13:31 +0800
---
# windows 安装 jekyll

## 缘起
原项目在Mac上创建，Mac上 jekyll 环境搭建比较容易，花了个把小时即可运行一个基础的jekyll server。而windows的开发预览环境的搭建，着实费了一番功夫，从官网上`不建议使用windows`就可以看出`坑的深度`，所以记录一下


## 写在前面
本教程具有高度的`唯一性`，意思就是严格保证环境和配置一样，才有可能运行成功，如果遇到问题，请检查版本是否与本文有细微差别。如严格一致仍遇到问题，请依照错误信息自行Google，依然解决不了的可以评论区留言，大家一起研究研究。
> 亲身实践，用最新版Ruby配置遇到的问题Google好多没答案，如果只是为了运行成功的话就按部就班吧，同时期待windows大牛的更好的配置方式
- 操作系统 win7 64位
- Ruby version：ruby 2.3.3p222 (2016-11-21 revision 56859) [x64-mingw32]
- gem version： 2.5.2

## 资源文件
1. 下载Ruby2.3.3：https://dl.bintray.com/oneclick/rubyinstaller/rubyinstaller-2.3.3-x64.exe
> 备用：https://pan.baidu.com/s/1wTDoHy6Klq52rpx86SaMXg  密码：plex
2. 下载DevKit: https://dl.bintray.com/oneclick/rubyinstaller/DevKit-mingw64-64-4.7.2-20130224-1432-sfx.exe
> 备用：https://pan.baidu.com/s/1d4H0J2Wi9Ojs6b5_o2Yc7w  密码：ecs1

## 安装
#### 安装 Ruby2.3.3
双击安装，在`Installation Destination and Optional Tasks`这一步，路径**不要包含Program Files这类系统路径，这个路径等会也会用到**，将三个选项都勾上，一直往下安装完成

#### 安装DevKit（其实就是解压）
新建一个文件夹 devkit（我为了方便管理就放在Ruby文件夹下面了，这个不影响），选中这个文件夹路径后点击 `Extract` 等待完成即可

#### 将Ruby 和 DevKit 关联起来
进入到 devkit 目录下

1. 执行 `ruby dk.rb init`
```
Initialization complete! Please review and modify the auto-generated
'config.yml' file to ensure it contains the root directories to all
of the installed Rubies you want enhanced by the DevKit.
```
> **请修改自动生成的 config.yml 文件**, 这里我们在`config.yml`添加第一步安装 Ruby 的路径，注意如果是反斜杆需要两个，这里使用正斜杆路径

```yaml
---
- E:/Temp/Ruby23-x64
```
2. 执行 `ruby dk.rb install`, 看到以下信息表示DevKit安装完成
```
[INFO] Updating convenience notice gem override for 'E:/Temp/Ruby23-x64'
[INFO] Installing 'E:/Temp/Ruby23-x64/lib/ruby/site_ruby/devkit.rb'
```

#### 配置 ruby-china 源（因为众所周知的原因）
`gem sources`，查看目前 gem 的源，如果已经是 http://gems.ruby-china.com，则可以跳过本步骤
1. `gem sources -a http://gems.ruby-china.com`，使用https需要额外配置证书，这里为了省事直接使用http地址了
2. `gem sources --remove https://rubygems.org`

#### 安装 jekyll
1. `gem install jekyll`
2. `jekyll new test`，切换到 test 目录下，执行 `jekyll serve`
```
E:/Temp/Ruby23-x64/lib/ruby/2.3.0/rubygems/core_ext/kernel_require.rb:55:in `require': cannot load such file -- bundler (LoadError)
```
3. 执行 `bundle install`，发现卡在 `Fetching source index from https://rubygems.org/`，创建出的模板默认使用 `https://rubygems.org`
4. 修改 `Gemfile`第一行，改成 `source 'http://gems.ruby-china.com'`，再次执行 `bundle install`
5. `bundler update`，然后执行 `jekyll serve`, 如遇 loadError，gem install XX 即可
> 在我的电脑上，缺失的有`jekyll-feed`,`jekyll-seo-tag`,`tzinfo-data`,`wdm` 等等，依次安装即可

6. 大功告成
```
Configuration file: E:/KuGou/test/_config.yml
            Source: E:/KuGou/test
       Destination: E:/KuGou/test/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
       Jekyll Feed: Generating feed for posts
                    done in 0.605 seconds.
 Auto-regeneration: enabled for 'E:/KuGou/test'
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.

```
打开浏览器输入：`http://127.0.0.1:4000` 即可预览效果

## Windows和Mac协同开发
> windows因为坑太深，所以版本什么的以Windows为基础，Mac做相应调整
#### Windows
1. 修改Gemfile 的source
2. 修改Gemfile.lock ，解决版本冲突
#### Mac
1. 使用`rbenv`降级 Bundler 版本：`rbenv install 2.3.3`
2. 应用安装的Ruby版本：`rbenv local 2.3.3`
3. 安装jekyll: `gem install jekyll`
4. `gem install bundler`
5. `bundler update`
6. `jekyll serve`

## 总结
> 终于理解某些公司为什么直接给所有员工配 Mac 了
本文只提供一个例子，同时提供了一些搭建环境中遇到问题的解决方案，具体操作起来可能遇到更多奇奇怪怪的问题，可能是环境变量未设置正确、机器安装多个版本未能正确引用等等问题，查看错误信息，截取关键部分，Google上很多人也会遇到类似的问题，如果Google仍未解决，可以在下面留言一起讨论。





## 参考
[Mac下Jekyll安装](https://www.jianshu.com/p/07064eb79740)

[在Windows上搭建Jekyll运行环境](https://betacat.online/posts/2018-01-26/setup-jekyll-environment-on-windows/)