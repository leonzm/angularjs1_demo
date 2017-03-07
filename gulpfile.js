var gulp = require('gulp')
    , order = require('gulp-order')
    , inject = require('gulp-inject')
    , util = require('gulp-util')
    , url = require('url')
    , rename = require('gulp-rename')
    , mainBowerFiles = require('main-bower-files')
    , browserSync = require('browser-sync').create()
    , proxy = require('proxy-middleware')
    , imagemin = require('gulp-imagemin')
    , del = require('del')
    , uglify = require('gulp-uglify')
    , ngAnnotate = require('gulp-ng-annotate')
    , md5 = require('gulp-md5')
    , minifyCss = require('gulp-minify-css')
    , concat = require('gulp-concat')
    , htmlmin = require('gulp-htmlmin')
    , html2js = require('gulp-html2js')
    , stripDebug = require('gulp-strip-debug')
    , gzip = require('gulp-gzip')
    , filter = require('filter-array')
    , replace = require('gulp-replace')
    , gulpSequence = require('gulp-sequence').use(gulp);

var bowerSyncOpt = {
    paths: {
        bowerDirectory: './src/lib',
        bowerrc: '.bowerrc',
        bowerJson: 'bower.json'
    },
    debugging: false
};

var lib = mainBowerFiles(bowerSyncOpt);

var srcPath = {
    lib: {
        js: filter(lib, /\.js$/),
        css: filter(lib, /\.css/),
        font: filter(lib, /\.(woff|eot|svg|ttf)$/)
    },
    ref: ['src/resources/js/**/*.*', 'src/resources/css/**/*.*'],
    js: ['src/resources/js/**/*.js'],
    css: ['src/resources/css/**/*.css', 'src/resources/js/**/*.css'],
    fonts: [
        'src/lib/bootstrap/fonts/*',
        'src/lib/font-awesome/fonts/*',
        'src/lib/material-design-iconic-font/dist/fonts/*'
    ],
    html: ['src/index-origin.html'],
    template: ['src/templates/**/*.html', 'src/resources/js/component/**/*.html'],
    images: ['src/resources/imgs/**/*'],
    favicon: ['src/favicon.ico'],
    temporary: ['src/sample/**/*.json'],
    output: ['build/'],
    watchFiles: ['./src/**/*.*']
};

var configuration = {
    order: {
        js: {
            lib: [
                'jquery/dist/jquery.js',
                'underscore/underscore.js',
                'moment/moment.js',
                'moment/locale/zh-cn.js',
                'angular/angular.js',
                'highcharts/highcharts.js',
                'highcharts/**/*.js'
            ],
            application: [
                'resources/js/init.js',
                'resources/js/app.js',
                '**/**/*.config.js',
                '**/**/*.router.js',
                '**/**/*.launch.js',
                '**/**/*.constant.js',
                '**/**/*.service.js',
                '**/**/*.model.js',
                '**/**/*.controller.js',
                '**/**/*.filter.js',
                '**/**/*.directive.js',
                '**/**/*.widget.js'
            ]
        }
    },
    html: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeScriptTypeAttributes: true
    },
    inject: {
        lib: {
            name: 'bower',
            relative: true,
            ignorePath: '../build'
        },
        app: {
            name: 'app',
            relative: true,
            ignorePath: '../build/'
        },
        template: {
            name: 'template',
            relative: true,
            ignorePath: '../build/'
        }
    },
    html2js: {
        base: 'src/',
        outputModuleName: 'app',
        useStrict: true
    },
    gzip: {
        threshold: 512,
        level: 9,
        memLevel: 2
    }
};


gulp.task('clean', function () {
    del.sync('build/');
});


gulp.task('image', function () {
    gulp.src(srcPath.images).pipe(imagemin()).pipe(gulp.dest('build/resources/imgs/'));
    gulp.src(srcPath.favicon).pipe(gulp.dest('build/'));
});


gulp.task('fonts', function () {
    gulp.src(srcPath.fonts).pipe(gulp.dest('build/fonts/'));
});


gulp.task('temporary', function () {
    gulp.src(srcPath.temporary).pipe(gulp.dest('build/sample/'));
});


gulp.task('static', ['image', 'fonts', 'temporary']);


//依赖注入
gulp.task('src-inject', function () {
    var bowerSource = gulp.src(mainBowerFiles(bowerSyncOpt), {base: 'src/lib/'}).pipe(order(configuration.order.js.lib));
    var appSource = gulp.src(srcPath.ref, {base: 'src/'}).pipe(order(configuration.order.js.application));

    //模板文件
    gulp.src('src/index-origin.html')
    // 依赖的bower组建将注入到 <!-- bower:xxx --> 开头的注释中间
        .pipe(inject(bowerSource, configuration.inject.lib))
        // 注入项目文件
        .pipe(inject(appSource, configuration.inject.app))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('src/'));
});


