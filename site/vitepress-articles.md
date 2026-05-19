# VitePress 如何实现自动更新的文章列表页

## 痛点
随着文章数目越来越多，如何将历史的文章呈现出来成为迫切的需求，再细拆下来，主要有3个需求：全部文章列表（支持分页）、最近发布（时间倒序）、推荐文章（引流、导览）等

## 尝试的过程

### 通过 createContentLoader API
1. 使用默认配置解析所有 .md 文件
```
createContentLoader('**/*.md', {});
```

2. 获取的结果为：
```json
[
    {
        "frontmatter": {},
        "url": "/mac/env.html"
    },
    {
        "frontmatter": {},
        "url": "/musings/zero.html"
    }
]
```

3. 拿到的信息太少，无法搭建出我们想要的文章列表页


### 重新分析需求
为了实现关键的几个需求点，我们需要尽可能多地获取到文章的信息，我将其分为核心信息和附加信息
   
- 核心信息
  - title：文章标题
  - url：文章在网站中的地址
- 附加信息
  - createTime: 创建时间
  - updateTime: 修改时间
  - pin: 置顶（数量少，可手动维护）
  - tags: 标签（繁琐，寻求自动化）
  - category: 分类（繁琐，寻求自动化）
  - ~~author: 自己开发，忽略~~
### 各个信息的解决方案
#### title 获取
- 可以通过 Markdown 头部声明 ---title:xxx--- 来手动配置，但是稍显繁琐
- 最好能直接将 `#标题` 符合协作习惯的内容提取作为文章标题
- 同时判断优先级：如果手动声明了 title，则更优先


**最终实现如下**
> 注意 transform 之后返回的内容要符合格式要求，只有 `frontmatter` 是可以自由扩展的

```typescript
const output = createContentLoader('musings/*.md', {
    includeSrc: true,
    render: false,
    excerpt: true,
    transform(raw) {
        return raw.map(({ frontmatter, src, ...rest }) => {
            const { title, ...frest } = frontmatter;
            return {
                frontmatter: {
                    title: title || extractH1Title(src) || '文章标题未填写', // 如果frontmatter中没有title，就从内容中提取一级标题
                    ...frest
                },
                ...rest,
                src: ''
            }
        })
    }
});
```

#### createTime/updateTime 获取
> 经过调研后，入围访问有二：日期约定式文章名、Git 记录自动提取。自动化降负优先，最终 Git 方案




