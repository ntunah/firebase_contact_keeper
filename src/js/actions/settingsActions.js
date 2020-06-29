import {
    DISABLE_BALANCE_ON_ADD,
    DISABLE_BALANCE_ON_EDIT,
    ALLOW_REGISTRATION} from './types'

export const setDisableBalanceOnEdit =()=>{
    // get settings from localStorage
    const settings = JSON.parse(localStorage.getItem('settings'))

    // change it here
    settings.disableBalanceOnEdit = ! settings.disableBalanceOnEdit

    // set back to localStorage
    localStorage.setItem('settings', JSON.stringify(settings))

    return{
        type: DISABLE_BALANCE_ON_EDIT,
        payload: settings.disableBalanceOnEdit
    }
}

export const setDisableBalanceOnAdd =() =>{
    // Get settings from loaclStorage
    const settings = JSON.parse(localStorage.getItem('settings'))

    // Toggle
    settings.disableBalanceOnAdd = !settings.disableBalanceOnAdd

    // Set back to localStorage
    localStorage.setItem('settings', JSON.stringify(settings))

    return{
        type: DISABLE_BALANCE_ON_ADD,
        payload: settings.disableBalanceOnAdd 
    }
}

export const setAllowRegistration =()=>{
    // Get settings from localStorage
    const settings = JSON.parse(localStorage.getItem('settings'))

    // Toggle
    settings.allowRegistration = !settings.allowRegistration

    // set back to localStorage
    localStorage.setItem('settings', JSON.stringify(settings))
    
    return{
        type: ALLOW_REGISTRATION,
        payload: settings.allowRegistration
    }
}