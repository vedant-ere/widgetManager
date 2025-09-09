export const initialDashboardData = {
  categories: [
    {
      id: 'cspm-executive',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'widget-1',
          name: 'Cloud Accounts',
          text: 'Connected (2), Not Connected (2)'
        },
        {
          id: 'widget-2', 
          name: 'Cloud Account Risk Assessment',
          text: 'Failed (1689), Warning (681), Not Available (36), Passed (7253)'
        }
      ]
    },
    {
      id: 'cwpp-dashboard',
      name: 'CWPP Dashboard', 
      widgets: [
        {
          id: 'widget-3',
          name: 'Top 5 Namespace Specific Alerts',
          text: 'No Graph data available!'
        }
      ]
    }
  ]
};