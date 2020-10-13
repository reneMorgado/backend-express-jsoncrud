const express = require('express')
const morgan = require('morgan');
const path = require('path');
const app = express();
const indexRouter = require('./routes/home.js');
//CONFIGURACIONES
app.set("port", 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
//ROUTES
app.use('/', indexRouter);
//STATIC
app.use('/static', express.static(path.join(__dirname, 'public')));
//APP
app.listen(app.get('port'), () => {
    console.log('app running on port' + app.get('port'))
})