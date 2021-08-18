import { 
  SET_POST_CATEGORIES,
  ADD_POST_CATEGORY,
  REMOVE_POST_CATEGORY,
  REPLACE_POST_CATEGORY
} from "actions/types"

const initialState = {
  postCategories: []
}

function postCategoryReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_POST_CATEGORIES: 
      console.log(payload)
      return {
        ...state,
        postCategories: payload
      }
    case ADD_POST_CATEGORY:
      state.postCategories.push(payload)
      return state
    case REPLACE_POST_CATEGORY: 
      let matchedpostCategoryToReplace = state.postCategories.find(postCategory => postCategory._id === payload._id)
      state.postCategories.splice(state.postCategories.indexOf(matchedpostCategoryToReplace), 1, payload)
      return state
    case REMOVE_POST_CATEGORY: 
      let matchedpostCategoryToRemove = state.postCategories.find(postCategory => postCategory._id === payload) 
      state.postCategories.splice(state.postCategories.indexOf(matchedpostCategoryToRemove), 1)
      return state
    default:
      return state
  }
}

export default postCategoryReducer

