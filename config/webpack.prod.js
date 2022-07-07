// Node.js的核心模块，专门用来处理文件路径
const path = require("path");

// 引入webpack的Eslint插件
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
// 引入webpack的html插件
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 引入weboack的css插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 引入webpack的css压缩插件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// 使用函数封装loader配置
const getStyleLoaders= (preProcessor)=> {
    return [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env" // 能解决大多数样式兼容性问题
                    ]
                }
            }
        },
        preProcessor
    ].filter(Boolean);
};

module.exports= {
    // 入口
    // 相对路径和绝对路径都行
    entry: "./src/main.js",
    // 输出
    output: {
        path: path.resolve(__dirname, "../dist"),   // 生产模式需要输出
        filename: "static/js/main.js",              // 将js文件打包到static/js目录下
        clean: true                                 // 打包之前自动将上次打包内容清空
    },
    // 加载器
    module: {
        rules: [
            {
                // test: 使用正则表达式匹配以.css结尾的文件
                test: /\.css$/,
                // use: 加载需要使用的loader(user\数组中的内容从右往左执行)
                /* 
                  MiniCssExtractPlugin.loader会在打包时将css文件从js中取出,
                  单独打包成一个css文件,再通过link标签自动引入 
                */
                // 调用getStyleLoaders函数,自动添加loader
                use: getStyleLoaders()
            },
            {
                // test: 使用正则表达式匹配以.less结尾的文件
                test: /\.less$/,
                // use: 加载需要使用的loader(user\数组中的内容从右往左执行)
                // 调用getStyleLoaders函数,手动动添加less-loader
                use: getStyleLoaders("less-loader")
            },
            {
                // test: 使用正则表达式匹配以.sass或.scss结尾的文件
                test: /\.s[ac]ss$/,
                // 调用getStyleLoaders函数,手动动添加sass-loader
                use: getStyleLoaders("sass-loader")
            },
            {
                // test: 使用正则表达式匹配以.styl结尾的文件
                test: /\.styl$/,
                // 调用getStyleLoaders函数,手动动添加stylus-loader
                use: getStyleLoaders("stylus-loader")
            },
            {
                // test: 使用正则表达式匹配以.png,.jpg,.jpeg,.gif,.webp结尾的文件(图片)
                test: /\.(png|jpe?g|gif|webp)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        // 小于150kb的图片会做base64处理(将图片转换成字符串)
                        maxSize: 150 * 1024
                    }
                },
                generator: {
                    // 将图片文件输出到static/imgs目录中
                    // 图片名称为: [hash:8][ext][query]
                    // [hash:8]: hash值取八位
                    // [ext]: 使用之前的文件扩展名
                    // [query]: 添加之前的query参数
                    filename: "static/imgs/[hash:8][ext][query]"
                }
            },
            {
                // test: 使用正则表达式匹配以.ttf,.woff,.woff2结尾的文件(字体)
                test: /\.(ttf|woff2?)$/,
                type: "asset/resource",
                generator: {
                    filename: "static/fonts/[hash:8][ext][query]"
                }
            },
            {
                // test: 使用正则表达式匹配以.mp3,.mp4,.avi结尾的文件(视频)
                test: /\.(mp4|avi)$/,
                type: "asset/resource",
                generator: {
                    filename: "static/video/[hash:8][ext][query]"
                }
            },
            {
                // test: 使用正则表达式匹配以.mp3,.flac结尾的文件(音频)
                test: /\.(mp3|flac)$/,
                type: "asset/resource",
                generator: {
                    filename: "static/audio/[hash:8][ext][query]"
                }
            },
            {
                // test: 使用正则表达式匹配以.js结尾的文件(js代码)
                test: /\.js$/,
                // exclude: 使用babel时不对node_modules进行编译
                exclude: /node_modules/,
                loader: "babel-loader",
            }
        ]
    },
    // 插件
    plugins: [
        new ESLintWebpackPlugin({
            // 指定检查文件的根目录(Eslint检查的文件名:src)
            context: path.resolve(__dirname, "../src")
        }),
        new HtmlWebpackPlugin({
            // 以 public/index.html 为模板创建文件
            // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
            template: path.resolve(__dirname, "../public/index.html")
        }),
        new MiniCssExtractPlugin({
            // 定义css文件打包名称和路径
            filename: "static/css/main.css"
        }),
        // 使用css的压缩插件
        new CssMinimizerPlugin()
    ],
    // 模式
    mode: "production" // 生产者模式
}