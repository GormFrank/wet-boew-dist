/*!
 *
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-eng.txt / wet-boew.github.io/wet-boew/Licence-fra.txt
 *
 * Version: v3.1.2-development Build: 2013-05-18 09:44 PM
 *
 */
(function(b){var a=window.pe||{fn:{}};a.dic.ind={"%lang-code":"it","%lang-eng":"Italian","%lang-fra":"italien","%lang-native":"Italiano","%all":"Tutti","%home":"Home","%main-page":"Pagina principale","%top-of-page":"Inizio pagina","%you-are-in":"Sei in:","%welcome-to":"Benvenuti","%loading":"caricamento...","%processing":"elaborazione ...","%search":"Cerca","%search-for-terms":"Cerca parola/e:","%no-match-found":"Nessuna corrispondenza trovata","%matches-found":{mixin:"[MIXIN] corrispondenza/e trovata/e"},"%menu":"Menu","%settings":"Impostazioni","%languages":"Lingue","%about":"A proposito di","%current":"(attuale)","%hide":"Nascondere","%error":"Errore","%colon":":","%hyphen":"-","%start":"Inizio","%stop":"Stop","%back":"Indietro","%new-window":" (Si apre in una nuova finestra)","%minute-ago":"un minuto fa","%couple-of-minutes":"un paio di minuti fa","%minutes-ago":{mixin:"[MIXIN] Minuti fa"},"%hour-ago":"un'ora fa","%hours-ago":{mixin:"[MIXIN] ore fa"},"%days-ago":{mixin:"[MIXIN] giorni fa"},"%yesterday":"ieri","%next":"Prossimo","%previous":"Precedente","%first":"Primo","%last":"Ultimo","%archived-page":"Questa pagina web è stata archiviata sul web.","%sub-menu-help":"(aprire il sottomenu con il tasto Invio e chiudere con il tasto ESC)","%tab-rotation":{disable:"Arresto rotazione scheda",enable:"Inizio rotazione scheda"},"%tab-list":"Elenco schede","%tab-panel-end-1":"Fine di questo pannello a schede.","%tab-panel-end-2":"Ritorna alla lista schede","%tab-panel-end-3":"o continuare con il resto della pagina.","%play":"Play","%pause":"Pausa","%open":"Aprire","%close":"Chiudere","%rewind":"Riavvolgere","%fast-forward":"Avanti veloce","%mute":{enable:"Muto",disable:"Riattivare audio"},"%closed-caption":{disable:"Nascondi i sottotitoli",enable:"Mostra i sottotitoli"},"%closed-caption-error":"Errore caricamento sottotitoli","%audio-description":{enable:"Attiva descrizione audio",disable:"Disattiva descrizione audio"},"%progress-bar":"utilizzare freccia sinistra e freccia destra per avanzare e riavvolgere il progresso dei media","%no-video":"Your browser does not appear to have the capabilities to play this video, please download the video below","%position":"Posizione attuale:","%percentage":"Percentuale riproduzione:","%duration":"Tempo totale:","%buffered":"Bufferizzato:","%favourite":"Preferito","%email":"E-mail","%share-text":"Condividi questa pagina","%share-hint":" con {s} ","%share-email-subject":"Pagina interessante","%share-email-body":"Ho pensato che vi potrebbe interessare questa pagina:n{t} ({u})","%share-fav-title":"(Aggiungi ai preferiti)","%share-manual":"Si prega di chiudere questa finestra di dialogo e premere Ctrl-D per aggiungere questa pagina ai preferiti.","%share-showall":"Mostra tutto ({n})","%share-showall-title":"Tutti i preferiti","%share-disclaimer":"Nessuna approvazione di prodotti o servizi è espressa o implicita","%form-not-submitted":"Non è stato possibile inviare il modulo in quanto ","%errors-found":" errori sono stati trovati.","%error-found":" errore è stato trovato.","%datepicker-hide":"Nascondi calendario","%datepicker-show":"Scegli una data da un calendario per il campo:","%datepicker-selected":"Selezionato","%calendar-weekDayNames":["Domenica","Lunedi","Martedì","Mercoledì","Giovedi","Venerdì","Sabato"],"%calendar-monthNames":["Gennaio","Febbraio","Marzo","Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"],"%calendar":"Calendario","%calendar-currentDay":"(Giorno attuale)","%calendar-goToLink":'Vai ad un<span class="wb-invisible"> mese dell\'anno</span>',"%calendar-goToTitle":"Vai al mese dell'anno","%calendar-goToMonth":"Mese:","%calendar-goToYear":"Anno:","%calendar-goToButton":"Andare","%calendar-cancelButton":"Annullare","%calendar-previousMonth":"Mese Precedente: ","%calendar-nextMonth":"Prossimo Mese: ","%show-toc":"Mostra","%show-text":"Mostra l'indice","%hide-text":"Nascondi indice","%table-contents":"Indice","%lb-current":"Articolo {current} di {total}","%lb-next":"Articolo successivo","%lb-prev":"Articolo precedente","%lb-xhr-error":"Questo contenuto non è stato caricato.","%lb-img-error":"Questa immagine non è stata caricata.","%lb-slideshow":"slideshow","%jqm-expand":"Clicca per espandere il contenuto","%jqm-collapse":"Clicca per chiudere il contenuto","%jqm-clear-search":"Annulla ricerca","%jqm-filter":"Filtra gli articoli","%jqm-tbl-col-toggle":"Colonne ...","%table-mention":"Tabella","%table-following":"Grafico. Dettagli nella tabella riportata di seguito.","%st-timeout-msg":'La sessione sta per scadere, hai tempo fino #expireTime# per attivare il pulsante "OK" in basso per prolungare la sessione.',"%st-msgbox-title":"Avviso scadenza sessione","%st-already-timeout-msg":"Spiacenti la sessione è già scaduta. Effettua il login di nuovo.","%td-toggle":"Alterna tutto","%td-open":"Espandi tutto","%td-close":"Riduci tutto","%td-ttl-open":"Espandi tutte le sezioni di contenuto","%td-ttl-close":"Riduci tutte le sezioni di contenuto","%sSortAscending":": organizza in ordine crescente","%sSortDescending":": organizza in ordine decrescente","%sEmptyTable":"Non sono disponibili dati in tabella","%sInfo":"Mostra _START_ a _END_ di _TOTAL_ voci","%sInfoEmpty":"Mostra 0 a 0 di 0 voci","%sInfoFiltered":"(filtrato da _MAX_ voci totali)","%sInfoThousands":"&#160;","%sLengthMenu":"Mostra _MENU_ voci","%geo-mapcontrol":"Controllo di mappa","%geo-panup":"Spostati verso l'alto","%geo-pandown":"Spostati verso il basso","%geo-panleft":"Spostati verso sinistra","%geo-panright":"Spostati verso destra","%geo-zoomin":"Zoom avanti","%geo-zoomout":"Zoom indietro","%geo-zoomworld":"Zoom sull'estensione della mappa","%geo-zoomslider":"Trascina per zoomare","%geo-zoomfeature":"Zoom sull'elemento","%geo-scaleline":"scala mappa","%geo-mouseposition":"Latitudine e longitudine del cursore del mouse","%geo-ariamap":"Oggetto della mappa. Le descrizioni delle caratteristiche della mappa sono nella tabella qui sotto.","%geo-accessibilize":"<strong>Gli utenti della tastiera:</strong> Quando la mappa è a fuoco, utilizzare i tasti freccia per scorrere la mappa e i tasti più e meno per lo zoom. I tasti freccia non scorreranno la mappa quando lo zoom è sull'intera estensione della mappa.","%geo-accessibilizetitle":"Istruzioni: come navigare sulla mappa","%geo-togglelayer":"Alternare la visualizzazione del livello","%geo-hiddenlayer":"Questo livello è attualmente nascosto.","%geo-basemapurl":"http://geoappext.nrcan.gc.ca/arcgis/rest/services/BaseMaps/CBMT3978/MapServer/WMTS/tile/1.0.0/BaseMaps_CBMT3978/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpg","%geo-basemaptitle":"BaseMaps_CBMT3978","%geo-select":"Selezionare","%geo-labelselect":"Controllare per selezionare l'elemento sulla mappa","%pe-disable":"Versione HTML di base","%pe-enable":"Versione standard"};a.document.trigger("languageloaded");window.pe=a;return a}(jQuery));