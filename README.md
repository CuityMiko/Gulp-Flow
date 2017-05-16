# Gulp-Flow
🐯前端工作流-合并、压缩、优化
# 启动项目
```javascript
npm install
```

# gulp怎么玩?为什么玩？
1. 易于使用
通过代码优于配置的策略，Gulp 让简单的任务简单，复杂的任务可管理。

2. 构建快速
利用 Node.js 流的威力，你可以快速构建项目并减少频繁的 IO 操作。

3. 插件高质
Gulp 严格的插件指南确保插件如你期望的那样简洁高质得工作。

4. 易于学习
通过最少的 API，掌握 Gulp 毫不费力，构建工作尽在掌握：如同一系列流管道。

**前端工作流**

##场景

vue-cli ??? 自动打包
vue build打包时候其实就是在文件的合并，压缩，优化，到dist文件夹

##开始

    yarn add gulp -S

```javascript
const gulp = require('gulp')

// 任务名、任务事
gulp.task('hello', function () {
  console.log('Gulp负责前端开发阶段的任务，文件的合并，压缩，优化')
})
```
###执行任务：
	gulp hello
  
###任务数组,默认就不用写了
	gulp.task('default', ['hello'])
    
##复制
```javascript
// src 代表根目录
gulp.task('copy-index', function() {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'))
})
```

##直接打包整个文件夹的拷贝和处理
```javascript
// *.*就是全部文件
// */* 走一级，匹配下一层
// **/* 所有都要
gulp.task('images', function () {
  return gulp.src('images/icons/*.{png,jpg}')
    .pipe(gulp.dest('dist/images/icon'))
})
```

##打包多个
```
gulp.task('data', function () {
  return gulp.src(['xml/*.xml','json/*.json'])
    .pipe(gulp.dest('dist/data'))
})
```

##跳过一些文件

排除类似secret-01.json的文件
```
return gulp.src(['xml/*.xml','json/*.json','!json/secret-*.json'])
    .pipe(gulp.dest('dist/data'))
```

##监视watch

```javascript
gulp.task('copy-index', function() {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'))
})


gulp.task('watch', function () {
  gulp.watch('index.html', ['copy-index'])
})
```

开放监听
```javascript
gulp watch
```

##sass转css
安装包
	yarn add gulp-sass -S
    npm i gulp-sass --save-dev
	yarn add --dev gulp-sass
    
pipe过一下
```javascript
gulp.task('sass', function() {
  gulp.src('stylesheet/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
})
```
##热更新
	yarn add --dev gulp-connect
然后
```javascript
const connect = require('gulp-connect')

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
```

##合并文件，优化减少并发
	yarn add --dev gulp-concat
    
<script></script>
<script></script>

这样引入？？有两个请求哦！！减少请求数量！

```javascript
gulp.task('script', function() {
  return gulp.src(['javascripts/jquery.js',
   'javascripts/modernizr.js'])
   .pipe(concat('vendor.js'))
   .pipe(gulp.dest('dist/js'))
})
```

##压缩重命名
	const uglify = require('gulp-uglify')
	const rename = require('gulp-rename')
    
 ```javascript
 gulp.task('zip', function() {
  return gulp.src(['javascripts/jquery.js',
   'javascripts/modernizr.js'])
   .pipe(concat('vendor.js'))
   .pipe(gulp.dest('dist/js'))
   .pipe(uglify())
   .pipe(rename('vendor.min.js'))
   .pipe(gulp.dest('dist/js'))
})

##压缩css
	const minify = require('gulp-minify-css')
 ```javascript
 gulp.task('minify', function() {
  gulp.src('stylesheet/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('dist/css'))
})
```

##图片优化
	const imagemin = require('gulp-imagemin')
```javascript
gulp.task('imagemin', function() {
  return gulp.src('images/icons/*.{png,jpg}')
    .pipe(gulp.dest('dist/images/icon'))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images/icon'))
})
```
