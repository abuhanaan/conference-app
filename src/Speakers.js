import React, {
  useEffect,
  useState,
  useContext,
  useReducer,
  useCallback,
  useMemo,
} from 'react';
import { Header } from './Header';
import { Menu } from './Menu';
import SpeakerData from './SpeakerData';
import SpeakerDetail from './SpeakerDetail';
import { ConfigContext } from './App';
import speakersReducer from './speakersReducer';

const Speakers = () => {
  // const [isLoading, setIsLoading] = useState(true);

  const [isLoading, setIsLoading] = useReducer((state, action) => action, true);

  // const [speakerList, setSpeakerList] = useState([]);

  const [speakerList, dispatch] = useReducer(speakersReducer, []);

  const [speakingSaturday, setSpeakingSaturday] = useState(true);
  const [speakingSunday, setSpeakingSunday] = useState(true);

  const context = useContext(ConfigContext);

  useEffect(() => {
    setIsLoading(true);
    new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, 1000);
    }).then(() => {
      setIsLoading(false);
    });
    dispatch({
      type: 'setSpeakerList',
      data: SpeakerData,
    });
    // setSpeakerList(SpeakerData);

    // second function when component unmounts
    console.log('cleanup');
  }, []);

  const heartFavoriteHandler = useCallback((e, favoriteValue) => {
    e.preventDefault();
    const sessionId = parseInt(e.target.attributes['data-sessionid'].value);

    dispatch({
      type: favoriteValue === true ? 'favorite' : 'unfavorite',
      sessionId: sessionId,
    });
  }, []);

  const newSpeakerList = useMemo(
    () =>
      speakerList
        .filter(
          ({ sat, sun }) =>
            (speakingSaturday && sat) || (speakingSunday && sun),
        )
        .sort(function (a, b) {
          if (a.firstName < b.firstName) {
            return -1;
          }
          if (a.firstName > b.firstName) {
            return 1;
          }
          return 0;
        }),
    [speakingSaturday, speakingSunday, speakerList],
  );

  const speakerListFiltered = isLoading ? [] : newSpeakerList;

  const handleChangeSaturday = () => {
    setSpeakingSaturday(!speakingSaturday);
  };

  const handleChangeSunday = () => {
    setSpeakingSunday(!speakingSunday);
  };

  if (isLoading) return <div>Looading...</div>;
  return (
    <>
      <Header />
      <Menu />
      <div className="container">
        <div className="btn-toolbar margintopbottom5 checkbox-bigger">
          {context.showSpeakerSpeakingDays === false ? null : (
            <div className="hide">
              <div className="form-check-inline">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleChangeSaturday}
                    checked={speakingSaturday}
                  />
                  Saturday Speakers
                </label>
              </div>
              <div className="form-check-inline">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    onChange={handleChangeSunday}
                    checked={speakingSunday}
                  />
                  Sunday Speakers
                </label>
              </div>
            </div>
          )}
        </div>
        <div className="row">
          <div className="card-deck">
            {speakerListFiltered.map(
              ({ id, firstName, lastName, favorite, bio }) => {
                return (
                  <SpeakerDetail
                    key={id}
                    id={id}
                    favorite={favorite}
                    lastName={lastName}
                    bio={bio}
                    onHeartFavoriteHandler={heartFavoriteHandler}
                    firstName={firstName}
                  />
                );
              },
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Speakers;
