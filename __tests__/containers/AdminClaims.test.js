import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import AdminClaimsCont, { AdminClaimsContainer } from '../../containers/adminClaims';
import { history } from '../../routes';
import { fakeStore } from '../../config/jest/fakeStore';


configure({ adapter: new Adapter() });

history.push = jest.fn();
jest.useFakeTimers();
describe('AdminClaimsContainer with claims', () => {
  const getClaims = jest.fn();
  const clearClaimsError = jest.fn();
  const updateDownloadFlag = jest.fn();
  const getDetailedReport = jest.fn();
  const props = {
    isLoading: false,
    totalRecords: 100,
    claims: {
      1: [{
        claimId: '1234',
        contractorAccountId: '123456',
        submittedOn: 1234567890,
        modifiedOn: 1234567890,
        fileName: 'sample.pdf',
        contractorName: 'John Doe',
      },
      {
        claimId: '1234',
        contractorAccountId: '123456',
        submittedOn: 1234567890,
        modifiedOn: 1234567890,
      }],
    },
    claimsActions: {
      getClaims,
      clearClaimsError,
      updateDownloadFlag,
      getDetailedReport,
    },
    isDownload: true,
  };
  const event = {
    preventDefault: jest.fn(),
  };
  const tree = shallow(<AdminClaimsContainer
    {...props}
  />);
  it('should be defined', () => {
    expect(AdminClaimsContainer).toBeDefined();
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('should render Admin Claims container', () => {
    expect(tree.find('.main-content').length).toBe(1);
  });

  it('should render Title block', () => {
    expect(tree.find('.gaf-title-block').length).toBe(1);
  });

  it('should render Table\'s sub title', () => {
    expect(tree.find('.gaf-table-header').length).toBe(1);
  });

  it('should render Tables', () => {
    expect(tree.find('Tables').length).toBe(1);
  });

  it('should call sortingHandler for asc', () => {
    const simulateClick = tree.find('Tables').prop('onSortingClick');
    simulateClick('modifiedDate', true);
    expect(tree.state().sortBy).toBe('modifiedDate');
    expect(tree.state().sortOrder).toBe('asc');
  });

  it('should call sortingHandler for desc', () => {
    const simulateClick = tree.find('Tables').prop('onSortingClick');
    simulateClick('claimId');
    expect(tree.state().sortBy).toBe('claimId');
    expect(tree.state().sortOrder).toBe('desc');
  });

  it('should redirect to Claim Details', () => {
    const simulateClick = tree.find('Tables').prop('data')[0].details.props.onClick;
    simulateClick(event);
    expect(history.push).toBeCalled();
  });

  it('should render ErrorNotification', () => {
    expect(tree.find('ErrorNotification').length).toBe(1);
  });

  it('should call clearHandler', () => {
    const simulateClick = tree.find('ErrorNotification').prop('onClear');
    simulateClick(event);
    expect(clearClaimsError).toBeCalled();
  });

  it('should render ShowBy Component', () => {
    expect(tree.find('ShowBy').length).toBe(1);
  });

  it('should call onShowPerPageChange', () => {
    const simulateClick = tree.find('ShowBy').prop('onChange');
    simulateClick(25);
    expect(tree.state().showPerPage).toBe(25);
  });

  it('should render Pagination Component', () => {
    expect(tree.find('Pagination').length).toBe(1);
  });

  it('should call onShowPerPageChange with next value', () => {
    const simulateClick = tree.find('Pagination').prop('pageClick');
    simulateClick(2, 'next');
    expect(tree.state().pageNumber).toBe(2);
  });

  it('should call onShowPerPageChange with next value and data is already there', () => {
    const simulateClick = tree.find('Pagination').prop('pageClick');
    simulateClick(1, 'next');
    expect(tree.state().pageNumber).toBe(1);
  });

  it('should call onShowPerPageChange with prev value and data is already there', () => {
    const simulateClick = tree.find('Pagination').prop('pageClick');
    simulateClick(2, 'prev');
    expect(tree.state().pageNumber).toBe(2);
  });

  it('should call onShowPerPageChange with prev value and data is already there', () => {
    const simulateClick = tree.find('Pagination').prop('pageClick');
    simulateClick(1, 'prev');
    expect(tree.state().pageNumber).toBe(1);
  });

  it('should call onShowPerPageChange with last value', () => {
    const simulateClick = tree.find('Pagination').prop('pageClick');
    simulateClick(4, 'last');
    expect(tree.state().pageNumber).toBe(4);
  });

  it('should call onShowPerPageChange with default case', () => {
    const simulateClick = tree.find('Pagination').prop('pageClick');
    simulateClick(4);
    expect(tree.state().pageNumber).toBe(4);
  });

  it('should call onShowPerPageChange with first value', () => {
    const simulateClick = tree.find('Pagination').prop('pageClick');
    simulateClick(1, 'first');
    expect(getClaims).toBeCalled();
  });

  it('should not render Loader', () => {
    expect(tree.find('Loader').length).toBe(0);
  });

  it('should render DetailedReportLink', () => {
    expect(tree.find('DetailedReportLink').length).toBe(1);
  });

  it('should call openDetailedReportDialog', () => {
    const simulateClick = tree.find('DetailedReportLink').prop('onDetailedReportClick');
    simulateClick(event);
    expect(tree.state().showDetailedReport).toBe(true);
  });

  it('should render DetailedReportPopup', () => {
    expect(tree.find('DetailedReportPopup').length).toBe(1);
  });

  it('should call openDetailedReportDialog', () => {
    const simulateClick = tree.find('DetailedReportPopup').prop('onClosePopup');
    simulateClick(event);
    expect(tree.state().showDetailedReport).toBe(false);
  });

  it('should call generateDetailReportHandler', () => {
    const simulateClick = tree.find('DetailedReportPopup').prop('onGenerateExcel');
    simulateClick({});
    expect(getDetailedReport).toBeCalled();
  });

  it('should call ComponentDidUpdate', () => {
    const instance = tree.instance();
    instance.componentDidUpdate({
      isLoading: true,
      isDownload: false,
    });
    expect(getClaims).toBeCalled();
  });
});

describe('AdminClaimsContainer without claims', () => {
  const getClaims = jest.fn();
  const clearClaimsError = jest.fn();
  const props = {
    isLoading: true,
    claims: {},
    claimsActions: {
      getClaims,
      clearClaimsError,
    },
  };
  const tree = shallow(<AdminClaimsContainer
    {...props}
  />);
  it('should be defined', () => {
    expect(AdminClaimsContainer).toBeDefined();
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('should render Admin Claims container', () => {
    expect(tree.find('.main-content').length).toBe(1);
  });

  it('should render Title block', () => {
    expect(tree.find('.gaf-title-block').length).toBe(1);
  });

  it('should render Table\'s sub title', () => {
    expect(tree.find('.gaf-table-header').length).toBe(1);
  });

  it('should render Tables', () => {
    expect(tree.find('Tables').length).toBe(1);
  });

  it('should render ErrorNotification', () => {
    expect(tree.find('ErrorNotification').length).toBe(1);
  });

  it('should render Loader', () => {
    expect(tree.find('Loader').length).toBe(1);
  });
});

describe('AdminContainer with connected component', () => {
  const getClaims = jest.fn();
  const clearClaimsError = jest.fn();
  const state = {
    adminClaimsState: {
      isLoading: false,
      claims: {
        1: [{
          claimId: '1234',
          contractorAccountId: '123456',
          submittedOn: null,
          modifiedOn: null,
          fileName: 'sample.pdf',
        }],
      },
    },
  };
  const store = fakeStore(state);
  const tree = mount(
    <Provider store={store}>
      <Router history={history}>
        <AdminClaimsCont
          claimsActions={{
            getClaims,
            clearClaimsError,
          }}
        />
      </Router>
    </Provider>
  );

  it('should be defined', () => {
    expect(AdminClaimsCont).toBeDefined();
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('should render Admin Claims container', () => {
    expect(tree.find('.main-content').length).toBe(1);
  });

  it('should render Title block', () => {
    expect(tree.find('.gaf-title-block').length).toBe(1);
  });

  it('should render Table\'s sub title', () => {
    expect(tree.find('.gaf-table-header').length).toBe(1);
  });

  it('should render Tables', () => {
    expect(tree.find('Tables').length).toBe(1);
  });

  it('should render ErrorNotification', () => {
    expect(tree.find('ErrorNotification').length).toBe(1);
  });
});
