import { httpService } from './http.service';

export const reviewService = {
  query,
  getByWineId,
  set,
  update,
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

async function update(reviewId, queries) {
  return httpService.put(API + '/' + reviewId, null, { like: reviewId });
}
// async function remove(id) {
//   return serverService.delete(API + id);
// }
