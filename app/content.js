function factory(obj){
    if(obj && obj.method){
        if(obj.data)
            ECHECK_PageParser[obj.method](obj.data);
        else
            ECHECK_PageParser[obj.method]();
    }
}

const ECHECK_PageParser = {
    init: function () {
        chrome.runtime.onMessage.addListener(function(message){
            factory(message);
        })
    },

    // Вызывается через factory
    getItems : function () {
        const objects = parsePage(location.href)
        chrome.runtime.sendMessage({from : 'content', subject:'setItems', objects : objects})
    },

    markItems: function (objects) {
        markObjects(location.href, objects)
    }
}


$(document).ready(function () {
    ECHECK_PageParser.init()
});