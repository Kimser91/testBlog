---
title: Blogg
layout: base.njk
---

# Blogginnlegg

<div class="post-list">
{% assign posts = collections.blog | reverse %}
{% for post in posts %}
  <article class="post-card">
    <h3><a href="{{ post.url }}">{{ post.data.title }}</a></h3>
    <div class="meta">{{ post.date | date: "%d.%m.%Y" }}</div>
    <p>{{ post.templateContent | strip_html | truncate: 160 }}</p>
    <p><a class="btn" href="{{ post.url }}">Les mer</a></p>
  </article>
{% endfor %}
</div>
