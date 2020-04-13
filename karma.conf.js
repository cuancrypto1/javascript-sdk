module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: ['mocha', 'chai', 'karma-typescript'],
    files: [
        'src/**/*.ts',
        'tests/**/*.ts'
    ],
    preprocessors: {
      "**/*.ts": ["karma-typescript"]
    },
    reporters: ['progress'],
    // port: 9876,
    // colors: true,
    // logLevel: config.LOG_INFO,
    // browsers: ['Edge'],
    browsers: ['Chrome'],
    // autoWatch: false,
    // concurrency: Infinity,
    // customLaunchers: {
    //     FirefoxHeadless: {
    //         base: 'Firefox',
    //         flags: ['-headless'],
    //     },
    // },
    singleRun: true,
    client: {
      mocha: {
        timeout : 2000
      }
    }
  });
};