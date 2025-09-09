import React from 'react';
import { useDashboard } from '../../context/dashBoardContext.jsx';
import Search from '../Search/Search.jsx';

const WidgetSidebar = () => {
  const { 
    isSidebarOpen, 
    setIsSidebarOpen, 
    allWidgets, 
    toggleWidget, 
    removeWidget,
    getWidgetCounts 
  } = useDashboard();

  const handleClose = () => {
    setIsSidebarOpen(false);
  };

  const handleToggleWidget = (categoryId, widgetId) => {
    toggleWidget(categoryId, widgetId);
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    if (window.confirm('Are you sure you want to permanently delete this widget?')) {
      removeWidget(categoryId, widgetId);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0  bg-opacity-50 z-40"
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Manage Widgets</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        
        <div className="h-full overflow-y-auto pb-20">
          <div className="p-6">
            <Search></Search>

            
            <div className="space-y-6">
              {allWidgets.categories.map(category => {
                const counts = getWidgetCounts(category.id);
                return (
                  <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-800">{category.name}</h3>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {counts.active}/{counts.total} active
                      </span>
                    </div>

                    {/* Widgets List */}
                    <div className="space-y-3">
                      {category.widgets.map(widget => (
                        <div key={widget.id} className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded">
                          {/* Checkbox */}
                          <input
                            type="checkbox"
                            id={widget.id}
                            checked={widget.isActive}
                            onChange={() => handleToggleWidget(category.id, widget.id)}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          
                          {/* Widget Info */}
                          <div className="flex-1 min-w-0">
                            <label 
                              htmlFor={widget.id}
                              className="block text-sm font-medium text-gray-800 cursor-pointer"
                            >
                              {widget.name}
                            </label>
                            <p className="text-xs text-gray-600 mt-1 truncate">
                              {widget.text}
                            </p>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleRemoveWidget(category.id, widget.id)}
                            className="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                            aria-label="Delete widget permanently"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}

                      {/* No widgets message */}
                      {category.widgets.length === 0 && (
                        <p className="text-sm text-gray-500 italic">No widgets in this category</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WidgetSidebar;