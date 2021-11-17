import { requestAuth } from '../../http-common';

class MessageDataService {
  getAll() {
    return requestAuth().get('/message/all');
  }
  getOne(id) {
    return requestAuth().get(`/message/one/${id}`);
  }
  getAllFromUser(id) {
    return requestAuth().get(`/message/allFromUser/${id}`);
  }
  create(data) {
    return requestAuth().post('/message/create', data);
  }
  modify(id, data) {
    return requestAuth().put(`/message/modify/${id}`, data);
  }
  delete(id, data) {
    return requestAuth().delete(`/message/delete/${id}`, data);
  }
}
export default new MessageDataService();