var queryStr = {};

queryStr.AVStr = 'SELECT * FROM (SELECT *, ROW_NUMBER() OVER (ORDER BY%s) AS OnePage FROM AV WHERE 1 = 1%s) AS t WHERE 1 = 1%s';
queryStr.AVCountStr = 'SELECT COUNT(1) AS Total FROM AV WHERE 1 = 1%s';
queryStr.matchedStr = `SELECT * FROM Match WHERE AvID = '%s'`;
queryStr.getUser = `SELECT * FROM [AvUser] WHERE UserName = '%s' and Email = '%s'`;
queryStr.getUserWithPassword = `SELECT * FROM [AvUser] WHERE UserName = '%s' AND Password = '%s'`;
queryStr.saveUser = `INSERT INTO [AvUser] (UserName, Password, Email) VALUES ('%s', '%s', '%s')`;
queryStr.getLike = `SELECT * FROM [Like] WHERE UserId = %s AND AvId = %s`;
queryStr.getWant = `SELECT * FROM [Want] WHERE UserId = %s AND AvId = %s`;
queryStr.saveLike = `INSERT INTO [Like] (UserId, AvId) VALUES (%s, %s)`;
queryStr.saveWant = `INSERT INTO [Want] (UserId, AvId) VALUES (%s, %s)`;
queryStr.removeLike = `DELETE FROM [Like] WHERE UserId = %s AND AvId = %s`;
queryStr.removeWant = `DELETE FROM [Want] WHERE UserId = %s AND AvId = %s`;
queryStr.getLikeAv = `SELECT * FROM (SELECT DISTINCT a.*, ROW_NUMBER() OVER (ORDER BY CreateTime DESC) AS OnePage FROM [JavLibraryDownload].dbo.AV a LEFT JOIN [AvManager].dbo.[Like] b ON a.AVID = b.AvId WHERE b.UserId = %s) AS t WHERE 1 = 1%s`
queryStr.getWantAv = `SELECT * FROM (SELECT DISTINCT a.*, ROW_NUMBER() OVER (ORDER BY CreateTime DESC) AS OnePage FROM [JavLibraryDownload].dbo.AV a LEFT JOIN [AvManager].dbo.[Want] b ON a.AVID = b.AvId WHERE b.UserId = %s) AS t WHERE 1 = 1%s`
queryStr.likeAVCountStr = 'SELECT COUNT(a.AvId) FROM [JavLibraryDownload].dbo.AV a RIGHT JOIN [AvManager].dbo.[Like] b ON a.AVID = b.AvId AND b.UserId = %s';
queryStr.wantAVCountStr = 'SELECT COUNT(a.AvId) FROM [JavLibraryDownload].dbo.AV a RIGHT JOIN [AvManager].dbo.[Want] b ON a.AVID = b.AvId AND b.UserId = %s';

module.exports = queryStr;