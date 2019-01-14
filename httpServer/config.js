exports.ActiveDirectory = require('activedirectory');
exports.config = { url: 'ldap://dcmjpl.ds.indianoil.in',
               baseDN: 'DC=DS,DC=INDIANOIL,DC=IN',
               username: 'IOC\\00509060',
               password: 'Valleyforge42' }
exports.ad = new exports.ActiveDirectory(exports.config); 