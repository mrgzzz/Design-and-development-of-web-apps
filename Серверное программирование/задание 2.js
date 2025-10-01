const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';

let users = [
    { id: 1, username: 'admin', password: 'admin123', email: 'admin@example.com' }
];

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Токен отсутствует'
        });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            error: 'Неверный токен'
        });
    }
};

app.post('/api/auth/register', (req, res) => {
    const { username, password, email } = req.body;
    
    if (!username || !password || !email) {
        return res.status(400).json({
            success: false,
            error: 'Все поля обязательны'
        });
    }
    
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

app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        return res.status(401).json({
            success: false,
            error: 'Неверные учетные данные'
        });
    }
    
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET);
    
    res.json({
        success: true,
        data: {
            user: { id: user.id, username: user.username, email: user.email },
            token
        }
    });
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    
    res.json({
        success: true,
        data: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    });
});

app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({
        success: true,
        message: 'Это защищенный маршрут',
        user: req.user
    });
});