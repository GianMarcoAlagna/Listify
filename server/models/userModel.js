const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const todoItemSchema = new Schema({
    value: {type: String, required: true},
    checked: {type: Boolean, default: false},
    sublist: [{
        value: {type: String, required: true},
        checked: {type: Boolean, default: false},
    }]
});

const todoSchema = new Schema({
    items: [
        todoItemSchema
    ]
});

const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    textEditor: {type: String, default: ''},
    todo: todoSchema
});

userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, 10);
    return next();
});

const User = mongoose.model('User', userSchema);
const Todo = mongoose.model('Todo', todoSchema);
const TodoItem = mongoose.model('TodoItem', todoItemSchema);

module.exports = {
    TodoItem,
    Todo,
    User
};