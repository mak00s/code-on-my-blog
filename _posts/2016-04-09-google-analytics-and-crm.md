---
ID: 801
post_title: >
  Google AnalyticsとZoho
  CRMを連携させて簡易MAを構築してみた
author: MatsuoShizuka
post_excerpt: ""
layout: post
permalink: >
  https://concept-diagram.com/google-analytics-and-crm/
published: true
post_date: 2016-04-09 09:20:10
---
Zohoのユーザー会で、Zoho <strong>CRMとGoogleアナリティクス</strong>を組み合わせた事例について講演しました。その時の資料を公開します。

<iframe src="http://www.slideshare.net/slideshow/embed_code/key/sCocYt6aihpEoq" width="425" height="355" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen="allowfullscreen" data-mce-fragment="1"></iframe>
<div><strong><a title="WebとEmailのパーソナライズをGAとZoho CRMで安価に実現する方法" href="http://www.slideshare.net/mak00s/webemailzoho-crmsalesiq" target="_blank">WebとEmailのパーソナライズをGAとZoho CRMで安価に実現する方法</a> </strong>from <strong><a href="http://www.slideshare.net/mak00s" target="_blank">Makoto Shimizu</a></strong></div>
グローバル企業が大きなコストをかけて実現しているようなマーケティングのオートメーションを<strong>低予算でどこまで真似できるか</strong>、に挑戦した結果です。
<h3>Google AnalyticsのCookie IDを会員IDに</h3>
店舗や電話、FAXによる注文、外部サイト（楽天やAmazon）での購入データなど、自社Webに仕込むアナリティクスでは通常は取得が難しい<strong>オフラインデータやCRM情報</strong>を<strong>顧客単位で統合</strong>する場合、データを紐付けるために会員IDをキーとすることが多いですが、ログインを必要とする会員制のサイトではないとキーとなる会員IDを取得できない、というハードルがあります。また、会員制のサイトだったとしても、ログインする前のWeb閲覧行動データまで対象とするのは、大規模ソリューションであっても容易ではないのが現実です。

そこで今回採用した方式では、Googleアナリティクスが発行する<strong>ランダムのCookie ID (Client ID)を会員IDとして</strong>扱い、そのIDをZoho CRMにインポートするようにしました。ログインの有無に関わらず使えるキーであり、GAの場合はクロスドメイン対応も楽なので、同じブラウザである限りIDを統一できます。
<h3>CRM側で顧客データを統合する</h3>
訪問者がサイトの閲覧を開始した時に、GAが自動で発行するClient IDがZoho CRMに既に登録されているかを調べ、まだの場合は新規にレコードを作成するようにしました。さらにZoho SalesIQも併用すると、IPアドレスから割り出した地域情報や、訪問回数、リファラ、スコアリング結果などのWeb行動データもZoho CRMへ送信してくれるので便利です。

外部のECサイト（カラーミー）で注文を完了した時は、注文IDに加えてGAのClient IDもカスタムディメンションにセットするようにしました。その結果、GAのReporting APIを使って、Transaction IDとClient IDのペアを後で取り出すことができるようになります。購入データに加えて、メルマガ登録や商品詳細閲覧、リピート訪問回数、About閲覧などの目標（コンバージョン）もGAで取得しているので、それらのデータをGAのClient IDをキーとして<strong>Zoho CRMに定期的にインポート</strong>しています。

注文者に関しては氏名や電話番号、郵便番号がCRMレコードに含まれるので、それらをキーとして別のECサイト（楽天やAmazon）や電話、FAXによる注文情報と付き合わせることができます。
<h3>統合された顧客情報を取り出してターゲティング</h3>
さらに、Client IDを投げるとLTV情報（購入回数や頻度、単価、総額など）や属性情報（都道府県や性別）を返す<strong>APIを自作</strong>し、Webページを開いた時にJavaScriptで取得できるようにしました。これによって、簡単なスクリプトを書くだけでLTVや属性ベースでコンテンツやバナーを出し分ける<strong>パーソナライズを実現</strong>できるようになりました。

まだ実行していませんが、特定の条件に合致する人を抽出してターゲティングされたメールを送信することもできるようになりました。
<h3>まとめ</h3>
GoogleアナリティクスのCookie IDを会員IDとして計測するという新発想により、ログイン不要のサイトでも顧客データの統合管理とパーソナライズが可能になりました。CRMレコードとCookie IDを1：多で紐付けるようにすれば、<strong>デバイスを超えた真の人単位の統合</strong>も可能です。

今回の仕組みでは手作業が残るので、完全なオートメーションはできませんが、デジタルマーケティングは工夫すれば<strong>スモールスタートできることを実証</strong>できました。うまく実績を残せれば、社内説得や予算確保も容易になるはず。今年はこのように大きなことを小さく実現する方法について、もっと模索＆啓蒙していきたいと思っています。