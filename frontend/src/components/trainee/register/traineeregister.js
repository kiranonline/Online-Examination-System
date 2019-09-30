import React, { Component } from 'react';
import './trainerRegister.css';
import {Row,Col,Form, Icon, Input, Button,Select,Typography  } from 'antd';
import queryString from 'query-string';
import apis from '../../../services/Apis';
import { Post } from '../../../services/axiosCall';
import Alert from '../../common/alert';
const { Option } = Select;
const { Title } = Typography;
class TraineeRegisterForm extends Component {
    constructor(props){
        super(props);
        this.state={
            inform:true,
            testid:null,
            user:null
        }
    }

    componentDidMount(){
        let params = queryString.parse(this.props.location.search)
        console.log(params)
        this.setState({
            testid:params.testid
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log(this.state.testid);
                Post({
                    url:apis.REGISTER_TRAINEE_FOR_TEST,
                    data:{
                        name:values.name,
                        emailid:values.email,
                        contact:`${values.prefix}${values.contact}`,
                        organisation:values.organisation,
                        testid:this.state.testid,
                        location:values.location
                    }
                }).then((data)=>{
                    console.log(data.data);
                    if(data.data.success){
                        this.setState({
                            inform:false,
                            user:data.data.user
                        })
                    }
                    else{
                        this.props.form.resetFields();
                        Alert('error','Error!',data.data.message);
                    }
                }).catch((error)=>{
                    console.log(error);
                    this.props.form.resetFields();
                    Alert('error','Error!',"Server Error");
                })
            }
        });
    };

    resendMail =()=>{
        Post({
            url:apis.RESEND_TRAINER_REGISTRATION_LINK,
            data:{
                id:this.state.user._id
            }
        }).then((response)=>{
            if(response.data.success){
                Alert('success','Success!',"Email has been sent to your email");
            }
            else{
                Alert('error','Error!',response.data.message);
            }
        }).catch((error)=>{
            console.log(error);
            Alert('error','Error!',"Server Error");
        })
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue :'+91',
            rules: [{ required: true, message: 'Please enter contact no prefix' }],
        })(
            <Select style={{ width: 70 }}>
              <Option value="+91">+91</Option>
            </Select>,
        );
        return (
            <div className="trainee-registration-form-wrapper">
                {this.state.inform?
                    <div className="trainee-registration-form-inner">
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Row>
                                <Col span={12} style={{padding:'5px'}}>
                                    <Form.Item label="Name" hasFeedback>
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: 'Please input your name' }],
                                        })(
                                            <Input
                                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Name"
                                            />,
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={{padding:'5px'}}>
                                    <Form.Item label="Email Id" hasFeedback>
                                        {getFieldDecorator('email', {
                                            rules: [{
                                                type: 'email',
                                                message: 'The input is not valid E-mail!',
                                            },
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            }],
                                        })(
                                            <Input
                                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Email Id"
                                            />,
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={{padding:'5px'}}>
                                    <Form.Item label="Phone Number"  hasFeedback>
                                        {getFieldDecorator('contact', {
                                            rules: [{ 
                                                required: true, 
                                                message: 'Please input your phone number!' 
                                            },
                                            {
                                                len:10,
                                                message:'Contact number must be 10 digit long'
                                            }],
                                        })(<Input addonBefore={prefixSelector} min={10} max={10} />)}
                                    </Form.Item>
                                    <Form.Item label="Organisation" hasFeedback>
                                        {getFieldDecorator('organisation', {
                                            rules: [{ 
                                                    required: true, 
                                                    message: 'Please input your name',
                                            }],
                                        })(
                                            <Input
                                            prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Organisation"
                                            />,
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={{padding:'5px'}}>
                                    <Form.Item label="Location" hasFeedback>
                                        {getFieldDecorator('location', {
                                            rules: [{ required: true, message: 'Please input your name' }],
                                        })(
                                            <Input
                                            prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                            placeholder="Location"
                                            />,
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span={12} style={{paddingTop:'33px'}}>
                                    <Form.Item>
                                        <Button style={{width:'100%'}} type="primary" htmlType="submit" className="login-form-button">
                                            Register
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>              
                        </Form>
                    </div>:
                    <div className="reasendmail-container-register">
                        <Title style={{color:'#fff'}} level={4}>An email containing your test link has been sent to {this.state.user.emailid}</Title>
                        <Button type="primary" onClick={this.resendMail}>Resend Mail</Button>
                    </div>}
                </div>  
        )
    }
}

const TraineeRegister = Form.create({ name: 'Trainee Registration' })(TraineeRegisterForm);
export default TraineeRegister;