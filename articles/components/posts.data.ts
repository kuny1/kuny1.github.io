import { createContentLoader } from 'vitepress';

const output = createContentLoader('musings/*.md', {});


console.warn('output', output);


export default output;