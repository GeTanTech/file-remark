const vscode = require("vscode");
const fs = require("fs");
const { joinURL } = require("ufo");
const { workspace, commands, window,FileDecoration } = vscode;
// 全局事件发射器，用于通知文件装饰器更新
let changeEmitter = null;
// 重写文件装饰器验证规则，允许更长的备注文本显示
FileDecoration.validate = (d) => {
  if (d.badge && d.badge.length !== 1 && d.badge.length !== 2) {
    // throw new Error(`The 'badge'-property must be undefined or a short character`);
  }
  if (!d.color && !d.badge && !d.tooltip) {
    // throw new Error(`The decoration is empty`);
  }
};
/**
 * 读取工作空间的配置文件
 * @param {string} workspaceDir 工作空间目录路径
 * @returns {Object|null} 配置文件内容，如果文件不存在或读取失败则返回null
 */
function readConfig(workspaceDir) {
  try {
    const configPath = joinURL(workspaceDir, ".vscode", "remark.json");
    if (!fs.existsSync(configPath)) {
      return null; // 返回null表示配置文件不存在
    }
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    return config;
  } catch (error) {
    console.error("读取配置文件失败:", error);
    return null;
  }
}

/**
 * 添加备注命令处理函数
 * 刷新文件备注装饰器显示
 * @returns {Promise<void>}
 */
async function addremark() {
  try {
    
    if (!workspace.workspaceFolders) {
      window.showErrorMessage("请先打开一个工作区");
      return;
    }
    
    // 触发装饰器更新
    if (changeEmitter) {
      changeEmitter.fire();
      window.showInformationMessage("已刷新文件备注装饰");
    } else {
      window.showErrorMessage("扩展未正确初始化，请重新加载窗口");
    }
  } catch (error) {
    window.showErrorMessage(`执行命令失败: ${error.message}`);
  }
}

/**
 * 创建文件装饰器提供者
 * @param {vscode.Uri} workspaceUri 工作空间URI
 * @returns {vscode.FileDecorationProvider} 文件装饰器提供者
 */
function createFileDecorationProvider(workspaceUri) {
  return vscode.window.registerFileDecorationProvider({
    onDidChangeFileDecorations: changeEmitter.event,
    provideFileDecoration: (uri) => {
      // 检查 URI 是否属于当前工作空间
      if (!uri.fsPath.startsWith(workspaceUri.fsPath)) {
        return;
      }

      const workspaceDir = workspaceUri.fsPath;
      const config = readConfig(workspaceDir);

      // 如果配置文件不存在，不显示任何装饰
      if (!config) {
        return undefined;
      }
      
      // 获取相对路径 - 针对特定工作空间计算相对路径
      const relativePath = vscode.workspace.asRelativePath(uri, false);
      // 如果配置中存在该路径的备注，则显示装饰
      if (config[relativePath]) {
        return new vscode.FileDecoration(
          config[relativePath].description, // description
        );
      }

      return undefined;
    },
  });
}

/**
 * 为所有工作空间创建文件装饰器提供者
 * @param {vscode.ExtensionContext} context 扩展上下文
 */
function setupWorkspaceProviders(context) {
  if (vscode.workspace.workspaceFolders) {
    for (const workspaceFolder of vscode.workspace.workspaceFolders) {
      const provider = createFileDecorationProvider(workspaceFolder.uri);
      context.subscriptions.push(provider);
    }
  }
}

/**
 * 注册命令
 * @param {vscode.ExtensionContext} context 扩展上下文
 */
function registerCommands(context) {
  try {
    
    const addRemarkDisposable = commands.registerCommand(
      "file-remark.addremark",
      addremark
    );
    context.subscriptions.push(addRemarkDisposable);
    
  } catch (error) {
    console.error('注册命令失败:', error);
    vscode.window.showErrorMessage(`注册命令失败: ${error.message}`);
  }
}

/**
 * 设置配置文件监听器
 * @param {vscode.ExtensionContext} context 扩展上下文
 */
function setupConfigWatcher(context) {
  const configWatcher = vscode.workspace.createFileSystemWatcher('**/.vscode/remark.json');
  
  const refreshDecorations = () => {
    if (changeEmitter) {
      changeEmitter.fire();
    }
  };
  
  configWatcher.onDidChange(refreshDecorations);
  configWatcher.onDidCreate(refreshDecorations);
  configWatcher.onDidDelete(refreshDecorations);
  
  context.subscriptions.push(configWatcher);
}

/**
 * 设置工作空间变化监听器
 * @param {vscode.ExtensionContext} context 扩展上下文
 */
function setupWorkspaceChangeListener(context) {
  vscode.workspace.onDidChangeWorkspaceFolders((event) => {
    // 为新添加的工作空间创建 FileDecorationProvider
    for (const folder of event.added) {
      const provider = createFileDecorationProvider(folder.uri);
      context.subscriptions.push(provider);
    }
    // 触发装饰器更新，确保新工作区的装饰器能够显示
    if (changeEmitter) {
      changeEmitter.fire();
    }
  });
}

/**
 * 激活扩展
 * 初始化文件备注功能，包括创建事件发射器、设置工作空间提供者、注册命令和监听器
 * @param {vscode.ExtensionContext} context 扩展上下文
 */
function activate(context) {
  try {
    
    // 创建事件发射器
    changeEmitter = new vscode.EventEmitter();
    
    // 设置各个组件
    setupWorkspaceProviders(context);
    registerCommands(context);
    setupConfigWatcher(context);
    setupWorkspaceChangeListener(context);
    
    
  } catch (error) {
    console.error('File Remark 扩展激活失败:', error);
    vscode.window.showErrorMessage(`File Remark 扩展激活失败: ${error.message}`);
  }
}

/**
 * 停用扩展
 * 清理扩展资源，当前为空实现
 */
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
