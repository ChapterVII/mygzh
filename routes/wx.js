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

const genConfig = (url) => {
  const ticket = '';
  const nonceStr = '';
  const timestamp = parseInt(new Date().getTime() / 10000) + '';
  const appId = '';
  const str = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
  const signature = sha1(str);
  return {signature, nonceStr, appId, timestamp };
}

router.get('/config', function(req, res, next) {
  const params = req.query;
  if (!params || !params.url) return;
  const {signature, nonceStr, appId, timestamp} = genConfig(params.url);
  res.send({
    signature,
    nonceStr,
    appId,
    timestamp,
  })
});

module.exports = router;
