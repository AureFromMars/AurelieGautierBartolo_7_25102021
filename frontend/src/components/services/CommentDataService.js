import { requestAuth } from '../../http-common';

class CommentDataService {
  getAll(id) {
    return requestAuth().get(`/message/comment/allFromMessage/${id}`);
  }
  create(data) {
    return requestAuth().post('/message/comment/create', data);
  }
  update(id, data) {
    return requestAuth().put(`/message/modify/${id}`, data);
  }
  delete(id) {
    return requestAuth().delete(`/message/delete/${id}`);
  }
}
export default new CommentDataService();