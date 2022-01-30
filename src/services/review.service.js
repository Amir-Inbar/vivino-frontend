import { httpService } from './http.service';

export const reviewService = {
  query,
  getByWineId,
  set,
};

const API = 'review';

async function query(filter = {}) {
  return httpService.get(API, { params: filter });
}

async function getByWineId(id, queries) {
  return httpService.get(API + '/' + id, null, queries);
}

async function set(review) {
  if (review._id) return httpService.put(API, review);
  else return httpService.post(API, review);
}

// async function remove(id) {
//   return serverService.delete(API + id);
// }


// async function update(board) {
//   return serverService.put(API + board._id, board);
// }
