Object.defineProperty(document, 'forms', {
  value: {
    detailedReportForm: {
      elements: [{
        nodeName: 'INPUT',
        type: 'date',
        name: 'fromDate',
        value: '01/13/2019',
      },
      {
        nodeName: 'INPUT',
        type: 'date',
        name: 'toDate',
        value: '01/15/2019',
      },
      {
        nodeName: 'INPUT',
        type: 'radio',
        name: 'dateType',
        value: 'submitted',
      },
      {
        nodeName: 'INPUT',
        type: 'radio',
        name: 'dateType',
        value: 'processed',
      }],
    },
    invalidDetailedReportForm: {
      elements: [{
        nodeName: 'INPUT',
        type: 'date',
        name: 'fromDate',
        value: '',
      },
      {
        nodeName: 'INPUT',
        type: 'date',
        name: 'toDate',
        value: '',
      },
      {
        nodeName: 'INPUT',
        type: 'radio',
        name: 'dateType',
        value: 'submitted',
      },
      {
        nodeName: 'INPUT',
        type: 'radio',
        name: 'dateType',
        value: 'processed',
      }],
    },
  },
});
