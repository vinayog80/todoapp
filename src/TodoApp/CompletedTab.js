import { Dimensions, View, Text, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export class CompletedTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
  }
  async componentDidMount() {
    try {
      let temp = await AsyncStorage.getItem('doneKey')
      let savedDt = JSON.parse(temp)
      if (savedDt !== null) {
        this.setState({ todos: savedDt })
      }
      console.log(savedDt)

    } catch (error) {
      console.log(error)
    }
  }
  onDeleteTodo = (id) => {
    let deletedCompleteTd = this.state.todos.filter(todo => todo.id !== id)
    this.setState({ todos: deletedCompleteTd })
  }
  render() {
    console.log('completed tab')
    return (
      <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
        <View style={{ paddingHorizontal: 22, marginTop: 50 }}>
          <Text style={{ fontWeight: '800', fontSize: 22, color: "#341948" }}>Completed Todos:</Text>
          <Text>No of todos that are completed:
            {this.state.todos.filter(todo => (todo.isDone)).length}
          </Text>

          <View>
            {
              this.state.todos.map((todo) => (
                <TouchableOpacity
                  key={todo.id}
                  activeOpacity={.5}
                  style={{
                    width: 370,
                    height: 65,
                    backgroundColor: '#EFDCF9',
                    marginBottom: 20,
                    borderRadius: 8,
                    borderWidth: todo.isSelected ? 1 : 0,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 20,
                  }}
                >
                  <Text style={{ fontWeight: '700', fontSize: 16, color: "#341948", textDecorationLine: todo?.isDone ? 'line-through' : '' }}>{todo.todoInputTxt}</Text>
                  <View style={{ backgroundColor: '#3c005a', width: 100, height: 40, justifyContent: 'center', borderRadius: 5, alignItems: 'center', marginTop: -8 }}>
                    <Text style={{ color: "#fff", textAlign: 'center', color: "#fff" }}>Status: <Text style={{ color: "#fff", fontWeight: '800' }}>{todo?.isDone ? 'Completed': 'Acive'}</Text></Text>
                  </View>
                  {
                    todo?.isSelected ? (
                      <TouchableOpacity
                        onPress={() => this.onDeleteTodo(todo.id)}
                        activeOpacity={.7}
                      >
                        <Image source={require('../../assets/closeIcon.png')} style={{ width: 32, height: 32, }} resizeMode='contain' />
                      </TouchableOpacity>
                    ) : <View></View>
                  }
                </TouchableOpacity>
              ))
            }
          </View>
        </View>
      </View>
    )
  }
}

export default CompletedTab