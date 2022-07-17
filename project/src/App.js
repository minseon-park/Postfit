import PlayVideo from './pages/PlayVideo';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Search from './pages/Search';
import Video from './pages/Video';
import Login from './pages/Login/Login';
import Register from './pages/Login/Registration';
import User from './pages/Login/User'
import Playlist from './pages/Login/Playlist'
import Settings from "./pages/Login/Setting"
import ChangePassword from "./pages/Login/ChangePassword";
import DeleteAccount from "./pages/Login/Deletion";
import Footer from './components/Footer';
import MemberDisplay from './components/MemberDisplay';
import PageNotFound from "./pages/PageNotFound";
import UploadNewVid from "./pages/Login/UploadNewVid"
import EditProfile from './pages/Login/EditProfile';
import {Account} from "./database/AccContext_Session";
import {UserTable} from "./database/Dynamo_UserTable";
import {VideoDatabase} from "./database/Video_S3andDynamo"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {

  return (
      <Router>
        <div className="App">
          <Account>
            <UserTable>
              <VideoDatabase>
                <Navbar />
                <div className="content">
                  <Switch>
                    <Route exact path="/search">
                      <Search />
                    </Route>
                    <Route exact path="/about">
                      <About />
                    </Route>
                    <Route path="/about/:id">
                      <MemberDisplay />
                    </Route>
                    <Route exact path="/login">
                      <Login />
                    </Route>
                    <Route exact path="/register">
                      <Register />
                    </Route>
                    <Route exact path="/users/:email">
                      <User />
                    </Route>
                    <Route exact path = "/playlist/:email">
                      <Playlist />
                    </Route>
                    <Route exact path="/settings">
                      <Settings />
                    </Route>
                    <Route exact path="/change_password">
                      <ChangePassword />
                    </Route>
                    <Route exact path="/edit_profile/:email">
                      <EditProfile />
                    </Route>
                    <Route exact path="/delete_account">
                      <DeleteAccount />
                    </Route>
                    <Route exact path="/play_video">
                      <PlayVideo />
                    </Route>
                    <Route path="/video/:id">
                      <Video />
                    </Route>
                    <Route exact path="/upload_video">
                      <UploadNewVid />
                    </Route>
                    <Route exact path="/">
                      <Home />
                    </Route>
                    <Route path="*">
                     <PageNotFound />
                    </Route>
                  </Switch>
                </div>
              </VideoDatabase>
            </UserTable>
          </Account>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
