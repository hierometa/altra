import Modal from 'react-modal';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

import { RootState } from './store/store';
import { setCurrentInvoice } from './store/invoicesSlice';
import { logout } from './store/authSlice';

import { fetchInvoice } from './utils/api';


interface InvoiceModalProps {
    isOpen: boolean
    onRequestClose: () => void;
    invoiceID: number;
}

const InvoiceModal: React.FC<InvoiceModalProps> = ({ isOpen, onRequestClose, invoiceID }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.auth.token) || '';

  const { data, isLoading } = useQuery(['invoice', invoiceID], () => fetchInvoice(invoiceID, token), {
    onSuccess: (data) => {
      // console.log('Invoice ONE fetched:', data);
      dispatch(setCurrentInvoice(data));
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

  const formatDate = (isoDateString: string): string => {
    return new Date(isoDateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const InvoiceModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)', 
    },
  };

  if (isLoading || !data) return <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={InvoiceModalStyles}><h2>Loading...</h2></Modal>;
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={InvoiceModalStyles}>
        <div className="invoice-modal-container">
          <h2 className="invoice-modal-header">Invoice Details</h2>
          <table className="invoice-modal-table">
            <tbody>
              <tr>
                <th>Invoice #:</th>
                <td>{data.id}</td>
              </tr>
              <tr>
                <th>Due:</th>
                <td>{formatDate(data.due_date)}</td>
              </tr>
              <tr>
                <th>Vendor Name:</th>
                <td>{data.vendor_name}</td>
              </tr>
              <tr>
                <th>Description:</th>
                <td>{data.description}</td>
              </tr>
              <tr>
                <th>Address:</th>
                <td>{data.address}</td>
              </tr>
              <tr>
                <th>City:</th>
                <td>{data.city}</td>
              </tr>
              <tr>
                <th>Amount:</th>
                <td>${data.amount.toFixed(2)}</td>
              </tr>
              <tr>
                <th>Status:</th>
                <td>{data.paid ? `✅ Paid` : `❌ Unpaid`}</td>
              </tr>

            </tbody>
          </table>
          <h2 className="invoice-modal-header">
            <button onClick={onRequestClose} className=''>Close</button>
          </h2>
        </div>
    </Modal>
  );
};

export default InvoiceModal;



