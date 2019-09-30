import React from 'react';
import { Table, Tag, Card } from 'antd';





export default function Trainee(props) {
    let maxMarks=props.maxmMarks || 2;
    const columns = [
        {
            title: 'Name',
            dataIndex: 'userid.name',
            key: 'userid.name'
        },
        {
            title: 'Email Id',
            dataIndex: 'userid.emailid',
            key: 'userid.emailid',
        },
        {
            title: 'Contact No',
            dataIndex: 'userid.contact',
            key: 'userid.contact',
        },
        {
            title: 'Organisation',
            dataIndex: 'userid.organisation',
            key: 'userid.organisation',
        },
        {
            title:'Score',
            dataIndex: 'score',
            key: 'score',
        },
        {
            title:'Status',
            dataIndex:'score',
            key: '_id',
            render: tag => (
                <span>
                    <Tag color={tag >= maxMarks/2 ? 'green' : 'red'} key={tag}>
                        {tag >= maxMarks/2 ? 'Pass' : 'Fail'}
                    </Tag>
                </span>
            )
        }
    ];
    return (
        <div>
            <Card>
                <div className="download-section">
                    <Table pagination={false} rowKey="_id" columns={columns} dataSource={props.stats}/>
                </div>
            </Card>
        </div>
    )
}
