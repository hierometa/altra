import { useSelector } from 'react-redux';
import { Sidebar, Header } from './PageComponents';
import { RootState } from './store/store'; 

function InvoiceHome() {

  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="body-content">
          <HomeContent />
        </main>
      </div>
    </div>
  );

}

function HomeContent() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userName = useSelector((state: RootState) => state.auth.name);
  const email = useSelector((state: RootState) => state.auth.email);

  return (
    <div>
      <h2>Welcome to the Invoice Viewer</h2>
      <p style={{textAlign: 'center'}}>{isAuthenticated && userName ? `Hi ${userName} (${email})!  Please use the navigation to view your invoices.` : `Log in to view your invoices.`}</p>
    </div>
  );
}

export default InvoiceHome;