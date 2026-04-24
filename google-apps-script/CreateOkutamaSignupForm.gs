/**
 * 奥多摩参加用 Google フォームをコードで1回だけ生成する。
 * 操作手順はリポジトリ直下の CREATE_GOOGLE_FORM.txt（手把手）に合わせてある。
 *
 * 注意：部署・トリガーは不要。保存 → 関数 createOkutamaSignupForm を選ぶ → 実行 → 実行記録のログに出る URL を data.js の signupFormUrl へ。
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
