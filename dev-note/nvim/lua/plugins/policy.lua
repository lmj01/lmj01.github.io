return {
    -- 示例：仅在打开 Markdown 文件时加载
    {
        "preservim/vim-markdown",
        ft = "markdown"  -- 文件类型触发
    },

    -- 示例：首次执行命令时加载
    {
        "nvim-telescope/telescope.nvim",
        cmd = "Telescope find_files"  -- 命令触发
    },

    -- 示例：依赖其他插件
    {
        "ray-x/lsp_signature.nvim",
        dependencies = "neovim/nvim-lspconfig",
        event = "BufRead"  -- 事件触发
    },
}
