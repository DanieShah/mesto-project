import { renderCard } from './card.js'

export const config = {
    baseUrl: 'https://nomoreparties.co/v1/plus-cohort-26',
    headers: {
      authorization: '086fba9e-6e93-4475-b2be-3ea4b02b5250',
      'Content-Type': 'application/json'
    }
};

export const downloadingUserInformationFromServer = () => {
    return fetch(config.baseUrl + '/users/me', {
        headers: {
            authorization: config.headers.authorization
        }
    })
    .then((res) => {
        return res.json();
    })
    .catch((err) => {
        console.log(`Ошибка ${err.status}`);
    });
};

export const downloadingCardsFromServer = () => {
    return fetch(config.baseUrl + '/cards', {
  headers: {
    authorization: config.headers.authorization
  }
})
  .then(res => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export const patchTheProfile = (userName, userJob) => {
    return fetch(config.baseUrl + '/users/me', {
        method: 'PATCH',
        headers: {
          authorization: config.headers.authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: userName,
            about: userJob
          })
      });
}

export const addNewCardToServer = (placeName, placeLink) => {
  return fetch(config.baseUrl + '/cards', {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: placeName,
        link: placeLink
      })
  });
}

export const deleteCardsFromServer = (cardsId) => {
  return fetch(config.baseUrl + '/cards/' + cardsId, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  });
}

export const purLikeOnCard = (cardsId) => {
  return fetch(config.baseUrl + '/cards/likes/' + cardsId, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization
    }
  });
}

export const deleteLikeOnCard = (cardsId) => {
  return fetch(config.baseUrl + '/cards/likes/' + cardsId, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  });
}

export const changeAvatar = (avatarLink) => {
  return fetch(config.baseUrl + '/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        avatar: avatarLink
      })
  });
}