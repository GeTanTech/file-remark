# 发布指南

## 发布前准备

### 1. 更新 package.json 中的个人信息

请将以下字段替换为你的真实信息：

```json
{
  "publisher": "your-publisher-name",
  "author": {
    "name": "Your Name",
    "email": "your-email@example.com"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/your-username/file-remark.git"
  },
  "homepage": "https://github.com/your-username/file-remark#readme",
  "bugs": {
    "url": "https://github.com/your-username/file-remark/issues"
  }
}
```

### 2. 创建发布者账户

1. 访问 [Visual Studio Marketplace](https://marketplace.visualstudio.com/)
2. 点击 "Sign in" 并使用 Microsoft 账户登录
3. 点击 "Publish extensions"
4. 创建发布者账户（Publisher）

### 3. 安装 vsce 工具

```bash
npm install -g vsce
```

### 4. 登录发布者账户

```bash
vsce login your-publisher-name
```

## 发布步骤

### 1. 打包扩展

```bash
npm run package
```

这会在项目根目录生成 `.vsix` 文件。

### 2. 发布到 Marketplace

```bash
npm run publish
```

或者手动发布：

```bash
vsce publish
```

### 3. 验证发布

1. 访问 [Visual Studio Marketplace](https://marketplace.visualstudio.com/)
2. 搜索你的扩展名称
3. 确认扩展已成功发布

## 版本更新

### 1. 更新版本号

在 `package.json` 中更新版本号：

```json
{
  "version": "0.0.2"
}
```

### 2. 更新 CHANGELOG.md

记录本次更新的内容。

### 3. 重新发布

```bash
npm run publish
```

## 常见问题

### Q: 发布失败怎么办？
A: 检查：
1. 是否已登录正确的发布者账户
2. 版本号是否已更新
3. package.json 格式是否正确

### Q: 如何撤销发布？
A: 在 Marketplace 的发布者页面可以撤销或删除扩展。

### Q: 如何更新扩展？
A: 更新版本号后重新发布即可。

## 发布检查清单

- [ ] 更新 package.json 中的个人信息
- [ ] 创建发布者账户
- [ ] 安装 vsce 工具
- [ ] 登录发布者账户
- [ ] 测试扩展功能
- [ ] 更新版本号
- [ ] 打包扩展
- [ ] 发布到 Marketplace
- [ ] 验证发布结果

## 后续维护

1. **监控反馈**：定期查看用户反馈和问题报告
2. **更新功能**：根据用户需求添加新功能
3. **修复问题**：及时修复发现的 bug
4. **版本管理**：遵循语义化版本控制规范

## 联系方式

如有问题，请通过以下方式联系：
- GitHub Issues: https://github.com/GeTanTech/file-remark/issues
- 邮箱: your-email@example.com
