import React from 'react'
import moment from 'moment'

export function messageDisplay(messages){
    
    const mapper = messages.map((message)=>{
        return(
            <div>
                <div style={{display: 'flex', alignItems: 'center', margin: '0 0 0 10px'}}><p style={{fontWeight: 'bold', fontSize: '16px', margin: '0 0 2px 0'}}>{message.first_name} {message.last_name}</p><p style={{color: 'grey', fontSize: '12px'}}>&emsp;{moment(message.time).format('L')}&ensp;{moment(message.time).format('h:mm A')}</p></div>
                <p style={{margin: '0px 0px 20px 30px'}}>{message.message}</p>
            </div>
        )
    })

    return mapper
}