# [Mermaid](https://mermaid.js.org/)

- [集成社区](https://mermaid.js.org/ecosystem/integrations-community.html)

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

<pre class="mermaid">
sequenceDiagram
    autonumber
    actor User
    participant Browser
    participant VueApp as Vue App (Wrapper)
    participant BApp as BApp (Root)
    participant App as App (Content)

    User->>Browser: Load page
    Browser->>VueApp: Create and mount Wrapper
    VueApp->>BApp: Render BApp as root
    BApp->>App: Render App in default slot
    App-->>BApp: Provide content (BContainer/BRow/BCol)
    BApp-->>VueApp: Composed root hierarchy ready
    VueApp-->>Browser: Mounted application
</pre>

