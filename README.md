# gulp-convict

With this gulp plugin you can use convict in your gulp, it makes it easy to use different configs based on the `NODE_ENV`.

## howto

you need to give a source with the folder containing all your schema's matching with your environment, so for example I can have a production.js file in my /config folder

```javascript
export default {
  core: {
    protocol: 'https',
    hostname: 'api.yourdomain.io'
  },
  logger: {
    level: 'debug'
  }
}
```  

This config will be extending or overwriting my default schema, looking like this

```javascript
export default {
  core: {
    protocol: 'http',
    hostname: 'localhost:9090'
  },
  logger: {
    level: 'trace'
  }
}
```

the following options are available

name  | description
--- | ---
name | output name
schema | base schema file path
log | set it true if you want to log out the config file that was made

## example

```javascript
import convict from 'gulp-convict'

gulp.task('config', 'get the config based on env', () => {
  return gulp.src('./config/*.js')
    .pipe(convict({ log: true, schema: __dirname + '/config/schema.js' }))
    .pipe(gulp.dest('./app'))
})
```
