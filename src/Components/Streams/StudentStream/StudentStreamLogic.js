export function finder (queue,user_id){

    const queueLength = queue.filter(queueItem => {
        return queueItem.user_id === user_id && queueItem.display;
    });

    return queueLength
    
}