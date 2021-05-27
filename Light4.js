// ==UserScript==
// @name         Light4
// @namespace    http://tampermonkey.net/
// @version      0.0945
// @description  Упрощаем работу глазам
// @author       Yuriy.Klimovich@south.rt.ru
// @include        *argus.south.rt.ru/argus*
// @include        *onyma/main/*




// @unsafeWindow
// ==/UserScript==
(function() {
    // @require     https://github.com/ThinkerStain/UserScript/raw/main/Light4.js
    // @updateURL   https://github.com/ThinkerStain/UserScript/raw/main/Light4.js


    /// ПРОВЕРИТЬ ОТОБРАЖЕНИЕ В CRM-102369027
    ///CRM-102370784
    'use strict';
    if (document.location.href.match(/.*onyma\/main\/.*/gi)) {
        if (document.location.href.match(/.*ap_logs.htms.*/gi)) {
            ////Сортировка строк в Ониме. Денчик Спасибо
            let neededTable = document.getElementById('frm').querySelector('table');


            function sortDateTime(rows) {
                for (let i = 4; i < rows.length; i++) {

                    for (let j = i; j < rows.length; j++) {

                        //начало валидации времени для парсинга
                        try {
                            let oneElemDate = rows[i].cells[5].innerText.split(' ')[0].split('.').join('-') + 20;
                            let oneElemTime = rows[i].cells[5].innerText.split(' ')[1];
                            let twoElemDate = rows[j].cells[5].innerText.split(' ')[0].split('.').join('-') + 20;
                            let twoElemTime = rows[j].cells[5].innerText.split(' ')[1];
                            let convertOneElemFinal = oneElemDate.split('-').reverse().join('-') + ' ' + oneElemTime;
                            let convertTwoElemFinal = twoElemDate.split('-').reverse().join('-') + ' ' + twoElemTime;
                            if (Date.parse(convertTwoElemFinal) < Date.parse(convertOneElemFinal)) {
                                rows[j].parentNode.insertBefore(rows[j], rows[i]);
                            }
                        } catch {
                            continue;
                        }
                    }
                }
            }
            sortDateTime(neededTable.rows);

            neededTable = document.getElementById('frm').querySelector('table');
            ////Сортировка строк в Ониме.


            //проверяем наличие авторизаций
            var estAut = 0;
            for (var i = 4; i < neededTable.rows.length; i++) {
                if (neededTable.rows[4].cells[6].innerHTML == "&nbsp;") {
                    estAut = 1;
                }
            }

            //Поиск в ониме по хостнейму, аномеру, логину, маку
            //Функция очистки инпутов
            function clrInput() {
                let yui = document.getElementById('frm').querySelectorAll('input[class="small"][type="text"]');
                for (let j = 0; j < yui.length; j++) {
                    yui[j].value = "";
                    document.getElementById('filt').click();
                }
            }
            let fGP = document.getElementById('frm').querySelector('table').rows;
            for (let i = 1; i < fGP.length; i++) {
                let cLngth = fGP[i].cells.length - 1;
                let newZ = document.createElement('td');
                newZ.id = 'ttd' + i;
                fGP[i].cells[cLngth].after(newZ);
                let addHref = document.getElementById('ttd' + i);

                ///Вставляем копир
                if (i == 2) {
                    let newEr = document.createElement('a');
                    newEr.innerHTML = 'COPY';
                    newEr.addEventListener("click", function() {
                        let copyText = '';
                        for (let q = 4; q < neededTable.rows.length; q++) {
                            if (neededTable.rows[q].cells[6].innerHTML == '&nbsp;') {
                                copyText += neededTable.rows[q].innerText + '\n';
                                navigator.clipboard.writeText(copyText);
                            }
                            if (q == neededTable.rows.length - 2) {
                                if (copyText != '') {
                                    alert('Данные авторизации скопированы');
                                } else {
                                    alert('Нет активной сессии');
                                }
                            }
                        }
                    }, false);
                    addHref.append(newEr);
                }
                ///Вставляем копир
                // Вставляем ссылки поиска ALMH
                if (i > 3) {
                    let fLog = String(fGP[i].cells[3].innerText).replace(/"/gi, '');
                    if (fLog != null) {
                        let newK = document.createElement('a');
                        newK.addEventListener("click", function() {
                            clrInput();
                            document.getElementById('login').value = fLog;
                            document.getElementById('filt').click();
                        }, false);
                        newK.innerHTML = 'L';
                        addHref.append(newK);
                    }
                    let fGPmac = fGP[i].cells[cLngth].innerText.match(/(MAC:)*([a-fA-F\d]{2}[\.\-\:_]{1}){5}[a-fA-F\d]{2}|(MAC:)*([a-fA-F\d]{4}[\.\-:_]{1}){2}[a-fA-F\d]{4}/gi);
                    if (fGPmac != null) {
                        fGPmac = String(fGPmac).replace(/mac:*/gi, "");
                        let newK = document.createElement('a');
                        newK.addEventListener("click", function() {
                            clrInput();
                            document.getElementById('sess_rem').value = '%' + fGPmac + '%';
                            document.getElementById('filt').click();
                        }, false);
                        newK.innerHTML = 'M';
                        addHref.append(newK);
                    }
                    //RST-CLT-K-Marksa65-PON1-4000,Slot=1,Port=4,ONT-id=11
                    let regH = /((23(A(FIP|ZOV)|CHER|GR(IG|KL)|ILSK|LVOV|MIHA|NOVO|S(EV|MOL|TAV)|UBIN)|A(DY*G*|ST)|(AFIP|CHER|GRKL|SEV)23|DAG*|ING*|K(LM*|BR*|R*DA*|C(R|H))|NZR|R(ND|o|OS|ST|H)|S(T(A|V)|SI|V*O)|V[LG]G)[\-_][a-zA-Z\d\-\._]+[\/\d\b\s\-\|a-z:;#_\(\)=|&gt;]*((\/)*\d+\/\d+(\/\d+)*|((atm.*|\/)\d+:\d+\.\d+)|(.*,.*[a-z\-]=\d+))|[a-f\d\.\-:]{10,}:remote-id)/gi
                    let shlak = /.*(005C)+.*/gi
                    let fHname = String(fGP[i].cells[cLngth].innerText).match(regH);
                    if (fHname != null) {
                        let newK = document.createElement('a');
                        newK.addEventListener("click", function() {
                            clrInput();
                            document.getElementById('sess_rem').value = '%' + fHname + '%';
                            document.getElementById('filt').click();
                        }, false);
                        newK.innerHTML = 'H';
                        addHref.append(newK);
                    }

                    let fShlak = String(fGP[i].cells[2].innerText).match(shlak);
                    if (fShlak != null) {
                        fGP[i].cells[2].innerText = "Нечитаемый А-№"
                    } // удаляем Шлак из аномера, обычно в волгограде более 40 символов аномер
                    let fAname = String(fGP[i].cells[2].innerText).match(regH);
                    if (fAname != null) {
                        let newK = document.createElement('a');
                        newK.addEventListener("click", function() {
                            clrInput();
                            document.getElementById('sessid').value = '%' + fAname + '%';
                            document.getElementById('filt').click();
                        }, false);
                        newK.innerHTML = 'A';
                        addHref.append(newK);
                    }

                }
            }
        }

        if (document.location.href.match(/.*dog.htms.*/gi)) { // Функции в ониме
            var e0 = document.querySelector('#aval\\[202\\]'); // Ссылка на универсальный клиент около "Уникальный номер клиента в АСР"
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
            let e3 = document.getElementById('filt_form').parentNode.parentNode.parentNode.rows; // Подстветка удаленных, активных и паузных услуг в ониме
            let nSt = 0;
            if (e3[0].innerText.match(/Учетные имена/gi)) {
                nSt = 1
            } else {
                nSt = 2
            } //Нужно из-за разного оторбражения фин. и тех. информации
            for (let i = nSt; i < e3.length; i++) { //2
                let dop = e3[i].cells[2].innerHTML;
                e3[i].cells[2].innerHTML = e3[i].cells[1].innerHTML;
                e3[i].cells[1].innerHTML = dop;
                e3[i].cells[2].setAttribute("width", "70%");
                if (e3[i].innerText.match(/deleted/gi)) {
                    e3[i].cells[0].style.background = 'rgb(245 193 192)';
                    e3[i].cells[1].style.background = 'rgb(245 193 192)';
                    e3[i].cells[2].style.background = 'rgb(245 193 192)';
                }
                if (e3[i].innerText.match(/paused by/gi)) {
                    e3[i].cells[0].style.background = 'rgb(255 255 153)';
                    e3[i].cells[1].style.background = 'rgb(255 255 153)';
                    e3[i].cells[2].style.background = 'rgb(255 255 153)';
                }
                if (e3[i].innerText.match(/active/gi)) {
                    if (e3[i].cells[0].innerText.match(/^(04|863\d{0,7}\D|i0|et|rt|rs|dsl[^_]|ssg|ipo|pppoe|dkd|fttb)/gi)) {
                        e3[i].cells[0].style.background = 'rgb(193 245 192)';
                        e3[i].cells[1].style.background = 'rgb(193 245 192)';
                        e3[i].cells[2].style.background = 'rgb(193 245 192)';
                    }
                }

            }
        }

        if (document.location.href.match(/.*clsrv.htms.*/gi)) { /// СДЕЛАТЬ IPOE
            var q0 = document.querySelector('a[title="\\[ЮТК\\] Сервис IPTV"]').parentNode.querySelector('i'); //Ссылка в ониме по Логину ТВ приставки на ТВплатформу
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

        }
    }

    if (document.location.href.match(/.*argus.south.rt.ru\/.*/gi)) {
        var zReg = ""; //Поиск региона

        ////Выпадающее меню с сылками
        var aIs = [];
        aIs[0] = '<option value="http://bz.south.rt.ru/stv/light4/">Полезное</option>';
        aIs[1] = '<option value="https://mrf-pl.south.rt.ru/">Initi</option>';
        aIs[2] = '<option value="http://ctpdiag.south.rt.ru/">2LTP</option>';
        aIs[3] = '<option value="http://tr069.south.rt.ru/#/search">TR-69</option>';
        aIs[4] = '<option value="https://onymaweb.south.rt.ru/onyma/main/dogsearch.htms?menuitem=1851&_cc=1&__rpp=0&pg=0">Onyma</option>';
        aIs[5] = '<option value="https://uniapp.south.rt.ru/">UniApp</option>';
        aIs[6] = '<option value="http://10.144.35.30:8081/smarttube/master/adminui4/app/login">ТВ-платформа</option>';
        aIs[7] = '<option value="http://10.63.1.2:4000/rawlog">Rawlog</option>';
        aIs[8] = '<option value="https://onymaweb.south.rt.ru/onyma/main/ap_mon.htms?menuitem=1921&real_mi=1921&_cc=1&__rpp=0">Сброс сессий</option>';
        let mmu = document.getElementById('mmf-main_menu_bar');
        let fdu = mmu.querySelector('ul');
        newElem = document.createElement('select');
        newElem.setAttribute("class", 'minimenu');
        for (let i = 0; i < aIs.length; i++) {
            newElem.innerHTML += aIs[i]
        }
        fdu.append(newElem);

        $(document).ready(function() {
            $('.minimenu').change(function() {
                window.open($(this).val(), '_blank')
            });
        });
        ////Выпадающее меню с сылками
    }
    if (document.location.href.match(/.*taskListView.xhtml.*/gi)) { /// Поиск кабельного ТВ
        let rre2 = document.getElementById('tbl_frm').querySelectorAll('table')[1].rows;
        for (let i = 1; i < rre2.length; i++) {
            if (rre2[i].cells[0].hasAttribute('colspan') == false) { //если таблица не пустая
                if (rre2[i].innerText.match(/Кабельное|docsis/gi)) {
                    rre2[i].style.background = 'rgb(245 193 192)'
                }
            }
        }
    }


    if (document.location.href.match(/.*incidentView.xhtml.*/gi)) {
        var target = document.getElementById('signal_process_dialog');
        let allForms = document.getElementById('history_tabs-history_form-add_comment');
        allForms.setAttribute("onclick", "window.location.reload()");
        let allForms2 = document.querySelectorAll("li[class='ui-state-default ui-corner-top'], li[class='ui-state-default ui-tabs-selected ui-state-active ui-corner-top']");
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
        let fTV = ['^f8:a0:97', '^00:1a:79', '^ec:4c:4d', '^0c:56:5c', '^1c:bb:a8', '^00:02:9b', '^f4:0e:83', '^00:07:67', '^d8:af:81', '^e4:27', '^bc:64', '^5c:b0', '^7c:6d', '^14:2e', '^60:ce'];
        let fTime = /((&nbsp;)|\s)([0-1]*\d|2[0-3]):[0-5]\d((&nbsp;)|(\s|\b))*/g;
        let fData = /((&nbsp;)|\s)*([0-2]*\d|3[0-1])[\.\-](0\d|1[0-2])[\.\-](202\d|2\d)((&nbsp;)|\s)*/g;
        let fIp = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/g
        let fIgmpIp = /igmp:\/\/((2(5[0-5]|[0-4]\d)|1*\d{2}|\d)\.){3}(2(5[0-5]|[0-4]\d)|1*\d{2}|\d):\d+/g
        let fNLS = /4(34|61|23|09|15)\d{9}\s*/g; //находим хостнейм во вторичке
        let fDopRab = /(ДОПРАБ|ВЫЕЗД|СПД|ПРМОН|CRM)\-\d{7,}/gi;
        let fErrorS = /,\s+\d+\s+CRC,|CRC.*:.*\d+,|(OLT)*RX.*dBm.*(\-*\d+\.\d+)|snr.*\|\s[\d\.]+/gi;
        let fBras = /[a-z]+\-bras\d+/gi;
        let fUp = /\Wup\b/gi;
        let fDown = /\Wdown\b/gi;
        let fTags = /<.*>|\n|Редактировать/gi;
        let matches = document.getElementById('history_tabs-history_form-history_table_data').querySelectorAll("tr");
        for (let i = 0; i < matches.length; i++) {
            let nCell = matches[i].cells[3].firstChild;
            if (matches[i].cells[0].innerText.match(/выезд/gi)) {
                matches[i].style.background = 'rgb(245 193 192)';
            }
            if (matches[i].cells[2].innerText == 'Добавлен комментарий') { //для поиска "информативных комментариев
                var io = matches[i].cells[3].innerText.replace(/[^\n]*/gi, "").length;
                var strStat0 = matches[i].cells[3].innerText.replace(fTags, "");
                var strStat1 = strStat0.replace(/[^а-я^ё]|\d{1,7}/gi, "").length; //оставляем только кирилицу и номера (кт и т.д)
                var strStat2 = strStat0.replace(/[а-яё\s]|\d{1,7}/gi, "").length;
                if (io < 2 && (strStat1 > strStat2)) {
                    matches[i].style.background = "#FFFF99";
                }
            }
            nCell.innerHTML = nCell.innerHTML.replace(/,[a-z\-]*=/gi, "/"); // убираем  ,Slot= ,Port= ,ONT-id=
            nCell.innerHTML = nCell.innerHTML.replace(/[\/\-]ethernet/gi, " Ethernet"); // нужно ждя того, что бы нt искалхостнеймы "бла-блабла-хостнейм-ethernet"
            //nCell.innerHTML = nCell.innerHTML.replace(fIp, "<b class='f_ip' style='color:#1100FF;	font-size:12pt' >$&</b>");
            nCell.innerHTML = nCell.innerHTML.replace(fNLS, "<a href='https://onymaweb.south.rt.ru/onyma/main/dogsearch.htms?menuitem=1851&_cc=1&__rpp=0&pg=0&addattrv1=$&', target='_blank'>$&</a>");
            //nCell.innerHTML = nCell.innerHTML.replace(fData, "<b style='color:#1100FF;	font-size:12pt' >$&</b>");
            nCell.innerHTML = nCell.innerHTML.replace(fDopRab, "<b style='color:#CC0000;	font-size:12pt' >$&</b>");
            nCell.innerHTML = nCell.innerHTML.replace(fBras, "<b style='color:#CC0000;	font-size:12pt' >$&</b>");
            nCell.innerHTML = dopRepl(nCell.innerHTML, 1);
            nCell.innerHTML = dopRepl(nCell.innerHTML, 3);
            nCell.innerHTML = dopRepl(nCell.innerHTML, 2);
            nCell.innerHTML = nCell.innerHTML.replace(fTime, "<b style='color:#CC0000;	font-size:12pt' >$&</b>");
            nCell.innerHTML = nCell.innerHTML.replace(fErrorS, "<b class='f_error' style='color:#CC0000; font-size:12pt' >$&</b>");
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
                        //  alert(str);
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
                        if (str.match(/^".*"$|Default(	)+[a-z\d_]+/gi)) {
                            var nLogin = str.replace(/"/g, "");
                            nLogin = nLogin.replace(/Default(	)+/g, "");
                            var ssString = '';
                            var autString = '';
                            switch (zReg) {
                                case 'krd':
                                    zReg = [86763, 1000000682, 1000000841];
                                    break;
                                case 'adg':
                                    zReg = [86763, 1000000682, 1000000841];
                                    break;
                                case 'ast':
                                    zReg = [1000000921, 1000000941, 1000000781, 1000000801];
                                    break;
                                case 'klm':
                                    zReg = [1000001341, 1000001342];
                                    break;
                                case 'rst':
                                    zReg = [2989, 97723, 1000000601, 1000000661];
                                    break;
                                case 'vlg':
                                    zReg = [85363, 1000000902, 1000000901];
                                    break;
                                case 'kcr':
                                    zReg = [1000000781, 1000000801];
                                    break;
                                case 'dag':
                                    zReg = [74663, 1000001421, 1000001401];
                                    break;
                                case 'kbr':
                                    zReg = [1000001361, 1000001381];
                                    break;
                                case 'svo':
                                    zReg = [1000000981, 1000001121, 85443, 85423, 1000000781, 1000000801];
                                    break;
                                case 'stv':
                                    zReg = [1000000781, 1000000801];
                                    break;
                                case 'ing':
                                    zReg = [1000000781, 1000000801];
                                    break;
                            }
                            if (typeof zReg != 'string') {
                                for (let ir = 0; ir < zReg.length; ir++) {
                                    autString += "window.open('https://onymaweb.south.rt.ru/onyma/main/ap_show.htms?link=" + zReg[ir] + "&login=" + nLogin + "','_blank');";
                                    ssString += "window.open('https://onymaweb.south.rt.ru/onyma/main/ap_logs.htms?pg=0&__rpp=0&menuitem=245&spg=210&link=" + zReg[ir] + "&login=" + nLogin + "','_blank');";
                                }
                                ssString = "<a href='#' onclick=" + ssString + ">" + nLogin + "</a>&nbsp;";
                                autString = "<a href='#' onclick=" + autString + ">AT</a>&nbsp;";
                            } else {
                                ssString = nLogin + "&nbsp;";
                            }
                            newStr = ssString + autString + "<a class='f_login'  target='_blank' href='http://tr069.south.rt.ru/#/cpes/by/CPESearchOptions.cid/value/" + nLogin + "?tab=MainDiag'>TR</a>&nbsp;"
                        };
                        break;
                    case 3: //ДОДЕЛАТЬ ДЛЯ ПОН /0/0/0/0 // 101091510 НЕ СВЕТИТ хостнеймы
                        if (str.match(/[a-z\d\.\-_]+[^\b^\s^\/^:^#]/gi)) {
                            if (str.match(/\s*atm\s*0/gi)) {
                                str = str.replace(/[^\d]0\//gi, '');
                            } // ТЕСТОВЫЙ КУСОК!!!!! Для Адсл
                            var nHost = str.match(/[a-z\d\.\-_]+[^\b^\s^\/^:^#^\)^\(^\|&]/gi)[0]; //находим четкий хостнейм
                            str = str.replace(nHost, "");
                            var nReg = nHost.match(/[a-z\d]{3}/gi)[0];
                            zReg = nReg.toLowerCase();
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
                            if (nHost != null && zReg != null && nPorts != null) {
                                newStr = "<a class='f_host' href='http://ctpdiag.south.rt.ru/?a=" + nHost + nPorts + "&region=" + nReg + "' target='_blank' title='" + nPorts0 + "'>" + nHost + nPorts + "</a>";
                            }
                        } //  else {var nPorts2 = str.match(/(\/)*(\d+\/){1,2}\d+$/gi)[0]; newStr = "<b style='color:#003300;	font-size:12pt;'>" + nPorts2 + "</b>";}
                        break;
                }
                return newStr;
            }
            let s = String(x);
            let text = "";
            switch (f) {
                case 1:
                    text = /(mac:)*([a-fA-F\d]{2}[\.\-\:_]{1}){5}[a-fA-F\d]{2}|(mac:)*([a-fA-F\d]{4}[\.\-:_]{1}){2}[a-fA-F\d]{4}/gi;
                    break;
                case 2:
                    text = /"[a-zA-Z\d_]{8,}"|Default(	)+[a-z\d_]+/gi;
                    break;
                case 3: ///(^|[^a-z]) &gt; ===   >
                    text = /(^|[^a-z]|[^>])(23(A(FIP|ZOV)|CHER|GR(IG|KL)|ILSK|LVOV|MIHA|NOVO|S(EV|MOL|TAV)|UBIN)|A(DY*G*|ST)|(AFIP|CHER|GRKL|SEV)23|DAG*|ING*|K(LM*|BR*|R*DA*|C(R|H))|NZR|R(ND|o|OS|ST|H)|S(T(A|V)|SI|V*O)|V[LG]G)[\-_][a-zA-Z\d\-\._]+[\/\d\b\s\-\|a-z:;#_=|&gt;]*(\/)*\d+\/\d+(\/\d+)*/gi; // \(\)
                    break;
            }
            return s.replace(text, convert);
        }
    }
})();
