import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
  
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0 transition-all duration-300">
  
        <Header toggleSidebar={toggleSidebar} />

  
        <main className="flex-grow p-6 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
