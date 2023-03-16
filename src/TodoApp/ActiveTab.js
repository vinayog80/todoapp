import { View, Dimensions, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export class ActiveTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
  }
  async componentDidMount() {
    try {
      const todoKey = await AsyncStorage.getItem('todoKey')
      const newSavedTodo = JSON.parse(todoKey)
      if (newSavedTodo !== null) this.setState({
        todos: newSavedTodo
      })
      console.log("newSavedTodo", newSavedTodo)

      let storedTdsl = await AsyncStorage.getItem('activeKey')
      let i = JSON.parse(storedTdsl)
      if (i !== null) this.setState({
        todos: i
      })
      console.log(`selected todo, retreive`)
      console.log(i)
    } catch (error) {
      console.log(error)
    }
  }
  onDeleteTodo = (id) => {
    let deletedActiveTd = this.state.todos.filter(todo => todo.id !== id)
    this.setState({ todos: deletedActiveTd })
  }
  render() {
    console.log('active tab')
    return (
      <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: 22, marginTop: 50 }}>
         <View style={{ marginVertical: 10 }}>
            <View>
              <Text style={{ fontWeight: '800', fontSize: 22, color: "#341948" }}>Active Todos:</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text>todos that are added or active:
                {this.state.todos.length}
              </Text>
            </View>
          </View>
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
                    borderWidth: todo.isSelected ? 1 : 0,
                    marginBottom: 20,
                    borderRadius: 8,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 20,
                  }}
                >
                  <Text style={{ fontWeight: '700', fontSize: 16, color: "#341948" }}>{todo.todoInputTxt}</Text>
                  <View style={{ backgroundColor: '#3c005a', width: 100, height: 40, justifyContent: 'center', borderRadius: 5, alignItems: 'center', marginTop: -8 }}>
                    <Text style={{ color: "#fff", textAlign: 'center', color: "#fff" }}>Status: <Text style={{ color: "#fff", fontWeight: '800' }}>{(todo && !todo?.isDone) ? 'Active' : 'Completed'}</Text></Text>
                  </View>
                  {
                    todo.isSelected ? (
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
        </ScrollView>
      </View>
    )
  }
}

export default ActiveTab