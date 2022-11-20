import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/SpotsBrowser";
// import CreateSpotForm from "./components/CreateSpotForm/CreateFormSpots";
import SpotDetails from "./components/SpotDetail/SpotDetails";
// import currentUserSpots from "./components/CurrentSpots";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <AllSpots />
          </Route>
          <Route exact path='/spots/:spotId'>
            <SpotDetails />
          </Route>


        </Switch>

      )}
    </>
  );
}

export default App;
