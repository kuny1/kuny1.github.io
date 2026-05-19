<script setup>
import { data as posts } from './latest.data';
console.log(posts);
</script>

<template>
  <ul>
    <li v-for="post of posts">
      <a :href="post.url">{{ post.frontmatter.title }}</a>
      <span style="color: gray;">（{{ post.frontmatter.createTime }}）</span>
    </li>
  </ul>
</template>