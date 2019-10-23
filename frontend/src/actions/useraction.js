export const changeActiveRoute = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_ACTIVE_ROUTE',
       payload : d
    })
}

export const changeActiveUrl = (d)=> dispatch =>{
    dispatch({
       type : 'CHANGE_ACTIVE_URL',
       payload : d
    })
}