import { requestAuth } from '../../http-common';

class CommentDataService {
  getAllFromMessage(id) {
    return requestAuth().get(`/message/comment/allFromMessage/${id}`);
  }
  create(data) {
    return requestAuth().post('/message/comment/create', data);
  }
  update(data) {
    return requestAuth().put(`/message/comment/modify`, data);
  }
  delete(data) {
    return requestAuth().delete(`/message/comment/delete`, data);
  }
}
export default new CommentDataService();