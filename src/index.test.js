import convict from './index'
import gulp from 'gulp'
import File from 'vinyl'
import { readFileSync } from 'fs'
import assert from 'assert'

describe('gulp convict', function() {
  describe('test suite', function() {

    it('create config file for development without logging', function(cb) {
      const development = new File({
        path: __dirname + '/config/development.js',
        contents: readFileSync('./src/config/development.js')
      })
      const convictPlugin = convict({ log: false, schema: __dirname + '/config/schema.js' });
      convictPlugin.write(development)
      convictPlugin.once('data', function(file) {
        assert(file.isBuffer())
        cb()
      })

    })

    it('create config file for development with logging', function(cb) {
      const development = new File({
        path: __dirname + '/config/development.js',
        contents: readFileSync('./src/config/development.js')
      })
      const convictPlugin = convict({ log: true, schema: __dirname + '/config/schema.js' });
      convictPlugin.write(development)
      convictPlugin.once('data', function(file) {
        assert(file.isBuffer())
        cb()
      })
    })

    it('create config file for development with custom name', function(cb) {
      const development = new File({
        path: __dirname + '/config/development.js',
        contents: readFileSync('./src/config/development.js')
      })
      const convictPlugin = convict({ name: 'options', log: false, schema: __dirname + '/config/schema.js' });
      convictPlugin.write(development)
      convictPlugin.once('data', function(file) {
        assert(file.isBuffer())
        cb()
      })

    })

  })
})
