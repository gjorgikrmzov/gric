export type Store = { 
    id: number,
    name: string,
    storeTypeId: string,
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
    latitude: number
}


export type User = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    mobileNumber: string,
    role: string,
    addresses: Address[]
}
