//引入gulp
var gulp=require('gulp')

//copy-html
gulp.task('copy-html',function(){
    return gulp.src('*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload())
})

//images
gulp.task('images',function(){
    return gulp.src('images/**/*')
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload())
})

//json数据
gulp.task('data',function(){
    return gulp.src(['*.json','!package.json'])
    .pipe(gulp.dest('dist/data'))
    .pipe(connect.reload())
})

//php数据
gulp.task('php',function(){
    return gulp.src('*.php')
    .pipe(gulp.dest('dist/php'))
    .pipe(connect.reload())
})

//引入插件
var sass=require('gulp-sass')
var cleanCSS=require('gulp-clean-css')
var rename=require('gulp-rename')


//处理scss文件 压缩 复值 重命名
gulp.task('scss',function(){
    return gulp.src('./stylesheet/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename(function(path){
        //index  -> index.min
        path.basename = path.basename + ".min";
    }))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})

//处理js文件
gulp.task('script',function(){
    return gulp.src(['*.js','!gulpfile.js'])
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload())
})

//一次运行多个任务

gulp.task('build',['copy-html','images','script','scss','php','data'],function(){
    console.log('123')
})

//监听任务

gulp.task('watch',function(){
    gulp.watch('*.html',['copy-html'])
    gulp.watch('images/**/*',['images'])
    gulp.watch(['*.json','!package.json'],['data'])
    gulp.watch('*.php',['php'])
    gulp.watch(['*.js','!gulpfile.js'],['script'])
    gulp.watch('./stylesheet/*.scss',['scss'])
})

//启动一个临时服务器
var connect=require('gulp-connect')
gulp.task('server',function(){
    connect.server({
        root:'dist',
        port:17777,
        livereload:true
    })
})

//同时启动 监听和服务器

gulp.task('default',['watch','server'])