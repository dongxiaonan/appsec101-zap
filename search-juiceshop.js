const http = require('http')
const ZapClient = require('zaproxy')

const zapDomain = "127.0.0.1"
const zapPort = "8080"
const juiceShopHost = "https://juice-shop.herokuapp.com"


const zapOptions = {
  proxy: `http://${zapDomain}:${zapPort}`
};
const zaproxy = new ZapClient(zapOptions);

console.log("================= Step one - visit search page ======================")
var opt = {
 host: zapDomain,
 port: zapPort,
 method:'GET',//这里是发送的方法
 path:`${juiceShopHost}/#/search?q=apple`    //这里是访问的路径
}

//以下是接受数据的代码
var body = '';
var req = http.request(opt, function(res) {
  console.log("Got response: " + res.statusCode);
  res.on('data',function(d){
  body += d;
 }).on('end', function(){
  console.log(res.headers)
  console.log(body)
 });

}).on('error', function(e) {
  console.log("Got error: " + e.message);
})
req.end();

console.log("================= Step two - scan juice shop ======================")
zaproxy.spider.scan(juiceShopHost, "", true, "Juice-shop", false, (err, resp) => {
  // All errors are handled here
  if (err) {
      console.info('Error:',err);
      let error = { statusCode: 422, error: err };
      callback(error);
  }
  // All valid responses are handled here
  if (resp) {
      console.info('Response:',resp);
      let result = resp.scan;
      callback(null, result);
  }
});


console.log("================= Step three - alert summary ======================")
zaproxy.core.alertsSummary(juiceShopHost, (err, resp) => {
  // All errors are handled here
  if (err) {
      console.info('Error:',err);
      let error = { statusCode: 422, error: err };
      callback(error);
  }
  // All valid responses are handled here
  if (resp) {
      console.info('Response:',resp);
      let result = resp.scan;
      callback(null, result);
  }
});

console.log("================= Step four - report ======================")
zaproxy.core.htmlreport((err, resp) => {
  // All errors are handled here
  if (err) {
      console.info('Error:',err);
      let error = { statusCode: 422, error: err };
      callback(error);
  }
  // All valid responses are handled here
  if (resp) {
      console.info('Response:',resp);
      let result = resp.scan;
      callback(null, result);
  }
});