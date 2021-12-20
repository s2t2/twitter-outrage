

// h/t: https://stackoverflow.com/questions/49165232/reactjs-app-in-heroku-invalid-host-header-host-configuration

const proxy = require("http-proxy-middleware");

//const API_PROXY_URL = "http://localhost:3001"
//> this works!

//const API_PROXY_URL = "https://twitter-outrage-classification.herokuapp.com"
//> Error occurred while trying to proxy request /api/tweets from localhost:3000 to https://twitter-outrage-classification.herokuapp.com (ERR_TLS_CERT_ALTNAME_INVALID) (https://nodejs.org/api/errors.html#errors_common_system_errors)
//> ERR_TLS_CERT_ALTNAME_INVALID: While using TLS, the hostname/IP of the peer did not match any of the subjectAltNames in its certificate.

const API_PROXY_URL = "twitter-outrage-classification.herokuapp.com"
//> [HPM] Error occurred while trying to proxy request /api/tweets from localhost:3000 to twitter-outrage-classification.herokuapp.com (ECONNREFUSED) (https://nodejs.org/api/errors.html#errors_common_system_errors)
// ECONNREFUSED: No connection could be made because the target machine actively refused it. This usually results from trying to connect to a service that is inactive on the foreign host.

module.exports = function(app) {
  app.use(
    proxy('/api/**', { target: API_PROXY_URL })
  );
};
