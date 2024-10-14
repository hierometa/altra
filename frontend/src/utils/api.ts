import axios from 'axios';
import { z } from 'zod';

const apiURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/*** LOGIN/GET TOKEN ***/
interface LoginCredentials {
  email: string;
  password: string;
}
// Try to login with the provided credentials || Returns JWT
export const tryLogin = async (credentials: LoginCredentials): Promise<string> => {
  const { data } = await axios.post<string>(
    `${apiURL}/auth`,
    credentials,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json', // Explicitly tell Axios you're sending JSON
      },
    }
  );
  return data; // Returns the JWT
};


/*** INVOICE LIST BY PAGE ***/
const invoiceSchema = z.object({
  id: z.number(),
  vendor_name: z.string(),
  address: z.string(),
  city: z.string(),
  amount: z.number(),
  paid: z.boolean(),
});

const userSchema = z.object({
  uid: z.number(),
  email: z.string(),
  name: z.string(),
});

const invoicesResponseSchema = z.object({
  invoices: z.array(invoiceSchema),
  user: userSchema, // user is a single object, not an array
});

// Fetch Users Invoices by Page || Also Include Misc User Info
export const fetchInvoices = async (page: number, token: string) => {
  const response = await axios.get(`${apiURL}/invoices?page=${page}`, {
    headers: { Authorization: `Bearer ${token}`,},
  });
  try {
    const validatedData = invoicesResponseSchema.parse(response.data); // Throws error if validation fails
    return validatedData;
  } catch (error) {
    console.error("Validation error:", error);
    throw new Error("Invalid API response format");
  }
};


/*** SINGLE INVOICE ***/
const singleInvoiceSchema = z.object({
  id: z.number(),
  vendor_name: z.string(),
  address: z.string(),
  city: z.string(),
  amount: z.number(),
  description: z.string(),
  user_id: z.number(), 
  due_date: z.string(),
  paid: z.boolean(),
});
const invoiceResponseSchema = singleInvoiceSchema;

// Fetch Single Invoice 
export const fetchInvoice = async (id: number, token: string) => {
  const response = await axios.get(`${apiURL}/invoices/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  try {
    const validatedData = invoiceResponseSchema.parse(response.data); // Throws error if validation fails
    return validatedData;
  } catch (error) {
    console.error("Validation error:", error);
    throw new Error("Invalid API response format");
  }
};