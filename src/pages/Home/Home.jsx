import React, { useState } from 'react'
import styles from './Home.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import PostDetail from '../../components/PostDetail'

const Home = () => {
  const [query, setQuery] = useState('')
  const {documents: posts, loading} = useFetchDocuments("posts")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if(query){
      return navigate(`/search?q=${query}`)
    }

  }

  return (
    <div className={`d-flex flex-column align-items-center justify-content-center`}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form className={`${styles.search_form} d-flex justify-content-center mb-2`} onSubmit={handleSubmit}>
        <input className='me-3'  onChange={(e)=> setQuery(e.target.value)} value={query} type="text" placeholder='Ou busque por tags...' />
        <button className='btn btn-outline-dark fw-bold my-3'>Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post)=>(
          <PostDetail key={post.id} post={post} />
        ))}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to={'/posts/create'} className='btn btn-outline-success fw-bold my-3 d-block mt-3 py-3 px-4'>Criar primeiro post</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home