import React, { useState, useEffect } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { motion, AnimatePresence } from 'framer-motion'
import Todo from './components/Todo'

import config from './aws-exports'
import { CreateTodoInput, UpdateTodoInput, DeleteTodoInput } from './API'
import { createTodo, updateTodo, deleteTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'

Amplify.configure(config)

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [text, setText] = useState('')

  const fetchTodoList = async () => {
    const resp = await API.graphql(graphqlOperation(listTodos))
    setTodos(resp.data.listTodos.items)
  }

  useEffect(() => {
    fetchTodoList()
  }, [])

  const onDelete = async (id: string) => {
    const input: DeleteTodoInput = {
      id
    }
    await API.graphql(graphqlOperation(deleteTodo, { input }))

    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
  }

  const toggleCheck = async (id: string) => {
    const todo = todos.find(t => t.id === id)
    if (!todo) return

    const input: UpdateTodoInput = {
      id,
      done: !todo.done
    }
    const resp = await API.graphql(
      graphqlOperation(updateTodo, {
        input
      })
    )

    console.log('resp', resp)

    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          done: !todo.done
        }
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const addTodo = async () => {
    const input: CreateTodoInput = {
      name: text,
      done: false
    }
    const resp = await API.graphql(
      graphqlOperation(createTodo, {
        input
      })
    )
    console.log('resp', resp)

    const updatedTodos = [...todos, resp.data.createTodo]
    setTodos(updatedTodos)
    setText('')
  }

  return (
    <div>
      <motion.div
        initial={{
          scale: 0,
          x: '-50%',
          y: '-50%'
        }}
        animate={{
          scale: 1
        }}
        className="main"
      >
        <AnimatePresence>
          {todos.map((todo: Todo) => (
            <Todo key={todo.id} id={todo.id} name={todo.name} done={todo.done} onDelete={onDelete} onChange={toggleCheck} />
          ))}
        </AnimatePresence>

        <motion.div className="add">
          <motion.input
            onChange={e => {
              setText(e.target.value)
            }}
            value={text}
            className="text"
            type="text"
            placeholder="Add todos"
          />
          <motion.button disabled={text.trim() === ''} onClick={addTodo} className="button">
            Add
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default App
