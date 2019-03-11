---
layout: default
slug: debug
title: Debug
unpublished: true
index: 99
---

# Debug

{{ '0 1 2 3 4 5 6 7 8 9' | split: ' ' | slice: 2, 100 | join: ', ' | prepend: '[' | append: ']' }}

{{ page.path }}

categories: {% assign categories = site.blogs | map: 'id' | uniq %}
{%- for category in categories %}
{{ category | remove_first: '/b/' | split: '/' | pop | join: '-' }}{% unless forloop.last %},{% endunless %}
{%- endfor %}

url: {{ site.blogs | map: 'url' | uniq | join: ', ' }}

id: {{ site.blogs | map: 'id' | uniq | join: ', ' }}

relative_path: {{ site.blogs | map: 'relative_path' | uniq | join: ', ' }}

path: {{ site.blogs | map: 'path' | uniq | join: ', ' }}

collection: {{ site.blogs | map: 'collection' | uniq | join: ', ' }}

categories: {{ site.blogs | map: 'categories' | uniq | join: ', ' }}

layout: {{ site.blogs | map: 'layout' | uniq | join: ', ' }}

title: {{ site.blogs | map: 'title' | uniq | join: ', ' }}

date: {{ site.blogs | map: 'date' | uniq | join: ', ' }}

tags: {{ site.blogs | map: 'tags' | uniq | join: ', ' }}

slug: {{ site.blogs | map: 'slug' | uniq | join: ', ' }}

ext: {{ site.blogs | map: 'ext' | uniq | join: ', ' }}

## Object, Array or String

.obj.first.size.

.{%- assign obj = 'aaa' -%}
{%- if obj -%}{{ obj }}{%- else -%}nil{%- endif -%}.
{%- if obj.first -%}{{ obj.first }}{%- else -%}nil{%- endif -%}.
{%- if obj.size -%}{{ obj.size }}{%- else -%}nil{%- endif -%}.

.{%- assign obj = obj | split: '' -%}
{%- if obj -%}{{ obj }}{%- else -%}nil{%- endif -%}.
{%- if obj.first -%}{{ obj.first }}{%- else -%}nil{%- endif -%}.
{%- if obj.size -%}{{ obj.size }}{%- else -%}nil{%- endif -%}.

## site keys

<!-- { % include recursion.html obj = site.collections % } -->
{%- for key in site %}
{{ key }}
{%- endfor %}

## page keys

{%- for kv in site.pages[0] %}
{{ kv | first }}
{%- endfor %}

## blog keys

{%- for key in site.blogs[0] %}
{{ key }}
{%- endfor %}
