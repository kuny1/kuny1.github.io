# 从零到一搭建一个完整的 Agent（FE向）

## 零、5W原则分析
### What: 什么是 Agent
- 常见定义：具备 **感知**、**决策**和**执行任务**能力，能够独立运行的计算或认知实体
- 本文 Agent: 基于大语言模型的 AI Agent，由 Brain（大脑）、Perception（感知）、Action（行动）组成

> 参考：https://agijuejin.feishu.cn/wiki/MW4RwL1eDinrzAkSLPfcU3aQnsd

### Why: 为什么要自己学会造 Agent？
- 感兴趣：就想看看怎么运作的，满足好奇心
- 知识储备：技多不压身
- 转行：Agent 岗位缺口大
- 更好地使用工具：了解原理，知晓能力边界，更好地使用工具帮助我们

### Where: 在什么场景开发一个 Agent
- 改进现有研发工作流
- 满足自己个性化需求
- 研究需要

### Who: 谁可以开发一个 Agent
- 程序员/工程师：前端/后端/全栈等
- 测试：测试开发等
- 有编程能力或良好工程思维的其他人

### When: 什么时候开始
- 开发一个 Agent 最好是两年前，其次是现在
### How: 如何从 0 到 1 开发一个 Agent（移步[](./first)）
- 参考资料
  - https://github.com/datawhalechina/hello-agents
  - https://github.com/nousresearch/hermes-agent
  - https://github.com/liaokongVFX/LangChain-Chinese-Getting-Started-Guide


## 市面上流行的 Agent
- 通用型：ChatGPT、Claude Code、DeepSeek R1 等
- Coding Agent: Cursor、Trae、GitHub Copilot 等
- 桌面端：OpenClaw 等


## 灵魂拷问：为什么要从头造？
- 现成的好用的 Agent、可视化的工作流编排平台（批量产出 Agent）：Dify、Coze 等
- 学习的本质：数据 → 知识 → 智慧（只有在学习知识、思考和运用的过程中，才有可能产生）
- 已有的部分：数据、知识（工具）
  - 数据：通用大模型已经将互联网公开数据全部学了一遍
  - 知识：借助自注意力机制的 Transformer 架构，LLM 已经可以“理解”绝大部分信息，并返回正确的结果

而**智慧**：只有亲自做过（撞过南墙、踩过坑），很多的设计和方案我们才会有深刻认识（为什么非要这么设计），从而有可能产生：
1. 理解其工作原理，有选型和改进的能力
2. 清楚知道 Agent的能力边界，让其在合适的地方发挥最大的价值

古话说得好：纸上得来终觉浅，绝知此事要躬行！
