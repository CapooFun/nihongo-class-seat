/**
 * 在你自己的 Google 账号里「一键」生成奥多摩参加报名表（只运行一次即可）。
 *
 * 用法：
 * 1. 打开 https://script.google.com/home → 新建项目
 * 2. 删除默认的 myFunction，把本文件全部粘贴进去 → 保存
 * 3. 下拉选择 createOkutamaSignupForm → 运行 → 按提示完成授权
 * 4. 菜单「执行」→「查看」→「日志」，复制里面的表单 URL
 * 5. 把 URL 写入本仓库 js/data.js 里活动 okutama-2026-04-30 的 signupFormUrl
 *
 * 说明：我不能替你用 Google 登录；但这段脚本等于「替你点完新建表单和选项」。
 * 别人打开该 URL 提交后，回答会记在 Google 表单后台（自动），无需自建服务器。
 */
function createOkutamaSignupForm() {
  var choices = [
    "4-1 姚皓严（You Kougen）",
    "4-2 黄宇（Kou U）",
    "4-3 袁存凯（En Songai）",
    "4-4 夏玉娟（Ka Gyokuken）",
    "3-2 唐玉涓（Tou Gyokuken）",
    "3-3 尹寒璐（In Kanro）",
    "3-5 陈卓（Chin Taku）",
    "3-6 张书剑（Chou Shoken）",
    "3-7 余健平（You Kenhei）",
    "1-2 喜宇哲（Ki Utetsu）"
  ];

  var form = FormApp.create("初级1A 奥多摩ハイキング 参加登録（2026-04-30）");
  form.setDescription(
    "このフォームへの送信内容は、フォーム作成者の Google アカウントに自動で記録されます。\n" +
      "GitHub のクラスサイトからこのリンクを開いて回答してください。"
  );

  var nameQ = form.addListItem();
  nameQ.setTitle("お名前（座席表と同じ名前を選んでください）");
  nameQ.setChoiceValues(choices);
  nameQ.setRequired(true);

  form.addTextItem().setTitle("連絡用メール（任意）").setRequired(false);

  var url = form.getPublishedUrl();
  Logger.log("=== 下面这一行整段复制到 js/data.js の signupFormUrl に貼る ===");
  Logger.log(url);
  Logger.log("=== フォームの編集画面（設定変更用）===");
  Logger.log(form.getEditUrl());
}
