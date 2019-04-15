'use strict';

import { src, dest, watch, series, parallel } from 'gulp';
import yargs from 'yargs';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import gulpif from 'gulp-if';

// css
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import cleanCss from 'gulp-clean-css';
import packageImporter from 'node-sass-package-importer';

// js
import webpack from 'webpack-stream';

// server
import browserSync from 'browser-sync';

const PRODUCTION = yargs.argv.prod;

// directory settings
const paths = {
	styles: {
		src: 'src/scss/bundle.scss',
		dest: 'dist/css'
	},
	images: {
		src: 'src/images/**/*.{jpg,jpeg,png,gif}',
		dest: 'dist/images'
	},
	svg: {
		src: 'src/icon/**/*.svg',
		dest: 'dist/icon'
	},
	scrips: {
		src: 'src/js/bundle.js',
		dest: 'dist/js'
	},
	other: {
		src: [
			'src/**/*',
			'!src/{images,js,scss}',
			'!src/{images,svg,js,scss}/**/*'
		],
		dest: 'dist'
	}
};

const sassOptions = {
	importer: packageImporter({
		extensions: [ '.scss', '.css' ]
	})
};

/**
 * Build Server
 */
const server = browserSync.create();

export const serve = done => {
	server.init({
    server: {
      baseDir: "./"
    }
  });
	done();
};

export const reload = done => {
	server.reload();
	done();
};

/**
 * Build CSS
 */
export const styles = () => {
  return src( paths.styles.src )
  .pipe(
    plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) })
  )
  .pipe( gulpif( ! PRODUCTION, sourcemaps.init() ) )
  .pipe( sass( sassOptions ).on( 'error', sass.logError ) )
  .pipe( postcss([ autoprefixer({ grid: true, flexbox: 'no-2009' }) ]) )
  .pipe( gulpif( PRODUCTION, cleanCss() ) )
  .pipe( gulpif( ! PRODUCTION, sourcemaps.write() ) )
  .pipe( dest( paths.styles.dest ) )
    .pipe( rename({ suffix: '.min' }) )
    .pipe( dest( paths.styles.dest ) )
}

/**
 * Build JS
 */
export const scripts = () => {
	return src( paths.scrips.src )
		.pipe(
			plumber({ errorHandler: notify.onError( 'Error: <%= error.message %>' ) })
		)
		.pipe(
			webpack({
				module: {
					rules: [
						{
							test: /\.js$/,
							use: {
								loader: 'babel-loader',
								options: {
									presets: []
								}
							}
						}
					]
				},
        mode: PRODUCTION ? 'production' : 'development',
        devServer: {
          contentBase: './',
          open: true
        },
				devtool: ! PRODUCTION ? 'inline-source-map' : false,
				output: {
					filename: 'bundle.js'
				}
			})
		)
		.pipe( rename({ suffix: '.min' }) )
		.pipe( dest( paths.scrips.dest ) );
};

/**
 * Watch for changes
 */
export const watchForChanges = () => {
  watch( 'src/scss/**/*.scss', styles );
}

export const dev = series(
  parallel( styles, scripts ),
  serve,
	watchForChanges
);

export default dev;
