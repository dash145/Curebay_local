import http from "./http-common";

class PharmacyService {
  /**
   * Get Nearby pharmacies.
   * If location is not set then it returns all the pharmacies
   * @param {object} filters Filters Like Location:{lat,long}, pincode, etc
   * @returns List of Pharmacies near location
   */
  getParmacyNearMe(filters) {
    let filterQuery = "";
    if (filters && filters.location) {
      filterQuery += `&lattitude=${filters.location.lat}&longitude=${filters.location.long}`;
    }
    if (filters && filters.pincode) {
      filterQuery += `&pinCode=${filters.pincode}`;
    }
    return http.get(
      `location/list/filter?HospitalType=P${filterQuery}&photoRequired=Y&status=${
        filters.status ?? 1
      }`
    );
  }

  getParticularPharma(data) {
    var queryString = Object.keys(data).map(key => key + '=' + data[key]).join('&');
    return http.get(
      `StoreProduct/list/filter?${queryString}`
    );
  }

  getMedicineBy(keyword) {
    return http.get(
      `/StoreProduct/list/filter?drugsInfoMedicineName=${keyword}&status=1`
    );
  }
  getAllProduct() {
    return http.get(`/StoreProduct/list/filter?status=1`);
  }

  getAllProductByIds(data) {
    return http.post( `${process.env.REACT_APP_ELASTIC_BASEURL}medicine/getMedicineRates`, data);
  }

  // getAllProductByIds(data) {
  //   return http.get( `StoreProduct/list/filter?productIds=${data}`);
  // }

  getBrandFilter() {
    return http.get(`DrugsInfo/brands`);
  }
}

export default new PharmacyService();
