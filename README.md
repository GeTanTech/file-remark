# File Remark Extension

一个简单而实用的 VS Code 扩展，用于为工作区中的文件和文件夹添加备注描述，让文件管理更加直观和高效。

## ✨ 功能特性

- 🏷️ **文件备注**：为任意文件和文件夹添加描述性备注
- 👀 **可视化显示**：在资源管理器中直接显示文件备注
- 🔄 **实时更新**：自动监听配置文件变化，实时更新显示
- 🎯 **多工作区支持**：支持多工作区环境，每个工作区独立配置
- ⚡ **轻量级**：无需额外依赖，性能优异
- 🎨 **自定义样式**：支持 emoji 和中文，让备注更加生动

## 📦 安装

### 从 VS Code Marketplace 安装
1. 打开 VS Code
2. 按 `Ctrl+Shift+X` (Windows/Linux) 或 `Cmd+Shift+X` (macOS) 打开扩展面板
3. 搜索 "File Remark"
4. 点击安装

### 手动安装
1. 下载 `.vsix` 文件
2. 在 VS Code 中按 `Ctrl+Shift+P` (Windows/Linux) 或 `Cmd+Shift+P` (macOS)
3. 输入 "Extensions: Install from VSIX..."
4. 选择下载的文件

## 🚀 使用方法

### 1. 创建配置文件

在工作区根目录创建 `.vscode/remark.json` 配置文件：

```json
{
  "README.md": {
    "description": "📖 项目说明文档"
  },
  "package.json": {
    "description": "📦 项目配置文件"
  },
  "src": {
    "description": "📁 源代码目录"
  },
  "docs": {
    "description": "📚 文档目录"
  },
  "tests": {
    "description": "🧪 测试文件目录"
  }
}
```

### 2. 刷新装饰器

配置完成后，使用以下方式刷新装饰器显示：

- **命令面板**：按 `Ctrl+Shift+P` (Windows/Linux) 或 `Cmd+Shift+P` (macOS)，输入 "File Remark"
- **快捷键**：可以自定义快捷键绑定

### 3. 查看效果

配置完成后，文件备注会直接显示在资源管理器的文件名后面，让文件结构一目了然。

## ⚙️ 配置说明

### 配置文件格式

配置文件采用 JSON 格式，结构如下：

```json
{
  "文件路径": {
    "description": "备注描述"
  }
}
```

### 路径规则

- **相对路径**：相对于工作区根目录的路径
- **文件**：直接使用文件名，如 `"README.md"`
- **文件夹**：直接使用文件夹名不加斜杠，如 `"src"`
- **子路径**：支持嵌套路径，如 `"src/components"`

### 备注内容

- 支持 **emoji** 表情符号
- 支持 **中文** 和 **英文**
- 支持 **特殊字符**
- 建议保持简洁明了

### 动态更新

- 修改配置文件后，装饰器会自动更新
- 添加新工作区时，扩展会自动检测并应用配置
- 删除配置文件后，装饰器会自动隐藏
- 删除文件需Reload窗口

## 🐛 故障排除

### 常见问题

**Q: 装饰器没有显示？**
A: 请检查：
1. 配置文件是否存在且格式正确
2. 文件路径是否正确
3. 尝试手动刷新装饰器

**Q: 多工作区不生效？**
A: 确保每个工作区都有独立的 `.vscode/remark.json` 配置文件

**Q: 配置文件格式错误？**
A: 使用 JSON 验证工具检查格式，确保：
- 所有字符串都用双引号包围
- 最后一个项目后不要有逗号
- 大括号和方括号要配对

### 调试模式

如果遇到问题，可以：
1. 打开开发者工具 (`Ctrl+Shift+P` → "Developer: Toggle Developer Tools")
2. 查看控制台输出
3. 检查是否有错误信息

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发环境设置

1. 克隆仓库
```bash
git clone https://github.com/GeTanTech/file-remark.git
cd file-remark
```

2. 安装依赖
```bash
npm install
```

3. 运行测试F5

4. 打包扩展
```bash
npm run package
```

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者！

## 📞 联系方式

- 项目主页：https://github.com/GeTanTech/file-remark
- 问题反馈：https://github.com/GeTanTech/file-remark/issues
- 邮箱：cutecode@sina.com

---

如果这个扩展对你有帮助，请给它一个 ⭐️ 星标！
