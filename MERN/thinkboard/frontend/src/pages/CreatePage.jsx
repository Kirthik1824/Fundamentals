import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router'
import api from '../lib/axios.js'

const CreatePage = () => {
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    if (loading) return
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const res = await api.post('/notes', {
        title,
        content
      })

      toast.success('Note created successfully!')
      navigate(`/`)

    } catch (error) {

      if (error.response?.status === 429) {
        toast.error(
          'You are creating notes too quickly. Please wait a moment and try again.',
          {
            icon: '☠️',
          }
        )
      } else {
        toast.error(
          error.response?.data?.message || 'An error occurred while creating the note'
        )
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>

          <Link to={'/'} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5' />
            Back to Home
          </Link>

          <div className='card bg-base-100'>
            <div className='card-body'>

              <h2 className='card-title text-2xl mb-4'>
                Create New Note
              </h2>

              <form onSubmit={handleSubmit} className='space-y-4'>

                <div className='form-control mb-4'>
                  <label className='label'>
                    <span className='label-text'>Title</span>
                  </label>

                  <input
                    type='text'
                    placeholder='Note Title'
                    className='input input-bordered'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                </div>

                <div>
                  <label className='label'>
                    <span className='label-text'>Content</span>
                  </label>

                  <textarea
                    placeholder='Note Content'
                    className='textarea textarea-bordered w-full h-36'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>

                </div>

                <div className='card-actions justify-end'>

                  <button
                    type='submit'
                    className={`btn ${loading ? 'btn-disabled' : 'btn-primary'}`}
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Create Note'}
                  </button>

                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default CreatePage