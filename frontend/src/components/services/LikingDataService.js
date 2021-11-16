import { requestAuth } from '../../http-common';

class LikingDataService {
  getAllFromUser(id) {
    return requestAuth().get(`/message/liking/allFromUser/${id}`);
  }
  getAllFromMessage(id) {
    return requestAuth().get(`/message/liking/allFromMessage/${id}`);
  }
  add(data) {
    return requestAuth().post('/message/liking/add', data);
  }
  update(data) {
    return requestAuth().put(`/message/liking/modify`, data);
  }
  delete(data) {
    return requestAuth().delete(`/message/liking/delete`, data);
  }
}
export default new LikingDataService();