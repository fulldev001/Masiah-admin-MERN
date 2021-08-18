import { 
  SET_LOGOS,
  ADD_LOGO,
  REMOVE_LOGO,
  REPLACE_LOGO
} from "actions/types"

const initialState = {
  logos: []
}

function logoReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOGOS: 
      return {
        ...state,
        logos: payload
      }
    case ADD_LOGO:
      state.logos.push(payload)
      return state
    case REPLACE_LOGO: 
      let matchedLogoToReplace = state.logos.find(logo => logo._id === payload._id)
      state.logos.splice(state.logos.indexOf(matchedLogoToReplace), 1, payload)
      return state
    case REMOVE_LOGO: 
      let matchedLogoToRemove = state.logos.find(logo => logo._id === payload) 
      state.logos.splice(state.logos.indexOf(matchedLogoToRemove), 1)
      return state
    default:
      return state
  }
}

export default logoReducer

