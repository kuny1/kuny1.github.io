import { ContentData, Awaitable } from 'vitepress';
import { execSync } from 'child_process';

export type TTransform = (data: ContentData[]) => Awaitable<ContentData[]>;

// 执行 git 命令获取信息
export function getGitDates(filePath: string) {
    if (!filePath) {
        return { createTime: null, updateTime: null };
    }
    try {
        // 获取创建时间: 基于第一次引入文件的 commit
        const createTime = execSync(
            `git log --diff-filter=A --follow --format=%ai -1 -- "${filePath}"`
        ).toString().trim()
        // 获取最后修改时间
        const updateTime = execSync(
            `git log -1 --format=%ai -- "${filePath}"`
        ).toString().trim()
        //
        // 格式化：去掉时区部分
        const formatTime = (raw: string | null) => raw ? raw.slice(0, 19) : null;
        return {
            createTime: formatTime(createTime),
            updateTime: formatTime(updateTime)
        }
    } catch (error) {
        console.warn(`Git dates not found for ${filePath}:`, error)
        return { createTime: null, updateTime: null }
    }
}

// 定义一个函数，用于从 Markdown 源码中提取一级标题
export function extractH1Title(content: string | undefined): string | undefined {
    if (!content) return undefined; // 如果内容不存在，直接返回 undefined
    // 匹配行首的 # 标题，并捕获标题内容
    // 正则解释：/^#\s+(.+)$/m
    // ^        - 匹配行首
    // #\s+     - 匹配一个井号`#`和它后面的一个或多个空格
    // (.+)     - 捕获组，匹配一个或多个任意字符，直到行尾
    // /m       - 开启多行模式
    const match = content.match(/^#\s+(.+)$/m);
    // 如果匹配成功，返回标题文本并trim掉首尾空格；否则返回undefined
    return match ? match[1].trim() : undefined;
}

export function transformPost(post: ContentData): ContentData {
    const { frontmatter, src, url, ...rest } = post;
    const { title, create_time_raw, ...frest } = frontmatter;
        // 通过 URL 推断出对应的 Markdown 文件路径，假设 URL 是 /musings/example.html，那么对应的 Markdown 文件应该是 musings/example.md
        const gitFilePath = url.replace(/^\//, '').replace('.html', '.md');

        const { createTime, updateTime } = getGitDates(gitFilePath);
        return {
            frontmatter: {
                title: title || extractH1Title(src) || '文章标题未填写', // 如果frontmatter中没有title，就从内容中提取一级标题
                createTime: create_time_raw || createTime, // 优先使用 frontmatter 中的 create_time_raw，如果没有再使用 git 获取的创建时间
                updateTime,
                ...frest
            },
            ...rest,
            src: '',
            url,
        }
}