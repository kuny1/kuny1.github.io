# LLM Agent 之 Hello world

## 目标设定（足够基础、重要）

**一句话**：根据用户命令行的输入，自主决策调用天气查询还是计算器，将正确结果返回

- 环境：Terminal、Agent自身必要环境
- 目标：能够解析用户的输入，转换成准确的任务目标
- 感知：命令行输入的文本
- 决策：决定调用天气还是计算器的 Function，维护自己的 workflow
- 行动：执行具体的工具，将总结后的结果返回给用户

## 建立仓库
- https://github.com/kuny1/agent-start

## 环境 & 依赖配置

### 基础环境配置

1. 确保 Python 正确安装
```shell
➜  projects python3 -V
Python 3.14.5
➜  projects pip3 -h

Usage:   
  pip3 <command> [options]
```

2. 创建 Virtual Environment
- 创建
```
python3 -m venv .venv
```
- 激活
```
source .venv/bin/activate
```
- 配置成功
```
(.venv) ➜  agent-start git:(main) ✗ 
```
3. 安装 ollama (本地推理引擎的事实标准)
- `pip3 install ollama`

4. 下载本地模型
`ollama run qwen2.5:7b`
> 更多模型可以：https://ollama.com/library

5. 启动本地推理服务
`ollama serve`

## 运行 Agent
- 启动 Agent
`python3 agent_local.py`

- 运行成功
```
(.venv) ➜  agent-start git:(main) ✗ python3 agent_local.py
Hello world! 本地 LLM Agent 已启动 (输入 q 退出)
> 
```

- 发起对话
```
> 你是谁?
Agent: 我是你的助手，可以帮助你回答问题、提供信息或者完成任务。你需要我帮助你做些什么吗？
```
> 如果没有收到正常的回复，回头检查自己的配置。如遇到 502 报错，确认是否已经运行`ollama serve`

🎉 恭喜你！你已经拥有了一个独属于自己的"活的" Agent ！

> 我们勇敢地跨出了第一步，非常值得庆祝！如果再深入想一想或者多体验几次，你可能会出现很多疑问？

- 为什么要选 Python，代码看不太懂，以后怎么维护
- 为什么稍微换一下措辞，Agent 就崩溃了，怎么解决？
- LLM的工作原理是什么？
- 为什么回复速度这么慢？
- ……

所以距离生产级可用，我们还有很长的路要走~
---

## 一些实际体验遇到的 Case

### 执行不完整
```shell
> 1+1等于多少
Agent:  yarg
{"name": "calculator", "arguments": {"expression": "1+1"}}
</tool_call>
```


## 其他问题
### 为什么非要用 Python？
- AI/LLM 生态的第一语言
- 丰富的“胶水”能力
- 学习曲线平滑，社区庞大
- 招聘要求：后端/全栈工程师语言要求，Python 出现最多

### 报错如何解决？
1. 学习 Python 基础，能看懂每一行代码
2. 学习基础的调试技巧，断点调试每一行的输入输出
3. ……(输入不同的 User Prompt)

下一篇：[Python基础：Life is Short, you need Python !](./python-basic)