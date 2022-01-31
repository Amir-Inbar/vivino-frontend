import { httpService } from './http.service';

export const reviewService = {
  query,
  getByWineId,
  set,
};

const API = 'review';

async function query(queries) {
  return httpService.get(API, null, queries);
}

async function getByWineId(id, queries) {
  return httpService.get(API + '/' + id, null, queries);
}

async function set(wineId, review, queries) {
  return httpService.post(API + '/' + wineId, review, queries);
}

// async function remove(id) {
//   return serverService.delete(API + id);
// }


// async function update(board) {
//   return serverService.put(API + board._id, board);
// }
