import {Outlet} from 'react-router-dom'

import EventsNavigation from '../components/EventsNavigation'

function RootEventsLayout() {
    return (
    <>
        <EventsNavigation />
        <main>
           <Outlet /> 
        </main>
    </>
    )
}

export default RootEventsLayout;