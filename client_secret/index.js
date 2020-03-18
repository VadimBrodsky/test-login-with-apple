let fs = require('fs');
let jwt = require('jsonwebtoken');

const KEY_FILE = 'AuthKey_AUZ937RN3M.p8';
const TEAM_ID = '';
const CLIENT_ID = '';
const KEY_ID = '';

let generateClientSecret = () => {
  let privateKey = fs.readFileSync(KEY_FILE);
  let payload = {
    aud: 'https://appleid.apple.com',
    exp: Math.floor(Date.now() / 1000 + (86400 * 180)),
    iat: Math.floor(Date.now() / 1000),
    iss: TEAM_ID,
    sub: CLIENT_ID,
  };
  let options = {
    algorithm: 'ES256',
    header: { kid: KEY_ID },
  };

  let token = jwt.sign(payload, privateKey, options);
  console.log(token);
  return token;
};

generateClientSecret();

module.exports = generateClientSecret;
