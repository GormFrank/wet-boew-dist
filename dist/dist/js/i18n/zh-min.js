/*!
 *
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-eng.txt / wet-boew.github.io/wet-boew/Licence-fra.txt
 *
 * Version: v3.1.1-development Build: 2013-05-06 01:59 PM
 *
 */
(function(b){var a=window.pe||{fn:{}};a.dic.ind={"%lang-code":"zh","%lang-eng":"Chinese","%lang-fra":"chinois","%lang-native":"繁體字","%all":"全部","%home":"首頁","%main-page":"主頁","%top-of-page":"頁首","%you-are-in":"你目前在","%welcome-to":"歡迎","%loading":"下載中…","%processing":"處理...","%search":"搜尋","%search-for-terms":"搜尋項目","%no-match-found":"找不到合適項目","%matches-found":{mixin:"找到[MIXIN]項目"},"%menu":"選單","%settings":"目前","%languages":"語言","%about":"關於","%current":"目前","%hide":"隱藏","%error":"錯誤","%colon":"：","%hyphen":"-","%start":"開始","%stop":"停止","%back":"返回","%new-window":"用新視窗打開","%minute-ago":"一分鐘前","%couple-of-minutes":"數分鐘前","%minutes-ago":{mixin:"[MIXIN]分鐘前"},"%hour-ago":"一小時前","%hours-ago":{mixin:"[MIXIN]數小時前"},"%days-ago":{mixin:"[MIXIN]數天前"},"%yesterday":"昨天","%next":"下一筆","%previous":"上一筆","%first":"第一筆","%last":"最後一筆","%archived-page":"此網頁已經封存。","%sub-menu-help":"使用 『確定』鍵進入次選單，離開請按Esc鍵","%tab-rotation":{disable:"旋轉鍵-停止",enable:"旋轉鍵-啟動"},"%tab-list":"籤頁列表","%tab-panel-end-1":"此籤頁選項結束。","%tab-panel-end-2":"返回到籤頁列表","%tab-panel-end-3":"或繼續其餘的頁面。","%play":"播放","%pause":"暫停","%open":"打開","%close":"停止","%rewind":"倒轉","%fast-forward":"快轉","%mute":{enable:"靜音",disable:"聲音"},"%closed-caption":{disable:"隱藏字幕",enable:"顯示字幕"},"%closed-caption-error":"載入字幕錯誤","%audio-description":{enable:"有音訊說明",disable:"無音訊說明"},"%progress-bar":"使用左或右箭頭鍵來前進或倒轉音訊資料","%no-video":"你的瀏覽器並不支援播放此視訊。","%position":"目前位置：","%percentage":"播放百分比：","%duration":"所有時間：","%buffered":"緩衝中：","%favourite":"最愛","%email":"電子郵件","%share-text":"分享此頁","%share-hint":"與{s}","%share-email-subject":"有興趣的網頁","%share-email-body":"我想你對此網頁可能有興趣n{t}{u}","%share-fav-title":"（收藏此頁）","%share-manual":"關閉對話框，並用Ctrl-D標記此頁。","%share-showall":"顯示全部{n}","%share-showall-title":"所有書籤網站","%share-disclaimer":"沒有明示或暗示保證代言任何產品或服務。","%form-not-submitted":"本表格不能傳送因為","%errors-found":"內有錯誤。","%error-found":"出現錯誤。","%datepicker-hide":"隱藏行事曆","%datepicker-show":"選擇一個日期：","%datepicker-selected":"選擇","%calendar-weekDayNames":["星期天","星期一","星期二","星期三","星期四","星期五","星期六"],"%calendar-monthNames":["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],"%calendar":"日曆","%calendar-currentDay":"現在日期","%calendar-goToLink":'轉到<span class="wb-invisible">月份的一年</span>',"%calendar-goToTitle":"轉到某年的某月份","%calendar-goToMonth":"月：","%calendar-goToYear":"年：","%calendar-goToButton":"前往","%calendar-cancelButton":"取消","%calendar-previousMonth":"上一月：","%calendar-nextMonth":"下一月：","%show-toc":"顯示","%show-text":"顯示表的內容","%hide-text":"隱藏表格的內容","%table-contents":"目錄","%lb-current":"所有項目{current}的{total}","%lb-next":"下一項","%lb-prev":"上一項","%lb-xhr-error":"本內容無法載入。","%lb-img-error":"圖形無法顯示。","%lb-slideshow":"幻燈片","%jqm-expand":"點擊展開內容","%jqm-collapse":"點擊隱藏內容","%jqm-clear-search":"搜尋新內容","%jqm-filter":"過濾選項...","%jqm-tbl-col-toggle":"列...","%table-mention":"表格","%table-following":"圖表，詳細內容在表格中。","%st-timeout-msg":"您的這段連線即將到期，你必須等到＃expireTime＃點選下面的『OK』按鈕，以延長您的連線。","%st-msgbox-title":"連線超時警告","%st-already-timeout-msg":"很抱歉，您的連線已經過期。請重新登錄。","%td-toggle":"切換所有","%td-open":"展開全部","%td-close":"關閉全部","%td-ttl-open":"展開所有內容","%td-ttl-close":"關閉所有的內容","%sSortAscending":": 使用大小排序","%sSortDescending":"：使用小大排序","%sEmptyTable":"沒有可用的數據","%sInfo":"顯示_START_到_END_的_TOTAL_個項目","%sInfoEmpty":"顯示0到0的0個項目","%sInfoFiltered":"（共_MAX_項過濾）","%sInfoThousands":",","%sLengthMenu":"顯示_MENU_項","%geo-mapcontrol":"地圖控制","%geo-panup":"向上平移","%geo-pandown":"向下平移","%geo-panleft":"向左平移","%geo-panright":"向右平移","%geo-zoomin":"放大","%geo-zoomout":"缩小","%geo-zoomworld":"縮放地圖範圍","%geo-zoomslider":"拖動缩放","%geo-zoomfeature":"放大到元素","%geo-ariamap":"地圖物件。下表中描述上面地圖的功能。","%geo-accessibilize":"<strong>鍵盤用戶：</strong>當在地圖上鎖定，使用箭頭鍵移動地圖，並用加號和減號鍵放大。若縮小到極限時，箭頭鍵將不會平移。","%geo-accessibilizetitle":"說明：地圖導航","%geo-togglelayer":"該層的顯示切換","%geo-hiddenlayer":"這層隱藏。","%geo-basemapurl":"http://geogratis.gc.ca/maps/CBMT","%geo-basemaptitle":"CBMT","%geo-select":"選擇","%geo-labelselect":"在地圖上檢查選擇的元素","%pe-disable":"基本HTML版本","%pe-enable":"標準版本"};a.document.trigger("languageloaded");window.pe=a;return a}(jQuery));