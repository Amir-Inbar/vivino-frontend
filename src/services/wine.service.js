import { httpService } from './http.service';
import { typeOf } from './util.service';

export const wineService = {
  query,
  getById,
};

const API = 'wine';

function _clearEmptyQueries(queries) {
  return Object.entries(queries).reduce((q, p) => {
    const key = p[0];
    const val = p[1];
    console.log(typeOf(val) !== 'Object', Object.values(val).length);
    if (typeOf(val) !== 'Object' || Object.values(val).length) q = { ...q, [key]: val };
    return q
  }, {});
}

async function query(queries) {
  queries = _clearEmptyQueries(queries);
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
