import React from 'react';
import { Platform, StyleSheet, Text, View, FlatList } from 'react-native';
import Header from './components/Header.js';
import InputBar from './components/InputBar.js';
import TodoItem from './components/TodoItem.js';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todoInput: '',
      todos: [
        {id: 0, title: 'Take out trash', done: false},
        {id: 1, title: 'Cook dinner', done: false}
      ]
    }
    this.addNewTodo = this.addNewTodo.bind(this);
  }

  addNewTodo() {
    if(this.state.todoInput !== ''){
      let todos = this.state.todos;

      todos.unshift({
        id: todos.length,
        title: this.state.todoInput,
        done: false
      })

      this.setState({todos, todoInput:''});
    }
  }

  toggleDone(item) {
    let todos = this.state.todos;

    todos = todos.map((todo) => {
      if (todo.id == item.id){
        todo.done = !todo.done;
      }
      return todo
    })
    this.setState({todos});
  }

  removeTodo(item) {
    let todos = this.state.todos;
    todos = todos.filter((todo) => todo.id !== item.id);
    this.setState({todos})
  }

  render() {
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>

    return (
      <View style={styles.container}>
        {statusbar}
        <Header title="Todo List" />
        <InputBar
          textChange={todoInput => this.setState({todoInput})}
          addNewTodo={this.addNewTodo}
          todoInput={this.state.todoInput}
          />
        <FlatList
          data={this.state.todos}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TodoItem
                todoItem={item}
                toggleDone={() => this.toggleDone(item)}
                removeTodo={() => this.removeTodo(item)}
              />
            )
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  statusbar: {
    backgroundColor: 'cadetblue',
    height: 20,
  }
});
