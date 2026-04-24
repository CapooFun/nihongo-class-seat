/**
 * 班级活动报名 Web App — 将报名数据写入绑定的 Google Spreadsheet
 *
 * 【部署步骤（只需做一次）】
 *
 * 第 1 步：在 Google Spreadsheet 里打开 Apps Script
 *   菜单：扩展程序 → Apps 脚本
 *   （会在新标签页打开 Apps Script 编辑器，脚本已自动绑定到这个表格）
 *
 * 第 2 步：粘贴代码
 *   把编辑器里默认的所有内容全部删掉，把本文件的内容粘贴进去 → 保存（Ctrl+S）
 *
 * 第 3 步：部署为 Web App
 *   点右上角「部署」按钮 → 「新建部署」
 *     - 类型：Web 应用
 *     - 执行身份：我（你的 Google 账号）
 *     - 访问权限：所有人（包括匿名用户）
 *   → 点「部署」→ 复制生成的「Web 应用网址」（以 /exec 结尾）
 *
 * 第 4 步：填入网站
 *   打开 js/data.js，第 3 行 SIGNUP_WEBAPP_URL = "" 改为刚才复制的网址 → 推送
 *
 * 【注意】以后每次修改脚本后须「新建部署」（不是编辑现有部署），否则旧版本仍在运行。
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["提交时间", "活动ID", "活动名称", "学生姓名", "学生Key"]);
      sheet.getRange(1, 1, 1, 5).setFontWeight("bold");
    }

    sheet.appendRow([
      new Date(),
      data.activityId    || "",
      data.activityTitle || "",
      data.studentName   || "",
      data.studentKey    || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
