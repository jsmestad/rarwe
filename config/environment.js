/* jshint node: true */

var contentSecurityPolicy = {
  'default-src': "'none'",
  'script-src': "'self'",
  'font-src': "'self'",
  'connect-src': "'self' localhost:* api.rockandrollwithemberjs.com:*",
  'img-src': "'self'",
  'style-src': "'self' 'unsafe-inline'",
  'media-src': "'self'"
};

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'rarwe',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.apiHost = 'http://api.rockandrollwithemberjs.com'
    ENV.contentSecurityPolicy = contentSecurityPolicy;
    ENV.contentSecurityPolicy['script-src'] = "'self' 'unsafe-eval'";
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
