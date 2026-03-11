import {Route, Routes}  from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import { toast } from 'react-hot-toast'

const App = () => {
  return (
    <div data-theme="forest">
      <button className='btn btn-primary'>click me</button>
      <button className='btn btn-secondary'>click me</button>
      <button className='btn btn-accent'>click me</button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/notes/:id" element={<NoteDetailPage />} />
      </Routes> 
    </div>
  )
}

export default App