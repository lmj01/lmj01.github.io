return {
  -- 主题插件
  {
    "folke/tokyonight.nvim",
    lazy = false,  -- 启动时立即加载
    priority = 1000,
    config = function()
      vim.cmd.colorscheme("tokyonight")
    end
  },

  -- 状态栏
  {
    "nvim-lualine/lualine.nvim",
    event = "VeryLazy",  -- 延迟加载
    opts = {
      options = { theme = "tokyonight" }
    }
  }
}