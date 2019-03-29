import React from 'react'

export function messageDisplay(messages){
    
    const mapper = messages.map((message)=>{
        return(
            <p>
                {message.message}
            </p>
        )
    })

    return mapper
}