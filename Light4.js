// ==UserScript==
// @name         Light4
// @namespace    http://tampermonkey.net/
// @version      0.085
// @description  Упрощаем работу глазам
// @author       Yuriy.Klimovich@south.rt.ru
// @include        *argus.south.rt.ru/argus/views/supportservice/incident/*
// @include        *argus.south.rt.ru/argus*
// @include        *onyma/main/clsrv.htms*
// @include        *onyma/main/dog.htms?*
// @require      https://github.com/ThinkerStain/UserScript/raw/main/Light4.js
// @updateURL   https://github.com/ThinkerStain/UserScript/raw/main/Light4.js


// @unsafeWindow
// ==/UserScript==
(function() {
    'use strict';
    ///ui-grid-col-7_5 text-right див с полем для ввода коммента

    if (document.location.href.match(/.*onyma\/main\/.*/gi)) {
        if (document.location.href.match(/.*dog.htms?.*/gi)) {
            var e0 = document.querySelector('#aval\\[202\\]');
            if (e0 != null) {
                if (e0.value == '') {
                    e0.style.backgroundColor = 'rgb(245 193 192)'
                } else {
                    e0.style.backgroundColor = 'rgb(193 245 192)';
                    var newElem0 = document.createElement('a');
                    newElem0.href = 'https://uniapp.south.rt.ru/uniapp#337892916';
                    newElem0.textContent = 'UniAPP';
                    newElem0.style = 'padding: 0px 3px;'
                    newElem0.target = "_blank";
                    e0.after(newElem0);
                }
            }
        }

        if (document.location.href.match(/.*clsrv.htms?.*/gi)) {
            var q0 = document.querySelector('a[title="\\[ЮТК\\] Сервис IPTV"]').parentNode.querySelector('i');
            if (q0 != undefined) {
                var nStr = q0.innerHTML.replace(/\D+/gi, "");
                q0.innerHTML = "(<a target='_blank' style='color:red;' href='http://10.144.35.30:8081/smarttube/master/adminui4/app/ServiceAccount/list?number=%25" + nStr + "%25'>" + nStr + "</a>)";
            }

            var e1 = document.querySelector('#prop\\[8545\\]');
            if (e1 != null) {
                if (e1.value == '') { //если мака нет в строке
                    e1.style.backgroundColor = 'rgb(245 193 192)'
                } else { //если мак в строке есть
                    var newElem2 = document.createElement('a');
                    newElem2.href = 'http://10.144.35.30:8081/smarttube/master/adminui4/app/ServiceAccount/list?info_listMac=%25' + e1.value + '%25&page_num=1';
                    newElem2.textContent = 'Smarttube';
                    newElem2.style = 'padding: 0px 3px;'
                    newElem2.target = "_blank";
                    e1.after(newElem2);

                    e1.style.backgroundColor = 'rgb(193 245 192)'
                    var newElem = document.createElement('a');
                    newElem.href = 'http://10.63.1.2:4000/rawlog/%D0%AE%D0%B3?mac=' + e1.value;
                    newElem.textContent = 'Rawlog';
                    newElem.style = 'padding: 0px 3px;'
                    newElem.target = "_blank";
                    e1.after(newElem);

                }
            }
            let e3 = document.getElementById('filt_form').parentNode.parentNode.parentNode.rows;
            for (let i = 1; i < e3.length; i++) {
                let dop = e3[i].cells[2].innerHTML;
                e3[i].cells[2].innerHTML = e3[i].cells[1].innerHTML;
                e3[i].cells[1].innerHTML = dop;
                e3[i].cells[2].setAttribute("width", "70%");
                if (e3[i].cells[1].innerHTML.match(/deleted/gi)) {
                    e3[i].cells[2].style.background = 'rgb(245 193 192)';
                    e3[i].cells[1].style.background = 'rgb(245 193 192)';
                    e3[i].cells[0].style.background = 'rgb(245 193 192)';
                }
            }
        }
    }

    if (document.location.href.match(/.*argus.south.rt.ru\/.*/gi)) {
//alert('11');
        let mmu = document.getElementById('main_menu_unit');
        let fdu = mmu.querySelector('form > div > ul');
        newElem = document.createElement('li');
        newElem.className = 'ui-widget ui-menuitem ui-corner-all ui-menu-parent';
        newElem.setAttribute("aria-haspopup", "true");
        newElem.id = 'pp1';
        fdu.append(newElem);

        let newElem2 = document.createElement('a');
        newElem2.className = 'ui-menuitem-link ui-submenu-link ui-corner-all';
        newElem2.setAttribute("href", "https://mrf-pl.south.rt.ru/");
        newElem2.setAttribute("target", "_blank");
        newElem2.innerHTML = 'In';//'<img src="https://mrf-pl.south.rt.ru/images/logo.ico">';
        newElem2.title= 'Initi'; 
        document.getElementById('pp1').append(newElem2);

        newElem2 = document.createElement('a');
        newElem2.className = 'ui-menuitem-link ui-submenu-link ui-corner-all';
        newElem2.setAttribute("href", "http://ctpdiag.south.rt.ru/");
        newElem2.setAttribute("target", "_blank");
        newElem2.text = '2L';
        newElem2.title= '2LTP'; 
        document.getElementById('pp1').append(newElem2);
        
        newElem2 = document.createElement('a');
        newElem2.className = 'ui-menuitem-link ui-submenu-link ui-corner-all';
        newElem2.setAttribute("href", "http://tr069.south.rt.ru/#/search");
        newElem2.setAttribute("target", "_blank");
        newElem2.innerHTML = 'TR';//'<img src="https://images.squarespace-cdn.com/content/v1/5ece2ac40514bb77afb1018d/1597917767982-QHP29Q8LN6AR6CKO3XOX/ke17ZwdGBToddI8pDm48kFQQgP34qnCpeHaeAOzTt7pZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIedjZT6_OBzi2ofH1EqNdNeCRxNMlbxs9807lIebBlcA/favicon.ico?format=100w" height="16" width="16">';
        newElem2.title= '2LTP'; 
        document.getElementById('pp1').append(newElem2);

        newElem2 = document.createElement('a');
        newElem2.className = 'ui-menuitem-link ui-submenu-link ui-corner-all';
        newElem2.setAttribute("href", "https://onymaweb.south.rt.ru/onyma/main/dogsearch.htms?menuitem=1851&_cc=1&__rpp=0&pg=0");
        newElem2.setAttribute("target", "_blank");
        newElem2.innerHTML = 'On';//'<img src="https://onymaweb.south.rt.ru/favicon.ico" height="16" width="16">';
        newElem2.title= 'Onyma'; 
        document.getElementById('pp1').append(newElem2);

        newElem2 = document.createElement('a');
        newElem2.className = 'ui-menuitem-link ui-submenu-link ui-corner-all';
        newElem2.setAttribute("href", "https://uniapp.south.rt.ru/");
        newElem2.setAttribute("target", "_blank");
        newElem2.innerHTML = 'Un';//'<img src="https://moscow.old.rt.ru/img/smart-banner/icon.png" height="16" width="16">';
        newElem2.title= 'UNIAPP';
        document.getElementById('pp1').append(newElem2);

        newElem2 = document.createElement('a');
        newElem2.className = 'ui-menuitem-link ui-submenu-link ui-corner-all';
        newElem2.setAttribute("href", "http://10.144.35.30:8081/smarttube/master/adminui4/app/login");
        newElem2.setAttribute("target", "_blank");
        newElem2.innerHTML = 'St';//'<img src="https://www.nginx.com/wp-content/uploads/2019/10/favicon-48x48.ico" height="16" width="16">'
        newElem2.title= 'ТВ-платформа'; 
        document.getElementById('pp1').append(newElem2);

        newElem2 = document.createElement('a');
        newElem2.className = 'ui-menuitem-link ui-submenu-link ui-corner-all';
        newElem2.setAttribute("href", "http://10.63.1.2:4000/rawlog");
        newElem2.setAttribute("target", "_blank");
        newElem2.text = 'Ra';
        newElem2.title= 'Rawlog'; 
        document.getElementById('pp1').append(newElem2);

        newElem2 = document.createElement('a');
        newElem2.className = 'ui-menuitem-link ui-submenu-link ui-corner-all';
        newElem2.setAttribute("href", "https://onymaweb.south.rt.ru/onyma/main/ap_mon.htms?menuitem=1921&real_mi=1921&_cc=1&__rpp=0");
        newElem2.setAttribute("target", "_blank");
        newElem2.text = 'Ao';
        newElem2.title= 'Авторизации'; 
        document.getElementById('pp1').append(newElem2);
    }

    if (document.location.href.match(/.*argus.south.rt.ru\/argus\/views\/supportservice\/incident\/.*/gi)) {
        let allForms = document.getElementById('history_tabs-history_form-add_comment');
        allForms.setAttribute("onclick", "window.location.reload()");
        let allForms2 = document.querySelectorAll("li[class='ui-state-default ui-corner-top'], li[class='ui-state-default ui-tabs-selected ui-state-active ui-corner-top']");
        //  for (let i = 0; i < allForms2.length; i++) {//alert('11');
        //  allForms2[i].setAttribute("onclick", "window.location.reload()");}


        let scrolD = document.querySelector(".ui-datatable-scrollable-body");
        newElem2 = document.createElement('span');
        newElem2.addEventListener("click", function() {
            scrolD.scrollTop = scrolD.scrollHeight;
        }, false);
        newElem2.innerHTML = '<b style="color:#CC0000">ВНИЗ</b>&nbsp;';
        document.getElementById('history_tabs-history_form-new_comment').parentNode.before(newElem2);
        newElem2 = document.createElement('span');
        newElem2.addEventListener("click", function() {
            scrolD.scrollTop = 0;
        }, false);
        newElem2.innerHTML = '<b style="color:#009900">&nbsp;ВВЕРХ</b>';
        document.getElementById('history_tabs-history_form-new_comment').parentNode.before(newElem2);

        let fPersNum = "467181"; //Поиск своих комментов
        let fTV = ['^f8:a0:97', '^00:1a:79', '^ec:4c:4d', '^0c:56:5c', '^1c:bb:a8', '^00:02:9b', '^f4:0e:83', '^00:07:67', '^d8:af:81', '^e4:27', '^bc:64', '^5c:b0', '^7c:6d', '^14:2e', '^60:ce'];
        let fTime = /((&nbsp;)|\s)([0-1]*\d|2[0-3]):[0-5]\d((&nbsp;)|(\s|\b))*/g;
        let fData = /((&nbsp;)|\s)*([0-2]*\d|3[0-1])[\.\-](0\d|1[0-2])[\.\-](202\d|2\d)((&nbsp;)|\s)*/g;
        let fIp = /((2(5[0-5]|[0-4]\d)|1*\d{2}|\d)\.){3}(2(5[0-5]|[0-4]\d)|1*\d{2}|\d)\b/g; // Правило сверки IP
        let fIgmpIp = /igmp:\/\/((2(5[0-5]|[0-4]\d)|1*\d{2}|\d)\.){3}(2(5[0-5]|[0-4]\d)|1*\d{2}|\d):\d+/g
        let fNLS = /\s+4\d{11}\s*/g; //находим хостнейм во вторичке
        let fDopRab = /(ДОПРАБ|ВЫЕЗД|СПД|ПРМОН|CRM)\-\d{7,}/g;
        let fErrorS = /,\s+\d+\s+CRC,|CRC.*:.*\d+,|RX.*dBm|snr.*\|\s[\d\.]+/gi;
        let fUp = /\Wup\b/gi;
        let fDown = /\Wdown\b/gi;
        let fTags = /<.*>|\n|Редактировать/gi;
        let matches = document.getElementById('history_tabs-history_form-history_table_data').querySelectorAll("tr");
        for (let i = 0; i < matches.length; i++) {
            let nCell = matches[i].cells[3].firstChild;
            if (matches[i].cells[2].innerText == 'Добавлен комментарий') { //для поиска "информативных комментариев
                var io = matches[i].cells[3].innerText.replace(/[^\n]*/gi, "").length;
                var strStat0 = matches[i].cells[3].innerText.replace(fTags, "");
                var strStat1 = strStat0.replace(/[^а-я^ё]|\d{1,7}/gi, "").length; //оставляем только кирилицу и номера (кт и т.д)
                var strStat2 = strStat0.replace(/[а-яё\s]|\d{1,7}/gi, "").length;
                if (io < 2 && (strStat1 > strStat2)) {
                    matches[i].style.background = "#FFFF99";
                }
            }
            nCell.innerHTML = nCell.innerHTML.replace(/[\/\-]ethernet/gi, " Ethernet"); // нужно ждя того, что бы нt искалхостнеймы "бла-блабла-хостнейм-ethernet"
            nCell.innerHTML = nCell.innerHTML.replace(fIp, "<b style='color:#1100FF;	font-size:12pt' >$&</b>");
            nCell.innerHTML = nCell.innerHTML.replace(fNLS, "<b style='color:#1100FF;	font-size:12pt' >$&</b>");
            nCell.innerHTML = nCell.innerHTML.replace(fData, "<b style='color:#1100FF;	font-size:12pt' >$&</b>");
            nCell.innerHTML = nCell.innerHTML.replace(fDopRab, "<b style='color:#CC0000;	font-size:12pt' >$&</b>");
            nCell.innerHTML = dopRepl(nCell.innerHTML, 1);
            nCell.innerHTML = dopRepl(nCell.innerHTML, 2);
            nCell.innerHTML = dopRepl(nCell.innerHTML, 3);
            nCell.innerHTML = nCell.innerHTML.replace(fTime, "<b style='color:#CC0000;	font-size:12pt' >$&</b>");
            nCell.innerHTML = nCell.innerHTML.replace(fErrorS, "<b style='color:#CC0000; font-size:12pt' >$&</b>");
            nCell.innerHTML = nCell.innerHTML.replace(fUp, "<b style='color:#009900; font-size:12pt' >$&</b>");
            nCell.innerHTML = nCell.innerHTML.replace(fDown, "<b style='color:#CC0000; font-size:12pt' >$&</b>");
        }

        function dopRepl(x, f) {
            function convert(str, offset) {
                let newStr = "";
                switch (f) {
                    case 1: //Тут ищем и обрабатываем маки
                        var sM = "";
                        var Raw = "";
                        var SmartT = "";
                        var bezM = str.replace(/^mac[\.\-:]*/gi, "");
                        if (str.match(/^mac[\.\-:]*/gi)) {
                            sM = str.match(/^mac[\.\-:]*/gi);
                        }
                        var bezM2 = bezM.replace(/[\-\.:]*/g, "");
                        bezM2 = (bezM2.replace(/(?=([A-Fa-f0-9]{2})+($))/g, ':')).substring(1); //делаем все через 2:2:2
                        for (let z = 0; z < fTV.length; z++) { //ищем ТВ приставки
                            let ReNew = new RegExp(fTV[z], "gi");
                            if (bezM2.match(ReNew)) {
                                Raw = "\"window.open('http://10.63.1.2:4000/rawlog/%D0%AE%D0%B3?mac=" + bezM2 + "', '_blank')\"";
                                Raw = "<a href='#' onclick=" + Raw + ">R</a>";
                                SmartT = "\"window.open('http://10.144.35.30:8081/smarttube/master/adminui4/app/ServiceAccount/list?info_listMac=%25" + bezM2 + "%25&page_num=1', '_blank')\""
                                SmartT = "<a href='#' onclick=" + SmartT + ">S</a>";
                            }
                        }
                        var opnWin = "\"window.open('http://ctpdiag.south.rt.ru/macvendors.php/?" + bezM + "', 'blank', 'location=no,width=230,height=100,scrollbars=no,top=850,left=0,resizable = no,status  = no')\"";
                        newStr = sM + "<a href='#' onclick=" + opnWin + ">" + bezM + "</a> " + Raw + " " + SmartT;
                        break;
                    case 2: //Тут ищем и обрабатываем логины абонента
                        if (str.match(/^".*"$/gi)) {
                            //http://tr069.south.rt.ru/live/SupportPortal/LEGACYUI/#/cpe/cpeid/N7152292G005744?tab=MainDiag
                            newStr = "<a target='_blank' href='http://tr069.south.rt.ru/#/cpes/by/CPESearchOptions.cid/value/" + str.replace(/"/g, "") + "?tab=MainDiag'>" + str.replace(/"/g, "") + "</a>"
                        };
                        break;
                    case 3: //ДОДЕЛАТЬ ДЛЯ ПОН /0/0/0/0 // 101091510 НЕ СВЕТИТ хостнеймы
                        if (str.match(/[a-z\d\.\-_]+[^\b^\s^\/^:^#>]/gi)) {
                            var nHost = str.match(/[a-z\d\.\-_]+[^\b^\s^\/^:^#>]/gi)[0];
                            str = str.replace(nHost, "");
                            var nReg = nHost.match(/[a-z\d]{3}/gi)[0];
                            var nPorts0 = str.match(/(\d+\/){1,2}\d+$/gi)[0];
                            var nPorts = nPorts0.split("/");
                            while (nPorts.length < 3) {
                                nPorts.unshift("0");
                            }
                            for (let iz = 0; iz < nPorts.length; iz++) {
                                nPorts[iz] = nPorts[iz] * 1;
                                if (nPorts[iz] > 128) {
                                    nPorts[iz] = 0;
                                }
                            }
                            nPorts = "/" + nPorts[0] + "/" + nPorts[1] + "/" + nPorts[2];
                            newStr = "<a href='http://ctpdiag.south.rt.ru/?a=" + nHost + nPorts + "&region=" + nReg + "' target='_blank' title='" + nPorts0 + "'>" + nHost + nPorts + "</a>";
                        } else {
                            var nPorts2 = str.match(/(\/)*(\d+\/){1,2}\d+$/gi)[0];
                            newStr = "<b style='color:#003300;	font-size:12pt;'>" + nPorts2 + "</b>";
                        }
                        break;
                }
                return newStr;
            }
            let s = String(x);
            let text = "";
            switch (f) {
                case 1:
                    text = /(MAC:)*([a-fA-F\d]{2}[\.\-\:_]{1}){5}[a-fA-F\d]{2}|(MAC:)*([a-fA-F\d]{4}[\.\-:_]{1}){2}[a-fA-F\d]{4}/gi;
                    break;
                case 2:
                    text = /\"[a-zA-Z\d]{8,}\"/gi;
                    break;
                case 3: ///(^|[^a-z])
                    text = /(^|[^a-z]|[^>])(23(A(FIP|ZOV)|CHER|GR(IG|KL)|ILSK|LVOV|MIHA|NOVO|S(EV|MOL|TAV)|UBIN)|A(DY*G*|ST)|(AFIP|CHER|GRKL|SEV)23|DAG*|ING*|K(LM*|BR*|R*DA*|C(R|H))|NZR|R(ND|o|OS|ST|H)|S(T(A|V)|SI|V*O)|V[LG]G)[\-_][a-zA-Z\d\-\._]+[\/\d\b\s\|a-z:;#_>]*(\/)*\d+\/\d+(\/\d+)*/gi;
                    break;
            }
            return s.replace(text, convert);
        }
    }

})();
