import { CHANGE_CART_ITEMS, CHANGE_LANGUAGE, CHANGE_PRODUCTS, CHANGE_SETTINGS, CHANGE_TOKEN, CHANGE_USER_DETAILS } from './GlobalActionsTypes' 


export const changeLanguageAction = (code)=>{
    return{
        type:CHANGE_LANGUAGE,
        lang:code
    }
}

export const changeProductsAction = (products)=>{
    return{
        type:CHANGE_PRODUCTS,
        products:products
    }
}

export const changeTokenAction = (token)=>{
    return{
        type:CHANGE_TOKEN,
        token:token
    }
}

export const changeUserDetails = (user)=>{
    return{
        type:CHANGE_USER_DETAILS,
        user:user
    }
}

export const changeCartItems = (items)=>{
    return{
        type:CHANGE_CART_ITEMS,
        items:items
    }
}

export const changeSettings = (settings)=>{
    return{
        type:CHANGE_SETTINGS,
        settings:settings
    }
}