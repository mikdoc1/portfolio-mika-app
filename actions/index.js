export const fetcher = (url) =>
  fetch(url).then(async (res) => {
    const result = await res.json();
    if (res.status >= 300) {
      return Promise.reject(result);
    } else {
      return result;
    }
  });
