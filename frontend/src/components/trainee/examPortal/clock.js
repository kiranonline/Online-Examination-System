import React, { Component } from 'react'
import { connect } from 'react-redux';
import {LocaltestDone,fetchTestdata} from '../../../actions/traineeAction';
import './portal.css';
import apis from '../../../services/Apis';
import { Post } from '../../../services/axiosCall';
import Alert from '../../common/alert';

class Clock extends Component {

    constructor(props){
        super(props);
        this.state={
            localMinutes:this.props.trainee.m_left,
            localSeconds:this.props.trainee.s_left
        }
    }
    componentDidMount(){
        this.clockF(); 
    }

    endTest =()=>{
        Post({
            url:`${apis.END_TEST}`,
            data:{
                testid: this.props.trainee.testid,
                userid:this.props.trainee.traineeid
            }
        }).then((response)=>{
            if(response.data.success){
                this.props.fetchTestdata(this.props.trainee.testid,this.props.trainee.traineeid)
            }
            else{
                return Alert('error','Error!',response.data.message);
            }
        }).catch((error)=>{
            return Alert('error','Error!','Error');
        })
    }


    clockF = ()=>{
        let c = setInterval(()=>{
            console.log('i am done')
            let l = this.state.localMinutes;
            let s = this.state.localSeconds;
            if(l==0 && s==1){
                clearInterval(c);
                this.endTest();
            }
            else{
                if(s==0){
                    s=59;
                    l=l-1;
                }
                else{
                    s=s-1;
                }
                this.setState({
                    localMinutes:l,
                    localSeconds:s
                })
            }
        },1000)
    }

    componentWillUnmount(){

    }

    render() {
        return (
            <div className="clock-wrapper">
                <div className="clock-container">{this.state.localMinutes} : {this.state.localSeconds}</div>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    trainee : state.trainee
});




export default connect(mapStateToProps,{
    LocaltestDone,fetchTestdata
})(Clock);