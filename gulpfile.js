const gulp = require("gulp");

gulp.task("helloWorld", function()
{
    console.log("Hello World");
});

const {src, dest} = require("gulp");
const uglify = require("gulp-uglify-es").default;

gulp.task("scripts", function()
{
    console.log("Uglifying js");
    return src ("_js/**/*.js")
        .pipe(uglify())
        .pipe(dest("js"));

});

const sass = require("gulp-sass");
const cssnano = require("gulp-cssnano");
const sourcemaps = require("gulp-sourcemaps");
gulp.task("styles", function()
{
    console.log("Converting scss to css and uglifying css");
    return src("_scss/main.scss")
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(dest("css"));
});

const browsersync = require("browser-sync");
gulp.task ("server", function(done)
{
    console.log("Enabeling browser-synchronisation");
    browsersync({
        server: {
            baseDir: ["."]
        }
    });
    done();
});

const {watch, series, parallel} = require("gulp");
function reload(done)
{
    browsersync.reload();
    done();
}

gulp.task("watcher" , function()
{
    watch("_scss/**/*.scss", series("styles", reload));
    watch("_js/**/*.js", series("scripts", reload));
    watch("*.html", series(reload));
});


gulp.task("default", gulp.series(parallel("styles", "scripts"), "server", "watcher"));