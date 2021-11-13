import requestAuth from '../../http-common';

class MessageDataService {
  getAll() {
    return requestAuth.get('/message/all');
  }
  get(id) {
    return requestAuth.get(`/message/one/${id}`);
  }
  create(data) {
    return requestAuth.post('/message/create', data);
  }
  update(id, data) {
    return requestAuth.put(`/message/modify/${id}`, data);
  }
  delete(id) {
    return requestAuth.delete(`/message/delete/${id}`);
  }
  // findByTitle(title) {
  //   return requestAuth.get(`/message?title=${title}`);
  // }
}
export default new MessageDataService();