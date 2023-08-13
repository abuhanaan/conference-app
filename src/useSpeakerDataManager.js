import { useReducer, useEffect } from 'react';
import SpeakerData from './SpeakerData';
import speakersReducer from './speakersReducer';

const useSpeakerDataManager = () => {
  const [{ isLoading, speakerList }, dispatch] = useReducer(speakersReducer, {
    isLoading: true,
    speakerList: [],
  });

  useEffect(() => {
    new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, 1000);
    }).then(() => {});
    dispatch({
      type: 'setSpeakerList',
      data: SpeakerData,
    });
    // setSpeakerList(SpeakerData);

    // second function when component unmounts
    console.log('cleanup');
  }, []);

  return { isLoading, speakerList, dispatch };
};

export default useSpeakerDataManager;