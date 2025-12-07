# 貢獻指南 (Contributing Guide)

感謝您有興趣為 `newebpay-node` 做出貢獻！我們歡迎任何形式的幫助，包括回報 Issue、提交程式碼、改善文件等。

## 📍 貢獻流程 (Workflow)

1. **Fork 本專案**：將專案 Fork 到您的 GitHub 帳號。
2. **Clone 專案**：將 Fork 後的專案 Clone 到您的本地端。
3. **建立分支 (Branch)**：請基於 `master` 分支建立新的功能分支。
   - 格式建議：`feat/feature-name` 或 `fix/bug-id-issue-name`。
4. **開發與提交**：進行修改並提交 Commit (請遵守 [Commit Message 規範](#-commit-message-規範))。
5. **推送 (Push)**：將分支 Push 到您的 Fork 儲存庫。
6. **建立 Pull Request (PR)**：回到本專案頁面建立 PR，並填寫 PR Template。

## 🌿 分支策略 (Branch Policy)

- **master**：主分支，永遠保持可部署/發布的穩定狀態。
- **feat/\***：新功能開發分支。
- **fix/\***：錯誤修復分支。
- **docs/\***：文件修改分支。

我們使用 [Semantic Release](https://github.com/semantic-release/semantic-release) 自動發布版本，因此 **master** 分支上的 Commits 必須符合 Conventional Commits 規範，且 CI/CD 通過後會自動發布新版本。

## 📝 Commit Message 規範

本專案嚴格遵循 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 規範，這對於自動化版本控制與 Changelog 生成至關重要。

格式如下：

```
<type>(<scope>): <subject>
```

### 常用的 Type：

- `feat`: 新增功能 (Minor version bump)
- `fix`: 修復錯誤 (Patch version bump)
- `docs`: 僅修改文件
- `style`: 程式碼風格調整 (不影響邏輯，例如空白、縮排)
- `refactor`: 重構 (既不是修復錯誤也不是新增功能)
- `perf`: 改善效能
- `test`: 新增或修改測試
- `chore`: 建置過程或輔助工具的變動 (例如更新依賴)

**範例**：

- `feat(payment): add line pay support`
- `fix(core): resolve parsing error in notify handler`
- `docs: update readme with quick start guide`

⚠️ **注意**：如果包含 Breaking Change，請在 Footer 或 Type 後加 `!` (例如 `feat!: drop node 14 support`)，這會觸發 Major version bump。

## 🧪 測試 (Testing)

在提交 PR 之前，請確保所有測試皆通過，並為新功能撰寫測試。

```bash
# 安裝依賴
npm install

# 執行所有測試
npm test

# 執行 E2E 測試
npm run test:e2e

# 檢查程式碼風格
npm run lint
```

## 📋 Pull Request 檢查清單

- [ ] 是否已執行 `npm test` 並全部通過？
- [ ] 是否新增了對應的測試案例？
- [ ] Commit Message 是否符合 Conventional Commits？
- [ ] 是否更新了相關文件 (README, Docs)？

感謝您的貢獻！🚀
