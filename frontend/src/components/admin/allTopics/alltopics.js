import React, { Component } from 'react';
import { Table, Input, Button, Icon, Typography,  Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { 
    ChangeSubjectSearchText,
    ChangeSubjectTableData,
    ChangeSubjectModalState
} from '../../../actions/adminAction';
import './alltopics.css'
import NewSubjectForm from '../newTopics/newtopics';



class AllTopics extends Component {

  openModal = (id,mode)=>{
    this.props.ChangeSubjectModalState(true,id,mode);
  }
  
  closeModal = ()=>{
    this.props.ChangeSubjectModalState(false,null,'New Topic');
  }

  componentDidMount(){
    this.props.ChangeSubjectTableData();
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
            searchWords={[this.props.admin.SubjectsearchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
      });
    
      handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.props.ChangeSubjectSearchText(selectedKeys[0])
      };
    
      handleReset = clearFilters => {
        clearFilters();
        this.props.ChangeSubjectSearchText('')
      };

    render() {
      const { Title } = Typography;
      const columns = [
        {
          title: 'Name',
          dataIndex: 'topic',
          key: 'topic',
          width: '70%',
          ...this.getColumnSearchProps('topic'),
        },
        {
          title: 'Action',
          key: '_id',
          dataIndex: '_id',
          render: (key) => (
            <span>
              <Button type="primary" shape="circle" icon="edit" onClick={()=>this.openModal(key,'Save Changes')}/>
            </span>
          ),
        },
      ];
        return (
            <div className="admin-table-container">
              <Button type="primary" icon="file-text" style={{marginBottom:'10px'}} onClick={()=>this.openModal(null,'New Topic')}>
                Add New
              </Button> 
              <div className="register-trainer-form-header">
                <Title level={4} style={{color:'#fff',textAlign:'center'}}>List of Topics</Title>
              </div>
              <Table 
                bordered={true} 
                columns={columns} 
                dataSource={this.props.admin.subjectTableData} 
                size="medium" 
                pagination={{ pageSize: 5 }}
                loading={this.props.admin.SubjectTableLoading}
                rowKey="_id"
              />;
              <Modal
                visible={this.props.admin.SubjectmodalOpened}
                title={false}
                onOk={this.handleOk}
                onCancel={this.closeModal}
                style={{top :'20px',padding:'0px',backgroundColor:'rgb(155,175,190)'}}
                destroyOnClose={true}
                footer={[
                  
                ]}
              >
                <NewSubjectForm />
              </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    admin : state.admin
});

export default connect(mapStateToProps,{
    ChangeSubjectSearchText,
    ChangeSubjectTableData,
    ChangeSubjectModalState
})(AllTopics);