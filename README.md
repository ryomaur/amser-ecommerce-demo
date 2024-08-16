# amser-ecommerce-demo [ポートフォリオ ECサイト]

<!-- ![ロゴ](/public/opengraph.png) -->

[<img src="public/opengraph.png" >](https://amser-ecommerce-demo.vercel.app)

このプロジェクトは私が独学で勉強してきたフロントエンド、バックエンドの技術のデモ用に作成した架空の腕時計ブランドのECサイトです。

[https://amser-ecommerce-demo.vercel.app](https://amser-ecommerce-demo.vercel.app)

## 技術 & ライブラリー

- メインの技術/スタック

  - Typescript
  - Next.js
  - Node.js
  - PostgreSQL
  - Prisma ORM
  - Next-Auth
  - Stripe

- ライブラリー

  - TailwindCSS
  - Zod
  - React Hook Form
  - React Hot Toast
  - Swiper
  - Recharts
  - Cloudinary
  - Axios
  - Bcrypt

- デプロイメント

  - Vercel
  - Supabase (PostgreSQL)

- デザイン
  - Figma
  - Blender

## 主な機能

- ストア

  - ユーザー登録、ログイン、ログアウト
  - 商品のフィルタリング
  - 非ログイン状態でカートに商品を追加、削除
  - 非ログイン状態でウィッシュリストへ商品の追加、削除
  - ログイン状態でカートに商品を追加、削除
  - ログイン状態でウィッシュリストへの追加、削除
  - ウィッシュリストのシェア機能
  - ストライプを利用した決済
  - 決済時に在庫数を更新
  - 商品のレビュー投稿と編集

- 管理者画面
  - 各種データの表示、ソート
  - 商品のCRUD機能
  - 収益をチャートで表示

## 使用した技術や学んだことなど

### デザイン

Amserという架空の腕時計ブランドという設定で商品、ロゴ、UI等をデザインしました。

#### UI

Figmaを使用しデスクトップ版とモバイル版をデザインしました。

[Figmaデザイン](https://www.figma.com/design/sUPLh2NiTFnqvrTKuWW0yl/Amser-ecommerce-design?node-id=1444-3738&t=0u9sQuNKH5eXD8Gi-1)

![FigmaでのUIデザイン](/public/figma-screenshot.png)

#### 商品デザイン

商品画像などは生成AI等を使用して用意することもできましたが、商品フィルター機能のために数多くのバリエーションを用意したかったので以前から勉強している3Dモデリング(Blenderを使用)で作成しました。

![Blenderでのモデリング](/public/blender-screenshot.png)

---

### コーディング

#### TypeScript

TypeScriptをプロジェクトで使用したのは今回が初めてで難しい部分もありましたが、エラーの発見やオートコンプリートの精度の高さにより普段より安全に効率よくコーディングすることができました。

#### Next.js

フレームワークにはNext.jsを使用しました。Next.jsを使用するからには、パーフォーマンスやSEOの利点を活かすためにできるだけサーバーコンポーネントを使用して作ることに挑戦してみました。Next.js 14のApp Routerとサーバーアクションを使用したデータの取得や投稿にもチャレンジしてみました。

#### Next-Authを使用した認証

認証にはNext-Authを使用しました。管理者ページへのアクセスはミドルウェアを用いてトークンを所得し管理者でないユーザーをリダイレクトする仕様にしました。

#### React Hook FormとZod

フォームはReact Hook FormとZodを使って作成しました。Zodでの入力データのバリデーションはクライアントサイドだけでなくサーバーサイドでも行う仕様です。

#### TailwindCSS

フロントエンドは今回初めてTailwindCSSを使用してコーディングしてみました。Tailwindだけでは対応できないメディアクエリなどは、別途のCSSファイルを使いました。（ホバーに対応していないデバイス使用時のフォールバックなどを設定しています。）

#### ショッピングカートの仕様

ショッピングカートとウィッシュリストはログイン状態でなくても商品の追加や削除ができるようにしてみました。非ログインに商品を追加した状態でログインした場合は非ログイン時のカートがユーザーのカートにマージされる仕様にしました。これは[Coding in FlowさんのYoutubeのチュートリアル](https://youtu.be/AaiijESQH5o?t=16375)を参考にしました。

#### ウィッシュリストの仕様

ウィッシュリストでは上記に加え、リストのシェア機能も実装しました。ログイン時ウィッシュリストの公開、非公開の選択ができる仕様です。

#### レビュー機能

レビューの投稿、編集機能を実装しました。レビュー編集時に投稿日の下に編集日もつく仕様にしています。

#### 決済と在庫

決済はStripeを使用

ショピングカート画面からチェックアウトに移る際にカートに入っていた商品の在庫をデータベース上で減らす仕様にしたのですが、ユーザーが決済画面で決済せずに放置、または決済画面を離れた場合、商品の在庫が減ったままになってしまう問題をどう解決するか悩まされました。最終的にはStripeのWebhookを活用して30分間以内に決済が完了しなかった場合、オーダーがキャンセルされカートに入っていた商品の在庫が戻る仕様にしました。

#### 管理者画面とCRUD

ダッシュボードにはRechartsライブラリーを使ったシンプルな月ごとの収益チャートを作成しました。

CRUDは実践では他のソフトウェアやツールから商品を管理することもあると思うので、サーバーアクションではなくAPIルートで実装しました。

商品画像のアップロード機能にはCloudinaryを使用しています。

### デプロイ

#### Supabase (PostgreSQL)

データベースはPrisma ORMを通してPostgreSQLを使用したので、SupabaseのPostgreSQLデータベースを利用しました。

#### Vercel

ホスティングはVercelが簡単と聞いていたのでvercelで行ってみました。
最初にデプロイした際にはローカル環境でテストしていたときより動作がかなり重く、ほぼすべての機能のレスポンスが悪かったので非常に焦りました。  
原因はSupabaseのデータベースのロケーションが東京なのに対し、Vercel FunctionのデフォルトのリージョンがワシントンDCになっていることでした。

- ローカル環境

  自分のPC ⇒ 自分のPC上のサーバー ⇒ Supabaseサーバー ⇒ 自分のPC上のサーバー ⇒ 自分のPC

- プロダクション環境

  クライアントのPC ⇒ Vercelサーバー ⇒ Supabaseサーバー ⇒ Vercelサーバー ⇒ クライアントのPC

なので

日本のPC ⇒ ワシントンDCのVercelサーバー ⇒ 東京のSupabaseサーバー ⇒ ワシントンDCのVercelサーバー ⇒ 日本のPC

となってしまいます。

VercelのFunctionのリージョンを東京に設定することで解決できました。

日本のPC ⇒ 東京のVercelサーバー ⇒ 東京のSupabaseサーバー ⇒ 東京のVercelサーバー ⇒ 日本のPC

SSRの利点はサーバサイドでレンダリングすることによるSEO対策やパフォーマンスの向上ですが、その分サーバーとデータベースの物理的な距離がパフォーマンスに影響するというのは、なるほどなという感じです。
