# markdown demo
> markdown渲染成HTML的插件


```js
function func(a, b) {
    return a + b
}
```

## [katex](https://katex.org/)

- [js katex api ](https://katex.org/docs/api)
- [支持格式](https://katex.org/docs/support_table)

$$
a^2=b^2+c^2
$$

This is inline katex: 

$ c = \\pm\\sqrt{ a^2 + b^2 } $

This is block level katex:

$$
c = \\pm\\sqrt{a^2 + b^2}
$$

$$
\\begin{array}{cc}
   a & b \\\\
   c & d
\\end{array}
$$

$$
\\begin{array}{cc}
1 & 2 & 3 \\\\
4 & 5 & 6 \\\\
7 & 8 & 9 
\\end{array}
$$

[maths symbols for latex](https://mirrors.jlu.edu.cn/CTAN/info/symbols/math/maths-symbols.pdf)

## [alert](https://github.com/bent10/marked-extensions/tree/main/packages/alert)
- [Enables GFM alerts](https://github.com/orgs/community/discussions/16925)

> [!NOTE]  
> Highlights information that users should take into account, even when skimming.

> [!TIP]
> Optional information to help a user be more successful.

> [!IMPORTANT]  
> Crucial information necessary for users to succeed.

> [!WARNING]  
> Critical content demanding immediate user attention due to potential risks.

> [!CAUTION]
> Negative potential consequences of an action.

> **Note**
> This is a note

> **Warning**
> This is a warning

## table

- **table one**

| This header spans two   || Header A |
| columns *and* two rows ^|| Header B |
|-------------|------------|----------|
| Cell A      | Cell B     | Cell C   |

- **table two**

| H1           | H2      |
|--------------|---------|
| This cell    | Cell A  |
| spans three ^| Cell B  |
| rows        ^| Cell C  |

- table three

| H1      | H2      | H3      |
|---------|---------|---------|
| This cell spans 3 columns |||

- table four

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |


## 其他

- [A WYSIWYG Markdown editor, improve reading and editing experience. and generate your Markdown files into online documents in the easiest and fastest way一个所见即所得的 Markdown 桌面编辑器，集成了 Mermaid 图形与 Katex 公式，支持明亮和暗黑风格。](https://github.com/1943time/bluestone)

[Marked Documentation](https://marked.js.org/)

- [marked github](https://github.com/markedjs/marked)
- [demo可下载发布后的文件](https://marked.js.org/demo/)
- [marked插件 github](https://github.com/bent10/marked-extensions)