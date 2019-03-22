const initialState = {};

const UPDATE_USER = "UPDATE_USER";
const CLEAR_USER = "CLEAR_USER";
const UPDATE_COURSE_INFO = 'UPDATE_COURSE_INFO'

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

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_USER:
    
      const { user_id, username, email, password, first_name, last_name, is_teacher } = payload
      return { ...state, user_id, username, email, password, first_name, last_name, is_teacher }

    case CLEAR_USER:
      const user = {};
      return { ...user };

    case UPDATE_COURSE_INFO:
      return {...state,course:payload};
      
    default:
      return state;
  }
}