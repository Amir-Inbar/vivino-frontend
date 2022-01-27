import { httpService } from './http.service';

export const reviewService = {
  query,
  getByWineId,
};

const API = 'review';

async function query(filter = {}) {
  return httpService.get(API, { params: filter });
}

async function getByWineId(id, queries) {
  return httpService.get(API + '/' + id, null, queries);
}

// async function remove(id) {
//   return serverService.delete(API + id);
// }

// async function add(title, style) {
//   return serverService.post(API, { title, style });
// }

// async function update(board) {
//   return serverService.put(API + board._id, board);
// }
