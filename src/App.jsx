import { useState , useEffect} from "react";
import { TodoContextProvider } from "./contexts/todoContext";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItems";

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (todo) => {
    setTodos((prev) => [{...todo}, ...prev]);

  };
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id));
  };
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };
  const updateTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, text } : prevTodo
      )
    );
  };

  useEffect(() => {
    const localTodo =  JSON.parse(localStorage.getItem("todos"));
    console.log(localTodo);

    if(localTodo && localTodo.length>0){
        setTodos(localTodo)
    }
  }, [])

  useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos))

  },[todos])

  return (
    <TodoContextProvider
      value={{ addTodo, deleteTodo, updateTodo, todos, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4"><TodoForm /></div>
          <div className="flex flex-wrap gap-y-3">
            {
                todos.map((todo)=>(
                    <div key={todo.id} className="w-full">
                        <TodoItem todo={todo} />
                    </div>
                ))
            }
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
