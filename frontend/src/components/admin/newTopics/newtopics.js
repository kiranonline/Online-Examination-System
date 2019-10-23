import React, { Component } from 'react'
import './newtopic.css';
import {
    Form,
    Input,
    Button
} from 'antd';
import { connect } from 'react-redux';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import Alert from '../../../components/common/alert';
import { 
    ChangeSubjectConfirmDirty,
    ChangeSubjectTableData,
    ChangeSubjectModalState
} from '../../../actions/adminAction';

class NewTopics extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                SecurePost({
                    url : `${apis.CREATE_SUBJECT}`,
                    data : {
                        _id : this.props.admin.SubjectId,
                        topic : values.topic
                    }
                }).then((response)=>{
                    if(response.data.success){
                        this.props.ChangeSubjectModalState(false,null,'New Topic');
                        Alert('success','Success',response.data.message);
                        this.props.ChangeSubjectTableData();
                    }
                    else{
                        this.props.ChangeSubjectModalState(false,null,'New Topic');
                        return Alert('warning','Warning!',response.data.message);
                    }
                }).catch((error)=>{
                    this.props.ChangeSubjectModalState(false,null,'New Topic');
                    return Alert('error','Error!','Server Error');
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="register-subject-form" >
                <div className="register-trainer-form-body">
                    <Form  onSubmit={this.handleSubmit}>
                        <Form.Item label="Topic Name" hasFeedback className="input-admin-trainer">
                            {getFieldDecorator('topic', {
                                initialValue : this.props.admin.subjectDetails.topic,
                                rules: [{ required: true, message: 'Please input topic name!', whitespace: true }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                {this.props.admin.Subjectmode}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    admin : state.admin
});



const NewSubjectForm = Form.create({ name: 'register' })(NewTopics);

export default connect(mapStateToProps,{
    ChangeSubjectConfirmDirty,
    ChangeSubjectTableData,
    ChangeSubjectModalState
})(NewSubjectForm);

