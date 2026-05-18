<script setup>
import { data as posts } from './posts.data';
</script>

<template>
  <h1>All Blog Posts</h1>
  <pre>{{ JSON.stringify(posts) }}</pre>
  <ul>
    <li v-for="post of posts">
      <a :href="post.url">{{ post.frontmatter.title }}</a>
      <span>by {{ post.frontmatter.author }}</span>
    </li>
  </ul>
</template>