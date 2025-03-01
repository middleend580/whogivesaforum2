const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./posts.db');

// Initialize the database table if it doesn't exist
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT)");
});

// Get all posts from the database
function getAllPosts() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM posts ORDER BY id ASC", (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

// Create a new post in the database
function createPost(content) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("INSERT INTO posts (content) VALUES (?)");
        stmt.run(content, function(err) {
            if (err) reject(err);
            resolve();
        });
        stmt.finalize();
    });
}

module.exports = { getAllPosts, createPost };
