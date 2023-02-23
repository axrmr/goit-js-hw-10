import clearInnerContent from './modules/clear-inner-content';
import debounce from 'lodash.debounce';
import fetchCountries from './modules/fetch-countries';
import { showINotification, showError } from './modules/notify';
import getRefs from './modules/get-refs';
import './css/styles.css';

const ref = getRefs();

ref.searchInput.addEventListener(
  'input',
  debounce(onSearchInput, ref.DEBOUNCE_DELAY)
);

function onSearchInput(e) {
  const trimmedSearchInputVal = this.value.trim();

  if (!trimmedSearchInputVal) {
    clearInnerContent(ref.countryInfoBox);
    clearInnerContent(ref.countryList);

    return;
  }

  fetchCountries(trimmedSearchInputVal)
    .then(countries => {
      if (countries.length === 1) {
        ref.countryList.innerHTML = countries.map(getCountryItemTpl);

        ref.countryInfoBox.innerHTML = getCountryInfoTpl(countries);

        const countryNameEl = document.querySelector('.country-name');
        countryNameEl.classList.add('country-name-lg');

        return;
      }

      if (countries.length >= 2 && countries.length < 10) {
        ref.countryList.innerHTML = countries.map(getCountryItemTpl).join('');

        return;
      }

      showINotification(ref.TOO_MANY_MATCHES_MSG);
    })
    .catch(error => {
      if (error.message === '404') {
        showError(ref.ERROR_404_MSG);

        return;
      }

      showError(error.message);
    });
}

function getCountryItemTpl(country) {
  return `
        <li class="country-item">
          <img class="country-flags" src=${country.flags.svg}  >
          <span class="country-name">${country.name.common}</span>
        </li>`;
}

function getCountryInfoTpl(country) {
  const { capital, population, languages } = country[0];

  return `
      <div class="country-info"><b>Capital:</b> ${capital}</div>
      <div class="country-info"><b>Population:</b> ${population}</div>
      <div class="country-info"><b>Languages:</b> ${Object.values(
        languages
      )}</div>`;
}
