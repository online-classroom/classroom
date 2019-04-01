import React from 'react'

export function messageDisplay(messages){
    
    const mapper = messages.map((message)=>{
        return(
            <div>
                <p>{message.first_name} {message.last_name}           {message.time}</p>
                <p>{message.message}</p>
            </div>
        )
    })

    return mapper
}