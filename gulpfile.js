/*
 * create by 10191772 in 14/09/2017
 */

// 构建前端工具流
var gulp = require('gulp')
// sass 预处理器
var sass = require('gulp-sass')


// 新创建一个 browserSync 静态服务器
var browserSync = require('browser-sync').create();
// 页面重载
var reload = browserSync.reload
// 弹窗任务提示
var notify = require('gulp-notify')
// 压缩js
var minify = require('gulp-minify')
// 压缩 css
var cleancss = require('gulp-clean-css')
// 合并文件
var concat = require('gulp-concat');
// 资源匹配
var sourcemaps = require('gulp-sourcemaps')
// 版本控制
var rev = require('gulp-rev')
// 
var revCollector = require('gulp-rev-controllecor')

gulp.task('default', ['sass'])

gulp.task('sass', function() {
  return gulp
    .src(['./src/css/**/*.scss', './src/css/**/*.css'])
    .pipe(sourcemaps.init())
    .pipe(concat('index.css'))
    .pipe(sass())
    .pipe(cleancss())
    .pipe(rev())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dest/css'))

    .pipe(rev.manifest())
    .pipe(gulp.dest('./rev'))
    .pipe(reload({stream: true}))
    .pipe(notify('完成了 less -> css [<%= file.relative %>]'))
})

gulp.task('html', function() {
  return gulp
    .src('./src/*.html')
    .pipe(gulp.dest('./dest/'))
    .pipe(reload({stream: true}))
    .pipe(notify('完成了 html 改变'))
})

gulp.task('image', function() {
  return gulp
    .src('./src/images/*.*')
    .pipe(gulp.dest('./build/images'))
})

gulp.task('rev', function() {
  gulp.src(['./rev/*.json', 'index.html'],)
    .pipe(gulp.dest('./dest'))
})

// 静态服务器
gulp.task('browser-sync',['sass', 'html'], function() {
  browserSync.init({
    server: {
      baseDir: './',
    }
  })

  gulp.watch('src/**/*', ['sass'])
  gulp.watch('./src/*.html', ['html'])
})