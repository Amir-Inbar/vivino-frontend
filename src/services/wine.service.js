import { httpService } from './http.service';

export const wineService = {
  query,
  getById,
};

const API = 'wine';

async function query(queries) {
  return httpService.get(API, null, queries);
}

async function getById(id) {
  return httpService.get(API + '/' + id);
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
