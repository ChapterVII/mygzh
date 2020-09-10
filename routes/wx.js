var express = require('express');
const sha1 = require('sha1');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const params = req.query;
  if (!params) return;
  const {signature = '', timestamp = '', nonce = '', echostr = ''} = params;
  const token = 'wxoffiaccount';
  const str = [token, timestamp, nonce].sort().join('');
  const sha = sha1(str);
  if (sha === signature) {
    res.send(echostr);
  } else {
    res.send('failed');
  }
});

module.exports = router;
