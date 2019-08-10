import * as CLAIMS from '../actionTypes/AdminClaimDetails';
import Reducer from './AdminClaimDetails';

const initialState = {
  claimDetails: [],
  isLoading: false,
};

describe('AdminClaimDetails', () => {
  it('should call GET_FAILED_CLAIM_DETAILS', () => {
    const action = { type: CLAIMS.GET_FAILED_CLAIM_DETAILS };
    const expected = {
      ...initialState,
      isLoading: true,
    };
    expect(Reducer(initialState, action)).toEqual(expected);
  });

  it('should call GET_FAILED_CLAIM_DETAILS_SUCCESS', () => {
    const action = {
      type: CLAIMS.GET_FAILED_CLAIM_DETAILS_SUCCESS,
      data: {
        result: [
          {
            claimNumber: 1234567,
            contractorId: 'testuser@test.com',
            submissonDate: '04/05/2019',
            modifiedDate: '07/05/2019',
          }],
      },
    };

    const expected = {
      ...initialState,
      isLoading: false,
      claimDetails: [
        {
          claimNumber: 1234567,
          contractorId: 'testuser@test.com',
          submissonDate: '04/05/2019',
          modifiedDate: '07/05/2019',
        },
      ],
    };
    expect(Reducer(initialState, action)).toEqual(expected);
  });

  it('should call GET_FAILED_CLAIM_DETAILS_FAILURE', () => {
    const action = {
      type: CLAIMS.GET_FAILED_CLAIM_DETAILS_FAILURE,
      error: 'internal server error',
    };
    const expected = {
      ...initialState,
      isLoading: false,
      claimDetailsError: action.error,
    };
    expect(Reducer(initialState, action)).toEqual(expected);
  });

  it('should call CLEAR_CLAIM_DETAILS_ERROR', () => {
    const action = {
      type: CLAIMS.CLEAR_CLAIM_DETAILS_ERROR,
    };
    const expected = {
      ...initialState,
      claimDetailsError: null,
    };
    expect(Reducer(initialState, action)).toEqual(expected);
  });

  it('should call Default', () => {
    const action = { type: undefined };
    const expected = {
      ...initialState,
    };
    expect(Reducer(undefined, action)).toEqual(expected);
  });
});
