import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import InvoiceModal from './InvoiceModal';
import { Sidebar, Header } from './PageComponents';

import { RootState } from './store/store';
import { setInvoices } from './store/invoicesSlice';
import { setUserData, logout } from './store/authSlice';

import { fetchInvoices } from './utils/api';



function Invoices() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/" />; // Redirect to login page if not authenticated

  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="body-content">
          <InvoicesContent />
        </main>
      </div>
    </div>
  );

}


interface InvoiceProps {
  id: number;
  vendor_name: string;
  address: string;
  city: string;
  amount: number;
  paid: boolean;
}

const InvoicesContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<number | null>(null); // Store selected invoice for modal 
  const [currentPage, setCurrentPage] = useState(1);

  const invoiceCount = useSelector((state: RootState) => state.invoices.invoices.length); // Get the number of invoices for pagination
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userName = useSelector((state: RootState) => state.auth.name);


  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => { setCurrentPage(currentPage + 1); };

  useEffect(() => { // Reset to first page when invoiceCount 0 / no invoices
    if (invoiceCount === 0) setCurrentPage(1);
  }, [invoiceCount]);


  const token = useSelector((state: RootState) => state.auth.token);
  if (!token) return <Navigate to="/" />; // Redirect to login page if not authenticated or token is missing
  const { data, error, isLoading } = useQuery(['invoices', currentPage], () => fetchInvoices(currentPage, token), {
    onSuccess: (data) => {
      dispatch(setInvoices(data.invoices));
      // Set misc user data we get from the API that hitched a ride with the invoices \\ would make separate call in real world
      dispatch(setUserData({
        uid: data.user.uid,
        email: data.user.email,
        name: data.user.name,
      }));
    },
    onError: (error) => {
      console.error('Error fetching invoices:', error);
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          dispatch(logout());
          navigate('/');
        }
      }
    }
  });
  
  // Open modal
  const handleOpenInvoiceModal = (invoiceID: number) => {
    setSelectedInvoice(invoiceID);
    setIsModalOpen(true);
  }

  // Close modal
  const handleCloseInvoiceModal = () => {
    setIsModalOpen(false);
    setSelectedInvoice(null); // Clear the selected invoice when modal is closed
  }
  

  if (isLoading) return <div>Please wait...</div>;
  if (error) return <div>Error fetching invoices</div>;

  return (
    <main className="body-content">
      <h2>{userName}'s Invoices</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Vendor Name</th>
            <th>Adress</th>
            <th>City</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.invoices.map((invoice: InvoiceProps) => (
            <tr key={invoice.id} onClick={() => handleOpenInvoiceModal(invoice.id)}>
              <td>{invoice.id}</td>
              <td>{invoice.vendor_name}</td>
              <td>{invoice.address}</td>
              <td>{invoice.city}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.paid ? `✅ paid`: `❌ unpaid` } </td>
            </tr>
          ))}
        </tbody>
        <thead>
          <tr>
            <th>ID</th>
            <th>Vendor Name</th>
            <th>Adress</th>
            <th>City</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td colSpan={6}>
              <PaginationFooter
                currentPage={currentPage}
                onNext={handleNextPage}
                onPrev={handlePrevPage}
              />
            </td>
          </tr>
        </tfoot>
      </table>
      {isModalOpen && selectedInvoice && (
        <InvoiceModal isOpen={isModalOpen} onRequestClose={handleCloseInvoiceModal} invoiceID={selectedInvoice}  />
      )}      
    </main>
  );
};






interface PaginationFooterProps {
  currentPage: number;
  // totalPages: number; //Would implement in real world
  onNext: () => void;
  onPrev: () => void;
}

const PaginationFooter: React.FC<PaginationFooterProps> = ({ currentPage, /*totalPages,*/ onNext, onPrev }) => {
  return (
    <div className="pagination-footer">
      <button onClick={onPrev} disabled={currentPage === 1}>
        &lt;
      </button>
      <span>{`Page ${currentPage}`}</span>
      <button onClick={onNext} /*disabled={currentPage === totalPages}*/>
        &gt;
      </button>
    </div>
  );
};

export default Invoices;