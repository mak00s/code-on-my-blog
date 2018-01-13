---
ID: 848
post_title: 'キャンペーン用URLパラメータは#を使えばキレイにできる'
author: mak
post_excerpt: ""
layout: post
permalink: >
  https://concept-diagram.com/tag_design_and_ga_01/
published: true
post_date: 2011-07-07 00:36:59
---
<h3>リファラの代わりにURLパラメータを使う理由</h3>
サイトにどこから訪問したかを特定するため、アクセス解析のツールはブラウザが送信するリンク元のURL（リファラー）を調べます。ところが、リファラーは完全ではなく、URLがセットされないことがあります。

リファラーが使えない場合のために普及したのが、URLのクエリ文字列（<a href="http://tools.ietf.org/html/rfc3986#section-3.4" target="_blank" rel="noopener">RFC 3986の定義</a>では、URI中の「?」以降の文字列、ただし「#」以降を含まない）にパラメータを追加する方法です。
<h4>Adobe Analyticsの場合</h4>
http://www.cms-ia.info/?scid=tw20110718
<h4>Google Analyticsの場合</h4>
http://www.cms-ia.info/?utm_source=Twitter&amp;utm_medium=Social&amp;utm_campaign=20110718

ツールに関わらず基本は同じですが、Adobe Analyticsは一つのパラメータのみを付与し、計測後にそのメタデータをCSV(TSV)でサーバーにアップロードするので、URLは短めです。

一方、Google Analyticsは決められた種類のメタデータをURLに含めるため、URLが長くなりがちです。
<h3>クエリ文字列にパラメータを足す方式のデメリット</h3>
この方式のデメリットについては、Web担当者Forumの安田編集長が「<a href="http://web-tan.forum.impressrd.jp/e/2010/11/02/9114" target="_blank" rel="noopener">長くて汚いutm_*パラメータ付きURLをキレイにするGoogle Analytics用の少しマニアックなスクリプト</a>」でまとめられたように、
<ul>
 	<li>見た目に悪い</li>
 	<li>メールやTwitterでURLを伝えにくい</li>
 	<li>検索エンジンのリンク評価が分散される</li>
 	<li>ソーシャルブックマークなどが分散される</li>
</ul>
という４つのデメリットがあります。加えて、
<ul>
 	<li>パラメータ付きのURLが別の場所で流通してしまい、計測の精度が落ちる</li>
 	<li>動的プログラムとパラメータ名がコンフリクトするリスクがある</li>
</ul>
というデメリットもあります。
<h3>リダイレクトという解決策</h3>
この解決策として、計測した後にパラメータなしのページへリダイレクトし、その場合の読み込みはGoogle Analyticsのページビューとしてカウントしない、という方式もありますが、
<ul>
 	<li>実装が少し複雑</li>
 	<li>Google Analytics以外に導入しているツールがある場合はそれぞれ個別対応が必要</li>
 	<li>再読み込みするのでユーザーにとっての体験が犠牲になる</li>
</ul>
というデメリットが残ります。

そこで、少し割り切った妥協案を考えてみました。
<h2>ハッシュという解決策</h2>
<ol>
 	<li>URLのタグ付にクエリ文字列「<b>?</b>」ではなくハッシュ「<b>#</b>」を使う</li>
 	<li>計測後にページを再読み込みすることなく#以降を消す（ただしURLの最後に「#」が残る）</li>
 	<li>HTML5対応ブラウザのみ#以降を完全に消す</li>
</ol>
実装は割とシンプルです。
<h3>Google Analyticsの場合</h3>
<h4>1.ハッシュに対応するため、Google Analyticsの計測タグに下記を追加</h4>
<code>_gaq.push(['_setAllowAnchor', true]);</code>
これだけで、

http://demo.ga7.org/hash.html#utm_source=cms-ia&amp;utm_medium=web&amp;utm_campaign=blog0727

というURLを認識できるようになります。
<h4>2.計測後にURLを操作するためのコールバック関数を指定</h4>
非同期の場合、関数そのものをpushすると、trackPageviewが実行された後にその関数が実行されるようになります

[embed]https://gist.github.com/mak00s/b4c4b3d1281dc46978544ee824867380[/embed]
<ul>
 	<li>クロスドメインの_linkerでhashを使う設定にした場合のURLも認識できます</li>
 	<li>HTML5対応ブラウザでは、計測後に「#」以降が完全に消えます。</li>
 	<li>未対応ブラウザだと、URLの最後に「#」だけ残り、ブラウザの履歴に元のURLが残ります（何もしないよりは良いですよね）</li>
</ul>
<h3>Adobe Analyticsの場合</h3>
<h4>1. クエリのかわりにhashを読むプラグインを導入する</h4>
<a href="http://webanalyticsland.com/sitecatalyst-implementation/track-hash-query-parameters/" target="_self">Kevinのサイト</a>からダウンロードしてください。
<h4>2. キャンペーン変数をセットする行を以下のように書き換える。</h4>
[embed]https://gist.github.com/mak00s/15d0fed9cb242cc742c65adcccc19d3c[/embed]
<h4>3. s.t();の後に下記を追加する</h4>
[embed]https://gist.github.com/mak00s/fcff3d70aa8b4690bb9e49c38f726617[/embed]