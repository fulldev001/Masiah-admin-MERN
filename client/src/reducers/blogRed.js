import { 
  ADD_NEW_POST,
  SET_COMMENTS,
  SET_POSTS,
  REPLACE_ONE_POST,
  REMOVE_ONE_POST
} from "actions/types"

const initialState = {
  posts: [],
  comments: []
}

function blogReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case SET_POSTS: 
      return {
        ...state,
        posts: payload
      }
    case SET_COMMENTS: 
      return {
        ...state,
        comments: payload
      }
    case ADD_NEW_POST:
      state.posts.push(payload)
      return state
    case REPLACE_ONE_POST: 
      let matchedPostToReplace = state.posts.find(post => post._id === payload._id)
      state.posts.splice(state.posts.indexOf(matchedPostToReplace), 1, payload)
      return state
    case REMOVE_ONE_POST: 
      let matchedPostToRemove = state.posts.find(post => post._id === payload) 
      state.posts.splice(state.posts.indexOf(matchedPostToRemove), 1)
      return state
    default:
      return state
  }
}

export default blogReducer

