import React,{lazy, Suspense} from "react";
import {Container} from '@material-ui/core'
import Navbar from "./components/Layout/Navbar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const Home = lazy(()=>import('./components/Home/Home.js'))
const Auth = lazy(()=>import('./components/Auth/Auth'))

function App() {
  return (
      <>
          <Suspense fallback={"Loading..."}>
              <Router>
                  <div className="App">
                      <Container maxWidth={"lg"}>
                          <Navbar />
                          <Routes>
                              <Route exact path ="/" element={<Home />} />
                              <Route exact path ="/auth" element={<Auth />} />
                          </Routes>

                      </Container>
                  </div>
              </Router>
          </Suspense>
      </>
  );
}

export default App;
