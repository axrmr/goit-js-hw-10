const searchParams = new URLSearchParams({
  fields: 'name,capital,population,flags,languages',
});

function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?${searchParams}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
}

export default fetchCountries;
