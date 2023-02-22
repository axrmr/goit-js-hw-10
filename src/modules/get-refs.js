export default function getRefs() {
  return {
    DEBOUNCE_DELAY: 300,
    TOO_MANY_MATCHES_MSG:
      'Too many matches found. Please enter a more specific name.',
    ERROR_404_MSG: 'Oops, there is no country with that name',
    searchInput: document.getElementById('search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfoBox: document.querySelector('.country-info'),
  };
}
