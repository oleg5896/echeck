"use strict";

const serverPath = 'http://127.0.0.1:8001'

function factory(msg, sender){
    if(msg && msg.subject){
        const method = msg.subject
        delete msg.subject
        delete msg.from
        const data = {
            ...msg,
            url: sender.url,
            tabId: sender.tab.id
        }
        ECHECK_Background[method](data);
    }
}

const ECHECK_Background = {
    init: function () {
        this.listeners()
    },

    listeners: function () {
        // onActivated — происходит тогда, когда пользователь перешел на новую вкладку (по клику или по alt+tab).
        // chrome.tabs.onActivated.addListener((info) => {
        //     this.onTabActivated(info);
        // });

        chrome.runtime.onMessage.addListener( (msg, sender) => {
            factory(msg, sender);
        })

        // onUpdated — происходит тогда, когда страница полностью (загрузился не только DOM, а и все картинки) загрузилась во вкладке.
        chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
            chrome.storage.local.get('power').then((power)=>{
                if(!power.power){
                    this.onTabUpdated(tabId, changeInfo, tab)
                }
            })
        })
    },


    onTabUpdated: function (id, info, tab) {
        if (id && tab && info && info.status && (info.status.toLowerCase() === 'complete')) {
            ECHECK_Background_Tabs.postMessage(id, {
                method: 'getItems'
            })
        }
    },

    setItems: function (data) {
        // console.log(data.objects)
        this.checkObjects(data.objects)
            .then((response) => {
                this.mark(data.tabId, response)
            })
    },

    mark: function (tabId, response) {
        ECHECK_Background_Tabs.postMessage(tabId, {
            method: 'markItems',
            data: response
        }) 
    },

    checkObjects: function (objects){
        return fetch(serverPath + "/api/check", { 
            method: "POST",
            body: JSON.stringify(objects),   
            headers:{"content-type": "application/json"} })
                .then( (response) => {
                    if (response.status !== 200) {           
                        return Promise.reject();
                    }   
                    return response.json()
                })
    }

}


let ECHECK_Background_Tabs = {
    postMessage(tabId, message) {
        chrome.tabs.sendMessage(tabId, message)
    }
};




ECHECK_Background.init();



