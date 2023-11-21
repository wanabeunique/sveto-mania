// Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());


const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
  build: {
    html: `${buildFolder}/`,
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    images: `${buildFolder}/img/`,
    svg: `${buildFolder}/img/svg/`,
    resources: `${buildFolder}/resources/`,
    fonts: `${buildFolder}/resources/fonts/`
  },
  src: {
    html: `${srcFolder}/*.html`,
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/*.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/img/svg/*.svg`,
    resources: [`${srcFolder}/resources/**/*.*`, `!${srcFolder}/resources/fonts/**`], // все остальные файлы, но не шрифты
    fonts: `${srcFolder}/resources/fonts/*.*`,
  },
  watch: {
    html: `${srcFolder}/**/*.html`,
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
    images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,ico,svg}`,
    resources: [`${srcFolder}/resources/**/*.*`, `!${srcFolder}/resources/fonts/**`],
    fonts: `${srcFolder}/resources/fonts/*.*`,
  },
  clean: buildFolder,
  buildFolder: `./dist`,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: ''
}
