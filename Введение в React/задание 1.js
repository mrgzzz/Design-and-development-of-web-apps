import React, { useState, useEffect } from 'react';

const AdvancedTodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [language, setLanguage] = useState('ru');

    useEffect(() => {
        const saved = localStorage.getItem('todos');
        if (saved) setTodos(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const translations = {
        ru: {
            title: 'Мои задачи',
            placeholder: 'Новая задача...',
            add: 'Добавить',
            all: 'Все',
            active: 'Активные',
            completed: 'Завершенные',
            search: 'Поиск...',
            empty: 'Нет задач'
        },
        en: {
            title: 'My Tasks',
            placeholder: 'New task...',
            add: 'Add',
            all: 'All',
            active: 'Active',
            completed: 'Completed',
            search: 'Search...',
            empty: 'No tasks'
        }
    };

    const t = translations[language];

    const addTodo = () => {
        if (inputValue.trim()) {
            setTodos([...todos, {
                id: Date.now(),
                text: inputValue,
                completed: false,
                createdAt: new Date()
            }]);
            setInputValue('');
        }
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const filteredTodos = todos
        .filter(todo => {
            if (filter === 'active') return !todo.completed;
            if (filter === 'completed') return todo.completed;
            return true;
        })
        .filter(todo =>
            todo.text.toLowerCase().includes(search.toLowerCase())
        );

    return (
        <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>{t.title}</h1>
                <button onClick={() => setLanguage(lang => lang === 'ru' ? 'en' : 'ru')}>
                    {language === 'ru' ? 'EN' : 'RU'}
                </button>
            </div>

            <input
                type="text"
                placeholder={t.search}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
            />

            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder={t.placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    style={{ flex: 1, padding: '8px', marginRight: '10px' }}
                />
                <button onClick={addTodo}>{t.add}</button>
            </div>

            <div style={{ marginBottom: '20px' }}>
                {['all', 'active', 'completed'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            marginRight: '10px',
                            backgroundColor: filter === f ? '#007bff' : '#f8f9fa',
                            color: filter === f ? 'white' : 'black'
                        }}
                    >
                        {t[f]}
                    </button>
                ))}
            </div>

            <div>
                {filteredTodos.length === 0 ? (
                    <p>{t.empty}</p>
                ) : (
                    filteredTodos.map(todo => (
                        <div
                            key={todo.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '10px',
                                border: '1px solid #ddd',
                                marginBottom: '5px',
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                opacity: todo.completed ? 0.6 : 1
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                                style={{ marginRight: '10px' }}
                            />
                            <span style={{ flex: 1 }}>{todo.text}</span>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}
                            >
                                ×
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdvancedTodoApp;