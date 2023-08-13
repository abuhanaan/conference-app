const speakersReducer = (state, action) => {
  const updateFavorite = (favoriteValue) => {
    // state is currently the array of speakers
    return state.speakerList.map((item, index) => {
      if (item.id === action.id) {
        return { ...item, favorite: favoriteValue };
      }
      return item;
    });
  };

  switch (action.type) {
    case 'setSpeakerList': {
      return { ...state, speakerList: action.data, isLoading: false };
    }
    case 'favorite': {
      return { ...state, speakerList: updateFavorite(true) };
    }
    case 'unfavorite': {
      return { ...state, speakerList: updateFavorite(false) };
    }
    default:
      return state;
  }
};
export default speakersReducer;
