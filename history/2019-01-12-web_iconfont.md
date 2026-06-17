---
create_time_raw: 2019-01-12 19:13:31 +0800
---
# Web字体图标-自动化方案
## 缘起
`Web`从诞生之日起是为了展示`图片`和`文字`的，最典型的代表就是`img`和`span`。这是构建丰富的Web页面的基石，也是理解浏览器表现（`Browser  performance`）的基础。本文将从从`图片`中的`小图标`切入，介绍一下`Web`中`小图标`的技术方案的演进。


### Web中小图标方案的演进
笔者本来打算从`Image Sprites`，到 `Svg Sprites`到`iconfont` 到 `svg Icon` 整体介绍一遍的，在查阅资料之后发现已经有大佬写过了：[Web中的图标-大漠](https://github.com/amfe/article/issues/2)，介绍得算是很详细（绝大部分应用场景都已经能覆盖了），这一部分本文就不再赘述了。

#### 笔者的补充
1. [MDN关于 Image sprites 的`备注`](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/CSS_Image_Sprites)：当使用 HTTP/2 时，使用多个小流量请求实际上可能更为带宽友好。
2. `DataURI`（图片`Base64`）（笔者的建议是`慎用`，它可能成为一个性能瓶颈），因为`CSS`在解析过程遇到`Base64`，每次都需要解码，这会`阻塞关键CSS的渲染`，具体可以看这一篇文章：[深挖 data URI 性能瓶颈](https://juejin.im/entry/58ca2b9dac502e0058868693)
> 趁机纠正了自己之前的错误：`Gzip`是针对`html/css/js`的，`.wotf/.png/.ico` 等图片资源是不进行`Gzip`压缩，如果不确定可以查看Network中的`Response Headers`


## 言归正传
接下来终于轮到了本文中的主角：**Icon Font** 登场了~~~。相比位图 `png Sprites` 而言，使用字体图标可以`不受限于屏幕分辨率`，而且字体图标另一个优势是：只要适合字体相关的`CSS属性`都适合字体图标。笔者经过调研之后在项目中确定了 `Icon font` 的方案。

#### 逝去的青春
最开始是将`svg`上传到 `https://icomoon.io/`，生成对应的字体和样式文件，然后引入到项目中。
> 问题1：每次`update`图标都需要重复上面的步骤，然后再把文件下载下来，然后复制到项目源码中替换旧的文件

> 问题2：样式文件不好管理，因为`icomoon`下载下来的样式文件因为兼容性的需要，是需要进行修改的，以致于每次得摘出`icon-list`, 原有已进行兼容的代码保留。

> 问题3：当时 `icomoon`免费版 没有提供去色构建字体图标的功能，导致还需要对生成的样式进行一定的定制(调色，调位置)

> 问题4：更换了设计师之后，设计出来的`某些图标文件`引入之后，`icomoon` 生成的字体全部没法用了。终于忍无可忍……

### 探索方案
因为源项目中使用`gulp`和`webpack`打包，心中最理想的方案当然是`webpack`的`plugin`或者`loader`，或者`gulp`的`plugin`。尝试过`gulp-iconfont`结合`gulp-iconfont-css`已经等等其他方案，要不是因为一些细节方面没有配置成功，要不就是成功构建出来的字体图片有明显的偏移或者锯齿。多番查阅资料和实践之后终于发现了一个不那么起眼的库`webfonts-loader`

### webfonts-loader
第一眼见到TA的时候，我未曾想过这将会是陪伴我许久的那一个，无论是从TA可怜的`78❤️`，还是作者本人`jeerbl`的知名度，但作为一个勇(`zou`)于(`tou`)尝(`wu`)鲜(`lu`)的前端，还是认真地读了一下`TA`的`README`，看到了熟悉的`webpack`的`loader`配置和`js`的语法，决定好好地实践一下。（扯远了）

## 原理（工作流程）
`webfonts-loader`（借助`webpack`）如何一步一步地将svg的图标处理成我们最终想要的样子？
> How does the webfonts-loader which work with webpack build svg icons step by step ?

先来看最关键的3份配置：

##### scionfont.js
```javascript
module.exports = {
	files: [
		'./svg/*.svg',
	],
	fontName: 'bicon',
	classPrefix: 'bicon-',
	fixedWidth: true,
	types: ['eot', 'woff', 'ttf', 'svg'],
	cssTemplate: './template.hbs'
};
```

##### iconfont.js loader
```javascript
{
    test: /siconfont.js/,
    use: [
        'vue-style-loader',
        'css-loader',
        {
            loader: 'webfonts-loader',
            options: isProd ? {
                fileName: assetsPath('img/[fontname]-[hash:7].[ext]')
            } : {}
        }
    ]
}
```

##### fonts loader
```javascript
{
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
    }
}
```

1. 首先，webpack解析到 `import './assets/fonts/siconfont.js'`，
2. 接着，webpack会将对应的`siconfont.js`加载到webpack的工作流中
3. 而`siconfont.js`通过正则匹配到了对应的`siconfont.js`的webpack相应的 loader(`上面第2份配置`)
4. 首先使用`webfonts-loader`来处理这个`xx.js`，`webfonts-loader`解析这个`siconfont.js`(`上面的第一份配置`) 之后， 会将当前目录`svg`下的所有`svg`图标文件都加载进来，并且将相应的CSS模板也加载了进来，并且通过一些项的配置
> e.g：配置 `types: ['eot', 'woff', 'ttf', 'svg']`，表示会打包出`四种字体图标文件`
5. 接下来的步骤就简单了：`webfonts-loader`处理完成之后输出两种文件流：(1)`.eot/.woff` 等字体文件流 (2) 对应的`关联css流`
6. 文件流下一步进入`css-loader`，该`import`的`import`，字体图标路径该`resolve`的`resolve`，还有其他可能需要的工作。
7. 最终生成的`CSS`可能通过`style-loader`直接内嵌到html 的`style`标签中，也可以通过`Extract插件`提取出来整合到最终页面的CSS 中,然后通过`link`使用

> 再一次感受到 `webpack` 自动收集依赖和管理依赖，真的是很强大，为我们省了太多心

### 大功告成
借助着`webpack`的热更新机制，我们可以很方面地去更新`svg文件夹`下的字体文件，并即时使用。使用步骤：
1. 拖入文件 `left-arrow.svg`
2. 在组件中对应DOM上添加类名(`class`)： `bicon-left-arrow`
3. 刷新浏览器，字体图标已经加上~


## 写在最后
文中的方案已经在[手机搜狐网](https://m.sohu.com)和[手搜体育频道](https://m.sohu.com/z/)等多个项目中实践和使用，能覆盖绝大多数业务场景。文中完整的示例可以查看 [vue-ssr-start](https://github.com/gxmzjxk/vue-ssr-start) ，欢迎 star※
> Vue-ssr-start 是我学习从零开始搭建一个`SSR`脚手架的理解和记录，还有一些对前端工程化的思考和探索，会持续迭代并加上完整的注释，欢迎`watch`。水平有限，出错难免，欢迎各位同学多多指正，共同进步~


## 参考
[webfonts-loader](https://github.com/jeerbl/webfonts-loader)

[Web中的图标-大漠](https://github.com/amfe/article/issues/2)

[深挖 data URI 性能瓶颈](https://juejin.im/entry/58ca2b9dac502e0058868693)

[icomoon](https://icomoon.io/)