import { 
  SET_SITE_TITLES,
  ADD_SITE_TITLE,
  REMOVE_SITE_TITLE,
  REPLACE_SITE_TITLE
} from "actions/types"

const initialState = {
  siteTitles: []
}

function siteTitleReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SITE_TITLES: 
      return {
        ...state,
        siteTitles: payload
      }
    case ADD_SITE_TITLE:
      state.siteTitles.push(payload)
      return state
    case REPLACE_SITE_TITLE: 
      let matchedSiteTitleToReplace = state.siteTitles.find(siteTitle => siteTitle._id === payload._id)
      state.siteTitles.splice(state.siteTitles.indexOf(matchedSiteTitleToReplace), 1, payload)
      return state
    case REMOVE_SITE_TITLE: 
      let matchedSiteTitleToRemove = state.siteTitles.find(siteTitle => siteTitle._id === payload) 
      state.siteTitles.splice(state.siteTitles.indexOf(matchedSiteTitleToRemove), 1)
      return state
    default:
      return state
  }
}

export default siteTitleReducer

