import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import './index1.css'
import App1 from './App1.tsx'
import App2 from './App2.tsx'

export default function MainPage() {
  return (
    <div>
      <h1>React 学习任务</h1>
      <ol>
        <li>
          <Link to='/App1'>井字棋游戏</Link>
        </li>
        <li>
          <Link to='/App2'>订单列表</Link>
        </li>
      </ol>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/App1' element={<App1 />} />
        <Route path='/App2' element={<App2 />} />
      </Routes>
    </Router>
  </StrictMode>
)