gulp.task('src-inject-build', function () {

    var bowerLibScript
        , bowerLibStylesheet
        , applicationScript
        , applicationStylesheet
        , applicationTemplate;

    bowerLibScript =
        gulp.src(srcPath.lib.js, {base: 'src/lib/'})
            .pipe(ngAnnotate())
            .pipe(order(configuration.order.js.lib))
            .pipe(concat('bower_lib_script.js'))
            .pipe(uglify())
            .pipe(md5(12))
            .pipe(rename({extname: '.min.js'}))
            .pipe(gulp.dest('build/js/'));


    bowerLibStylesheet =
        gulp.src(srcPath.lib.css)
            .pipe(concat('bower_lib_stylesheet.css'))
            .pipe(minifyCss())
            .pipe(md5(12))
            .pipe(rename({extname: '.min.css'}))
            .pipe(gulp.dest('build/css/'));

    applicationScript =
        gulp.src(srcPath.js, {base: 'src/'})
            .pipe(ngAnnotate())
            .pipe(order(configuration.order.js.application))
            .pipe(concat('dist_application_script.js'))
            .pipe(gulp.dest('build/js/'))
            .pipe(stripDebug())
            .pipe(uglify())
            .pipe(md5(12))
            .pipe(rename({extname: '.min.js'}))
            .pipe(gulp.dest('build/js/'));

    applicationStylesheet =
        gulp.src(srcPath.css)
            .pipe(concat('dist_application_stylesheet.css'))
            .pipe(gulp.dest('build/css/'))
            .pipe(minifyCss())
            .pipe(md5(12))
            .pipe(rename({extname: '.min.css'}))
            .pipe(gulp.dest('build/css/'));

    applicationTemplate =
        gulp.src(srcPath.template)
            .pipe(html2js(configuration.html2js))
            .pipe(concat('dist_application_template.js'))
            .pipe(gulp.dest('build/js/'))
            .pipe(md5(10))
            .pipe(rename({extname: '.min.js'}))
            .pipe(gulp.dest('build/js/'));

    gulp.src(srcPath.html)
        .pipe(inject(bowerLibScript, configuration.inject.lib))
        .pipe(inject(bowerLibStylesheet, configuration.inject.lib))
        .pipe(inject(applicationScript, configuration.inject.app))
        .pipe(inject(applicationStylesheet, configuration.inject.app))
        .pipe(inject(applicationTemplate, configuration.inject.template))
        //.pipe(htmlmin(configuration.html))
        .pipe(rename({
            basename: 'index'
        }))
        .pipe(gulp.dest('build/'));
});


//重新加载任务
gulp.task('rebuild-index', ['src-inject'], function () {
    console.log('首页重新构建');
    browserSync.reload();
});


//静态服务器任务
//gulp serve --env pro
gulp.task('serve', ['src-inject'], function () {
    console.log("======================");
    console.log(util.env.env === 'pro' ? "PRODUCTION" : "DEV");
    console.log("======================");

    // 天气演示的proxy
    var wetherProxyApi = url.parse('http://wthrcdn.etouch.cn/weather_mini');
    wetherProxyApi.route = '/weather_mini';
    // 代理演示的proxy
    var proxyApi = url.parse('https://dev.juxinli.com/devPlatformApi');
    proxyApi.route = '/devPlatform';
    var middleware = [proxy(wetherProxyApi), proxy(proxyApi)];
    // var middleware = [];
    var baseServerOpts = {
        server: {
            baseDir: "src/",
            index: "index.html",
            middleware: middleware
        }
    };

    if (util.env.env == 'pro') {
        baseServerOpts.server.baseDir = 'build/';
    }

    // Serve files from the root of this project
    browserSync.init(baseServerOpts);

    if (util.env.livereload) {
        gulp.watch(srcPath.watchFiles, function (event) {
            //输出变化的文件 和发生的 事件
            console.log(event.type + ' ==> 文件路径 ' + event.path + '变化，重新读取');
            browserSync.reload();
        });
    }

    gulp.watch('./src/index-origin.html', ['rebuild-index']);
});


gulp.task('gzip', function () {
    gulp.src('build/**/*')
        .pipe(gzip(configuration.gzip))
        .pipe(gulp.dest('build/'));
});

gulp.task('build', gulpSequence('clean', 'src-inject-build', 'static', 'gzip'));