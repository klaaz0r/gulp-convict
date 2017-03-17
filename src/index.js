const PluginError = require('gulp-util').PluginError
const gutil = require('gulp-util')
const through = require('through2')
const path = require('path')
const convict = require('convict')
const Vinyl = require('vinyl')
const fs = require('fs')

const PLUGIN_NAME = 'gulp-convict'
const ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'development'

module.exports = function(options) {
  return through.obj(function(file, encoding, callback) {

    if (file.isNull()) return callback(null, file)
    if (file.isStream()) this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'))

    if (file.isBuffer()) {
      const fileName = path.basename(file.path, '.js')
      //compare filename to NODE_ENV
      if (fileName === ENV) {
        //load the default schema
        const config = convict(require(options.schema))

        //get the data from the input
        const envSchema = require(file.path).default

        // write the config
        const configObj = JSON.stringify(config.get(), null, 2)

        if (options.log) gutil.log('config', gutil.colors.magenta(configObj))

        const configFile = new Vinyl({
          path:  options.name ? `${options.name}`: 'config.json',
          contents: new Buffer(configObj)
        })

        // return the config file
        return callback(null, configFile)
      }

      //do nothing, wrong env schema
      return callback(null, null)
    }
  })
}
