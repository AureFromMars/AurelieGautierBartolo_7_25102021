import { requestAuth } from '../../http-common';

class LikingDataService {
  getAll(id) {
    return requestAuth().get(`/message/liking/allFromUser/${id}`);
  }
  create(data) {
    return requestAuth().post('/message/liking/create', data);
  }
  update(id, data) {
    return requestAuth().put(`/message/modify/${id}`, data);
  }
  delete(id) {
    return requestAuth().delete(`/message/delete/${id}`);
  }
}
export default new LikingDataService();