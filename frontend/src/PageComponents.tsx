import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginModal from './LoginModal'; // Modal Component
import { RootState } from './store/store'; // Import your store's RootState
import { logout } from './store/authSlice';


export const Sidebar: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userName = useSelector((state: RootState) => state.auth.name);

  return (
    <aside className="sidebar">
      <div className="logo"  style={{}}>
        <div style={{}}>
          <svg
            width="65"
            height="65"
            viewBox="0 0 120 120"
            style={{
              fill: 'none',
              stroke: 'none',
              fillRule: 'evenodd',
              clipRule: 'evenodd',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeMiterlimit: 1.5,
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="items" style={{ isolation: 'isolate' }}>
              <g id="blend" style={{ mixBlendMode: 'screen' }}>
                <g
                  id="g-root-moni_13zw8xzriadjg-fill"
                  data-item-order="0"
                  data-item-id="moni_13zw8xzriadjg"
                  data-item-class="Icon Stroke"
                  data-item-index="none"
                  data-renderer-id="0"
                  transform="translate(3, 3)"
                ></g>
                <g
                  id="g-root-moni_13zw8xzriadjg-stroke"
                  data-item-order="0"
                  data-item-id="moni_13zw8xzriadjg"
                  data-item-class="Icon Stroke"
                  data-item-index="none"
                  data-renderer-id="0"
                  transform="translate(3, 3)"
                >
                  <g
                    id="moni_13zw8xzriadjg-stroke"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="4"
                    stroke="#A3A3A3"
                    strokeWidth="2"
                  >
                    <g>
                      <path d="M 57.019585 84.025002C 57.361149 90.461845 59.43568 96.68679 63.023834 102.041672L 39.002918 102.041672C 42.591072 96.68679 44.665607 90.461845 45.007172 84.025009M 29.994583 102.041672L 72.032166 102.041672M 90.048836 66.008339L 90.048836 78.001167C 90.054039 79.596985 89.423752 81.129227 88.297173 82.259476C 87.170586 83.389732 85.640411 84.025017 84.044586 84.025002L 17.982168 84.025002C 14.667006 84.022842 11.980078 81.335907 11.977917 78.020752L 11.977917 29.975C 11.977917 26.658945 14.666111 23.970751 17.982168 23.970751L 38.062916 23.970751M 53.976337 11.958333L 98.019249 11.958333C 98.019249 11.958333 102.022079 11.958333 102.022079 15.961166L 102.022079 51.994503C 102.022079 51.994503 102.022079 55.997337 98.019249 55.997337L 53.976337 55.997337C 53.976337 55.997337 49.973503 55.997337 49.973503 51.994503L 49.973503 15.961166C 49.973503 15.961166 49.973503 11.958333 53.976337 11.958333M 49.973503 22.960251L 102.022087 22.960251M 49.973503 44.642918L 102.022087 44.642918M 49.973503 34.322502L 102.022087 34.322502M 75.995834 22.964167L 75.995834 56.001251M 88.529167 22.964167L 88.529167 56.001251"></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </div>
      </div>
      <nav className="menu" style={{}}>
        <ul>
          <li><a href="/">Home</a></li>
          {isAuthenticated ? (
           <li><a href="/invoices">View {userName} Invoices</a></li>
          ) : (
            <li><a href="#" style={{pointerEvents: 'none', opacity: '25%'}}>View Invoices</a></li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  // Function to open modal
  const handleOpenLoginModal = () => setIsModalOpen(true);

  // Function to close modal
  const handleCloseLoginModal = () => setIsModalOpen(false);

  const dispatch = useDispatch();
  // Logout handler
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to clear token and authentication state
  };

  return (
    <header className="header">
      <div className="left-header">
        <h1>Invoice Viewer</h1>
      </div>
      <div className="right-header">
        {isAuthenticated ? (
          <button onClick={handleLogout}>LOGOUT</button>
        ) : (
          <button onClick={handleOpenLoginModal}>LOGIN</button>
        )}
      </div>

      {isModalOpen && (
        <LoginModal isOpen={isModalOpen} onRequestClose={handleCloseLoginModal} />
      )}
    </header>
  );
};

//TEMPORARY: Main content component
export const MainContent: React.FC = () => {
  return (
    <main className="body-content">
      <table className="table">
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
            <th>Column 5</th>
            <th>Column 6</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Data 1</td>
            <td>Data 2</td>
            <td>Data 3</td>
            <td>Data 4</td>
            <td>Data 5</td>
            <td>Data 6</td>
          </tr>
          <tr>
            <td>Data 7</td>
            <td>Data 8</td>
            <td>Data 9</td>
            <td>Data 10</td>
            <td>Data 11</td>
            <td>Data 12</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};
