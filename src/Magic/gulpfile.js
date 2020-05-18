var gulp = require('gulp'),
    sass = require('gulp-sass')
    cssmin = require("gulp-cssmin")
    rename = require("gulp-rename");

var js = [
    //{
    //    name: "magic.js",
    //    items: [
    //       "",
    //       ""
    //    ]
    //}
]

gulp.task('min:css', function () {
    return gulp.src('assets/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('wwwroot/assets/css'));
});

gulp.task("min:js", function(done) {
    for (var n = 0; n < js.length; n++) {
        gulp.src(js[n].items, { base: "." })
            .pipe(vueCompile())
            .pipe(concat(output + "js/" + js[n].name))
            .pipe(gulp.dest("."))
            .pipe(uglify().on('error', function(e) {
                console.log(e);
            }))
            .pipe(rename({
                suffix: ".min"
            }))
            .pipe(gulp.dest("."));
    }
    done();
});

//
// Default tasks
//
gulp.task("build", gulp.parallel(["min:css", "min:js"]));
gulp.task("default", gulp.series("build"));