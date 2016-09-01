/*
 * fis config
 */
fis.set('project.files', '/index.html'); // 按需编译。
// static目录
fis.set('static','/public/static');
// view目录
fis.set('view','/views');

var CONFIG = {

    // QA 测试部署路径
    deploy_qa: {
        receiver : '',
        root : '/Users/nico/56hello/fronted/rebulit/server'
    },
    // 本地测试部署路径
    deploy_local: {
        root : '/Users/nico/56hello/fronted/rebulit/server'
    },
    // 线上环境部署路径
    production: {
        root : '/Users/nico/56hello/fronted/rebulit/server'
    },
    // 发布domain
    domain : {
        online : 'http://www.your-domain.com',
        cdn : 'http://www.your-cdn.com'
    }
}

// commonjs模块化方案
fis.hook('commonjs', {
    baseUrl: './modules',
    extList: ['.js', '.jsx']
});

// 所有静态文件发布到static下面
fis.match('*', {
    release: '${static}/$0',
    url:'/static'+'$0',
    domain: 'http://cdn.56hello.com',
    useHash: true
});
// tpl文件
fis.match('*.html', {
    release: '${view}/$0',
    domain : null,
    useHash: false
});

// less文件编译成css
fis.match('*.less', {
    parser: fis.plugin('less'),
    rExt: '.css',
    useSprite: true
});

fis.match('*.{less,css}', {
    postprocessor : fis.plugin("autoprefixer",{
        // https://github.com/ai/browserslist#queries
        "browsers": ['Android >= 2.1', 'iOS >= 4', 'Firefox >= 2', 'Safari >= 3', 'Explorer >= 8', 'Chrome >= 4', "ChromeAndroid >= 2.0"],
        "flexboxfixer": true,
        "gradientfixer": true
    })
});

fis.match('{/modules/**.js, *.jsx}', {
    parser: fis.plugin('babel-5.x', {}, {
        sourceMaps: true,
        plugins: [
            "transform-react-jsx",
            "transform-runtime",
            "transform-class-properties"
        ],
        presets: ["es2015", "react", "stage-3"]
    }),
    rExt: 'js',
    preprocessor: [
        fis.plugin('js-require-file'),
        fis.plugin('js-require-css')
    ]
});
// fis3 中预设的是 fis-components，这里不需要，所以先关了。
// fis.unhook('components');
// 使用 fis3-hook-node_modules 插件。
// 需要 npm install fis3-hook-node_modules --save-dev ， 之后需要安装 npm install process --save-dev
fis.hook('node_modules');
// 模块化
fis.match('/{node_modules,modules}/**.{js,jsx}', {
  isMod: true
});

fis.match('*.png', {
    optimizer: fis.plugin('png-compressor')
});

fis.match('::package', {
    spriter: fis.plugin('csssprites'),
    postpackager: fis.plugin('loader', {
        useInlineMap: true
    })
})

// fis3 release local
fis.media('local').match('*', {
    deploy: fis.plugin('local-deliver', {
        to: CONFIG.deploy_local.root
    })
})

// fis3 release qa
fis.media('qa').match('*', {
    deploy: fis.plugin('http-push', {
        receiver: CONFIG.deploy_qa.receiver,
        to: CONFIG.deploy_qa.root
    })
})

// fis3 release pro
fis.media('pro').match('*.{js,jsx}', {
    optimizer: fis.plugin('uglify-js'),
    moduleId: function (m, path) {
        return fis.util.md5(path)
    }
}).match('::packager', {
    packager: fis.plugin('deps-pack', {
        // 第一步，将 /node_module 中的依赖项，打包成 static/vendors.js
        'static/vendors.js': [
            '/modules/main.jsx:deps',
            '!/modules/**'
        ],
        // 第二步，将 /app 中的依赖项，打包成 static/main.js
        'static/main/app.js': [
            '/modules/main.jsx',
            '/modules/main.jsx:deps'
        ],

        // ---------上面是按需打包js文件---------

        // 将几个直接以<script>方式引用到 html 中的 js 文件（例如 fastclick.js、mod.js、百度统计的js等）打包成一个 lib.js ，减少http请求
        // js工具包，一般单独放在 resource 文件夹下面
        'static/libs.js': '/resource/**.js',

        // 将所有的less、css，都打包成一个css文件
        // 在此打包 css，因为 fis.match('::packager' 配置的打包优先级更高
        'static/base.css': '/resource/**.{less,css}',
        'static/main.css': '/modules/**.{less,css}'
    })
}).match('*.{css,less}', {
    optimizer: fis.plugin('clean-css')
}).match('*', {
    domain : CONFIG.domain.cdn,
    deploy: fis.plugin('http-push', {
        receiver: CONFIG.deploy_qa.receiver,
        to: CONFIG.deploy_qa.root
    })
})



fis.media('pre').match('*.{js,jsx}', {
    optimizer: fis.plugin('uglify-js'),
    moduleId: function (m, path) {
        return fis.util.md5(path)
    }
}).match('*.{css, less}', {
    optimizer: fis.plugin('clean-css')
}).match('::packager', {
    packager: fis.plugin('deps-pack', {
        // 第一步，将 /node_module 中的依赖项，打包成 static/vendors.js
        'static/vendors.js': [
            '/modules/main.jsx:deps',
            '!/modules/**'
        ],
        // 第二步，将 /app 中的依赖项，打包成 static/main.js
        'static/main/app.js': [
            '/modules/main.jsx',
            '/modules/main.jsx:deps'
        ],

        // ---------上面是按需打包js文件---------

        // 将几个直接以<script>方式引用到 html 中的 js 文件（例如 fastclick.js、mod.js、百度统计的js等）打包成一个 lib.js ，减少http请求
        // js工具包，一般单独放在 resources 文件夹下面
        'static/libs.js': '/resources/**.js',

        // 将所有的less、css，都打包成一个css文件
        // 在此打包 css，因为 fis.match('::packager' 配置的打包优先级更高
        'static/base.css': '/resources/**.{less,css}',
        'static/main.css': '/modules/**.{less,css}'
    })
}).match('*', {
    domain : null,
    deploy: fis.plugin('local-deliver', {
        to: CONFIG.deploy_local.root
    })
})

// fis3 release staging
fis.media('staging').match('*', {
    optimizer: null,
    useSprite: false,
    useHash: false,
    packTo : null,
    domain : null,
    deploy: fis.plugin('local-deliver', {
        to: CONFIG.deploy_local.root
    })
})
