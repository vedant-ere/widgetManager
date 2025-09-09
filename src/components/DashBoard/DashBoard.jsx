import React from 'react';
import { useDashboard } from '../../context/dashBoardContext.jsx';
import Widget from '../Widget/Widget.jsx';
import AddWidget from '../AddWidget/AddWidget.jsx';
import Search from '../Search/Search.jsx';
import WidgetSidebar from '../WidgetSideBar/WidgetSidebar.jsx';

const Dashboard = () => {
  const { dashboardData, setIsSidebarOpen } = useDashboard();

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Dashboard Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your widgets and categories</p>
        </div>
        
        {/* Manage Widgets Button */}
        <button
          onClick={handleOpenSidebar}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </svg>
          Manage Widgets
        </button>
      </div>

      {/* Search */}
      <Search />

      {/* Categories Container */}
      <div className="space-y-8">
        {dashboardData.categories.map(category => (
          <div key={category.id} className="bg-white rounded-lg shadow-md p-6">
            {/* Category Header */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {category.name}
            </h2>
            
            {/* Show message if no active widgets */}
            {category.widgets.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m13-8h.01M6 8h.01" />
                </svg>
                <p className="text-lg mb-2">No active widgets in this category</p>
                <p className="text-sm">Click "Manage Widgets" to activate widgets or add new ones</p>
              </div>
            ) : (
              /* Widgets Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.widgets.map(widget => (
                  <Widget 
                    key={widget.id} 
                    widget={widget} 
                    categoryId={category.id}
                  />
                ))}
                
                {/* Add Widget Button */}
                <AddWidget 
                  categoryId={category.id}
                  categoryName={category.name}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Widget Management Sidebar */}
      <WidgetSidebar />
    </div>
  );
};

export default Dashboard;