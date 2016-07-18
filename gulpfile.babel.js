import gulp from 'gulp';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';
import jshint from 'gulp-jshint';
import taskListing from 'gulp-task-listing';
import del from 'del';
import runSequence from 'run-sequence';

import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';

var config = {
    paths: {
        build: {
            src: 'src/browserify.js',
            dist: 'dist'
        },
        js: {
            src: [
                'src/**/*.js',
                '!src/**/browserify.js',
                '!src/**/graph-dijkstra.js'
            ],
            dist: 'test-dist/src/'
        },
        test: {
            src: 'test/**/*.js',
            graph: 'test-dist/graph/**/*.js',
            dijkstra: 'test-dist/dijkstra/**/*.js',
            dist: 'test-dist/',
            run: 'test-dist/**/*.js'
        }
    }
};

// List the available gulp tasks
gulp.task('help', taskListing);

gulp.task('clean', () =>
    del(config.paths.test.dist)
);

gulp.task('dist', ['lint-src'], function() {
    del(config.paths.build.dist); // clean build path

    // browserify source
    return browserify({
            entries: config.paths.build.src
        })
        .bundle()
        .on('error', function(err) {
            console.log(err.toString());
            this.emit("end");
        })
        .pipe(source('./graph-dijkstra.js'))
        .pipe(buffer())
        .pipe(gulp.dest(config.paths.build.dist))
        .pipe(rename('graph-dijkstra.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.paths.build.dist));
});

gulp.task('babel', ['babel-src', 'babel-test']);

gulp.task('babel-src', ['lint-src'], () =>
    gulp.src(config.paths.js.src)
        .pipe(babel())
        .pipe(gulp.dest(config.paths.js.dist))
);

gulp.task('babel-test', ['lint-test'], () =>
    gulp.src(config.paths.test.src)
        .pipe(babel())
        .pipe(gulp.dest(config.paths.test.dist))
);

gulp.task('lint-src', () =>
    gulp.src(config.paths.js.src)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
);

gulp.task('lint-test', () =>
    gulp.src(config.paths.test.src)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
);

gulp.task('watch', () => {
    gulp.watch(config.paths.js.src, ['babel-src', 'test']);
    gulp.watch(config.paths.test.src, ['babel-test', 'test']);
});

gulp.task('test', ['babel'], () =>
    gulp.src([config.paths.test.run])
        .pipe(mocha({
            reporter: 'spec'
        }))
        .on('error', err => console.log(err.stack))
);

gulp.task('test-graph', ['babel'], () =>
    gulp.src([config.paths.test.graph])
        .pipe(mocha({
            reporter: 'spec'
        }))
        .on('error', err => console.log(err.stack))
);

gulp.task('test-dijkstra', ['babel'], () =>
    gulp.src([config.paths.test.dijkstra])
        .pipe(mocha({
            reporter: 'spec'
        }))
        .on('error', err => console.log(err.stack))
);

// Build Task
gulp.task('build', () =>
    runSequence('clean', ['test'], 'dist')
);

// Default Task
gulp.task('default', () =>
    runSequence('clean', ['test'], 'watch')
);
