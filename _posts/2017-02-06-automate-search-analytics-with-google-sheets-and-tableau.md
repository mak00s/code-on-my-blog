---
ID: 857
post_title: >
  サーチコンソールの詳細データをGoogleスプレッドシートに自動反映させてTableauにインポートする方法
author: MatsuoShizuka
post_excerpt: ""
layout: post
permalink: >
  https://concept-diagram.com/automate-search-analytics-with-google-sheets-and-tableau/
published: true
post_date: 2017-02-06 18:07:04
---
Google Search Console（旧ウェブマスターツール）の詳細データをGoogleスプレッドシートで自動抽出＆自動バックアップし、Tableauにインポートする方法について。

<img src="http://files.cms-ia.webnode.com/200000373-699966a932/tableau-google-spreadsheet.png" alt="" />

サーチコンソールのデータはウェブ上のレポート画面でも閲覧できますが、
<ul>
 	<li>ランディングページとクエリを掛け合わせられない（個別にフィルタをかければできるが一気にはできない）</li>
 	<li>90日以上前のデータを閲覧できない</li>
</ul>
といった制限があるのがイマイチ。

APIで細かいデータを取得してExcelやBIツールで分析・ビジュアライズするのがベストですね。

木田さんのTableau本「<a href="http://amzn.asia/3Y7zSXi" target="_blank" rel="noopener">できる100の新法則 Tableau タブロー</a>」 で紹介されているように、BigQuery経由でもGoogleサーチコンソールのデータをTableauに取り込めますが、敷居が高いので、今回はGoogleスプレッドシート経由でTableauに取り込む方法について紹介します。
<h2>Googleスプレッドシートにサーチコンソールのデータを自動反映させる方法</h2>
いくつかの方法がありますが、多機能で使いやすく、かつ開発者の分析スキルが高そうな <a href="https://searchanalyticsforsheets.com/" target="_blank" rel="noopener">Search Analytics for Sheets</a> を使うことにします。
<h3>1. まずアドオン「Search Analytics for Sheets」をインストール</h3>
<a href="https://chrome.google.com/webstore/detail/search-analytics-for-shee/ieciiohbljgdndgfhgmdjhjgganlbncj" target="_blank" rel="noopener">Chrome Web Storeの該当ページ</a>にアクセスし、アドオンをインストールすると、Google Spreadsheetのアドオンメニューに「<strong>Search Analytics for Sheets</strong>」が表示されるようになります。

<img src="http://files.cms-ia.webnode.com/200000363-c5832c63db/google-spreadsheet-addon-menu-ja.png" alt="" />
<h3>2. アドオンを実行してデータを取得</h3>
スプレッドシートを開き、アドオン＞Search Analytics for Sheets＞<strong>Open Sidebar</strong>を選択してサイドバーを開きます。

Google認証を終えたら、各種の条件を設定します。

一番細かいデータが欲しいので、<strong>Group By</strong>（抽出するデータ指定）に全ての項目（Date, Device, Query, Page, Country)を指定しましょう。

<img src="http://files.cms-ia.webnode.com/200000364-3b29d3c24e/search-analytics-config-requests.png" alt="" />

一番下の青い「<strong>Request Data</strong>」ボタンをクリックすると、シートのセルにデータが挿入されます。

<img src="http://files.cms-ia.webnode.com/200000365-5123b521d7/search-analytics-retrieved-data.png" alt="" />

はい、簡単ですね〜。

これは一番細かいデータなので、人間が見るためのレポートではありません。ピボットなどで集計する必要があります。
<h3>3. 毎月自動でデータを取得する</h3>
どうせなら定期的にモニタリングできるように、データ取得を自動化しましょう。月ごとにシートを分けて、バックアップしていきます。

設定サイドバーのタブ「<strong>Backups</strong>」に切り替えて、先程と同様に設定します。

<img src="http://files.cms-ia.webnode.com/200000366-3b0cc3c06a/search-analytics-config-backups.png" alt="" />

