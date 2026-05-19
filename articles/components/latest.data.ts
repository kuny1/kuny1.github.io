import { createContentLoader } from 'vitepress';
import { transformPost } from './common';

export default createContentLoader('**/*.md', {
    includeSrc: true,
    render: false,
    excerpt: true,
    transform: (raw) => {
        //
        const source = raw.map(post => transformPost(post));
        const latest = source.filter(post => post.frontmatter.system !== true);
        return latest;
    }
});