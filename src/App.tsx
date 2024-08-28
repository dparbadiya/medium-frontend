import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import Home from './pages/Home';
import { Blogs } from './pages/Blogs';
import { Blog } from './pages/Blog';
import { Publish } from './pages/Publish';

import SalesforceUpload from './pages/SalesforceUpload';
import ShowData from './pages/ShowData';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/salesforce/upload" element={<SalesforceUpload />} />
          <Route path="/salesforce/show" element={<ShowData />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
