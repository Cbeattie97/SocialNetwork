// utils/dateFormat.js
const dayjs = require('dayjs');

// Define a custom date format function
const dateFormat = (timestamp) => {
  // Return the formatted date using dayjs
  return dayjs(timestamp).format('MMM DD, YYYY [at] hh:mm A');
};

module.exports = dateFormat;
