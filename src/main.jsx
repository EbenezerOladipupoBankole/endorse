import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { pdfjs } from 'react-pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'; // Vite specific import with .mjs extension

// Set the workerSrc to ensure react-pdf can find its worker file using Vite's asset handling.
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);