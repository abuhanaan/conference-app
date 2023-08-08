const speakersReducer = (state, action) => {
  const updateFavorite = (favoriteValue) => {
    // state is currently the array of speakers
    return state.map((item, index) => {
      if (item.id === action.sessionId) {
        return { ...item, favorite: favoriteValue };
      }
      return item;
    });
  };

  switch (action.type) {
    case 'setSpeakerList': {
      return action.data;
    }
    case 'favorite': {
      return updateFavorite(true);
    }
    case 'unfavorite': {
      return updateFavorite(false);
    }
    default:
      return state;
  }
};
export default speakersReducer;
