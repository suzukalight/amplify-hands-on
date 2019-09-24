import React from 'react'
import { motion } from 'framer-motion'
import './Todo.css'

interface TodoProps {
  id: string
  name: string
  done: boolean
  onDelete?: (id: string) => void
  onChange?: (id: string) => void
}

const Todo: React.FC<TodoProps> = ({ id, name, done, onChange = () => {}, onDelete = () => {} }) => {
  return (
    <motion.div
      initial={{
        x: -800,
        opacity: 0
      }}
      animate={{
        x: 0,
        opacity: 1
      }}
      exit={{
        x: 800,
        opacity: 0
      }}
      className="todo"
    >
      <input className="todo__checkbox" type="checkbox" checked={done} onChange={() => onChange(id)} />
      <span className="todo__text">{name}</span>
      <button className="todo__delete" onClick={() => onDelete(id)}>
        delete
      </button>
    </motion.div>
  )
}

export default Todo
