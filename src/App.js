import React from 'react';
import Editor from './Editor'
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/Exercise/Detail/:id" element={<Editor />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;