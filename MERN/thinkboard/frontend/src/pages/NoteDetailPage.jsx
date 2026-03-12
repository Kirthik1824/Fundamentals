import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import toast from 'react-hot-toast';
import api from '../lib/axios.js';
import NoteCard from '../components/NoteCard';
import { Trash2Icon, ArrowLeftIcon } from 'lucide-react';

const NoteDetailPage = () => {
  const [note, setNote] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`);
        setNote(response.data);
      } catch (error) {
        console.log('Error fetching note:', error);
        toast.error('Failed to load note. Please try again later.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    }
    fetchNote();
  }, [id, navigate])

  const handleDelete = async () => {
    if(!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success('Note deleted successfully');
      navigate('/');
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Error deleting note');
    }
  }

  if(loading) {
    return <div className='text-center text-primary py-10'>Loading note...</div>
  }

  return (
    <div className='min-h-screen bg-base-200'>
        <div className='container mx-auto px-4 py-8'>
          <div className='max-w-2xl mx-auto'>
          <div className='flex items-center justify-between mb-6'>
          <Link to='/' className='btn btn-ghost'>
          <ArrowLeftIcon className ="w-5 h-5"/>
          Back to Home
          </Link>
          <button onClick={handleDelete} className='btn btn-error btn-outline'>
            <Trash2Icon className='h-5 w-5'/>
            Delete Note</button>
          </div>
          <div className='card bg-base-100 shadow-lg border-t-4 border-solid border-[#00FF9D]'>
            <div className='card-body'>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input type="text" placeholder='Note Title' className='input input-bordered' value={note.title} onChange={(e)=> setNote({...note, title: e.target.value})} />
              </div>
              <div className='form-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <textarea placeholder='Note Content' className='textarea textarea-bordered h-32' value={note.content} onChange={(e)=> setNote({...note, content: e.target.value})} />
              </div>
              <div className='card-actions justify-end'>
                <button className='btn btn-primary' disabled={saving} onClick={async ()=>{
                  setSaving(true);
                  try {
                    await api.put(`/notes/${id}`, { title: note.title, content: note.content });
                    toast.success('Note updated successfully');
                  } catch (error) {
                    console.error('Error updating note:', error);
                    toast.error('Error updating note');
                  } finally {
                    setSaving(false);
                  }
                }}>
                  Save Changes  
                </button>
            </div>
            </div>
          </div>
        </div>
        </div>
    </div> 
  )
}

export default NoteDetailPage