<strong>Period</strong>：Monthlyを選択すると、毎月頭の3日に自動実行されるようになります。日付や時間は変更できません。

<strong>Email me backup status</strong>：バックアップが自動実行された後にメールが届くようにしておくと便利ですね。

<strong>Run a backup cycle right away</strong>：初めてなので、次の3日を待たずに今のタイミングでバックアップを実行してみましょう。

一番下の赤い<strong>ENABLE BACKUP</strong>ボタンをクリックすると、自動バックアップが有効化され、（「Run a backup cycle right away」にチェックを入れた場合は）先月分のバックアップが早速実行されます。

今後は月単位でシートが自動で作成されていくので、過去分も月単位でシートを分けてデータ取得しておきましょう。

<img src="http://files.cms-ia.webnode.com/200000367-3903a39fe5/search-analytics-sheets-structure.png" alt="" />

先月分はもうシートが作成されているはずなので、手動作成が必要なのは2ヶ月前と3ヶ月前だけです。月途中の不完全な今月分をシート作成すると、来月頭に自動バックアップ処理がスキップされてしまいます。今月の不完全な最新データが欲しい場合は、「今月」など別の名前で一時シートを作成します。

スプレッドシートに名前をつけて保存すれば、Googleサーチコンソールのデータを通常の画面よりも細かい単位でGoogleスプレッドシートに自動抽出＆自動バックアップする設定が完了です。
<h3>4. Tableauに取り込む</h3>
データを集計してビジュアライズするため、Tableauを起動してデータソースとして指定します。 認証を終えて読み込み対象ドキュメントを選択すると、データがつながってシートの一覧が表示されます。

月別にシートを分けたので、分断されたデータを統合するために「ユニオンの新規作成」（New Union）をドラッグ＆ドロップします。

<img src="http://files.cms-ia.webnode.com/200000368-84c7385c0a/tableau-datasource-google-spreadsheet-union.png" alt="" />

データのシートは月単位で毎月自動で追加されていくので、増えたシートを自動で追加するためにワイルドカード方式を選択します。

<img src="http://files.cms-ia.webnode.com/system_preview_detail_200000369-122d913271/tableau-datasource-google-spreadsheet-union-wildcard.png" alt="" />

正規表現ではなく単なるワイルドカードです。

Dec 2016、Jan 2017、と増えていくので、「*20*」にしておけば80年は持つので十分！
<h3>5. データの前処理</h3>
使わないカラムは<strong>非表示</strong>にしておきましょう。

<img src="http://files.cms-ia.webnode.com/200000370-edb2aeead0/tableau-datasource-hide.png" alt="" />
<ul>
 	<li><strong>Google Sheets</strong>：Googleスプレッドシートのドキュメント名</li>
 	<li><strong>Sheet</strong>：対象シートの名前</li>
 	<li><strong>CTR</strong>：計算フィールドで再計算しないと値がおかしくなるので不要</li>
</ul>
シートに移動後、分析で必要な計算フィールドを作成します。

<img src="http://files.cms-ia.webnode.com/system_preview_detail_200000371-094950a444/tableau-calc-field-ctr.png" alt="" />

<strong>クリック率</strong>：SUM( [Clicks] ) / SUM( [Impressions] )

<img src="http://files.cms-ia.webnode.com/system_preview_detail_200000372-9d4d09e46f/tableau-calc-field-position.png" alt="" />

<strong>平均順位</strong>：SUM( [Position] * [Impressions] ) / SUM( [Impressions] )

これで、Googleサーチコンソールの詳細データをGoogleスプレッドシート経由で自動抽出＆バックアップし、さらにTableauと連携できる状態になりました。無料のPower BI（Microsoft）を使うのも良いでしょう。無料化されたGoogle Data Studioにはコネクタがついてますが、バックアップができるのが今回のGoogleシート連携のメリットです。

一番細かいデータを長期間で取り出せるようになったので、通常画面では不可能だった色々な分析が可能になりました。長くなるので、今回の記事はここまで。 分析方法については、別途書きます。