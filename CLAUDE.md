# CLAUDE.md

このリポジトリで作業する際の方針です。

## プロジェクト概要

- 個人ポートフォリオサイト（静的HTML/CSS/JS、ビルドステップなし）
- GitHub Pagesで公開（カスタムドメイン: `CNAME` を参照）
- `index.html` がトップページ、`assets/css/style.css` と `assets/js/main.js` がスタイル・スクリプト
- `apps/` 配下は個別アプリ（例: `apps/neko-logic-boxes/`）の紹介・サポート・プライバシーポリシーページ

## アウトプットの言語

- チャットでの返信、コミットメッセージ、PRのタイトル・本文はすべて日本語で書く
- ただし以下の定型行はそのまま英語で残す（セッションの指示に従う）
  - `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`
  - `🤖 Generated with [Claude Code](https://claude.com/claude-code)`

## デザイン・実装の方針

- フレームワーク非依存。CSS変数によるダークテーマ、vanilla JSで最小限の挙動（ナビ開閉、スクロール連動ハイライト）を実装している
- モバイルのナビはJavaScriptが無効/読み込み失敗でも操作できるよう、通常のフローに表示されるのがデフォルトで、JS初期化後にのみ折りたたみ表示へ切り替える設計になっている（`assets/js/main.js` の `document.documentElement.classList.add("js")` と `assets/css/style.css` の `html.js` セレクタを参照）
- 個人の安全に関わる情報（格闘技ジムの所在地・曜日ごとの練習スケジュールなど）は、防犯上の理由から掲載しない

## PRのワークフロー

- このリポジトリはPRが作成後すぐにマージされる運用になっている。新しい作業を始める前に `gh pr view <番号>` 等でブランチに紐づくPRの状態を確認し、マージ済みなら同じブランチに積み増すのではなく `master` から新しいブランチを切ること
