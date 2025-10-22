import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { TodosContext } from "./components/TodosContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  Palette: {
    primary: {
      main: "#CC5C72",
    },
  },
});

const initialTodos = [
  {
    id: uuidv4(),
    title: "read a book",
    details: "task details",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "read a book",
    details: "task details",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "read a book",
    details: "task details",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          background: "#dadadaff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}
export default App;
