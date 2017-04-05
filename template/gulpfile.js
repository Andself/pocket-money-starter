'use strict'

const gulp = require('gulp')
const del = require('del');
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const autoprefixer = require('gulp-autoprefixer')
const gulpLoadPlugins = require('gulp-load-plugins')
const browserSync = require('browser-sync')
const babel = require('gulp-babel')

const $ = gulpLoadPlugins()
const reload = browserSync.reload;

gulp.task('clear', () => {
  del(['./dist'])
})

gulp.task('style', () => {
  const autoprefixerConfig = {
    browsers: ['last 2 versions', 'Android >= 4.0'],
    cascade: true,
    remove:true
  }

  gulp.src('src/style/*.css')
    .pipe(autoprefixer(autoprefixerConfig))
    .pipe(gulp.dest('dist/style/'))
})

gulp.task('html', () => {
  gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/'))
})

gulp.task('media', () => {
  gulp.src('src/media/**/*')
    .pipe(gulp.dest('dist/media'))
})

gulp.task('bundle', () => {
  gulp.src('./src/index.js')
    .pipe(webpackStream(require('./webpack.config'), webpack))
    .pipe(gulp.dest('./dist'))
})

gulp.task('dev', ['html', 'style', 'bundle'], () => {
  browserSync({
    notify: false,
    logPrefix: 'Andself',
    scrollElementMapping: ['main', '.mdl-layout'],
    server: 'dist',
    port: 3001
  });

  gulp.watch(['src/**/*.html'], ['html', reload]);
  gulp.watch(['src/style/**/*.css'], ['style', reload]);
  gulp.watch(['src/**/*.js'], ['bundle', reload]);
  gulp.watch(['src/media/**/*'], ['media', reload]);
});

gulp.task('build', ['html', 'style', 'bundle', 'media'])