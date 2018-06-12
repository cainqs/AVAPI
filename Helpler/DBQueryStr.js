var queryStr = {};

queryStr.AVStr = 'SELECT * FROM (SELECT *, ROW_NUMBER() OVER (ORDER BY%s) AS OnePage FROM AV WHERE 1 = 1%s) AS t WHERE 1 = 1%s';
queryStr.AVCountStr = 'SELECT COUNT(1) AS Total FROM AV WHERE 1 = 1%s';
queryStr.matchedStr = `SELECT * FROM Match WHERE AvID = '%s'`;
queryStr.getUser = `SELECT * FROM [User] WHERE UserId = %s`;
queryStr.saveUser = `INSERT INTO [User] (UserName, Password, Email) VALUES ('%s', '%s', '%s')`;
queryStr.getLike = `SELECT * FROM Like WHERE UserId = %s AND AvId = '%s'`;
queryStr.getWant = `SELECT * FROM Want WHERE UserId = %s AND AvId = '%s'`;
queryStr.saveLike = `INSERT INTO Like (UserId, AvId) VALUES (%s, %s)`;
queryStr.saveWant = `INSERT INTO Want (UserId, AvId) VALUES (%s, %s)`;

module.exports = queryStr;