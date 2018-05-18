var queryStr = {};

queryStr.AVStr = 'SELECT * FROM (SELECT *, ROW_NUMBER() OVER (ORDER BY%s) AS OnePage FROM AV WHERE 1 = 1%s) AS t WHERE 1 = 1%s'
queryStr.AVCountStr = 'SELECT COUNT(1) AS Total FROM AV WHERE 1 = 1%s';
queryStr.matchedStr = `SELECT * FROM Match WHERE AvID = '%s'`

module.exports = queryStr;