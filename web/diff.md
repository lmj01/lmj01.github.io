# Diff 算法

前提，要理解虚拟DOM，虚拟DOM就是用结构存储对element设置的参数封装
```html
<ul id="list">
    <li class="item">哈哈</li>
    <li class="item">嘿嘿</li>
</ul>
<ul id="list">
    <li class="item">哈哈</li>
    <li class="item">林三心哈哈哈哈哈</li> // 修改
</ul>
```
上面是两个element的内容，对应的虚拟DOM是
```js
let oldVDOM = { // 旧虚拟DOM
    tagName: 'ul', // 标签名
    props: { id: 'list'},
    children: [ // 标签子节点
        {tagName: 'li', props: { class: 'item' }, children: ['哈哈']},
        {tagName: 'li', props: { class: 'item' }, children: ['嘿嘿']},
    ]
}
let newVDOM = { // 新虚拟DOM
    tagName: 'ul', // 标签名
    props: { id: 'list'},
    children: [ // 标签子节点
        {tagName: 'li', props: { class: 'item' }, children: ['哈哈']},
        {agName: 'li', props: { class: 'item' }, children: ['林三嘿嘿']},
    ]
}
```
Diff算法就是对两个虚拟DOM进行对比，取出最小修改，并直接对修改部分的DOM进行更新

## 原理
通过上面的分析，知道了Diff算法与虚拟DOM的关系，现在分析一下原理
Diff算法比较只会在同层级进行，不会跨层级比较，是深度优先算法，时间复杂度为O(n)。
当数据改变时，会触发setter，通过Dep.notify去通知所有的订阅者watcher,这些订阅者调用patch方法给真实的DOM打补丁，以达到更新视图

**patch**
对比当前同层的虚拟DOM节点是否为同一类型element
- 是，同一element tag， 继续递归下一层级
- 否，直接使用新的element tag替换掉旧的

**sameVnode**
虚拟DOM的每个节点应该有自己的一个key，加上其他特定的属性来判断是否为同一个element tag

**patchVnode**
就是对两个Vnode进行对比，替换为最新或删除，其中最主要的是对子节点的处理

**updateChildren**



## 参考
[diff](https://juejin.cn/post/6994959998283907102)