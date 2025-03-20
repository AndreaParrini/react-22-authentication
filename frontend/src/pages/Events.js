import { Await, useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {
  const {events} = useLoaderData();

  /* if(data.isError){
    return <p>{data.message}</p>
  }
 */
  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents)=> <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents(){
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return {isError: true, message: "Could not fetch events."}
    throw new Response(JSON.stringify({message: 'Could not fetch events.'}), {
      status: 500
    })
   //throw json({message: 'Could not fetch events.'}, {status:500}) se si usa l'helper fornito da react router json() -> solo con versioni precedenti alla 7, ora ho installato la 7.30 e quindi non funziona
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader() {
  return{
    events: loadEvents()
  }
}