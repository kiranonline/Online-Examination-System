import { Modal } from 'antd';

export default function Alert(s='warning',h,b) {
    if(s==='success'){
        return (
            Modal.success({
                title: h,
                content:b,
            })
        )
    }
    else if(s==='error'){
        return (
            Modal.error({
                title: h,
                content:b,
            })
        )
    }
    else{
        return (
            Modal.warning({
                title: h,
                content:b,
            })
        )
    }
}
