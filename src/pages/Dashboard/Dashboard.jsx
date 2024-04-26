import React from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import styles from './Dashboard.module.css'
import {useDeleteDocument} from '../../hooks/useDeleteDocument'

const Dashboard = () => {
  const { user } = useAuthValue()
  const uid = user.uid

  const { documents: posts, loading } = useFetchDocuments("posts", null, uid)

  const {deleteDocument} = useDeleteDocument("posts")

  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <div className={`${styles.dashboard} text-center d-flex flex-column justify-content-center align-items-center`}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Você ainda não criou nenhum post</p>
          <Link to={'/posts/create'} className='btn btn-outline-success fw-bold'>Criar o seu primeiro post</Link>
        </div>
      ) : (
        <>
          <div className={`${styles.post_header} d-flex justify-content-between fw-bold`}>
            <span>Título</span>
            <span>Ações</span>
          </div>
          {posts && posts.map((post) => (<div key={post.id} className={`${styles.post_row} d-flex justify-content-between align-items-center`}>
            <p>{post.title}</p>
            <div>
              <Link to={`/posts/${post.id}`} className='btn btn-outline-success fw-bold'>
                Ver
              </Link>
              <Link to={`/posts/edit/${post.id}`} className='btn btn-outline-warning fw-bold'>
                Editar
              </Link>
              <button onClick={()=> deleteDocument(post.id)} className='btn btn-outline-danger fw-bold'>
                Excluir
              </button>
            </div>
          </div>))}
        </>
      )}
    </div>
  )
}

export default Dashboard