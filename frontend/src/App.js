import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/SpotsBrowser";


import SpotDetails from "./components/SpotDetail/SpotDetails";
import CreateSpotForm from "./components/CreateSpotForm/CreateFormSpots";
import EditFormSpot from "./components/EditForm/EditFormSpot";
import CreateReview from "./components/CreateReviewForm/CreateReview";




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
          <Route path='/spots/:spotId'>
            <SpotDetails />
          </Route>
          <Route exact path='/'>
            <AllSpots />
          </Route>
          <Route exact path='/spots/new'>
            <CreateSpotForm />
          </Route>
          <Route exact path='/spots/:spotId/edit'>
            <EditFormSpot />
          </Route>
          <Route exact path='/spots/:spotId/create-review'>
            <CreateReview />
          </Route>




        </Switch>

      )}
    </>
  );
}

export default App;
