import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Todo from './components/Todo'

const todoList = [
  {
    id: '0',
    name: 'create-react-app amplify-hands-on',
    done: false
  },
  {
    id: '1',
    name: 'yarn global add @aws-amplify-cli',
    done: false
  },
  {
    id: '2',
    name: 'yarn add aws-amplify aws-amplify-react',
    done: true
  }
]

const App: React.FC = () => {
  const [todos, setTodos] = useState(todoList)
  const [text, setText] = useState('')

  const onDelete = (id: string) => {
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
  }

  const toggleCheck = (id: string) => {
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

  const addTodo = () => {
    const updatedTodos = [
      ...todos,
      {
        id: todos.length.toString(),
        name: text,
        done: false
      }
    ]
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
        {todos.map((todo: Todo) => (
          <Todo key={todo.id} id={todo.id} name={todo.name} done={todo.done} onDelete={onDelete} onChange={toggleCheck} />
        ))}

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
