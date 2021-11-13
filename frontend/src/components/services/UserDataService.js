import { requestAuth } from '../../http-common';

class UserDataService {
  getAll() {
    return requestAuth().get('/user/all');
  }
  get(id) {
    return requestAuth().get(`/user/one/${id}`);
  }
  create(data) {
    return requestAuth().post('/user/create', data);
  }
  update(id, data) {
    return requestAuth().put(`/user/modify/${id}`, data);
  }
  delete(id) {
    return requestAuth().delete(`/user/delete/${id}`);
  }
  // findByTitle(title) {
  //   return requestAuth.get(`/user?title=${title}`);
  // }
}
export default new UserDataService();