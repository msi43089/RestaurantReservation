import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import ListReservations from "../reservations/ListReservations";
import { next, previous } from "../utils/date-time";
import { useHistory} from "react-router-dom";
import ListTables from "../tables/ListTables";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  //uses the date param from the URL if there is one
  const dateQuery = useQuery().get("date");
  if (dateQuery) {
    date = dateQuery;
  }

  const history = useHistory()

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  function handlePrevious(){
      const previousDate = previous(date)
      history.push(`/dashboard?date=${previousDate}`)
  }

  function handleNext(){
    const nextDate = next(date)
    history.push(`/dashboard?date=${nextDate}`)
  }

 

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for {date}</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div className="d-flex justify-content-between mb-2">
        <button type="button" className="btn btn-outline-secondary" onClick={(handlePrevious)}>Previous</button>
        <button type="button" className="btn btn-outline-secondary" onClick={handleNext}>Next</button>
      </div>
      <ListReservations reservations={reservations} />
      <ListTables />

    </main>
  );
}

export default Dashboard;
