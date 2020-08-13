import React,{ useState, useEffect } from 'react'
import './portal.css';
import Sidepanel from './sidepanel'
import Question from './question';
import {Drawer} from "antd";


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    return windowDimensions;
}



export default function TestBoard(props) {
    const { height, width } = useWindowDimensions();
    const [visible,setVisible]=useState(false);

    let onClose=()=>setVisible(false);
    let onOpen=()=>setVisible(true);
    if(width>768){
        return (
            <div className="exam-dashboard-wrapper">
                <Question mode={width>768?"desktop":"mobile"} triggerSidebar={onOpen}/>
                <Sidepanel mode={width>768?"desktop":"mobile"} />
            </div>
        )
    }
    else{
        return (
            <div className="exam-dashboard-wrapper">
                <Question mode={width>768?"desktop":"mobile"} triggerSidebar={onOpen} />
                <Drawer
                    title="Toolbar"
                    placement="right"
                    closable={true}
                    onClose={onClose}
                    visible={visible}
                    width="100%"
                >
                    <Sidepanel mode={width>768?"desktop":"mobile"}/>    
                </Drawer>
            </div>
        )
    }
    
}

