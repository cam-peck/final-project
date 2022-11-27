const getCurrentMonth = require('./get-current-month');
const getCurrentYear = require('./get-current-year');
const getSquaresData = require('./get-squares-data');
const trimToSunday = require('./trim-to-sunday');
const convertDistancesToMiles = require('./convert-distances-to-miles');
const getRecentSunday = require('./get-recent-sunday');
const getThisWeekDuration = require('./get-this-week-duration');
const formatWeekChart = require('./format-week-chart');

module.exports = { getCurrentMonth, getCurrentYear, getSquaresData, trimToSunday, convertDistancesToMiles, getRecentSunday, getThisWeekDuration, formatWeekChart };
