# [Mermaid](https://mermaid.js.org/)

- [集成社区](https://mermaid.js.org/ecosystem/integrations-community.html)

- [mermaid API](https://mermaid.js.org/config/setup/modules/mermaidAPI.html)

<pre class="mermaid">
    graph TD
    A[Client] --> B[Load Balancer]
    B --> C[Server01]
    B --> D[Server02]
</pre>

<pre class="mermaid">
flowchart LR
  A --> B
</pre>

<pre class="mermaid">
%%{init: { "theme": "forest" } }%%
graph TD
A(Forest) --> B[/Another/]
A --> C[End]
  subgraph section
  B
  C
  end
</pre>
