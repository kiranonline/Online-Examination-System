import React from 'react'
import './portal.css';
import Sidepanel from './sidepanel'
import Question from './question';

export default function TestBoard(props) {
    return (
        <div className="exam-dashboard-wrapper">
            <Question />
            <Sidepanel />
        </div>
    )
}

