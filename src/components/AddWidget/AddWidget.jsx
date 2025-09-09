import React, { useState } from 'react';
import { useDashboard } from '../../context/dashBoardContext.jsx';

const AddWidget = ({ categoryId, categoryName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [widgetType, setWidgetType] = useState('text');
  const { addWidget } = useDashboard();

  const chartTypes = [
    { value: 'text', label: 'Text Only' },
    { value: 'pie', label: 'Pie Chart' },
    { value: 'donut', label: 'Donut Chart' },
    { value: 'bar', label: 'Bar Chart' },
    { value: 'line', label: 'Line Chart' },
    { value: 'area', label: 'Area Chart' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (widgetName.trim() && widgetText.trim()) {
      // Generate sample data based on chart type
      const generateSampleData = (type) => {
        switch (type) {
          case 'pie':
          case 'donut':
            return [
              { name: 'Category A', value: 30, color: '#3B82F6' },
              { name: 'Category B', value: 70, color: '#EF4444' }
            ];
          case 'bar':
            return [
              { name: 'Item A', value: 30 },
              { name: 'Item B', value: 70 }
            ];
          case 'line':
          case 'area':
            return [
              { name: 'Jan', Series1: 30, Series2: 20 },
              { name: 'Feb', Series1: 45, Series2: 35 },
              { name: 'Mar', Series1: 60, Series2: 50 }
            ];
          default:
            return null;
        }
      };

      addWidget(categoryId, {
        name: widgetName.trim(),
        text: widgetText.trim(),
        type: widgetType,
        chartData: generateSampleData(widgetType)
      });
      
      // Reset form
      setWidgetName('');
      setWidgetText('');
      setWidgetType('text');
      setIsModalOpen(false);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setWidgetName('');
    setWidgetText('');
    setWidgetType('text');
  };

  return (
    <>
      {/* Add Widget Button */}
      <div className="border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center min-h-[200px] hover:border-gray-400 transition-colors">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-gray-500 hover:text-gray-700 flex flex-col items-center"
        >
          <span className="text-2xl mb-2">+</span>
          <span className="text-sm">Add Widget</span>
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">
              Add Widget to {categoryName}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Widget Name
                </label>
                <input
                  type="text"
                  value={widgetName}
                  onChange={(e) => setWidgetName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter widget name"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Widget Text
                </label>
                <textarea
                  value={widgetText}
                  onChange={(e) => setWidgetText(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  placeholder="Enter widget content"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Chart Type
                </label>
                <select
                  value={widgetType}
                  onChange={(e) => setWidgetType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {chartTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Add Widget
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddWidget;