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
[cordis元框架](/cs/cordis.md)

[github](https://github.com/deepseek-ai/deepseek-harness)
```shell
pnpm install
pnpm run build
pnpm dsh web
# 更新repo代码后，可能缺少组件依赖
# 先删除 repo/node_modules 和 .dsh/profiles/* # 备份修改的数据，如web/下的配置文件
pnpm install # 更新依赖
pnpm run clean # 执行删除
pnpm run build # 在scripts/build.ts中 去掉if (import.meta.main) 让main直接运行起来， 是因为import.meta.main是在nodejs@24.2.0加入的特性
pnpm dsh --profile web --dump-config > a.txt # 查看配置的插件
pnpm dsh web --no-open # 不默认打开浏览器
```


</details>

<details>
<summary>AI工具</summary>

## [zcode](https://zcode.z.ai/cn)
智普

</details>