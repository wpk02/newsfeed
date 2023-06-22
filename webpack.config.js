//webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // плагин, необходимый для подстановки в файл index.html скрипта сгенерированного webpack
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  entry: { main: './src/index.js' },      // точка входа - указывает путь к основному скрипту проекта, отыскав его, вебпак выстроит дерево зависимостей и раскрутит все импорты по цепочке
  output: {                               // точка куда должен выгружаться конечный результат работы. Путь должен быть абсолютным, для это пользуемся встроенной в node утилитой path
    path: path.resolve(__dirname, 'dist'), // выстраиваем путь к папке и записываем имя папки куда выгружаем
    filename: 'main.[contenthash].js',                   // имя конечного файла
  },
  mode: process.env.NODE_ENV,                      // режим разработчика. Оптимизирует процесс сборки, когда мы отлаживаем свой проект.
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '/.dist'),
    compress: true,
    port: 8080,
    open: true
  },
  module: {
    rules: [ // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader его нужно установить в проект через npm i babel-loader
        use: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/' // раздел исключений - включаем сюда директории через которые не хотим чтобы проходил babel-loader
      },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'  // asset/resource управляет статичными файлами - графика, шрифты, переносит их из исходников в финальную сборку проекта и подставляет правильные пути к ним
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // style-loader и css-loader Устанавливаем их в проект npm i css-loader style-loader --save-dev 
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ]
}