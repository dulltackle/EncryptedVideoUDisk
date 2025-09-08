# TODO_项目初始化（阶段6：Assess 待办与优化清单）

原子任务：T1 项目初始化

本清单用于人工评审阶段逐项处理，规则：一次只处理一个条目；每项需有「解决方案」「验证步骤」「标记已修复」三部分。

## A. 待办事项（必补齐）
1) 补充项目元信息 ✅ 已修复
   - 现状：package.json 中 author/repository/bugs/homepage 为空
   - 解决方案：已更新 package.json 添加完整元信息
     - author: "dulltackle"
     - repository: {"type":"git","url":"git+https://github.com/dulltackle/EncryptedVideoUDisk.git"}
     - bugs: {"url":"https://github.com/dulltackle/EncryptedVideoUDisk/issues"}
     - homepage: "https://github.com/dulltackle/EncryptedVideoUDisk"
   - 验证步骤：npm pkg get author repository bugs homepage
   - 验证结果：✅ 所有字段正确设置并通过验证

2) 新增 LICENSE 文件
   - 现状：package.json license 为 MIT，但缺少 LICENSE 文件
   - 建议：添加标准 MIT 许可证文本
   - 验证：仓库根目录存在 LICENSE，内容匹配 MIT 模板

3) README 补充使用与贡献指南
   - 现状：README 为初版
   - 建议：增加开发流程、分支策略、提交规范、故障排查入口
   - 验证：人工查阅

## B. 待优化点（建议优先在 T4/T9 执行）
1) 依赖安全审计治理
   - 现状：npm audit moderate 警告
   - 建议：在 T4 集成 npm audit（非阻断），并排期依赖升级或 overrides
   - 验证：执行 npm audit，形成基线与豁免清单

2) 锁定 Node/npm 引擎到更精确范围
   - 现状："node": ">=16.0.0"，"npm": ">=8.0.0"
   - 建议：按 CI/发布环境固定至 LTS 主干范围（如 ^20 或精确上限）
   - 验证：npm pkg get engines 并在 CI 验证

3) 预置 scripts 的分步落地
   - 现状：dev/build/lint/typecheck 为占位
   - 建议：
     - T3：落地 typecheck
     - T4：落地 lint 与 git hooks
     - T9：落地 dev（热重载）
     - T11：落地 build（打包）
   - 验证：各阶段 npm run 对应脚本可执行

4) README/文档链接一致性
   - 现状：文档路径组织清晰，建议在 README 顶部补充至 TASK/CONSENSUS/ALIGNMENT 的跳转
   - 验证：人工查阅

## C. 可能缺失的配置（后续任务负责）
1) TypeScript 配置（T3）
2) ESLint/Prettier/Husky 配置（T4）
3) 目录结构（T2）
4) Vite/Electron 集成与开发脚本（T9）
5) electron-builder 打包配置（T11）

---

请按照「人工评审流程」逐项拉起处理：
- 选择一个条目 → 我来给出可执行方案与命令 → 你确认后执行 → 回填验证 → 标记“已修复”。