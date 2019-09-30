import auth from '../services/AuthServices';
export const login = (details)=> dispatch =>{
    dispatch({
       type : 'LOGIN',
       payload : details
    })
    
}


export const logout = ()=> dispatch =>{
    dispatch({
       type : 'LOGOUT',
       payload1 : 'Manual Logout'
    })
}


export const wakeUp = ()=> dispatch =>{
    var t = auth.retriveToken() || null;
    if(t && t!=='undefined'){
        auth.wakeUp(t).then((res)=>{
            console.log(`Wakeup success ${res}`)
            dispatch({
                type : 'LOGIN',
                payload1:t,
                payload2:res.data.user
            })
        }).catch((err)=>{
            console.log(`Wakeup error ${err}`)
            if(err){
                dispatch({
                    type : 'LOGOUT',
                    payload1 : 'Token Expired'
                })
            }
        })
    }
    else{
        dispatch({
            type : 'LOGOUT',
            payload1 : 'No Token'
        })
    }
}