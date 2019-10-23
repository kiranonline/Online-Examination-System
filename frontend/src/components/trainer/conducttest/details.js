import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { Input,Button,Descriptions, Icon,message   } from 'antd';
import {changeTestRegisterLink,updateCurrentTestBasicDetails,changeTestRegisterStatus,changeTestStatus,updateCandidatesTest} from '../../../actions/conductTest';
import { connect } from 'react-redux';
import { SecurePost } from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import Alert from '../../common/alert';

class TestDetails extends React.Component {

    componentDidMount(){
        var link = window.location.href.split('/').splice(0,3);
        var mainlink="";
        link.forEach((d,i)=>{
            mainlink=mainlink+d+"/"
        });
        mainlink=mainlink+`trainee/register?testid=${this.props.conduct.id}`
        this.props.changeTestRegisterLink(mainlink);
        this.props.updateCurrentTestBasicDetails(this.props.conduct.id);
        this.props.updateCandidatesTest();
    }

    changeRegistrationStatus=(d)=>{
        SecurePost({
            url:`${apis.STOP_REGISTRATION}`,
            data:{
                id:this.props.conduct.id,
                status:d
            }
        }).then((response)=>{
            if(response.data.success){
                this.props.changeTestRegisterStatus(d)
                Alert('success','Success!','Registration status changed');
            }
            else{
                Alert('error','Error!',response.data.message)
            }
        }).catch((error)=>{
            console.log(error);
            Alert('error','Error!','Server Error')
        })
    }

    changeTestStatus = ()=>{
        SecurePost({
            url:`${apis.START_TEST_BY_TRAINER}`,
            data:{
                id:this.props.conduct.id
            }
        }).then((response)=>{
            console.log(response);
            if(response.data.success){
                this.props.changeTestStatus(response.data.data);
                Alert('success','Success!','Test has begin');
            }
            else{
                Alert('error','Error!',response.data.message)
            }
        }).catch((error)=>{
            console.log(error);
            Alert('error','Error!','Server Error')
        })
    }

    endTestByTrainee = ()=>{
        SecurePost({
            url:`${apis.END_TEST_BY_TRAINER}`,
            data:{
                id:this.props.conduct.id
            }
        }).then((response)=>{
            console.log(response);
            if(response.data.success){
                this.props.changeTestStatus(response.data.data);
                Alert('success','Success!','Test has ended');
            }
            else{
                Alert('error','Error!',response.data.message)
            }
        }).catch((error)=>{
            console.log(error);
            Alert('error','Error!','Server Error')
        }) 
    }


    getCandidates = ()=>{
        SecurePost({
            url:`${apis.GET_TEST_CANDIDATES}`,
            data:{
                id: this.props.conduct.id
            }
        }).then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error)
        })
    }
    
    render(){
        console.log(this.props.conduct.basictestdetails.testbegins);
        return (
            <div>
                <Descriptions size="small" column={4} title="Basic Test Info" layout="vertical" bordered={true}>
                    <Descriptions.Item span={1} label="Test Id">{this.props.conduct.id}</Descriptions.Item>
                    <Descriptions.Item span={3} label="Registration Link"><Input disabled={true} value={this.props.conduct.testRegisterLink} addonAfter={<CopyToClipboard text={this.props.conduct.testRegisterLink} onCopy={()=>message.success('Link Copied to clipboard')}><Icon type="copy"/></CopyToClipboard>}/></Descriptions.Item>
                    <Descriptions.Item span={1} label={this.props.conduct.basictestdetails.isRegistrationavailable?"Registration Open":"Registration Closed"}><Button disabled={this.props.conduct.basictestdetails.testbegins} onClick={()=>{this.changeRegistrationStatus(!this.props.conduct.basictestdetails.isRegistrationavailable)}} type={this.props.conduct.basictestdetails.isRegistrationavailable?"danger":"primary"}>{this.props.conduct.basictestdetails.isRegistrationavailable?"Stop Registration":"Open Registration"}</Button></Descriptions.Item>
                    <Descriptions.Item span={3} label={this.props.conduct.basictestdetails.testbegins?"Test on Progress":"Test has not started yet"}><Button  disabled={this.props.conduct.basictestdetails.testbegins} onClick={()=>{this.changeTestStatus()}} type={"primary"}>Start Test</Button><Button  disabled={!this.props.conduct.basictestdetails.testbegins} onClick={()=>{this.endTestByTrainee()}} type={"danger"}>End Test</Button></Descriptions.Item>
                </Descriptions>            
            </div>
        )
    }
    
}


const mapStateToProps = state => ({
    trainer : state.trainer,
    conduct : state.conduct
});

export default connect(mapStateToProps,{
    changeTestRegisterLink,
    updateCurrentTestBasicDetails,
    changeTestRegisterStatus,
    changeTestStatus,
    updateCandidatesTest
})(TestDetails);