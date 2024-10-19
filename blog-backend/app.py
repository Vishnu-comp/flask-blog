from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///posts.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# Define the Post model
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    author = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'author': self.author
        }

# Create the database
with app.app_context():
    db.create_all()

# Routes

@app.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.all()
    return jsonify([post.to_dict() for post in posts]), 200

@app.route('/posts', methods=['POST'])
def create_post():
    data = request.json
    post = Post(
        title=data['title'],
        content=data['content'],
        author=data['author']
    )
    db.session.add(post)
    db.session.commit()
    return jsonify(post.to_dict()), 201

@app.route('/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.get(post_id)
    if post:
        return jsonify(post.to_dict()), 200
    return jsonify({'message': 'Post not found'}), 404

@app.route('/posts/<int:post_id>', methods=['PUT'])
def update_post(post_id):
    post = Post.query.get(post_id)
    if post:
        data = request.json
        post.title = data['title']
        post.content = data['content']
        post.author = data['author']
        db.session.commit()
        return jsonify(post.to_dict()), 200
    return jsonify({'message': 'Post not found'}), 404

@app.route('/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.get(post_id)
    if post:
        db.session.delete(post)
        db.session.commit()
        return jsonify({'message': 'Post deleted'}), 200
    return jsonify({'message': 'Post not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
