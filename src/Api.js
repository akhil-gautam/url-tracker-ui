import { API_URL } from './Constants';

export const urlPath = (path) => `${API_URL}/${path}`;

export const dataResponse = (response) => response.data;
export const errorResponse = (error) => error;

export const get = (path, raw = false) =>
  fetch(raw ? path : urlPath(path), {
    headers: {
      Authorization: `Authorization: ${localStorage.getItem('authToken')}`,
    },
  });

export const post = (path, data) => {
  return fetch(urlPath(path), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const put = (path, data) => {
  return fetch(urlPath(path), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const deleteReq = (path, data = {}) => {
  return fetch(urlPath(path), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const saveAuthToken = (value) => {
  localStorage.setItem('authToken', value);
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const saveEmail = (value) => {
  localStorage.setItem('email', value);
};

export const saveUserId = (value) => {
  localStorage.setItem('uuid', value);
};

export const getEmail = () => {
  return localStorage.getItem('email');
};

export const getUserID = () => {
  return localStorage.getItem('uuid');
};

export const clearLocalStorage = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('email');
};

export const isLoggedIn = () => getAuthToken() && getAuthToken().length > 0;
