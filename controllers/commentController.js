// controllers/commentController.js
const db = require('../config/db');

exports.addComment = async (req, res) => {
  const { article_id, author, body } = req.body;
  try {
    await db.query(
      `INSERT INTO comments(article_id, author, body)
       VALUES($1, $2, $3)`,
      [article_id, author, body]
    );
    res.redirect('/articles/' + article_id);
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).send('Не удалось добавить комментарий');
  }
};
