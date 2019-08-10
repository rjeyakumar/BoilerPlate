import test from 'tape';
import { put, takeLatest } from 'redux-saga/effects';
import { getClaimDetails, adminClaimsDetailsWatcher } from './AdminClaimDetails';
import * as CLAIMS from '../actionTypes/AdminClaimDetails';
import * as claimDetailsActionCreators from '../actionCreators/AdminClaimDetails';

const t = test('test utils', (b) => b);

describe('getCartSummary', () => {
  it('should call GET_FAILED_CLAIM_DETAILS_SUCCESS', () => {
    const response = {
      response: { responseCode: 200 },
      data: [
        {
          claimNumber: 1234567,
          contractorId: 'testuser@test.com',
          submissonDate: '04/05/2019',
          modifiedDate: '07/05/2019',
        },
      ],
    };
    const generator = getClaimDetails({ reqBody: {} });
    let next = generator.next();
    next = generator.next(response);
    t.deepEqual(next.value, put(claimDetailsActionCreators.getClaimDetailsSuccess(response.data)));
  });

  it('should call GET_FAILED_CLAIM_DETAILS_FAILURE', () => {
    const error = { responseCode: 500, data: 'Internal server error' };
    const generator = getClaimDetails({ reqBody: {} });
    generator.next();
    generator.next(error);
    t.deepEqual(generator.throw(error).value, put(claimDetailsActionCreators.getClaimDetailsFailure(error)));
  });

  it('should call adminClaimsDetailsWatcher', () => {
    const generator = adminClaimsDetailsWatcher();
    const next = generator.next().value;
    t.deepEqual(next, [
      takeLatest(CLAIMS.GET_FAILED_CLAIM_DETAILS, getClaimDetails),
    ]);
  });
});
