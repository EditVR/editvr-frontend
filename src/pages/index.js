/**
 * @file index.js
 * Exports all page components.
 */

import Home from './Home/Home';
import Login from './Login/Login';
import Register from './Register/Register';
import Logout from './Logout/Logout.container';
import Dashboard from './Dashboard/Dashboard.container';
import ExperienceCreate from './ExperienceCreate/ExperienceCreate';
import ExperienceEdit from './ExperienceEdit/ExperienceEdit.container';
import VREditor from './VREditor/VREditor.container';
import VRViewer from './VRViewer/VRViewer.container';

export {
  Home,
  Login,
  Logout,
  Register,
  Dashboard,
  ExperienceCreate,
  ExperienceEdit,
  VREditor,
  VRViewer
};
