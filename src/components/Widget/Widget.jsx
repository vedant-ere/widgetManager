import React from 'react';
import ChartRenderer from '../Charts/ChartRender.jsx';

const Widget = ({ widget }) => {
  const hasChart = widget.chartData && widget.type !== 'text';

  return (
    <div className="border border-gray-200 rounded-md p-4 bg-white hover:shadow-md transition-shadow">
      {/* Widget Header */}
      <div className="mb-3">
        <h3 className="font-medium text-gray-800 mb-1">{widget.name}</h3>
        <p className="text-xs text-gray-600">{widget.text}</p>
      </div>

      {/* Chart or Text Content */}
      <div className="min-h-[150px] flex items-center justify-center">
        {hasChart ? (
          <ChartRenderer 
            type={widget.type} 
            data={widget.chartData} 
            height={150}
          />
        ) : (
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-sm">No chart data available</p>
          </div>
        )}
      </div>

      {/* Status Indicator */}
      <div className="mt-3 flex justify-between items-center">
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
          Active
        </span>
        {hasChart && (
          <span className="text-xs text-gray-500 capitalize">
            {widget.type} chart
          </span>
        )}
      </div>
    </div>
  );
};

export default Widget;