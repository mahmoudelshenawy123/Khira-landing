import Cookies from "js-cookie"
import { CHANGE_CART_ITEMS, CHANGE_CATEGORIES, CHANGE_LANGUAGE, CHANGE_PRODUCTS, CHANGE_SETTINGS, CHANGE_TOKEN, CHANGE_USER_DETAILS } from "./GlobalActionsTypes"

const initialState = {
    lang:'en',
    token:Cookies.get('token'),
    isLogged:Cookies.get('token')?true:false,
    products:[],
    categories:[],
    cart:{
        product:[],
        total_price:0,
        total_quantity:0,
    },
    settings:[],
    user:{}
}

const GlobalReducer = (state = initialState ,action)=>{
    switch (action.type){
        case CHANGE_LANGUAGE :{
            return {
                ...state,
                lang:action.lang,
            }
        }
        case CHANGE_PRODUCTS :{
            return {
                ...state,
                products:action.products,
            }
        }
        case CHANGE_CATEGORIES :{
            return {
                ...state,
                categories:action.categories,
            }
        }
        case CHANGE_TOKEN :{
            return {
                ...state,
                token:action.token,
                isLogged:action.token?true:false,
            }
        }
        case CHANGE_USER_DETAILS :{
            return {
                ...state,
                user:action.user,
            }
        }
        case CHANGE_CART_ITEMS :{
            return {
                ...state,
                cart:action.items,
            }
        }
        case CHANGE_SETTINGS :{
            return {
                ...state,
                settings:action.settings,
            }
        }
        default: return state
    }
}

export default GlobalReducer