# [markdown](https://commonmark.org/)

- [日刊-zeli App用中文读科技新闻](https://zeli.app/zh)
- [抓取AI论文并用视频解读](https://huggingface.co/spaces/brianxiadong0627/paper-digest)
- [周刊-阮一峰日志](https://www.ruanyifeng.com/blog/)
- [月刊-HelloGithub](https://hellogithub.com/periodical)
- [Hacker News New](https://news.ycombinator.com/)
- [markdown中文文档](https://markdown.com.cn/)
- [mermaid](/articles/mermaid.md)

markdown渲染成HTML的插件, 如果不方便表示的，可以直接使用HTML5的标签来表示内容

[What's In A Class?] [1]

## markdown 

<details>
<summary>alert</summary>

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

</details>

<details>
<summary>table</summary>

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

</details>

<details>
<summary>katex</summary>

## [katex](https://katex.org/)

- [js katex api ](https://katex.org/docs/api)
- [支持格式](https://katex.org/docs/support_table)
- [常用数学公式排版KaTex语法总结](https://kissingfire123.github.io/2022/02/18_%E6%95%B0%E5%AD%A6%E5%85%AC%E5%BC%8Fkatex%E5%B8%B8%E7%94%A8%E8%AF%AD%E6%B3%95%E6%80%BB%E7%BB%93/)

可以使用text来包装字体，这样就不会出现问题了

$$ x^{y^z}=(1+{\rm e}^x)^{-2xy^w} $$

$$
a^2=b^2+c^2
$$

This is inline katex: 

$ c = \\pm\\sqrt{ a^2 + b^2 } $

This is block level katex:

$$
c = \\pm\\sqrt{a^2 + b^2}
$$

注意公式内换行，是四个反斜杠

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

$$
\begin{matrix}
    1 & x & x^2 \\\\
    1 & y & y^2 \\\\
    1 & z & z^2 \\\\
\end{matrix}
$$

$ \begin{matrix} 1 & 2 \\\\ 3 & 4 \\\\ \end{matrix} $

$ \begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\\\ \end{pmatrix} $

$ \begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\\\ \end{bmatrix} $

$ \begin{Bmatrix} 1 & 2 \\\\ 3 & 4 \\\\ \end{Bmatrix} $

$ \begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\\\ \end{vmatrix} $

$ \begin{Vmatrix} 1 & 2 \\\\ 3 & 4 \\\\ \end{Vmatrix} $

$$
\begin{pmatrix}
    1 & a_1 & a_1^2 & \cdots & a_1^n \\\\
    1 & a_2 & a_2^2 & \cdots & a_2^n \\\\
    \vdots & \vdots & \vdots & \ddots & \vdots \\\\
    1 & a_m & a_m^2 & \cdots & a_m^n \\\\
\end{pmatrix}
$$

$$
\left[
    \begin{array}{cc|c}
        1 & 2 & 3 \\\\
        4 & 5 & 6 \\\\
    \end{array}
\right]
$$

 $\text{这是一个行中矩阵的示例}\bigl(\begin{smallmatrix} a & b \\\\ c & d \end{smallmatrix}\bigr)\text{。}$

$\lVert \boldsymbol{X}_i - \boldsymbol{S}_j \rVert^2$

$$ f(x,y,z) = 3y^2z \left( 3+\frac{7x+5}{1+y^2} \right) $$

<!-- 积分公式会导致正则规则不匹配 -->
<!-- $$ \left. \frac{ {\rm d} u} { {\rm d} x} \right| _{x=0} $$ -->
$$ \frac{ {\rm d} u} { {\rm d} x} | _{x=0} $$

分数

$$ \frac{a-1}{b-1} \quad or \quad {a+1 \over b+1} $$

$$ \frac 12,\frac 1a,\frac a2 \quad \mid \quad \text{2 letters only:} \quad \frac 12a \\,, k\frac q{r^2} $$

$$ \sqrt{2} \quad or \quad \sqrt[n]{3} $$

$$ f(x_1,x_2  \ldots x_n) = x_1^2 + x_2^2 + \cdots + x_n^2 $$

$$ \vec{a} \cdot \vec{b}=0 $$

$$ xy \text{ with arrows:} \quad \overleftarrow{xy} \\; \mid \\; \overleftrightarrow{xy} \\; \mid \\; \overrightarrow{xy} $$

$$ \int_0^1 {x^2} \,{\rm d}x $$

$$ \lim_{n \to \infty} \frac{1}{n(n+1)} \quad and \quad \lim_{x\leftarrow{\text{示例}}} \frac{1}{n(n+1)} $$

$$ \sum_{i=1}^n \frac{1}{i^2} \quad and \quad \prod_{i=1}^n \frac{1}{i^2} \quad and \quad \bigcup_{i=1}^{2} \Bbb{R} $$

$$ \verb+\overset{above}{level}+ \qquad \overset{xx}{ABC} \\;\\; \mid \quad \overset{x^2}{\longmapsto}\ \\, \mid \quad \overset{\bullet\circ\circ\bullet}{T} $$

$$ \verb+\underset{below}{level}+ \qquad \underset{xx}{ABC} \\;\\; \mid \quad \underset{x^2}{\longmapsto}\ \\, \mid \quad \underset{\bullet\circ\circ\bullet}{T} $$

$$ \rm {SrO} + V^{''}_{Sr} \overset{H_2}{\underset{1300 \text{ \textdegree C} }{\Longleftrightarrow}} 2e^{'}+\frac 12O_2(g) + Sr^{\times}_S $$

$$
\begin{array}{cc}
    \mathrm{Bad} & \mathrm{Better} \\\\
    \hline \\\\
    \int_0^1 x^2 dx & \int_0^1 x^2  \\,{\rm d}x
\end{array}
$$

<!-- $$f\left( \left[  \frac{ 1+\left\\{x,y\right\\} }{ \left( \frac xy + \frac yx \right) (u+1) }+a\right]^{3/2} \right)\tag {\text{行标}}$$ -->

$$
\begin{aligned}
    a=&\left(1+2+3+ \cdots \right. \\\\
      &\cdots+\left. \infty-2+\infty-1+\infty\right)
\end{aligned}
$$

<!-- $$ f(n)= \begin{cases} n/2, & \text {if $n$ is even} \\\\ 3n+1, & \text{if $n$ is odd} \end{cases} $$ -->

$$
A B \quad Vs \quad A\\,B  \\\\
C D \quad Vs \quad C\\;D   \\\\
E F \quad Vs \quad E\space F 
$$

$$ \mu_0=4\pi\times10^{-7} \ \left.\mathrm{\mathrm{T}\\!\cdot\\!\mathrm{m}}\middle/\mathrm{A}\right.$$  

$$ 180^\circ=\pi \ \mathrm{rad} $$  

$$ \mathrm{N_A} = 6.022\times10^{23} \ \mathrm{mol}^{-1}$$

$$
\begin{array}{|rrrrrrrr|}\hline
    \verb+#000+ & \color{#000}{text} & & &
    \verb+#00F+ & \color{#00F}{text} & & \\\\
    & & \verb+#0F0+ & \color{#0F0}{text} &
    & & \verb+#0FF+ & \color{#0FF}{text} \\\\
    \verb+#F00+ & \color{#F00}{text} & & &
    \verb+#F0F+ & \color{#F0F}{text} & & \\\\
    & & \verb+#FF0+ & \color{#FF0}{text} &
    & & \verb+#FFF+ & \color{#FFF}{text} \\\\
\hline\end{array}
$$

[maths symbols for latex](https://mirrors.jlu.edu.cn/CTAN/info/symbols/math/maths-symbols.pdf)

</details>

## 其他

- [A WYSIWYG Markdown editor, improve reading and editing experience. and generate your Markdown files into online documents in the easiest and fastest way一个所见即所得的 Markdown 桌面编辑器，集成了 Mermaid 图形与 Katex 公式，支持明亮和暗黑风格。](https://github.com/1943time/bluestone)

[Marked Documentation](https://marked.js.org/)

- [marked github](https://github.com/markedjs/marked)
- [demo可下载发布后的文件](https://marked.js.org/demo/)
- [marked插件 github](https://github.com/bent10/marked-extensions)
- [assiimath 公式更简洁些，支持firefox和Safari](https://asciimath.org/)

 公共引用区域, 如果:只有右边一个空格，可以隐藏，两边都有空格，显示，但是引用就不调整。

[1]: <http://www.gotw.ca/publications/mill02.htm> (What's In A Class?)