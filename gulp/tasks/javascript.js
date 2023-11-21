import webpack from 'webpack-stream';
import dynamicEntryPoints from 'dynamic-webpack-entries';
import babel from 'gulp-babel';

const entries = dynamicEntryPoints({
  entryFolder: './src/js',
  options: {
    ignore: ['./src/js/components/**/*.js', './src/js/vendor/*.js', './src/js/functions/*.js', './src/js/default/*.js']
  }
});


export const js = () => {
  return app.gulp.src(app.path.src.js, { sourcemaps: app.isBuild })
    .pipe(webpack({
      mode: !app.isBuild ? 'development' : 'production',
      entry: entries,
      output: {
        filename: '[name].min.js'
      },
      module: {
        rules: [
          {
            test: /\.(sass|less|css)$/,
            use: ["style-loader", "css-loader", 'sass-loader'],
          },
        ]
      }
    }))
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browsersync.stream())
}