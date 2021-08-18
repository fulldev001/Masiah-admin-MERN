import { 
  SET_FOOTER_CONTENTS,
  ADD_FOOTER_CONTENT,
  REMOVE_FOOTER_CONTENT,
  REPLACE_FOOTER_CONTENT
} from "actions/types"

const initialState = {
  footerContents: []
}

function footerContentReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_FOOTER_CONTENTS: 
      return {
        ...state,
        footerContents: payload
      }
    case ADD_FOOTER_CONTENT:
      state.footerContents.push(payload)
      return state
    case REPLACE_FOOTER_CONTENT: 
      let matchedfooterContentToReplace = state.footerContents.find(footerContent => footerContent._id === payload._id)
      state.footerContents.splice(state.footerContents.indexOf(matchedfooterContentToReplace), 1, payload)
      return state
    case REMOVE_FOOTER_CONTENT: 
      let matchedfooterContentToRemove = state.footerContents.find(footerContent => footerContent._id === payload) 
      state.footerContents.splice(state.footerContents.indexOf(matchedfooterContentToRemove), 1)
      return state
    default:
      return state
  }
}

export default footerContentReducer

