---
title: Blogg
layout: base.njk
---

# Blogginnlegg

{% for post in collections.blog %}
- [{{ post.data.title }}]({{ post.url }})
{% endfor %}
