import React from 'react';
import NavBar from "./NavBar";
import {Container} from "semantic-ui-react";
import AcademicDegreeDashboard from "../../features/academicDegrees/dashboard/academicDegreeDashboard";
import {observer} from "mobx-react-lite";
import {Route, Routes} from "react-router-dom";
import HomePage from "../../features/dashboard/HomePage";
import AcademicDegreeForm from '../../features/academicDegrees/form/academicDegreeForm';
function App() {

  return (
    <div>
      <NavBar/>
        <Container style={{marginTop: '3em'}}>
          <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='academicDegrees' element={<AcademicDegreeDashboard />}/>
            <Route path='create-academic-degree' element={<AcademicDegreeForm />}/>
            <Route path='manage/:id' element={<AcademicDegreeForm />}/>
          </Routes>
        </Container>
    </div>
  );
}

export default observer(App);
