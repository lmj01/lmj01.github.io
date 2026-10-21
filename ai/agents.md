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
[SprintRay Gateway](https://ai.it.soonsolid.com/)
[github](https://github.com/deepseek-ai/deepseek-harness)

```shell
pnpm install
pnpm run build
pnpm dsh web
# 更新repo代码后，可能缺少组件依赖
git fetch upstream # 拉取上游
git merge upstream/master --no-commit # 合并上游分支
git push origin master # 推送到自己的仓库
# 先删除 repo/node_modules 和 .dsh/profiles/* # 备份修改的数据，如web/下的配置文件
pnpm install # 更新依赖
pnpm run clean # 执行删除
pnpm run build # 在scripts/build.ts中 去掉if (import.meta.main) 让main直接运行起来， 是因为import.meta.main是在nodejs@24.2.0加入的特性
pnpm dsh --profile web --dump-config > a.txt # 查看配置的插件
pnpm dsh web --no-open # 不默认打开浏览器
# 模型问题
# 每次更新后，默认的官方仓库的模型会很少，会删除旧的模型，如果账号不是官方的，就容易出现问题
# 问题就是模型的名称不一致，官方的模型与提供的模型不一致的情况，所以要从第三方中转网关那里获取到对应模型名称。需要在模型广场中去查找对应的模型
```

## 插件

```shell
# 插件
pnpm dsh plugin --profile web add dsh-gateway # 安装插件
pnpm dsh plugin --profile web remove dsh-gateway # 删除插件
## dsh-gateway
node scripts/hash-password.mjs '你的密码' # 自带的脚本，生成hash
```

### dsh-gateway

```yaml
gateway:
  listenHost: '0.0.0.0'   # 监听所有网卡，允许局域网设备访问
  users:
    admin: 'scrypt$...'   # 这里需要填入密码的哈希值
```
配置生效后，在局域网内的其他设备浏览器中，访问 https://<DSH主机的局域网IP>:3443（默认端口 3443）。首次访问会提示自签名证书不受信任，确认继续后，输入你设置的账号密码即可登录使用。

</details>

<details>
<summary>AI工具</summary>

## [zcode](https://zcode.z.ai/cn)
智普

</details>