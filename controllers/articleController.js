// controllers/articleController.js
const db = require('../config/db');

exports.showMainPage = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM articles ORDER BY id DESC');
    res.render('main_page', { articles: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка при получении списка статей');
  }
};

exports.showSingleArticle = async (req, res) => {
  const articleId = req.params.id;
  try {
    const result = await db.query(
      'SELECT * FROM articles WHERE id = $1',
      [articleId]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Статья не найдена');
    }
    res.render('single_article', { article: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка при получении статьи');
  }
};

exports.showEditArticle = async (req, res) => {
  const articleId = req.params.id;
  try {
    const result = await db.query(
      'SELECT * FROM articles WHERE id = $1',
      [articleId]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Статья не найдена');
    }
    res.render('edit_article', { article: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка при получении статьи для редактирования');
  }
};

exports.editArticle = async (req, res) => {
  const { article_id, title, content } = req.body;
  try {
    await db.query(
      'UPDATE articles SET title = $1, content = $2 WHERE id = $3',
      [title, content, article_id]
    );
    res.redirect('/articles/' + article_id);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка при обновлении статьи');
  }
};

exports.deleteArticle = async (req, res) => {
  const articleId = req.params.id;
  try {
    await db.query(
      'DELETE FROM articles WHERE id = $1',
      [articleId]
    );
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка при удалении статьи');
  }
};

exports.addArticle = async (req, res) => {
  const { title, content, author } = req.body;
  try {
    await db.query(
      'INSERT INTO articles(title, content, author) VALUES($1, $2, $3)',
      [title, content, author]
    );
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка при добавлении статьи');
  }
};

// Можно вынести также login-контроллер сюда:
exports.login = (req, res) => {
  console.log('email:', req.body.email);
  console.log('pass: ', req.body.pass);
  res.send('ok');
};
