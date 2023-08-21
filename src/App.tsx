import './App.css';
import Contacts from './components/Contacts';
import CreateContactPage from './components/CreateContact';
import EditContactPage from './components/EditContact';
import { RootStateType } from './store/rootReducer';
import { useSelector } from 'react-redux';
import ChartsAndMap from './components/ChartsAndMap';
import { AnyAction, ThunkMiddleware } from '@reduxjs/toolkit';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';

const App = () => {
  const rootState:RootStateType = useSelector((state:any) => state.rootState)
  const page = rootState.page;
  if(page === 1) return <Contacts />
  else if (page === 2) return <CreateContactPage />
  else if (page === 3) return <EditContactPage />
  else if (page === 4) return <ChartsAndMap />
  else return <Contacts />
}

export default App;
