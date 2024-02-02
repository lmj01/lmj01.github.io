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

## [DSD(Dense-Sparse-Dense)](https://arxiv.org/pdf/1607.04381.pdf)

- [模型数据下载](https://songhan.github.io/DSD/)

如何通过改进训练过程提高传统模型的准确率

## [onnx](https://onnx.ai/)
> Open Neural Network Exchange (ONNX) is an open ecosystem that empowers AI developers to choose the right tools as their project evolves.

[microsoft的版本](https://github.com/onnx/onnx)和[ORT--ONNX Runtime: cross-platform, high performance ML inferencing and training accelerator](https://github.com/Microsoft/onnxruntime)
[可参考大致流程](https://github.com/microsoft/onnxjs)
[onnx example中可以找到一个例子，找到模型，把模型参数传入就可以得到结果了](https://github.com/microsoft/onnxruntime-inference-examples)

[开源可用的一些模型A collection of pre-trained, state-of-the-art models in the ONNX format ](https://github.com/onnx/models)

## 其他

- [Port of Facebook's LLaMA model in C/C++ ](https://github.com/ggerganov/llama.cpp)