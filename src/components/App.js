import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState('');

  const handleFormSubmit = query => {
    setQuery(query);
  };

  return (
    <div className="container">
      <Searchbar onSubmited={handleFormSubmit} />
      <ImageGallery query={query} />
      <ToastContainer autoClose={3000} />
    </div>
  );
}

export default App;
