/*!
 *
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-eng.txt / wet-boew.github.io/wet-boew/Licence-fra.txt
 *
 * Version: v3.1.1-development Build: 2013-05-03 01:55 PM
 *
 */
(function(c){var b,a;b=(typeof window.wet_boew_theme!=="undefined"&&window.wet_boew_theme!==null)?window.wet_boew_theme:{fn:{}};a={theme:"theme-wet-boew",psnb:null,search:null,bcrumb:null,title:null,sft:null,fullft:null,gridsmenu:null,menu:null,favicon:{href:"images/favicon-mobile.png",rel:"apple-touch-icon",sizes:"57x57 72x72 114x114 144x144 150x150"},init:function(){b.fullhd=pe.header.find("#wet-fullhd");b.psnb=pe.header.find("#wet-psnb");b.menubar=b.psnb.find(".wet-boew-menubar");b.search=pe.header.find("#wet-srchbx");b.bcrumb=pe.header.find("#wet-bc");b.title=pe.header.find("#wet-title");b.sft=pe.footer.find("#wet-sft");b.fullft=pe.footer.find("#wet-fullft");b.gridsmenu=pe.main.find(".module-menu-section");var i=pe.menu.navcurrent(b.menubar,b.bcrumb),d=i.parents("div.mb-sm"),g,h,j=["wet-title"],k,f,e=pe.print,l=b.sft.length!==0;if(!pe.svg||pe.svgfix){h=j.length;while(h--){k=document.getElementById(j[h]);if(k!==null){f=k.getElementsByTagName("object");if(f.length>0){f=f[0];f.parentNode.innerHTML=f.parentNode.innerHTML.replace(/<object[\s\S]*?\/object>/i,((e||!l)?f.innerHTML:f.innerHTML.replace(".png","-w.png")))}else{if(l){g=k.getElementsByTagName("img");if(g.length>0){g=g[0];g.src=(e?g.src:g.src.replace(".png","-w.png"))}}}}}}if(d.length!==0){d.prev().children("a").addClass("nav-current")}if(pe.secnav.length!==0){i=pe.menu.navcurrent(pe.secnav,b.bcrumb);d=i.parents("ul");d.prev().children("a").addClass("nav-current-nocss")}if(b.gridsmenu.length!==0){i=pe.menu.navcurrent(b.gridsmenu,b.bcrumb)}if(b.psnb.length!==0&&b.search.length===0){b.psnb.addClass("mobile-change")}else{if(b.psnb.length===0&&b.search.length!==0){b.search.addClass("mobile-change")}}},mobileview:function(){var y,N="",e,p,W=pe.dic.get("%settings"),B=pe.dic.get("%hyphen")+pe.dic.get("%main-page"),C,u,f,n,U,Z="",v='<a data-role="button" data-iconpos="notext"',E=' data-rel="popup" data-position-to="window"',r=v+E,F='<div data-role="popup" data-overlay-theme="a"',I='<div data-role="header"',Y=I+"><h1>",D=' data-theme="c" class="ui-corner-all">',s=I+' class="ui-corner-top"><h1>',h='<div data-role="content" data-theme="c" class="ui-corner-bottom ui-content">',V=v+' href="javascript:;" data-icon="delete" data-rel="back" class="ui-btn-right">'+pe.dic.get("%close")+"</a>",Q=r+' data-icon="back" class="ui-btn-left"',O=">"+pe.dic.get("%back")+"</a>",X="</div></div>",q='<ul data-role="listview"',z="",K,m,t,g,d,T,S,w,o,L,H,k,A=c(document),P,l,M,J,R,G,x=typeof wet_boew_mobile_view!=="undefined"&&wet_boew_mobile_view.header_fixed;if(b.sft.length!==0){if(b.menubar.length!==0||pe.secnav.length!==0||b.bcrumb.length!==0){e=pe.dic.get("%menu");g=b.menubar.find("ul.mb-menu li");u=(pe.secnav.length!==0?pe.secnav[0].getElementsByTagName("h2")[0]:"");y=F+' id="jqm-wb-mb">'+Y+e+"</h1>"+V+'</div><div data-role="content" data-inset="true"><nav role="navigation">';if(b.bcrumb.length!==0){H=b.bcrumb[0];K=H.getElementsByTagName("a");if(K.length!==0){P=K[0].href}y+='<section><div id="jqm-mb-location-text">'+H.innerHTML+"</div></section>"}else{y+='<div id="jqm-mb-location-text"></div>'}if(pe.secnav.length!==0){N+="<section><div><h2>"+u.innerHTML+"</h2>"+pe.menu.buildmobile(pe.secnav.find(".wb-sec-def"),3,"b",false,true,"c",true,true)+"</div></section>"}if(b.menubar.length!==0){N+="<section><div><h2>"+b.psnb.children(":header")[0].innerHTML+"</h2>"+pe.menu.buildmobile(g,3,"a",true,true,"c",true,true)+"</div></section>"}y+='<div id="jqm-mb-menu"></div></nav></div></div></div>';Z+=y;b.menu=N;z+=r+' data-icon="bars" href="#jqm-wb-mb">'+e+"</a>"}if(b.search.length!==0){p=pe.dic.get("%search");f=b.search[0];n=f.innerHTML;f=f.getElementsByTagName("input");w=f.length;while(w--){f[w].setAttribute("data-role","none")}U=F+' id="jqm-wb-search">'+Y+p+"</h1>"+V+'</div><div data-role="content"><div>'+n.substring(n.indexOf("<form"))+"</div></div></div>";Z+=U;z+=r+' data-icon="search" href="#jqm-wb-search">'+p+"</a>"}H=b.title[0];l='<div data-role="header"'+(x?' data-position="fixed"':"")+'><div class="ui-title"><div></div></div><map id="wet-mnavbar" data-role="controlgroup" data-type="horizontal" class="ui-btn-right wb-hide">';if(typeof P!=="undefined"){l+=v+' href="'+P+'" data-icon="home">'+pe.dic.get("%home")+"</a>"}else{if(true===false){l+=v+' href="#back-href" data-icon="back">'+pe.dic.get("%back")+"</a>"}}if(z.length!==0){l+=z}l+=r+' href="#popupSettings" data-icon="gear">'+W+"</a></map></div>";b.fullhd.children("#wet-fullhd-in").before(l);b.fullhd.find(".ui-title").append(b.title.find(!pe.svg||pe.svgfix?"img":"object").attr((!pe.svg||pe.svgfix?"alt":"aria-label"),b.title.find("span").text()));H.className+=" ui-bar-b";G=document.getElementById("wb-session");t=b.fullhd.find('li[id*="-lang"]');C=F+' id="popupSettings"'+D;C+=s+W+"</h1>"+V+"</div>";C+=h+q+">";if(G!==null){M=G.getElementsByClassName("settings");for(T=0,w=M.length;T!==w;T+=1){J=M[T].getElementsByTagName("a")[0];C+='<li><a href="'+J.getAttribute("href")+'">'+J.innerHTML+"</a></li>"}R=G.getElementsByClassName("session")[0].getElementsByTagName("a")[0];C+='<li><a href="'+R.getAttribute("href")+'">'+R.innerHTML+"</a></li>"}if(t.length!==0){C+='<li><a href="#popupLanguages"'+E+">"+pe.dic.get("%languages")+"</a></li>"}C+='<li class="ui-corner-bottom"><a href="#popupAbout"'+E+">"+pe.dic.get("%about")+"</a></li>";C+="</ul>"+X;if(t.length!==0){C+=F+' id="popupLanguages"'+D;C+=s+pe.dic.get("%languages")+"</h1>"+Q+' href="#popupSettings"'+O+V+"</div>";C+=h+q+">";if(t.filter('[id*="-lang-current"]').length===0){C+='<li><a href="javascript:;" class="ui-disabled">'+pe.dic.get("%lang-native")+' <span class="current">'+pe.dic.get("%current")+"</span></a></li>"}L=t.get();w=L.length;T=w;while(T--){H=L[T];m=H.getElementsByTagName("a")[0];C+="<li"+(T===0?' class="ui-corner-bottom"':"");if(H.id.indexOf("-lang-current")!==-1){C+='><a href="javascript:;" class="ui-disabled">'+H.innerHTML+' <span class="current">'+pe.dic.get("%current")+"</span></a></li>"}else{C+='><a href="'+m.href+'" lang="'+m.getAttribute("lang")+'">'+m.innerHTML+"</a></li>"}}C+="</ul>"+X}C+=F+' id="popupAbout"'+D;C+=s+pe.dic.get("%about")+"</h1>"+Q+' href="#popupSettings"'+O+V+"</div>";C+=h;C+='<div class="site-app-title"><div class="ui-title">'+b.title[0].getElementsByTagName("span")[0].innerHTML+"</div></div>";H=pe.main.find("#wet-date-mod").children();if(H.length!==0){d=H[1];if(d.getElementsByTagName("time").length===0){C+='<div class="app-version">'+H[0].innerHTML+" "+d.innerHTML+"</div>"}}C+='<div data-role="collapsible-set">'+q+' data-inset="true">';L=b.sft.find(".wet-col-head");for(T=0,w=L.length;T!==w;T+=1){H=L.eq(T);m=H.children("a");k=H.find("+ ul, + address ul");d=m.length!==0?m[0].innerHTML:H[0].innerHTML;if(k.length!==0){C+='<li data-role="collapsible" data-inset="false"><h2>'+d+'</h2><ul data-role="listview">';K=k[0].getElementsByTagName("a");for(S=0,o=K.length;S!==o;S+=1){H=K[S];C+='<li><a href="'+H.href+'">'+H.innerHTML+"</a></li>"}if(m.length!==0){C+='<li><a href="'+m.attr("href")+'">'+m.html()+B+"</a></li>"}C+="</ul></li>"}else{if(m.length!==0){C+="<li"+(T===(w-1)?' class="ui-corner-bottom"':"")+'><a href="'+m.href+'">'+m.html()+"</a></li>"}}}C+="</ul></div>"+X;pe.bodydiv.append(Z+C)}A.on("pagecreate",function(){var ac=b.fullhd.find("#wet-mnavbar"),ae=pe.bodydiv.find("#jqm-mb-menu"),ad,ab,j,aa;if(ac.length!==0){if(!ac.hasClass("ui-controlgroup")){ac.controlgroup()}ac.removeClass("wb-hide");if(ae.length!==0){ae.append(b.menu);ac.find('a[href="#jqm-wb-mb"]').one("click vclick",function(){ae.trigger("create");ad=ae.find(".ui-controlgroup");ab=ad.get();w=ab.length;while(w--){H=ab[w];aa=H.getElementsByTagName("li")[0];if(aa.parentNode.parentNode.parentNode.className.indexOf("ui-collapsible")===-1&&aa.className.indexOf("ui-corner-top")===-1){aa.className+=" ui-corner-top"}j=ad.eq(w).find(".ui-btn").get();H=j[j.length-1];if(typeof H!=="undefined"&&H.className.indexOf("ui-corner-bottom")===-1){H.className+=" ui-corner-bottom"}}})}}function i(ag,af,aj,ai){var ah;c.mobile.showPageLoadingMsg();ah=c.mobile.transitionHandlers.simultaneous("pop",af,aj,ai);ah.done(function(){c.mobile.hidePageLoadingMsg()});return ah}c.mobile.transitionHandlers.loadingTransition=i;c.mobile.defaultDialogTransition="loadingTransition"});A.trigger("themeviewloaded");return},desktopview:function(){var e,d;if(pe.ie>0&&pe.ie<9){e=c("input, textarea, select, button").get()}else{e=document.querySelectorAll("input, textarea, select, button")}d=e.length;while(d--){e[d].setAttribute("data-role","none")}c(document).trigger("themeviewloaded")}};window.wet_boew_theme=c.extend(true,b,a);return window.wet_boew_theme}(jQuery));