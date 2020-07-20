import moment from 'moment';

export const formatDate = date => {
  return moment.unix(date / 1000).format('MMMM Do YYYY');
};

export const fromNow = date => moment.unix(date / 1000).fromNow();

export const shortenText = (text, maxLength = 240) => {
  if (!text) return '';
  if (text.length <= maxLength) {
    return text;
  }
  return text.substr(0, maxLength) + '...';
};
