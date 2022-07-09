const MY_API_KEY = '27547013-b29238c577303ab781139b8a0';
const API_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

const fetchImages = (searchString, page) => {
  const headers = {
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  };

  return fetch(
    `${API_URL}?key=${MY_API_KEY}&q=${searchString}&per_page=${PER_PAGE}&page=${page}`,
    headers
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(new Error('Server response not OK'));
    })
    .then(json =>
      json.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
        id,
        previewURL: webformatURL,
        imageURL: largeImageURL,
        tags,
      }))
    )
    .catch(error => console.error(error));
};

export default fetchImages;
