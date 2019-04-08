const initialState = {};

const UPDATE_USER = "UPDATE_USER";
const CLEAR_USER = "CLEAR_USER";
const UPDATE_COURSE_INFO = 'UPDATE_COURSE_INFO'
const UPDATE_QUEUE = 'UPDATE_QUEUE'

export function updateUser(userObj) {
  return {
    type: UPDATE_USER,
    payload: userObj
  };
}

export function clearUser() {
  return {
    type: CLEAR_USER
  };
}

export function updateCourseInfo(course){
  return{
    type: UPDATE_COURSE_INFO,
    payload:course
  }
}

export function updateQueue(queue){
  console.log(queue)
  return{
    type: UPDATE_QUEUE,
    payload:queue
  }
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER:
    
      const { user_id, username, email, first_name, last_name, is_teacher } = payload
      return { ...state, user_id, username, email, first_name, last_name, is_teacher }

    case CLEAR_USER:
      const user = {};
      return { ...user };

    case UPDATE_COURSE_INFO:
      return {...state,course:payload};
    
    case UPDATE_QUEUE:
      console.log(payload)
      return {...state,queue:payload}  

    default:
      return state;
  }
}