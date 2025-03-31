import { src, dest, watch, parallel } from "gulp";
import GulpCleanCss from "gulp-clean-css";
import uglify from "gulp-uglify";
import concat from "gulp-concat";

const paths = {
    js: "./src/js/**/*.js",
    css: "./src/css/**/*.css",
};

function minifyCSS() {
    return src(paths.css)
        .pipe(concat("bundle.min.css"))
        .pipe(GulpCleanCss())
        .pipe(dest("./public/src/css"));
}
function minifyJS() {
    return src(paths.js)
        .pipe(concat("bundle.min.js"))
        .pipe(uglify())
        .pipe(dest("./public/src/js"));
}

export function dev(done) {
    watch(paths.css, minifyCSS);
    watch(paths.js, minifyJS);
    done();
}

export default parallel(dev);
