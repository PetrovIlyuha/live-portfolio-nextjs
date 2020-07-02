import moment from 'moment';

export const formatDate = date => {
  return moment.unix(date / 1000).format('MMMM Do YYYY');
};