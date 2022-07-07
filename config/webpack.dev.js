// Node.js的核心模块，专门用来处理文件路径
const path = require("path");

// 引入webpack的Eslint插件
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
// 引入webpack的html插件
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports= {
    // 入口
    // 相对路径和绝对路径都行
    entry: "./src/main.js",
    // 输出
    output: {
        path: undefined,                // 开发模式没有输出,不需要配置输出目录
        filename: "static/js/main.js",  // 将js文件打包到static/js目录下
        // clean: true                  // 开发模式不需要清空
    },
    // 加载器
    module: {
        rules: [
            {
                // test: 使用正则表达式匹配以.css结尾的文件
                test: /\.css$/,
                // use: 加载需要使用的loader(user\数组中的内容从右往左执行)
                use: ["style-loader", "css-loader"]
            },
            {
                // test: 使用正则表达式匹配以.less结尾的文件
                test: /\.less$/,
                // use: 加载需要使用的loader(user\数组中的内容从右往左执行)
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                // test: 使用正则表达式匹配以.sass或.scss结尾的文件
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                // test: 使用正则表达式匹配以.styl结尾的文件
                test: /\.styl$/,
                use: ["style-loader", "css-loader", "stylus-loader"]
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
                // 配置Babel预设,通常不在这里设置,会在根目录下新建一个Babel的配置文件单独设置
                // options: {
                //     presets: ["@babel/preset-env"]
                // }
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
        })
    ],
    // 开发服务器
    devServer: {
        host: "localhost", // 启动服务器域名
        port: "3000",      // 启动服务器端口号
        open: true,        // 是否自动打开浏览器
    },
    // 模式
    mode: "development" // 开发者模式
}