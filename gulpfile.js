const gulp = require('gulp')
const sass = require('gulp-sass')
const connect = require('gulp-connect')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const minify = require('gulp-minify-css')
const imagemin = require('gulp-imagemin')

// 任务名、任务事
gulp.task('hello', function () {
  console.log('Gulp负责前端开发阶段的任务，文件的合并，压缩，优化')
})

// 任务名数组
// gulp.task('default', ['hello'])

// *.*就是全部文件
gulp.task('images', function() {
  return gulp.src('images/icons/*.{png,jpg}')
    .pipe(gulp.dest('dist/images/icon'))
})

gulp.task('data', function() {
  return gulp.src(['xml/*.xml','json/*.json','!json/secret-*.json'])
    .pipe(gulp.dest('dist/data'))
})

gulp.task('build', ['copy-index', 'images', 'data'], function () {
  console.log('活干完了')
})


gulp.task('sass', function() {
  gulp.src('stylesheet/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
})




// src 代表根目录

gulp.task('server',function() {
  connect.server({
    root: 'dist/',
    port: 3000,
    livereload: true
  })
})

gulp.task('watch', function() {
  gulp.watch('index.html', ['copy-index'])
})

gulp.task('copy-index', function() {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'))
    .pipe(connect.reload())
})

gulp.task('default', ['server', 'watch'])


// 合并
gulp.task('script', function() {
  return gulp.src(['javascripts/jquery.js',
   'javascripts/modernizr.js'])
   .pipe(concat('vendor.js'))
   .pipe(gulp.dest('dist/js'))
})

// 压缩，重命名
gulp.task('zip', function() {
  return gulp.src(['javascripts/jquery.js',
   'javascripts/modernizr.js'])
   .pipe(concat('vendor.js'))
   .pipe(gulp.dest('dist/js'))
   .pipe(uglify())
   .pipe(rename('vendor.min.js'))
   .pipe(gulp.dest('dist/js'))
})

// 压缩css
gulp.task('minify', function() {
  gulp.src('stylesheet/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('dist/css'))
})

// 图片优化
gulp.task('imagemin', function() {
  return gulp.src('images/icons/*.{png,jpg}')
    .pipe(gulp.dest('dist/images/icon'))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images/icon'))
})
