const target = document.querySelector('.uk-section > .uk-container > .uk-grid');
const observer = new MutationObserver(add);
observer.observe(target, {
    childList: true,
});

function add() {
    const items = document.getElementsByClassName('card');
    Array.prototype.forEach.call(items, item => {
        if (item.getElementsByClassName('disel-ppp-chrome-extension-result').length > 0) {
            return;
        }

        const point_element = item.getElementsByClassName('itemCard__title')[0];
        let point = point_element.textContent;

        // 経験値ポーションは対応しない
        if (point.match(/^Lv/)) {
            return;
        }

        // スピナ
        let unit = 'pt';
        let digit = 100;
        if (point.match(/s\)$/)) {
            unit = 's';
            digit = 10000;
        }

        point = point.replace(/[^0-9]+/g, '');
        point = parseInt(point);

        let price = item.getElementsByClassName('point-left-add')[0].textContent;
        price = parseInt(price);

        const ppp = Math.round(price / point * digit * 100) / 100;

        const result = document.createElement('div')
        result.setAttribute('class', 'disel-ppp-chrome-extension-result');
        result.textContent = ppp + ' / ' + digit + unit;

        point_element.parentNode.insertBefore(result, point_element.nextSibling);
    })
};
