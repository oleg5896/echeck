function parsePage(url){
    if (url.indexOf('avito') != -1){
        return parseAvito()
    } else if (url.indexOf('cian') != -1){
        return parseCian()
    }
}

function parseAvito(){
    let ads = {}
    $(document).find('[class*=js-item]').each(function () {
        const obj = {
            nativeId: $(this).find('a').attr('href').match(/\d+$/)[0],
            source: 'avito',
            url: location.origin + $(this).find('a').attr('href'),
            title: $(this).find('[itemprop="url"]').attr('title'),
            price: $(this).find('[itemprop=price]').attr('content')
        }
        ads[obj.source + '_' + obj.nativeId] = obj
    })
    $(document).find('[data-marker=item]').each(function () {
        const obj = {
            nativeId: $(this).attr('data-item-id'),
            source: 'avito',
            url: location.origin + $(this).find('a').attr('href'),
            title: $(this).find('[itemprop=name]').text(),
            price: $(this).find('[itemprop=price]').attr('content') + 1
        }
        ads[obj.source + '_' + obj.nativeId] = obj
    })
    return ads
}