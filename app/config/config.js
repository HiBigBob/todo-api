module.exports = {
    'secret': 'YOUR_SECRET_STRING',
    'port': 3000,
    'database': { 
        'dev': 'mongodb://localhost:27017/todo',
        'prod': '',
        'test': 'mongodb://localhost:27017/todo-test'
    }
};
