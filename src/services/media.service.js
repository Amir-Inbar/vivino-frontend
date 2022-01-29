export async function getUnsplash(query, page = 1, perPage = 1, orderBy = 1) {
    const PHOTOS_API = 'rEYH87zI9xYojZC7mYsW6BIb3LgJblmjT6E30GnjUqI';
    const axios = require('axios');
    const apiClient = axios.create({
        baseURL: 'https://api.unsplash.com',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const res = await apiClient.get(`/search/photos?client_id=${PHOTOS_API}&page=${page}&per_page=${perPage}&order_by=${orderBy}&query=${query}`);
    // console.log(page === 1 ? res?.data?.results[0] : res?.data?.results);
    return res;
}