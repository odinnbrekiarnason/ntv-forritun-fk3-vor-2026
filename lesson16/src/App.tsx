import { useState } from 'react';
import { Routes, Route} from 'react-router-dom';
import './App.css';
import { Layout } from '@/components/Layout';
import type { AppPage } from '@/navigation';
import { AboutPage } from '@/Features/pages/AboutPage';
import { HomePage } from '@/Features/pages/HomePage';
import { LoginPage } from './Features/pages/authPages/loginPage';
import { SignupPage } from './Features/pages/signupPage';


function App() {
  const [page, setPage] = useState<AppPage>('home');

  return (
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='about' element={<AboutPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='signup' element={<SignupPage />} />
        </Route>

      </Routes>
  );
}

export default App;
