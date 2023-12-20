window.todoapp = () => { return { 
    todos: [],
    
    editingTodo: null,
    
    newTodo: '',

    filter: 'all',

    get activeTodos() {
        return this.todos.filter(todo => !todo.completed);
    },

    get completedTodos() {
        return this.todos.filter(todo => todo.completed);
    },

    get allCompleted() {
        return this.completedTodos.length === this.todos.length;
    },

    get filteredTodos() {
        return {
            all: this.todos,
            active: this.activeTodos,
            completed: this.completedTodos,
        }[this.filter];
    },

    toggleTodos() {
        const state = this.allCompleted;

        this.todos.forEach(todo => {todo.completed = ! state});
    },

    addTodo() {
        if (!this.newTodo.trim().length) return;

        this.todos.push({
            id: Date.now(),
            text: this.newTodo.trim(),
            completed: false
        });

        this.newTodo = '';
    },

    undoTodo() {
        this.newTodo = '';
    },

    editTodo(todo) {
        todo.previousText = todo.text;
        this.editingTodo = todo;
    },

    updateTodo(todo) {
        delete todo.previousText;
        this.editingTodo = null;
    },

    cancelTodo(todo) {
        todo.text = todo.previousText;
        delete todo.previousText;
        this.editingTodo = null;
    },

    deleteTodo(todoToRemove) {
        this.todos = this.todos.filter(todo => todo.id != todoToRemove.id);
    },

    clearCompleted() {
        this.todos = this.activeTodos;
    },

    pluralize(text, count) {
        return text + (count === 1 ? '' : 's'); // `0` is `zero items` too
    }
}};