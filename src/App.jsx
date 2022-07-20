import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import DefaultLayout from '@/layouts/DefaultLayout';
import Robby from '@/pages/Robby';
import Room from '@/pages/Room';
import NotFound from '@/pages/NotFound';
import ConnectLive from '@connectlive/connectlive-web-sdk';

ConnectLive.logger.setLevel('off');

const App = () => {
  return (
    <RecoilRoot>
      <HashRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<Robby />} />
            <Route path="/room" element={<Room />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </RecoilRoot>
  );
}

export default App;
