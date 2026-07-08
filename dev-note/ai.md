# AI

## codex

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
```

### skills
