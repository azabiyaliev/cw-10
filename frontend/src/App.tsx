import News from "./features/containers/news/news.tsx";
import NavBar from "./components/NavBar/NavBar.tsx";
import {Route, Routes} from "react-router-dom";
import AddForm from "./features/components/AddForm/AddForm.tsx";

const App = () => {

  return (
    <>
        <NavBar/>
        <Routes>
           <Route path="/" element={<News/>}/>
           <Route path="/add" element={<AddForm/>}/>
        </Routes>
    </>
  )
};

export default App
