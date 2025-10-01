const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let posts = [
    {
        id: 1,
        title: "Первая статья",
        content: "Содержание первой статьи",
        author: "Иван Иванов",
        tags: ["nodejs", "express"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];
let nextId = 2;

app.get('/api/posts', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    const result = posts.slice(startIndex, endIndex);
    
    res.json({
        success: true,
        data: result,
        page,
        limit,
        total: posts.length
    });
});

app.get('/api/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) {
        return res.status(404).json({
            success: false,
            error: 'Статья не найдена'
        });
    }
    res.json({
        success: true,
        data: post
    });
});

app.post('/api/posts', (req, res) => {
    const { title, content, author, tags } = req.body;
    
    if (!title || !content || !author) {
        return res.status(400).json({
            success: false,
            error: 'Заголовок, содержание и автор обязательны'
        });
    }
    
    const newPost = {
        id: nextId++,
        title,
        content,
        author,
        tags: tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    posts.push(newPost);
    
    res.status(201).json({
        success: true,
        data: newPost
    });
});

app.put('/api/posts/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    
    if (postIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Статья не найдена'
        });
    }
    
    const { title, content, author, tags } = req.body;
    
    posts[postIndex] = {
        ...posts[postIndex],
        title: title || posts[postIndex].title,
        content: content || posts[postIndex].content,
        author: author || posts[postIndex].author,
        tags: tags || posts[postIndex].tags,
        updatedAt: new Date().toISOString()
    };
    
    res.json({
        success: true,
        data: posts[postIndex]
    });
});

app.delete('/api/posts/:id', (req, res) => {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
    
    if (postIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Статья не найдена'
        });
    }
    
    posts.splice(postIndex, 1);
    
    res.json({
        success: true,
        message: 'Статья удалена'
    });
});

app.get('/api/posts/search', (req, res) => {
    const query = req.query.q;
    
    if (!query) {
        return res.status(400).json({
            success: false,
            error: 'Поисковый запрос обязателен'
        });
    }
    
    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.author.toLowerCase().includes(query.toLowerCase())
    );
    
    res.json({
        success: true,
        data: filteredPosts,
        count: filteredPosts.length
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});