import React, {Fragment} from 'react';
import {connect} from 'react-redux';

const Quiz = (props)=>{
    return (
        <>
            {
                props.is_teacher ? (
                    <p>you're a teacher</p>
                ):(
                    <p>you're a student</p>
                )
            }
        </>
    )
}

const m2p = state =>{
    const { is_teacher, course } = state;
    return {
        is_teacher,
        course
    };
}
export default connect(m2p, null)(Quiz)