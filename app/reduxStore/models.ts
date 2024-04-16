export type Store = { 
    id: number,
    name: string,
    storeTypeId: string,
    isOpen: boolean,
}

export type StoreType = {
    id: string,
    name: string,
}

export type Category = {
    id: string,
    name: string,
}

export type StoreItem = {
    id: string,
    name: string,
    description: string,
    price: number,
    available: boolean,
    storeId: number,
    categoryId: number
}
