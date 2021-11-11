import http from '../http-common';

class messageDataService {
  getAll() {
    return http.get('/messages');
  }
  get(id) {
    return http.get(`/messages/${id}`);
  }
  create(data) {
    return http.post('/messages', data);
  }
  update(id, data) {
    return http.put(`/messages/${id}`, data);
  }
  delete(id) {
    return http.delete(`/messages/${id}`);
  }
  // findByTitle(title) {
  //   return http.get(`/messages?title=${title}`);
  // }
}
export default new messageDataService();