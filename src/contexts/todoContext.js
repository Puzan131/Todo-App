import { createContext,useContext } from "react";

export const TodoContext = createContext({
    todos:[{
        id:1,
        todo:"hey",
        completed: false
    }],
    addTodo: (todo)=>{},
    deleteTodo: (id)=>{},
    updateTodo: (id,todo)=>{},
    toggleComplete : (id)=>{}
})

export const TodoContextProvider = TodoContext.Provider

let useTodo = ()=>{
   return  useContext(TodoContext)
}

export default useTodo
