/**
 * Обработчик клика по ссылке с классом 'popup-link'
 * @param {Event} e событие клика
 * @private
 */

document.onclick = function _onMouseClick(e) {
	if(e.target.className == "popup-link"){
	  	e.preventDefault();
	  	e.stopPropagation();
		openPopupFromLink(e.target);
	  	return false; 
	}
}

/**
 * Получает данные из ссылки
 * на основе этих данных создаёт попап (через createPopup) и добавляет его в DOM
 * @param {HTMLElement} link Ссылка с data-аттрибутами
 */
function openPopupFromLink(link) { 
	var p;
	var onOk = function() { 
		document.location.href = link; 
	}

	var re = /%s/;
	var message = link.getAttribute('data-message').replace(re, link);

	p = createPopup(link.getAttribute('data-title'), message, onOk);
   var list = document.getElementsByClassName('content')
	list[0].appendChild(p);

}

/**
 * Создаёт DOM-узел с сообщением
 * @param {String} title Заголовок сообщение
 * @param {String} message Текст сообщения сообщение
 * @param {Function} onOk Обработчик клика по кнопке 'Да'
 * @returns {HTMLElement}
*/

function createPopup(title, message, onOk) {

    var t = document.getElementsByClassName('message-wrap');

    if (!t[0]) {

        var f = function() {
            wrap = document.createElement('div');
            wrap.className += "message-wrap";
            popup = document.createElement('div');
            popup.className += "my-message";
            wrap.appendChild(popup);
            divTitle = document.createElement('div');
            divMessage = document.createElement('div');
            divTitle.className +="my-message-title";
            divMessage.className +="my-message-body";
            divTitle.innerHTML = title;
            divMessage.innerHTML = message;
            popup.appendChild(divTitle);
            popup.appendChild(divMessage);
            inputOk = document.createElement('input');
            inputOk.setAttribute("type","button");
            inputOk.setAttribute("value","OK");
            inputOk.onclick=onOk;
            popup.appendChild(inputOk);
            inputNo = document.createElement('input');
            inputNo.setAttribute("type","button");
            inputNo.setAttribute("value","Не надо");
        
            inputNo.onclick = function(){
                wrap.style.display = 'none';
            };
        
            popup.appendChild(inputNo);
        }();
    }

    else {
        divTitle.innerHTML = title;
        divMessage.innerHTML = message;
        wrap.style.display = '';
    }

	return wrap;

}








