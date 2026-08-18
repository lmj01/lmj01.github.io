# 模型

## Model
How AI models are made: Data is a crucial component

data is upstream in process of developing good models

- Data prep, select data to train model on, across various sources
- Data evaluation & curation, clean & curate to improve dataset quality
- Model training
    - create custom model architecture using training frameworks
    - train & iterate models to improve performance
- Model deployment, deploy models & continueously evaluate to fine-tun models

[BLOOM]()
[LLAMA-1]()
[LIaMA-2]()
[Mistral-7B]()
[OpenAI]()
[Codegen]()
[Stable Diffusion 1.0]()
[CodeV1]()

### [DSD(Dense-Sparse-Dense)](https://arxiv.org/pdf/1607.04381.pdf)

- [模型数据下载](https://songhan.github.io/DSD/)

如何通过改进训练过程提高传统模型的准确率

### [onnx](https://onnx.ai/)
> Open Neural Network Exchange (ONNX) is an open ecosystem that empowers AI developers to choose the right tools as their project evolves.

[microsoft的版本](https://github.com/onnx/onnx)和[ORT--ONNX Runtime: cross-platform, high performance ML inferencing and training accelerator](https://github.com/Microsoft/onnxruntime)
[可参考大致流程](https://github.com/microsoft/onnxjs)
[onnx example中可以找到一个例子，找到模型，把模型参数传入就可以得到结果了](https://github.com/microsoft/onnxruntime-inference-examples)

[开源可用的一些模型A collection of pre-trained, state-of-the-art models in the ONNX format ](https://github.com/onnx/models)

### [HPC-AI Tech](https://hpc-ai.com/)
- [HPC-AI Tech github, We are a global team to help you train and deploy your AI models](https://github.com/hpcaitech)
- [Colossal-AI: Making large AI models cheaper, faster, and more accessible](https://github.com/hpcaitech/ColossalAI)


## 概念

### token
使用大模型时，会有提示词，大模型将提示词分解成token，再将token转向向量值，然后计算所有token之间的注意力关系，这步非常消耗算力，因此模型公司会对输入的token收费。

### 参数

B是Billion的缩写，即十亿。

参数可以简单理解为模型内部的神经元连接或可调节的旋钮，在训练过程中调整这些参数来学习和记忆数据中的模式，即参数量直接反应了模型的规模和复杂程度。

模型参数的数量，是决定模型能力“天花板”的最重要因素之一，可以这样理解：

- **参数量 ≈ 模型的“脑容量”或“知识存储空间”**。通常来说，参数量越大，模型能记忆的知识就越丰富，处理复杂问题的潜力也越大。
- **但“能力”还取决于“训练质量”**。就像一个大脑，如果接受的训练（数据质量和训练方法）不好，再大的脑容量也可能发挥不出来。

具体来说，参数量影响模型的哪些能力？

| 能力维度 | 参数量小的模型 (如 1B-3B) | 参数量大的模型 (如 70B+) |
| :--- | :--- | :--- |
| **知识记忆** | 能记住常识和常见事实，但细节容易出错或缺失。 | 能记住海量的事实、专业术语、罕见事件。 |
| **推理与逻辑** | 可以进行简单的逻辑推导，但面对多步推理或复杂上下文时容易“断片”。 | 展现出更强的逻辑链、数学推理和代码生成能力。 |
| **上下文理解** | 容易“忘记”长对话或长文档前面的信息。 | 能更好地处理长文本，抓住前后关联。 |
| **任务泛化** | 能执行基础的指令，但面对全新或复杂任务时灵活性较差。 | 能更好地理解抽象指令，并泛化到未见过的新任务上。 |
| **幻觉程度** | 相对更容易“编造”知识。 | 在同等训练质量下，幻觉率更低，回答更可靠。 |


### 量化

`Q4_K_M` 就属于**量化**技术，它通过压缩参数精度（比如把每个参数从16位浮点数压缩到4位整数），来**大幅降低模型对显存的需求**。

- **作用**：一个原本需要7GB显存的7B模型，4-bit量化后可能只需要4GB。这让你能运行更大的模型。
- **代价**：量化会导致模型能力有**轻微下降**，但通常这种下降比直接换用更小参数的模型要小得多。所以，**量化是在有限硬件下获得更好效果的最佳策略**。
- **为什么推荐1.5B-3B模型**？因为这是你3GB显存能流畅运行的“脑容量”上限。
- **为什么强调量化 (Q4_K_M)**？因为通过量化，你可以尝试在这个显存下把“脑容量”再撑大一点，或者让推理更快一些。

## 其他

- [Port of Facebook's LLaMA model in C/C++ ](https://github.com/ggerganov/llama.cpp)
- [ChatGLM3 series: Open Bilingual Chat LLMs | 开源双语对话语言模型 ](https://github.com/THUDM/ChatGLM3)
