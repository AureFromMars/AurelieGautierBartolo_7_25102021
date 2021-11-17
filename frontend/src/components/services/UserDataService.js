import { requestAuth } from '../../http-common';

class UserDataService {
  getAll() {
    return requestAuth().get('/user/all');
  }
  getOne(id) {
    return requestAuth().get(`/user/one/${id}`);
  }
  create(data) {
    return requestAuth().post('/user/create', data);
  }
  modify(id, data) {
    return requestAuth().put(`/user/modify/${id}`, data);
  }
  delete(id) {
    return requestAuth().delete(`/user/delete/${id}`);
  }
}
export default new UserDataService();