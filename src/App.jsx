import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login.jsx';
import Register from './Components/Register/Register.jsx';
import UserProfile from './Components/UserProfile/UserProfile.jsx';
import ChangePassword from './Components/ChangePassword/ChangePassword';
import UploadResume from './Components/UploadResume/UploadResume';
import UploadCSV from './Components/Admin/UploadCSV';
import ResumeData from './Components/ResumeData/ResumeData.jsx';
import ViewApplications from './Components/Admin/ViewApplications.jsx';
import ViewAppliedInternships from './Components/Internship/ViewAppliedInternships.jsx';
import ApplyInternship from './Components/Internship/ApplyInternship.jsx';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserSuccess } from './Actions/userActions';


function App() {
  const dispatch = useDispatch();

  const loadUser = async (accessToken) => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      };
      const res = await axios.get('http://localhost:8000/profile/', config);
      const email = res.data.email;
      const id = res.data.id;
      const isAdmin = res.data.isadmin;
      dispatch(loadUserSuccess({ email, id, isAdmin }))
    }
    catch (e) {

    }
  }

  const accessToken = window.localStorage.getItem('accessToken');
  if (accessToken) {
    loadUser(accessToken);
  }

  const user = useSelector(state => { return state.user });

  return (
    <Router>
      <Routes>
        <Route path='/' element={<p>Home</p>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/changepassword' element={<ChangePassword />} />
        <Route path='/uploadresume' element={<UploadResume />} />
        <Route path='/uploadcsv' element={<UploadCSV />} />
        <Route path='/viewapplications' element={<ViewApplications />} />'
        <Route path='/admin' element={<UploadCSV />} />
        <Route path='/resumedata' element={<ResumeData />} />
        <Route path='/viewappliedinternships' element={<ViewAppliedInternships />} />
        <Route path='/applyinternships' element={<ApplyInternship />} />
        {user.isAdmin && <Route path='/xyz' element={<p>xyz</p>} />}
      </Routes>
    </Router>
  )
}

export default App
