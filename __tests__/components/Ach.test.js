import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import AchComponent, { Ach } from './index';
import { history } from '../../routes';
import { fakeStore } from '../../config/jest/fakeStore';


configure({ adapter: new Adapter() });

history.push = jest.fn();
// const event = {
//   preventDefault: jest.fn(),
//   target: {
//     value: '100',
//   },
// };
describe('Ach', () => {
  window.open = jest.fn();
  window.scrollTo = jest.fn();
  const changeFormState = jest.fn();
  const handleSubmit = jest.fn();
  const getAchInfo = jest.fn();
  const descriptions = {
    descriptionTypeEcard: 'description1',
    termsConditionEcard: 'description2',
    termsConditionPhysical: 'description2',
  };
  const syncErrors = {
    redeemableAmount: 'Please enter valid number',
  };
  const gtmActions = {
    gtmAchSuccess: jest.fn(),
  };
  const submitHandler = jest.fn();
  const reset = jest.fn();
  const feeDetails = {
    listprice: '0.000',
    cardType: 'Physical Card',
    feeType: '%',
    feeValue: '2.5',
    giftCardValue: null,
    imageicon: null,
    max: '99,999.00',
    min: '25.00',
    minmaxtype: '$',
    Variant_Images: null,
    DisplayName: 'VISA Reloadble Debit Card',
  };
  const tree = shallow(<Ach
    changeFormState={changeFormState}
    category="check"
    getAchInfo={getAchInfo}
    product={{ ...feeDetails }}
    handleSubmit={handleSubmit}
    debitCardUserName="john"
    feeDetails={feeDetails}
    formValues={{
      ach: {
        offsetTop: 1,
      },
    }}
    descriptions={descriptions}
    errors={syncErrors}
    onSubmit={submitHandler}
    isShowPopup
    reset={reset}
    gtmActions={gtmActions}
    productName="check/ACH"
  />);
  it('should be defined', () => {
    expect(Ach).toBeDefined();
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('should render Ach description ', () => {
    expect(tree.find('CardDetails').length).toBe(1);
  });

  it('should call component did update', () => {
    const instance = tree.instance();
    instance.componentDidUpdate({
      isShowPopup: false,
    });
    expect(reset).toBeCalled();
  });
  it('should call viewHandler', () => {
    const simulateClick = tree.find('CardDetails').prop('onViewClick');
    simulateClick(true);
  });
});
describe('Ach with isShowPopup prop false', () => {
  window.open = jest.fn();
  const changeFormState = jest.fn();
  const handleSubmit = jest.fn();
  const getAchInfo = jest.fn();
  const descriptions = {
    descriptionTypeEcard: 'description1',
    termsConditionEcard: 'description2',
    termsConditionPhysical: 'description2',
  };
  const syncErrors = {
    redeemableAmount: 'Please enter valid number',
  };
  const gtmActions = {
    gtmAchSuccess: jest.fn(),
  };
  const submitHandler = jest.fn();
  const reset = jest.fn();
  const feeDetails = {
    listprice: '0.000',
    cardType: 'Physical Card',
    feeType: '%',
    feeValue: '2.5',
    giftCardValue: null,
    imageicon: null,
    max: '99,999.00',
    min: '25.00',
    minmaxtype: '$',
    Variant_Images: null,
    DisplayName: 'VISA Reloadble Debit Card',
  };
  const tree = shallow(<Ach
    changeFormState={changeFormState}
    category="check"
    getAchInfo={getAchInfo}
    product={{ ...feeDetails }}
    handleSubmit={handleSubmit}
    debitCardUserName="john"
    feeDetails={feeDetails}
    formValues={{}}
    descriptions={descriptions}
    errors={syncErrors}
    onSubmit={submitHandler}
    isShowPopup={false}
    reset={reset}
    gtmActions={gtmActions}
    productName="check/ACH"
  />);

  it('should not call component did update when isShowPopup never changes', () => {
    const instance = tree.instance();
    instance.componentDidUpdate({
      isShowPopup: false,
    });
    expect(reset).not.toBeCalled();
  });
});
describe('AchComponent with connected component', () => {
  window.open = jest.fn();
  const submitHandler = jest.fn();
  const getAchInfo = jest.fn();
  const changeFormState = jest.fn();
  const state = {
    myProfileState: {
      rewardsInfo: {
        rewardPoints: '1000',
      },
    },
    headerState: {
      availableBalance: 100,
    },
    redeemPointsState: {
      cardHolderName: 'john',
      totalBalance: 1000,
      achInfo: [{
        categories: [{
          products: [{
            productSpecification: {
              descriptionTypeEcard: null,
              termsConditionEcard: 'description2',
              termsConditionPhysical: 'description3',
            },
            variants: [{
              variants: {
                listprice: '0.000',
                cardType: 'Physical Card',
                feeType: '$',
                feeValue: 2.5,
                giftCardValue: null,
                imageicon: null,
                max: '99,999.00',
                min: '25.00',
                minmaxtype: '$',
                Variant_Images: null,
                DisplayName: 'VISA Reloadble Debit Card',
              },
            }],
          }],
        }],
      }],
    },
    form: {
      debitCardForm: {
        values: {},
        syncErrors: {
          redeemableAmount: 'Please enter valid number',
        },
      },
    },
  };
  const gtmActions = {
    gtmAchSuccess: jest.fn(),
  };
  const store = fakeStore(state);
  const tree = mount(<Provider store={store}>
    <Router history={history}>
      <AchComponent gtmActions={gtmActions} onSubmit={submitHandler} getAchInfo={getAchInfo} changeFormState={changeFormState} />
    </Router>
  </Provider>);

  it('should be defined', () => {
    expect(AchComponent).toBeDefined();
  });

  it('should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('should render Ach Image ', () => {
    expect(tree.find('Image').length).toBe(1);
  });

  it('should render ach description ', () => {
    expect(tree.find('CardDetails').length).toBe(1);
  });

  it('should call submitHandler', () => {
    const simulateClick = tree.find('form[name="achForm"]').prop('onSubmit');
    simulateClick();
    expect(submitHandler).toBeCalled();
  });
});
