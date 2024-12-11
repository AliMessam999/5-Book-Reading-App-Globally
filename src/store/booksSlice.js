import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, query, where, getDocs, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
import { db, auth } from '../firebase/config.js';


export const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBooks.pending, (state) => {
          state.status = 'loading';
        })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(toggleRead.fulfilled, (state, action) => {
        if (Array.isArray(state.books)) {
          state.books.forEach(book => {
            if (book.id === action.payload) {
              book.isRead = !book.isRead;
            }
          });
        }
      })
      .addCase(toggleRead.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(eraseBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(eraseBook.fulfilled, (state, action) => {
        state.books = state.books.filter(book => book.id != action.payload);
        state.status = "succeeded";
      })
      .addCase(eraseBook.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(addBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.books.push(action.payload); 
        state.status = "succeeded";     
      })
      .addCase(addBook.rejected, (state, action) => {
        state.status = 'failed';
      });
  },
});

export const selectBooks = state => state.books;

export default booksSlice.reducer;

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const q = query(collection(db, "books"), where("user_id", "==", auth.currentUser.uid));
  const querySnapshot = await getDocs(q);
  let bookList = [];
  querySnapshot.forEach((doc) => {
    bookList.push({ id: doc.id, ...doc.data() });
  });

  return bookList || []; 
});


export const toggleRead = createAsyncThunk('books/toggleRead', async (payload) => {
  const bookRef = doc(db, "books" , payload.id);
  await updateDoc(bookRef, {
    isRead: !payload.isRead
  });
  return payload.id;
});

export const eraseBook = createAsyncThunk('books/eraseBook', async (payload) => {
  if (!payload || !payload.id) {
    throw new Error('Invalid payload for eraseBook');
  }
  await deleteDoc(doc(db, 'books', payload.id)); 
  return payload.id; 
});

export const addBook = createAsyncThunk('books/addBook', async (payload) => {
  let newBook = payload;
  newBook.user_id = auth.currentUser.uid;
  const docRef = await addDoc(collection(db, "books"), newBook);
  newBook.id = docRef.id;
  return newBook;
});

