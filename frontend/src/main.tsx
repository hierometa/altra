// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './modal.css'
import { store } from './store/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
     <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
     </Provider>,
);
//REMOVING STRICT MODE
// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//      <Provider store={store}>
//         <QueryClientProvider client={queryClient}>
//           <App />
//         </QueryClientProvider>
//      </Provider>,
//   </StrictMode>,
// );
