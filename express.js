// express.js маршрутизатор
const express = require('express');
const app     = express();
const exhbs   = require('express-handlebars');
const path    = require('path');
const multer  = require('multer');
const upload  = multer().none();
//body-parser чтобы любая стандартная форма (без enctype) корректно заполняла req.body
app.use(express.urlencoded({ extended: true }));  
const articleController = require('./controllers/articleController');
const commentController = require('./controllers/commentController');

app.engine('hbs', exhbs.engine({
  extname: '.hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Для парсинга form-data (multipart/form-data без файлов)
app.use(upload);

// Маршруты
app.get('/',                  articleController.showMainPage);
app.get('/articles/:id',      articleController.showSingleArticle);
app.get('/editArticle/:id',   articleController.showEditArticle);
app.post('/editArticle',      articleController.editArticle);

app.get('/deleteArticle/:id', articleController.deleteArticle);

app.get('/addArticle',        (req, res) => res.render('add_article'));
app.post('/addArticle',       articleController.addArticle);

app.get('/login', (req, res) => res.render('login'));
app.post('/login', articleController.login);
// Добавление комментария
app.post('/comments', commentController.addComment);
// Запуск
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});
