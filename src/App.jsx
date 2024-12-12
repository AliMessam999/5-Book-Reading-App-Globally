import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BooksPage from './views/BooksPage.jsx';
import SingleBookPage from './views/SingleBookPage.jsx';
import LoginPage from './views/LoginPage.jsx';
import AddBookPage from './views/AddBookPage.jsx';
import { selectUsers } from './store/usersSlice.js';
import { useSelector } from 'react-redux';
// import { useState } from 'react';

function App() 
{
  // const [filterBy, setFilterBy] = useState("");
  const user = useSelector(selectUsers);
  return (
    <>  
    {
      user.currentUser ? 
      <BrowserRouter>
        <Routes>
            <Route index element={<BooksPage />} /> 
            <Route path="add-book" element={<AddBookPage />} />
            <Route path="book/:id" element={<SingleBookPage />} />
        </Routes>
      </BrowserRouter>
      :
      <LoginPage />   
    }   
    </>
  )
}

export default App
