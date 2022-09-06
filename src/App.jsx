import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import DefaultLayout from '@/layouts/DefaultLayout';
import Lobby from '@/pages/Lobby';
import Room from '@/pages/Room';
import NotFound from '@/pages/NotFound';

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter basename="/web-sample">
        <Routes>
          <Route path='/' element={<DefaultLayout />}>
            <Route path='/' element={<Lobby />} />
            <Route path='/room' element={<Room />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
