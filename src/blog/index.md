---
title: Blogg
layout: base.njk
---

# Blogginnlegg

<div class="post-list">
{% for post in collections.blog | reverse %}
  <article class="post-card">
    <h3><a href="{{ post.url }}">{{ post.data.title }}</a></h3>
    <div class="meta">{{ post.data.formattedDate }}</div>
    <p>{{ post.templateContent | striptags | truncate(160, true, "…") }}</p>
    <p><a class="btn" href="{{ post.url }}">Les mer</a></p>
  </article>
{% endfor %}
</div>
