import axios from 'axios';

let API_URL = 'https://stiickstock.herokuapp.com';

export class APIService {
  constructor() {
  }

  async findAllProduct() {
    const url = `${API_URL}/product/findAll`;
    return axios.get(url, { crossDomain: true }).then(response => response.data);
  }
  async findByIdProduct(id) {
    const url = `${API_URL}/product/${id}`;
    return axios.get(url, { crossDomain: true }).then(response => response.data);
  }
  deleteProduct(product) {
    const url = `${API_URL}/product/delete/${product.id}`;
    return axios.delete(url, { crossDomain: true });
  }
  async saveProduct(item) {
    const url = `${API_URL}/product/save`;
    return axios.post(url, item).catch(res => res);
  }



  async findAllTeam() {
    const url = `${API_URL}/team/findAll`;
    return axios.get(url, { crossDomain: true }).then(response => response.data);
  }
  async findByIdTeam(id) {
    const url = `${API_URL}/team/${id}`;
    return axios.get(url, { crossDomain: true }).then(response => response.data);
  }
  deleteTeam(team) {
    const url = `${API_URL}/team/delete/${team.id}`;
    return axios.delete(url, { crossDomain: true });
  }
  async saveTeam(item) {
    const url = `${API_URL}/team/save`;
    return axios.post(url, item, { crossDomain: true }).catch(res => res);
  }

  

}