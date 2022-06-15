function markObjects(url, objects){
    if (url.indexOf('avito') != -1){
        return markAvito(objects)
    } else if (url.indexOf('cian') != -1){
        return markCian(objects)
    }
}

function markAvito(objects){
    if (objects == undefined){
        return
    }
    objects.forEach(element => {
        console.log(element);
        let $el = $(document).find(".js-item-" + element.id)
        if ($el.length == 0){
            $el = $(document).find("#i" + element.id)
        }
        $el.css("border", "3px solid magenta")

        if(element.hasOwnProperty('old_price')){
            $el.find('[class*=price-text]').attr('data-tooltip', `old_price: ${element.old_price}<br>time: ${new Date(element.time * 1000)}`)
        }
        if(element.hasOwnProperty('old_title')){
            $el.find('[itemprop=name]').attr('data-tooltip', `old_title: ${element.old_title}<br>time: ${new Date(element.time * 1000)}`)
        }
    });
}


const style = document.createElement('style')
style.innerHTML = `
    .tooltip {
        position: fixed;
        padding: 10px 20px;
        border: 1px solid #b3c9ce;
        border-radius: 4px;
        text-align: center;
        font: italic 14px/1.3 sans-serif;
        color: #333;
        background: #fff;
        box-shadow: 3px 3px 3px rgba(0, 0, 0, .3);
        z-index: 999;
    }
    `;
document.head.appendChild(style);
let tooltipElem

document.onmouseover = function(event) {
    let target = event.target

    // если у нас есть подсказка...
    let tooltipHtml = target.dataset.tooltip
    if (!tooltipHtml) return

    // ...создадим элемент для подсказки

    tooltipElem = document.createElement('div')
    tooltipElem.className = 'tooltip'
    tooltipElem.innerHTML = tooltipHtml
    document.body.append(tooltipElem)
    
    // спозиционируем его сверху от аннотируемого элемента (top-center)
    let coords = target.getBoundingClientRect()
    console.log(coords)

    let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2
    if (left < 0) left = 0; // не заезжать за левый край окна

    let top = coords.top - tooltipElem.offsetHeight - 5
    if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
    top = coords.top + target.offsetHeight + 5
    }

    tooltipElem.style.left = left + 'px'
    tooltipElem.style.top = top + 'px'


    target.onmouseout = function() {
        // если у нас есть подсказка...
        console.log('onmouseout')
        tooltipElem.remove()
        tooltipElem = null
    }
}