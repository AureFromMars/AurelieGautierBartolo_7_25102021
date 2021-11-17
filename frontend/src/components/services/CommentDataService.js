import { requestAuth } from '../../http-common';

class CommentDataService {
  getAllFromMessage(id) {
    return requestAuth().get(`/message/comment/allFromMessage/${id}`);
  }
  getOne(id) {
    return requestAuth().get(`/message/comment/one/${id}`);
  }
  create(data) {
    return requestAuth().post('/message/comment/create', data);
  }
  modify(id, data) {
    return requestAuth().put(`/message/comment/modify/${id}`, data);
  }
  delete(data) {
    return requestAuth().delete(`/message/comment/delete`, data);
  }
}
export default new CommentDataService();