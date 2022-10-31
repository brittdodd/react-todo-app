import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Routing from './components/Routing/Routing';

import Bootstrap from './components/Bootstrap/Bootstrap';
import Navigation from './components/Navigation'
import NotFound from './components/NotFound';
import Categories from './components/Categories/Categories'
import AuthProvider from './contexts/AuthContext'
import ToDos from './components/ToDos/ToDos'
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout'
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer';


function App() {
    return (
        <div className="App">
          <AuthProvider>
            <BrowserRouter>
              <Navigation />
                <Routes>
                  <Route path='/' element={<ProtectedRoute><ToDos /></ProtectedRoute>} />
                  <Route path='/ToDos' element={<ProtectedRoute><ToDos /></ProtectedRoute>} />
                  <Route path='/Categories' element={<ProtectedRoute><Categories/></ProtectedRoute>} />

                  <Route path='/Login' element={<Login/>} />
                  <Route path='/Logout' element={<Logout/>} />
                  <Route path='*' element={<NotFound />}/>
                  <Route path='/bootstrap' element={<Bootstrap />} />
                  <Route path='/routing' element={<Routing />} />
                </Routes>
              <Footer />
              
            </BrowserRouter>
          </AuthProvider>
        </div>
    );  
  }

    

export default App;
