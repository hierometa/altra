import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvoiceHome from './InvoiceHome';
import Invoices from './Invoices';
import PrivateRoute from './PrivateRoute';
import Modal from 'react-modal'; 

Modal.setAppElement('#root');

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InvoiceHome />} />
        <Route path="*" element={<InvoiceHome />} />
        <Route
          path="/invoices"
          element={
            <PrivateRoute>
              <Invoices />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;