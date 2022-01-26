import { httpService } from './http.service';

export const wineService = {
  query,
};

const API = 'wine';

async function query(filter = {}) {
  return httpService.get(API, { params: filter });
}

// async function getBoardById(id) {
//   return serverService.get(API + id);
// }

// async function remove(id) {
//   return serverService.delete(API + id);
// }

// async function add(title, style) {
//   return serverService.post(API, { title, style });
// }

// async function update(board) {
//   return serverService.put(API + board._id, board);
// }
