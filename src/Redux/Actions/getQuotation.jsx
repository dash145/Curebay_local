import { QUOT } from "../Constants/QuoatationConstant";
import getQuotation from "../services/getQuotation";

export const getDrugPrescriptionsData = (visitId) => async (dispatch) => {
  request();
  const res = await getQuotation.drugPrescriptionList(visitId);

  try {
    success(res);
    return Promise.resolve(res.data);
  } catch (error) {
    failure(error);
    return Promise.reject(error);
  }

  function request() {
    dispatch({ type: QUOT.REQUEST_DRUG_PRES_LIST });
  }

  function success(res) {
    dispatch({ type: QUOT.SUCCESS_DRUG_PRES_LIST, payload: res.data });
  }
  function failure(err) {
    dispatch({
      type: QUOT.FAILED_DRUG_PRES_LIST,
      payload: err,
    });
  }
};

export const getPrescribedPharmaCenters =
  (prescriptionId) => async (dispatch) => {
    request();

    const res = await getQuotation.prescribedPharmacyCenters(prescriptionId);

    try {
      success(res);
      return Promise.resolve(res.data);
    } catch (error) {
      failure(error);
      return Promise.reject(error);
    }
    function request() {
      dispatch({ type: QUOT.REQUEST_PHARMA_CENTERS });
    }

    function success(res) {
      dispatch({ type: QUOT.SUCCESS_PHARMA_CENTERS, payload: res.data });
    }
    function failure(err) {
      dispatch({
        type: QUOT.FAILED_PHARMA_CENTERS,
        payload: err,
      });
    }
  };

export const getLabTestsViaVisit = (visitId) => async (dispatch) => {
  request();

  const res = await getQuotation.patientLabTestsFromVisit(visitId);

  try {
    success(res);
    return Promise.resolve(res.data);
  } catch (error) {
    failure(error);
    return Promise.reject(error);
  }
  function request() {
    dispatch({ type: QUOT.REQUEST_PAT_LAB_TESTS });
  }

  function success(res) {
    dispatch({ type: QUOT.SUCCESS_PAT_LAB_TESTS, payload: res.data });
  }
  function failure(err) {
    dispatch({
      type: QUOT.FAILED_PAT_LAB_TESTS,
      payload: err,
    });
  }
};

export const getPrescribedDiagonisCenters =
  (prescriptionId) => async (dispatch) => {
    request();
    const res = await getQuotation.prescriptionDiagnosticCenters(
      prescriptionId
    );

    try {
      success(res);
      return Promise.resolve(res.data);
    } catch (error) {
      failure(error);
      return Promise.reject(error);
    }
    function request() {
      dispatch({ type: QUOT.REQUEST_PRES_DIAGONSIS_CENTERS });
    }

    function success(res) {
      dispatch({
        type: QUOT.SUCCESS_PRES_DIAGONSIS_CENTERS,
        payload: res.data,
      });
    }
    function failure(err) {
      dispatch({
        type: QUOT.FAILED_PRES_DIAGONSIS_CENTERS,
        payload: err,
      });
    }
  };
