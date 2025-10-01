const Joi = require('joi');

const postSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().min(10).required(),
    author: Joi.string().min(2).max(50).required(),
    tags: Joi.array().items(Joi.string()).optional()
});

const userSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required()
});

const validatePost = (req, res, next) => {
    const { error } = postSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({
            success: false,
            error: error.details[0].message
        });
    }
    next();
};

const validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({
            success: false,
            error: error.details[0].message
        });
    }
    next();
};

app.post('/api/posts', validatePost, (req, res) => {
    const { title, content, author, tags } = req.body;
    
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

app.post('/api/auth/register', validateUser, (req, res) => {
    const { username, password, email } = req.body;
    
    const existingUser = users.find(u => u.username === username || u.email === email);
    if (existingUser) {
        return res.status(400).json({
            success: false,
            error: 'Пользователь уже существует'
        });
    }
    
    const newUser = {
        id: users.length + 1,
        username,
        password,
        email
    };
    
    users.push(newUser);
    
    const token = jwt.sign({ id: newUser.id, username: newUser.username }, JWT_SECRET);
    
    res.status(201).json({
        success: true,
        data: {
            user: { id: newUser.id, username: newUser.username, email: newUser.email },
            token
        }
    });
});

const errorLogger = (err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Ошибка:`, err.message);
    next(err);
};

const errorHandler = (err, req, res, next) => {
    res.status(500).json({
        success: false,
        error: 'Внутренняя ошибка сервера'
    });
};

app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Маршрут не найден'
    });
});

app.use(errorLogger);
app.use(errorHandler);