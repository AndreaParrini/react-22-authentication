import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';
import PageContent from '../components/PageContent'

function ErrorPage(){

    const error = useRouteError();

    let title='An error occurred';
    let message = 'Something went wrong';

    if(error.status === 500){
        message= JSON.parse(error.data).message;
        //message= error.data.message; se si usa l'helper fornito da reract router json -> solo con versioni precedenti alla 7, ora ho installato la 7.30 e quindi non funziona
    }

    if(error.status === 404){
        title= 'Not Found!';
        message= 'Could not finde resource or page.'
    }

    return <>
    <MainNavigation />
    <PageContent title={title}>
        <p>{message}</p>
    </PageContent>
    </>
    
}

export default ErrorPage;