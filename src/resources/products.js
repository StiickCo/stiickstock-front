import axios from 'axios';

let API_URL = 'https://stiickstock.herokuapp.com';

export class APIService {
  constructor() {
  }

  findAllProduct() {
    const url = `${API_URL}/product/findAll`;
    return axios.get(url, { crossDomain: true }).then(response => response.data);
  }
  findByIdProduct(id) {
    const url = `${API_URL}/product/${id}`;
    return axios.get(url, { crossDomain: true }).then(response => response.data);
  }
  deleteProduct(product) {
    const url = `${API_URL}/product/deleteById/${product.id}`;
    return axios.delete(url, { crossDomain: true });
  }
  async save(item) {
    const url = `${API_URL}/product/save`;
    return axios.post(url, item).catch(res => res);
  }
}