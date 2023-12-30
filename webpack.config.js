const path = require('path');

module.exports = {
  entry: './src/index.js', // Substitua com o caminho para o seu ponto de entrada
  output: {
    filename: 'bundle.js', // Nome do arquivo de saída
    path: path.resolve(__dirname, 'dist'), // Caminho para o diretório de saída
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Use regex para especificar quais arquivos deseja transpilar
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use o Babel para transpilar JavaScript
        },
      },
    ],
  },
};
