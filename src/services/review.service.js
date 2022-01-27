import { httpService } from './http.service';

export const reviewService = {
  query,
};

const API = 'review';

async function query(filter = {}) {
  return httpService.get(API, { params: filter });
}

async function getById(id) {
  return httpService.get(API + id);
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
