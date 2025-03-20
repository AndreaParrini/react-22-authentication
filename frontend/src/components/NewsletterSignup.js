import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
  const fetcher = useFetcher(); 
  // fetcher serve per usare un azione che appartiene ad un altra rotta senza essere reindirizzato a quella pagina là
  // in questo modo posso usare l'invio di questa newslettere in qualsiasi punto io mi trova
  const {state, data} = fetcher;

  useEffect(()=>{
    if(state === 'idle' && data && data.message){
        window.alert(data.message);
    }
  }, [state, data])

  return (
    <fetcher.Form method="post" action='/newsletter' className={classes.newsletter}>
      <input
        type="email"
        name='email'
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;