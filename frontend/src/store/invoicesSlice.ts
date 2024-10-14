import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InvoiceState {
  invoices: any[];
  loading: boolean;
  currentInvoice: any;
}

const initialState: InvoiceState = {
  invoices: [],
  loading: false,
  currentInvoice: null,
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {
    setInvoices: (state, action: PayloadAction<any[]>) => {
      state.invoices = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCurrentInvoice: (state, action: PayloadAction<any>) => {
      state.currentInvoice = action.payload;
    },
  },
});

export const { setInvoices, setLoading, setCurrentInvoice } = invoicesSlice.actions;
export default invoicesSlice.reducer;