/*
 * Este formulario de código fuente está sujeto a los términos de la Licencia Pública de Mozilla,
 * v. 2.0. Si una copia del MPL no fue distribuida con este archivo,
 * puedes obtener una en http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2021-present Kaleidos Ventures SL
 */

// Configuración de Karma
// a---

// Esto es necesario para theme.service.spec
module.exports = function(config) {
  var configuration = {

    // Ruta base que se utilizará para resolver todos los patrones (por ejemplo, archivos, excluidos)
    basePath: '',

    // Marcos (frameworks) a utilizar
    // marcos disponibles: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'chai-as-promised', 'sinon-chai'],

    // Lista de archivos / patrones para cargar en el navegador
    files: [
      'karma.app.conf.js',
      'dist/**/js/libs.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/chai-jquery/chai-jquery.js',
      'test-utils.js',
      'dist/**/js/app.js',
      'dist/**/js/templates.js',
      'app/**/*spec.coffee'
    ],

    // Lista de archivos a excluir
    exclude: [
    ],

    // Preprocesar archivos antes de servirlos al navegador
    // preprocesadores disponibles: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.spec.coffee': ['coffee'],
      'dist/js/app.js': ['sourcemap']
    },

    coffeePreprocessor: {
      // Opciones pasadas al compilador de coffee
      options: {
        bare: true,
        sourceMap: true
      },
      // Transformar los nombres de archivo
      transformPath: function(path) {
        return path.replace(/\.coffee$/, '.js');
      }
    },

    // Reportero de resultados de pruebas a utilizar
    // valores posibles: 'dots', 'progress'
    // reporteros disponibles: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // Puerto del servidor web
    port: 9876,

    // Habilitar o deshabilitar colores en la salida (reporteros y registros)
    colors: true,

    // Nivel de registro
    // valores posibles: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Habilitar / deshabilitar observación de archivos y ejecución de pruebas cada vez que algún archivo cambia
    autoWatch: true,

    // Iniciar estos navegadores
    // lanzadores de navegadores disponibles: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'ChromeHeadless', 'ChromeHeadlessCI'],
    customLaunchers: {
        ChromeHeadlessCI: {
            base: 'ChromeHeadless',
            flags: ['--no-sandbox']
        }
    },

    proxies:  {
      '/images/': 'http://localhost:9001/images/',
      '/base/dist/js/maps/': 'http://localhost:9001/js/maps/',
      '/base/dist/js/maps/': 'http://localhost:9001/js/maps/'
    },

    // Modo de Integración Continua
    // si es true, Karma captura los navegadores, ejecuta las pruebas y sale
    singleRun: false
  };

  config.set(configuration);
};
