import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { cacheExchange, createClient, fetchExchange, Provider } from 'urql';
import App from './App.tsx';
import './index.css';

 const client = createClient({
      url: 'http://localhost:4000/gql',
      exchanges: [cacheExchange, fetchExchange],
    });
    
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider value={client}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </StrictMode>
);
