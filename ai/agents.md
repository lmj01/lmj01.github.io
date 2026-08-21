# AI Agents

## Model Context Protocol(MCP)

是一个[开放标准](https://modelcontextprotocol.io)，旨在解决AI应用与外部世界"连接难"的问题


<details>
<summary>codex</summary>

- [config配置](https://developers.openai.com/codex/config-basic)

### config
auth.json
```shell
{
    "OPENAI_API_KEY" : "sk-CYntGyBfw9iEVL0C" # 私有key
}
```
config.toml 

```shell
model_provider = "my_codex"
model = "gpt-5.4"
model_reasoning_effort = "high"
disable_response_storage = true

[model_providers.my_codex]
name = "my_codex"
base_url = "http://192.168.0.160:3000/v1" # 这里是本地的服务入口
wire_api = "responses"
requires_openai_auth = true

model_reasoning_effort = "xhigh"
approval_policy = "never"
sandbox_mode = "danger-full-access"
personality = "pragmatic"

[plugins."github@openai-curated"]
enabled = true

[plugins."sentry@openai-curated"]
enabled = true

[plugins."build-web-apps@openai-curated"]
enabled = true

[plugins."browser-use@openai-bundled"]
enabled = true

[plugins."documents@openai-primary-runtime"]
enabled = true

[plugins."spreadsheets@openai-primary-runtime"]
enabled = true

[plugins."presentations@openai-primary-runtime"]
enabled = true

[marketplaces.openai-bundled]
source_type = "local"

[projects."/home/meiji/work/snake-stellar-chain"]
trust_level = "trusted"

[projects."/home/meiji/work/libSnippets"]
trust_level = "trusted"

[projects."/home/meiji/mythree"]
trust_level = "trusted"

[projects."/home/meiji/work/starlink"]
trust_level = "trusted"

[tui]
status_line = ["model-with-reasoning", "current-dir", "model", "project-name", "git-branch", "run-state"]

[tui.model_availability_nux]
"gpt-5.4" = 5
"gpt-5.5" = 4
```

### cli

```shell
npm install -g @openai/codex # 安装
codex --version # 安装成功后有版本号
cd project/xxx # 进入项目目录
codex # 直接进入cli编辑模式 直接喂话，通过语言来更改
# 插件
> /plugins # 按enter后进行按照
```

</details>

<details>
<summary>github copilot</summary>




</details>

<details>
<summary>deepseek harness</summary>

[deepseek harness](https://www.deepseek.com/harness/)智能体可以本地跑，与网页上的一样，可以配置很多模型。

[github](https://github.com/deepseek-ai/deepseek-harness)
```shell
pnpm install
pnpm run build
pnpm dsh web
```

## [Cordis内核](https://deepseek-harness.github.io/deepseek-harness/reference/cordis-primer)

[github Cordis](https://github.com/cordiverse/cordis)内核只负责插件的加载、卸载和依赖关系
[dsh plugin](https://awesome-dsh-plugin.com/)

### [论文](https://github.com/cordiverse/paper)

传统软件的组件都是static，都是编译好的，比如静态语言C++和C，这也是我最早接触的一套很优秀的游戏架构代码，那时还以卖代码为事业的时代。
在现代AI agent中需要动态，时间可组合性与空间可组合性。

**关于这个想法，特别是我从静态语言进入动态语言后，就很想做的一件事情，但是没有思路，而这篇论文是在解决这个思路下的问题，给出了实践的具体方案，就像我心中的念头一直是用C++静态语言开发一个框架，用lua动态语言来控制，但是一直不知道做什么，而agent天然是这方面的需求方，给出了不同的人需要不同的定制化需求。而不同行业的人也带来了不同的组合。真正印证了时间与空间的组合。**

</details>