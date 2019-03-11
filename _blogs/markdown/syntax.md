---
layout: blog
title: Github Markdown Syntax
date: 2018-10-24 22:00:00 +0800
tags: 
---

This guide is based on [Writing on GitHub - Github Help](https://help.github.com/categories/writing-on-github/).

## Heading

# The largest heading
## The second largest heading
###### The smallest heading (the sixth largest heading)

## Styling text

**Blod**,
_Italic_,
~~Strikethrough~~,
**_Bold and italic_**.

## Quoting text

Before quote:

> Quote

After quote.

## Syntax highlight

Use `inline code` and block code:

```c++
#include <iostream>
using namespace std;
int main(int argc, char * argv[]) {
  cout << "Hello world" << endl;
  return 0;
}
```

## Links

[GitHub Pages](https://pages.github.com/)

### Section links

[Section links](#section-links)

### Relative links

## Lists

### Unordered lists

- list item
- list item
- list item

### Ordered lists

1. list item
1. list item
1. list item

### Nested lists

- list item
  - list item
    - list item

1. list item
   1. list item
      1. list item

1. list item
   - list item
     1. list item

### Task lists

- [ ] list item
- [ ] unchecked list item
- [x] checked list item

## Tables

| table header | left aligned | center aligned | right aligned |
| --- | :--- | :---: | ---: |
| table row | table data | table data | table data |
| table row | table data | table data | table data |
| very long, very very long | very long, very very long | very long, very very long | very long, very very long |

## Paragraphs and line breaks

First paragraph first sentence.
First paragraph second sentence.

Second paragraph.

## Ignore Markdown formatting

Use `\`.

## Invalid in GitHub Pages

### Autolink

URLs:
https://github.com/

Mention people and teams:
`@centixkadon`

Reference issues and pull requests:
`#number` or `username/repository#number`

### Emoji

`:EMOJICODE:`, e.g. :+1:, :shipit:.
Check out [emoji cheat sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet/).
