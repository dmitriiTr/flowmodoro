import App from './App.tsx';
import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { TasksContextProvider } from './TasksContextProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TasksContextProvider>
      <CssBaseline />
      <App />
    </TasksContextProvider>
  </React.StrictMode>
);
