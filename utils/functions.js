import moment from 'moment';

export const formatDate = date => {
  return moment.unix(date / 1000).format('MMMM Do YYYY');
};

export const fromNow = date => moment.unix(date / 1000).fromNow();
