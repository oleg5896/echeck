let RESPY_Translator = {

    _dictionary : {
        'region': 'Регион',
        'district': 'Район',
        'locality': 'Населенный пункт',
        'sub_locality': 'Район города',
        'street': 'Улица',
        'house': 'Дом',
        'category' : 'Категория',
        'deal_type': 'Тип сделки',
        'rooms': 'Кол-во комнат',
        'price_from': 'Цена от',
        'price_to': 'Цена до',
        'price_area_from': 'Цена за кв.м. от',
        'price_area_to': 'Цена за кв.м. до',
        'area_from': 'Площадь от',
        'area_to': 'Площадь до',
        'floor_from': 'Этаж от',
        'floor_to': 'Этаж до',
        'floors_total_from': 'Этажность от',
        'floors_total_to': 'Этажность до',
        'metro' : 'Метро',
        'source' : 'Площадка',
        'is_agency' : 'Агентства',
        'updated' : 'Дата обновления',
        'price': 'Цена',
        'price_area': 'Цена за кв.м.',
        'area': 'Площадь',
        'floor': 'Этаж',
        'floors_total': 'Этажность'
    },

    translate : function (key) {
        if(this._dictionary[key]) {
            return this._dictionary[key]
        }
        return key;
    }
};