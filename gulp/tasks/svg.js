import svgmin from "gulp-svgmin"
import cheerio from "gulp-cheerio"
import svgSprite from 'gulp-svg-sprite'

export const svg = () => {
  return app.gulp.src(app.path.src.svg)
    .pipe(
      svgmin({
        js2svg: {
          pretty: true,
        },
      })
    )
    .pipe(
      cheerio({
        run: function ($) {
          $('[fill]').removeAttr('fill');
          $('[stroke]').removeAttr('stroke');
          $('[style]').removeAttr('style');
        },
        parserOptions: {
          xmlMode: true
        },
      })
    )
    .pipe(app.plugins.replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      },
    }))
    .pipe(app.gulp.dest(app.path.build.svg))
    .pipe(app.plugins.browsersync.stream())
}