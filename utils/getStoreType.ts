const getStoreType = (storeType: string) => {
    switch (storeType) {
        case 'BURRITO_RESTAURANT':
          return 'Бурито Ресторан'
        case 'PIZZA_RESTAURANT' : 
            return 'Пица Ресторан'
        case 'RESTAURANT' : 
            return 'Ресторан'
        case 'TOBAKO_SHOP' : 
            return 'Тобако'
        case 'COFFEE_SHOP' : 
            return 'Кафич'
        case 'COFFEE_SHOP' : 
            return 'Паб'
        }

}

export default getStoreType