// Основной модуль
import gulp from 'gulp';
// Импорт путей
import { path } from './gulp/config/path.js';
// Импорт плагинов
import { plugins } from './gulp/config/plugins.js';

// Импорт задач
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/javascript.js';
import { images } from './gulp/tasks/images.js';
import { svg } from './gulp/tasks/svg.js';
import { resources } from './gulp/tasks/resources.js';
import { fonts } from './gulp/tasks/fonts.js';
import { zip } from './gulp/tasks/zip.js';

// Передаем значения в глобальную переменную
global.app = {
  isBuild: process.argv.includes('--build'),
  path: path,
  gulp: gulp,
  plugins: plugins,
}

// Наблюдатель за изменениями
function watcher() {
  gulp.watch(path.watch.html, html); // (путь, задача)
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.resources, resources);
  gulp.watch(path.watch.fonts, fonts);
  gulp.watch(path.watch.images, images);
}


// Построение сценариев выполнения задач
const mainTasks = gulp.parallel(html, scss, js, images, resources, fonts, svg);

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const buildZip = gulp.series(reset, mainTasks, zip);
const backend = gulp.series(reset, mainTasks);

// Экспорт сценариев
export { dev }
export { build }
export { buildZip }
export { backend }

// Выполнение сценариев
gulp.task('default', dev); // gulp
gulp.task('build', build); // gulp build --build
gulp.task('buildZip', buildZip); // gulp buildZip --build
gulp.task('backend', backend); // gulp backend