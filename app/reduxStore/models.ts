export type Store = { 
    id: number,
    name: string,
    storeType: string,
    isOpen: boolean,
    address?: Address,
    imageUrl: string
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
    categoryId: number,
    imageUrl: string
}

export type Address = {
    id: string,
    name: string,
    street: string,
    streetNumber: string,
    flat: number,
    apartment: number,
    longitude: number,
    latitude: number,
    isSelected: boolean
}


export type User = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    mobileNumber: string,
    role: string,
    addresses: Address[],
    storeId: ''
}

export type orderItem = {
    id: string,
    quantity: number,
    name: string,
    price: string
}

export type Order = {
    id: string,
    storeId: string,
    customer: User,
    deliverer: User,
    deliveryAddressId: string,
    totalPrice: string,
    customerComment: string,
    storeComment: string,
    status: string,
    createdAt: string,
    doneAt: string,
    items: orderItem[]  
}