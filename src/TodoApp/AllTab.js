import { Dimensions, Text, View, TouchableOpacity, FlatList, Button, TextInput, Image, Alert, } from 'react-native'
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

const EDITIMG = require('../../assets/editICON.png')

export class AllTab extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            todoTxt: '',
            isEditTodo: null
        }
    }
    onChangeTodoInput = (txt) => {
        this.setState({ todoTxt: txt })
    }
    onAddNewTodo = async () => {
        const { todoTxt, todos, isEditTodo } = this.state;
        if (!todoTxt && todoTxt == '') {
            Alert.alert('please write something to add!');
        }
        else if (todoTxt) {
            this.setState({
                todos: todos.map((item) => {
                    if (item.id == isEditTodo) {
                        return {
                            ...item, todoInputTxt: todoTxt
                        }
                    };
                    return item;
                }),
                todoTxt: '',
                isEditTodo: null
            })
        }
        else {
            let newTodo = [...todos, {
                id: todos.length + 1,
                todoInputTxt: todoTxt,
                isDone: false,
                isSelected: false,
                isFiltered: false
            }]
            this.setState({
                todos: newTodo,
                todoTxt: '',
            })
            console.log('todo saved', newTodo)
        }
        try {
            let setTodo = await AsyncStorage.setItem('todoKey', JSON.stringify(newTodo))
            console.log(`setTodo: ${setTodo}`)
        } catch (error) {
            console.log(error)
        }
    }

    onSaveTodo = async () => {
        try {
            const todoKey = await AsyncStorage.getItem('todoKey')
            const newSavedTodo = JSON.parse(todoKey)
            if (newSavedTodo !== null) this.setState({ todos: newSavedTodo })
            console.log("newSavedTodo", newSavedTodo)
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.onSaveTodo()
        this.storeSelectedTd()
        this.retreiveDoneTodos()
    }

    onDeleteTodo = async (id) => {
        try {
            let x = await AsyncStorage.getItem('todoKey');
            let y = JSON.parse(x)
            console.log(`deletedKey: ${y}`)
            this.setState({
                todos: this.state.todos.filter((todo) => todo.id !== id)
            })
            AsyncStorage.setItem('todoKey', JSON.stringify(this.state.todos))
        } catch (error) {
            console.log(error)
        }
    }

    deleteAll = async () => {
        try {
            await AsyncStorage.clear()
            this.setState({ todos: [] })
            console.log('all todos deleted from storage')
        } catch (error) {
            console.log(error)
        }
    }

    onShowTodoDel = async (id) => {
        try {
            await this.setState({
                todos: this.state.todos.filter(todo => todo.id > 0).
                    map(todo => (todo.id === id) ? { ...todo, isSelected: !todo.isSelected } : todo)
            })
            let saveActiveTodo = await AsyncStorage.setItem('activeKey', JSON.stringify(this.state.todos))
            console.log("savedTodo:", saveActiveTodo)
        }
        catch (error) {
            console.error(error)
        }
    }

    storeSelectedTd = async () => {
        try {
            let storedTdsl = await AsyncStorage.getItem('activeKey')
            let i = JSON.parse(storedTdsl)
            if (i !== null) {
                this.setState({ todos: i })
            }
            console.log('selected todo, retreived')
        }
        catch (error) {
            console.log(error)
        }
    }

    isDoneTodo = async (id) => {
        try {
            await this.setState({
                todos: this.state.todos.filter(todo => todo.id > 0).
                    map(todo => (todo.id === id) ? { ...todo, isDone: !todo.isDone } : todo)
            })
            console.log(`todo with ${id} got checked`)
            let saveDoneTodos = await AsyncStorage.setItem('doneKey', JSON.stringify(this.state.todos))
            console.log(saveDoneTodos)
        }
        catch (error) {
            console.log(error)
        }
    }
    retreiveDoneTodos = async () => {
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

    onEditTodo = (id) => {
        let editTodo = this.state.todos.find((item) => {
            return item.id == id;
        });
        this.setState({
            todoTxt: editTodo.todoInputTxt,
            isEditTodo: id
        })
    }
    render() {
        return (
            <View style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
                <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
                    <Text>No of todos that are active or added : {this.state.todos.filter(todo => (todo && !todo?.isDone)).length}</Text>
                    <Text>No of todos that are selected : {this.state.todos.filter(todo => (todo?.isSelected)).length}</Text>

                    <View style={{ flexDirection: "row", paddingHorizontal: 5 }}>
                        <View style={{ marginTop: 20 }}>
                            <Button title='clear all' onPress={() => this.deleteAll()} />
                        </View>
                        <TextInput
                            style={{ borderBottomWidth: 1, borderColor: '#000', width: 200, height: 50, marginHorizontal: 20 }}
                            value={this.state.todoTxt}
                            onChangeText={(txt) => this.onChangeTodoInput(txt)}
                        />
                        <TouchableOpacity
                            onPress={() => this.onAddNewTodo()}
                            activeOpacity={.7}
                        >
                            <Image
                                source={require('../../assets/plus.png')}
                                style={{ width: 35, height: 45, marginTop: 10 }}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 10 }}>

                        <FlatList
                            data={this.state.todos}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ padding: 10 }}
                            renderItem={({ item }) => (
                                <View
                                    style={{
                                        width: 370,
                                        height: 65,
                                        backgroundColor: '#EFDCF9',
                                        borderWidth: item?.isSelected ? 1 : 0,
                                        marginBottom: 20,
                                        borderRadius: 8,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        padding: 20,
                                    }}>
                                    {
                                        item.isSelected ? (

                                            <View>
                                                <BouncyCheckbox
                                                    fillColor={item?.isDone ? "#3c005a" : null}
                                                    unfillColor="#fff"
                                                    isChecked={item.isDone}
                                                    onPress={() => this.isDoneTodo(item.id)}
                                                />
                                            </View>
                                        ) :
                                            <View>
                                            </View>
                                    }
                                    {
                                        item.isSelected ? (<TouchableOpacity onPress={() => this.onEditTodo(item.id)} activeOpacity={.7}>
                                            <Image source={EDITIMG} style={{ width: 28, height: 28 }} resizeMode="contain" />
                                        </TouchableOpacity>) : (<View />)
                                    }
                                    <View>
                                        <TouchableOpacity onPress={() => this.onShowTodoDel(item.id)}>
                                            <Text
                                                style={{
                                                    fontWeight: '700', fontSize: 16,
                                                    color: (item.isSelected) ? '#099dfd' : "#ffff",
                                                    textDecorationLine: item.isDone ? 'line-through' : ''
                                                }}>{item.todoInputTxt}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ backgroundColor: '#3c005a', width: 100, height: 40, justifyContent: 'center', borderRadius: 5, alignItems: 'center', marginTop: -8 }}>
                                        <Text style={{ color: "#fff", textAlign: 'center', color: "#fff" }}>Status: <Text style={{ color: "#fff", fontWeight: '800' }}>{item.isDone ? 'Completed' : 'Active'}</Text></Text>
                                    </View>

                                    {
                                        item.isFiltered ? (<View>wow selected!</View>) : undefined
                                    }

                                    <View>
                                        {item.isSelected ? (
                                            <TouchableOpacity
                                                onPress={() => this.onDeleteTodo(item.id)}
                                                activeOpacity={.7}
                                            >
                                                <Image source={require('../../assets/closeIcon.png')} style={{ width: 32, height: 32, marginTop: -5.5 }} resizeMode='contain' />
                                            </TouchableOpacity>
                                        ) :
                                            <View></View>
                                        }</View>
                                </View>
                            )}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default AllTab