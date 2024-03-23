# 技术方案

## CEF与Electron

[github CEF](https://github.com/chromiumembedded/cef)
[Chromium Embedded Framework (CEF). A simple framework for embedding Chromium-based browsers in other applications.](https://bitbucket.org/chromiumembedded/workspace/projects/CEF)
CEF面向会使用C++和JS、HTML、CSS的，是对Chromium做了精简和封装，允许开发者通过C++控制chromium核心，与Javascript交互，但其他都需要开发者自己处理

Electron面向纯前端开发者

## 网页音频

[web speech api](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)网页上支持的音频操作，分两大类
- Speech Synthesis(text to speech)合成音频，文字转语音
- Speech Recognition(asynchronous speech recognition)

## OLAP(On-Line Analytical Processing)

是一种共享多维信息的、针对特定问题的联机数据访问和分析的快速软件技术。侧重于数据仓库的建立、提供报表分析等

在技术上经常就只有多维分析的功能，也就是针对一个事先建设好的数据立方体，按指定维度层次进行汇总并呈现成表格或图形，再辅以钻取、聚合、旋转、切片等操作以变换维度层次及汇总范围。

多维分析在技术上有两个不足：
- 一是立方体要事先准备，使用人员通常没有临时设计和改造立方体的能力，一旦有新的分析需求则必须重建立方体；
- 二是立方体上可实施的分析动作单调，只有钻取、聚合、切片、旋转等少数几种，难以完成多步骤的复杂计算行为。

由数据配合业务来驱动模型，就是预设计好的模型，不太适合某些情况，在某些情况下excel在一定程度上具备某种分析能力，但是excel不适合大数据处理。