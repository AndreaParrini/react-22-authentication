import { Await, redirect, useRouteLoaderData } from "react-router-dom";

import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";
import { getAuthToken } from "../utils/auth";

function EventDetailPage(){
    const {event, events} = useRouteLoaderData('event-detail');

    return (
        <>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
                <Await resolve={event}>
                    {(loadedEvent) => <EventItem event={loadedEvent}/>}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
                <Await resolve={events}>
                    {(loadedEvents) =>  <EventsList events={loadedEvents}/>}
                </Await>
            </Suspense>
        </>
    
    )
}

export default EventDetailPage;

async function loadEvent(id){
    const response = await fetch('http://localhost:8080/events/' + id);

    if(!response.ok){
        throw Response(JSON.stringify({message: 'Could not fetch details for selected events.'}), {
            status: 500
        })
    }else{
        const resData = await response.json();
        return resData.event;
    }
}

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

export async function loader({request, params}){
    const id = params.eventId;

    return {
        event : await loadEvent(id),
        events: loadEvents()
    }
}

export async function action({request, params}){
    const eventId = params.eventId;
    const token = getAuthToken();
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method,
        headers:{
            'Authorization': 'Bearer ' + token
        }
    });

    if(!response.ok){
        throw Response(JSON.stringify({message: 'Could not delte event.'}), {
            status: 500
        })
    }

    return redirect('/events');
}