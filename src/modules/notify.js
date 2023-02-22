import { Notify } from 'notiflix';

function showINotification(text) {
  Notify.info(text);
}

function showError(text) {
  Notify.failure(text);
}

export { showINotification, showError };
