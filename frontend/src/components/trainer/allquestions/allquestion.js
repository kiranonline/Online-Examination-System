import React, { Component } from 'react';
import { Table, Input, Button, Icon, Typography,Popconfirm,Divider, Modal, Select, Row, Col  } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { 
  ChangeQuestionModalState,
  ChangeQuestionTableData,
  ChangeQuestionSearchText,
  ChangeSelectedSubjects
} from '../../../actions/trainerAction';
import { 
  ChangeSubjectTableData
} from '../../../actions/adminAction';
import './allquestion.css'
import Alert from '../../../components/common/alert';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import NewQuestionForm from '../newquestion/newquestion';
import QuestionDetails from '../questionDetails/questiondetails';



class AllQuestions extends Component {
  constructor(props){
    super(props);
    this.state={
      questiondetailsId : null,
      questiondetailsModelVisible:false
    }
  }
  OpendetailsModal = (id)=>{
    this.setState((previousState,previousProps)=>{
      return{
        questiondetailsId:id,
        questiondetailsModelVisible:true
      }
    })
  }
  ClosedetailsModal = ()=>{
    this.setState((previousState,previousProps)=>{
      return{
        questiondetailsId:null,
        questiondetailsModelVisible:false
      }
    })
  }

  componentDidMount(){
    this.props.ChangeSubjectTableData();
    this.props.ChangeQuestionTableData(this.props.trainer.selectedSubjects);
  }

  openNewModal = (mode)=>{
    this.props.ChangeQuestionModalState(true);
  }

  closeNewModal = ()=>{
    this.props.ChangeQuestionModalState(false);
  }

  handleSubjectChange =(s)=>{
    this.props.ChangeSelectedSubjects(s);
    this.props.ChangeQuestionTableData(s);
  }

  deleteQuestion = (id)=>{
    SecurePost({
      url : `${apis.DELETE_QUESTION}`,
      data : {
          _id : id
      }
    }).then((response)=>{
      if(response.data.success){
        Alert('success','Success',response.data.message);
        this.props.ChangeQuestionTableData(this.props.trainer.selectedSubjects);
      }
      else{
        return Alert('warning','Warning!',response.data.message);
      }
    }).catch((error)=>{
      return Alert('error','Error!','Server Error');
    })
  }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: text => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.props.trainer.QuestionsearchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
      });
    
      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.props.ChangeQuestionSearchText(selectedKeys[0])
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.props.ChangeQuestionSearchText('')
      };

    render() {
      const { Title } = Typography;
      const columns = [
        {
          title: 'Subject',
          dataIndex: 'subject.topic',
          key: 'subject.topic',
          width: '15%',
        },
        {
          title: 'Question',
          dataIndex: 'body',
          key: 'body',
          width: '50%',
          ...this.getColumnSearchProps('body'),
        },
        {
          title: 'Created By',
          dataIndex: 'createdBy.name',
          key: 'createdBy.name',
          width: '15%'
        },
        
        {
          title: 'Action',
          key: '_id',
          dataIndex: '_id',
          width: '15%',
          render: (key) => (
            <span>
              <Button type="primary" shape="circle" onClick={()=>this.OpendetailsModal(key)} icon="info-circle" />
              <Divider type="vertical" />
              <Popconfirm
                  title="Are you sure？"
                  cancelText="No"
                  okText="Yes"
                  onConfirm={()=>{this.deleteQuestion(key)}}
                  icon={<Icon type="delete" style={{ color: 'red' }} />}
                >
                  <Button type="danger" shape="circle" icon="delete" />
                </Popconfirm>
            </span>
          ),
        },
      ];
        return (
            <div className="admin-table-container">
              <div>
                <Row>
                  <Col span={12}>
                    <Button type="primary" icon="question-circle" style={{marginBottom:'10px'}} onClick={()=>this.openNewModal('Add New Question')}>
                      Add New Question
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Select
                      mode="multiple"
                      placeholder="Select one or more subjects"
                      defaultValue={this.props.trainer.selectedSubjects}
                      onChange={this.handleSubjectChange}
                      style={{ width: '100%' }}
                      allowClear={true}
                      optionFilterProp="s"
                    >
                      {this.props.admin.subjectTableData.map(item => (
                        <Select.Option key={item._id} value={item._id} s={item.topic}>
                          {item.topic}
                        </Select.Option>
                      ))}
                    </Select>
                  </Col>
                </Row>
              </div>
              <div className="register-trainer-form-header">
                <Title level={4} style={{color:'#fff',textAlign:'center'}}>List of Questions</Title>
              </div>
              <Table 
                bordered={true} 
                columns={columns} 
                dataSource={this.props.trainer.QuestionTableData} 
                size="medium" 
                pagination={{ pageSize: 5 }}
                loading={this.props.trainer.QuestionTableLoading}
                rowKey="_id" 
              />
              <Modal
                visible={this.props.trainer.NewQuestionmodalOpened}
                title="New Question"
                onCancel={this.closeNewModal}
                style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
                width="90%"
                destroyOnClose={true}
                footer={[]}
              >
                <NewQuestionForm />
              </Modal>

              <Modal
                visible={this.state.questiondetailsModelVisible}
                title="Question Details"
                onCancel={this.ClosedetailsModal}
                style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
                width="70%"
                destroyOnClose={true}
                footer={[]}
              >
                <QuestionDetails id={this.state.questiondetailsId} / >
              </Modal>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    trainer : state.trainer,
    admin : state.admin
});

export default connect(mapStateToProps,{
  ChangeQuestionModalState,
  ChangeQuestionTableData,
  ChangeQuestionSearchText,
  ChangeSelectedSubjects,
  ChangeSubjectTableData
})(AllQuestions);