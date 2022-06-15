const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
    observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.attributeName === 'data-status') {
                ECHECK.$btnPower.text(mutation.target.dataset.status == 'true' ? 'ON' : "OFF")
            }
        })
    })


const ECHECK = {
    $btnPower: $('#power-btn'),


    init: function () {
        this.powerCheck().then(status => this.setPowerStatus(status))
        this.listeners()
    },

    listeners: function () {
        this.$btnPower.click(() => {
            this.powerCheck().then(status => this.setPowerStatus(!status))
        })

        // отслеживаем изменение data аттрибута
        observer.observe(this.$btnPower[0], { attributes: true })

        this.$btnPower.mouseenter(function () {
            $(this).text($(this).attr('data-status') == 'true' ? 'OFF' : "ON")
        })

        this.$btnPower.mouseleave(function () {
            $(this).text($(this).attr('data-status') == 'true' ? 'ON' : "OFF")
        })
        

    },

    powerCheck: function () {
        return chrome.storage.local.get('power')
            .then((powerStorage) => {
                if (powerStorage.power !== undefined) {
                    return powerStorage.power
                }
                return false
            })
    },

    setPowerStatus: function (status) {
        chrome.storage.local.set({ power: status })
        this.$btnPower.attr('data-status', status)
    }


}


ECHECK.init()