import * as CLAIMS from '../actionTypes/AdminClaimDetails';
import * as claimDetailsActions from '../actionCreators/AdminClaimDetails';

describe('ADMIN_CLIAM_DETAILS', () => {
  it('should return getClaimDetails action type', () => {
    const getClaimDetails = claimDetailsActions.getClaimDetails();
    expect(getClaimDetails.type).toEqual(CLAIMS.GET_FAILED_CLAIM_DETAILS);
  });

  it('should return getClaimDetailsSuccess action type', () => {
    const getClaimDetailsSuccess = claimDetailsActions.getClaimDetailsSuccess();
    expect(getClaimDetailsSuccess.type).toEqual(CLAIMS.GET_FAILED_CLAIM_DETAILS_SUCCESS);
  });

  it('should return getClaimDetailsFailure action type', () => {
    const getClaimDetailsFailure = claimDetailsActions.getClaimDetailsFailure();
    expect(getClaimDetailsFailure.type).toEqual(CLAIMS.GET_FAILED_CLAIM_DETAILS_FAILURE);
  });

  it('should return clearClaimDetailsError action type', () => {
    const clearClaimDetailsError = claimDetailsActions.clearClaimDetailsError();
    expect(clearClaimDetailsError.type).toEqual(CLAIMS.CLEAR_CLAIM_DETAILS_ERROR);
  });
});
