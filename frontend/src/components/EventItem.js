import classes from './EventItem.module.css';

import {Link, useSubmit} from 'react-router-dom';

function EventItem({ event }) {

  const submit =  useSubmit()

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure ?');

    if(proceed){
      submit(null, {method: 'delete'}); // il primo valore da mandare sono i dati che si vogliono inviare al backend, in questo caso null in quanto si elimina un record
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
