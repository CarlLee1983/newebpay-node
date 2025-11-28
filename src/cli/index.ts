#!/usr/bin/env node

import { program } from 'commander';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

program
  .name('newebpay')
  .description('藍新金流 SDK CLI 工具')
  .version('1.0.0');

program
  .command('init')
  .description('初始化藍新金流設定檔')
  .option('-f, --file <file>', '設定檔路徑', '.env')
  .action((options) => {
    const envFile = options.file || '.env';
    const envPath = join(process.cwd(), envFile);

    const template = `# 藍新金流設定
NEWEBPAY_MERCHANT_ID=您的特店編號
NEWEBPAY_HASH_KEY=您的HashKey
NEWEBPAY_HASH_IV=您的HashIV
NEWEBPAY_TEST_MODE=true
NEWEBPAY_RETURN_URL=https://your-site.com/payment/return
NEWEBPAY_NOTIFY_URL=https://your-site.com/payment/notify
NEWEBPAY_CUSTOMER_URL=https://your-site.com/payment/customer
`;

    if (existsSync(envPath)) {
      console.log(`⚠️  ${envFile} 已存在，跳過建立`);
      return;
    }

    writeFileSync(envPath, template);
    console.log(`✅ 已建立 ${envFile}`);
    console.log('請編輯設定檔填入您的藍新金流資訊');
  });

program
  .command('express')
  .description('產生 Express 整合範例')
  .option('-o, --output <dir>', '輸出目錄', './newebpay-express-example')
  .action((options) => {
    const outputDir = join(process.cwd(), options.output);

    if (existsSync(outputDir)) {
      console.log(`⚠️  目錄 ${options.output} 已存在，跳過建立`);
      return;
    }

    mkdirSync(outputDir, { recursive: true });

    // package.json
    const packageJson = {
      name: 'newebpay-express-example',
      version: '1.0.0',
      type: 'module',
      scripts: {
        dev: 'node --watch index.js',
        start: 'node index.js',
      },
      dependencies: {
        '@carllee1983/newebpay': '^1.0.0',
        express: '^4.18.0',
        dotenv: '^16.3.0',
      },
    };

    // index.js
    const indexJs = `import express from 'express';
import dotenv from 'dotenv';
import { createNewebPayRouter, loadConfigFromEnv } from '@carllee1983/newebpay/express';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 從環境變數載入設定
const config = loadConfigFromEnv();

// 掛載藍新金流路由
app.use('/newebpay', createNewebPayRouter(config));

// 範例：建立支付
app.post('/api/payment/create', (req, res) => {
  const { orderId, amount, itemDesc, email, paymentType } = req.body;
  
  const newebpay = new NewebPayService(config);
  const params = newebpay
    .payment(orderId, amount, itemDesc, email)
    .creditCard()
    .getParams();
  
  res.json({ success: true, data: params });
});

// 範例：處理支付通知
app.post('/api/payment/notify', (req, res) => {
  // 使用 middleware 驗證後，通知資料在 req.newebpayNotify
  const notify = req.newebpayNotify;
  
  if (notify?.isSuccess()) {
    console.log('支付成功：', notify.getMerchantOrderNo());
    // 更新訂單狀態...
  }
  
  res.send('OK');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on http://localhost:\${PORT}\`);
});
`;

    // .env.example
    const envExample = `NEWEBPAY_MERCHANT_ID=您的特店編號
NEWEBPAY_HASH_KEY=您的HashKey
NEWEBPAY_HASH_IV=您的HashIV
NEWEBPAY_TEST_MODE=true
NEWEBPAY_RETURN_URL=http://localhost:3000/payment/return
NEWEBPAY_NOTIFY_URL=http://localhost:3000/newebpay/payment/notify
PORT=3000
`;

    // README.md
    const readme = `# 藍新金流 Express 整合範例

## 安裝

\`\`\`bash
npm install
\`\`\`

## 設定

複製 \`.env.example\` 為 \`.env\` 並填入您的藍新金流設定：

\`\`\`bash
cp .env.example .env
\`\`\`

## 執行

\`\`\`bash
npm run dev
\`\`\`

## API 端點

- \`POST /newebpay/payment/create\` - 建立支付
- \`POST /newebpay/payment/notify\` - 支付完成通知
- \`POST /newebpay/atm/notify\` - ATM 取號通知
- \`POST /newebpay/cvs/notify\` - 超商取號通知
`;

    writeFileSync(join(outputDir, 'package.json'), JSON.stringify(packageJson, null, 2));
    writeFileSync(join(outputDir, 'index.js'), indexJs);
    writeFileSync(join(outputDir, '.env.example'), envExample);
    writeFileSync(join(outputDir, 'README.md'), readme);

    console.log(`✅ 已建立 Express 範例專案於 ${options.output}`);
    console.log(`\n下一步：`);
    console.log(`  cd ${options.output}`);
    console.log(`  npm install`);
    console.log(`  cp .env.example .env`);
    console.log(`  # 編輯 .env 填入您的設定`);
    console.log(`  npm run dev`);
  });

program.parse();

