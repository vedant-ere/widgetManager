import React, { createContext, useContext, useState } from 'react';
import initialData from '../data/dashboardData.json';

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider');
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle widget visibility
  const toggleWidget = (categoryId, widgetId) => {
    setDashboardData(prev => ({
      ...prev,
      categories: prev.categories.map(category =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.map(widget =>
                widget.id === widgetId
                  ? { ...widget, isActive: !widget.isActive }
                  : widget
              )
            }
          : category
      )
    }));
  };

  // Add widget to a category
  const addWidget = (categoryId, widget) => {
    const newWidget = {
      ...widget,
      id: `widget-${Date.now()}`,
      isActive: true // New widgets are active by default
    };

    setDashboardData(prev => ({
      ...prev,
      categories: prev.categories.map(category =>
        category.id === categoryId
          ? { ...category, widgets: [...category.widgets, newWidget] }
          : category
      )
    }));
  };

  // Remove widget completely (delete from data)
  const removeWidget = (categoryId, widgetId) => {
    setDashboardData(prev => ({
      ...prev,
      categories: prev.categories.map(category =>
        category.id === categoryId
          ? { 
              ...category, 
              widgets: category.widgets.filter(widget => widget.id !== widgetId) 
            }
          : category
      )
    }));
  };

  // Get only active widgets for main dashboard
  const getActiveWidgets = () => {
    if (!searchTerm) {
      return {
        ...dashboardData,
        categories: dashboardData.categories.map(category => ({
          ...category,
          widgets: category.widgets.filter(widget => widget.isActive)
        }))
      };
    }

    // Search within active widgets
    return {
      ...dashboardData,
      categories: dashboardData.categories.map(category => ({
        ...category,
        widgets: category.widgets.filter(widget => 
          widget.isActive && (
            widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            widget.text.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      }))
    };
  };

  // Get all widgets (for sidebar)
  const getAllWidgets = () => {
    return dashboardData;
  };

  // Get widget count per category
  const getWidgetCounts = (categoryId) => {
    const category = dashboardData.categories.find(cat => cat.id === categoryId);
    if (!category) return { active: 0, total: 0 };
    
    const active = category.widgets.filter(widget => widget.isActive).length;
    const total = category.widgets.length;
    return { active, total };
  };

  const value = {
    dashboardData: getActiveWidgets(),
    allWidgets: getAllWidgets(),
    searchTerm,
    setSearchTerm,
    isSidebarOpen,
    setIsSidebarOpen,
    addWidget,
    removeWidget,
    toggleWidget,
    getWidgetCounts
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};