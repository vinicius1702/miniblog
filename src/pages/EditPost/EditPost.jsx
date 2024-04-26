import React, { useEffect, useState } from 'react'
import {useAuthValue} from '../../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom'
import {useFetchDocument} from '../../hooks/useFetchDocument'
import styles from './EditPost.module.css'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'


const EditPost = () => {
  const {id} = useParams()
  const {document:post} = useFetchDocument('posts', id)

  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')

  useEffect(()=>{
    if(post){
      setTitle(post.title)
      setImage(post.image)
      setBody(post.body)

      const textTags = post.tagsArray.join(",")

      setTags(textTags)
    }

  },[post])

  const {user} = useAuthValue()

  const {updateDocument, response} = useUpdateDocument('posts')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")

    try {
      new URL(image)
    } catch (error) {
      setFormError('A imagem precisa ser uma URL.')
    }

    const tagsArray = tags.split(',').map((tag)=>tag.trim().toLowerCase())

    if(!title || !image || !tags || !body){
      setFormError('Por favor, preencha todos os campos!')
    }

    if(formError)return

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    }

    updateDocument(id, data)

    navigate('/dashboard')
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      {post && (
        <>
        <h2>Editando post: {post.title}</h2>
      <p>Altere os dados do post como desejar</p>
      <form className='w-50 d-flex flex-column justify-content-center align-items-center' onSubmit={handleSubmit}>
        <label className='w-100 d-flex flex-column'>
          <span>Título:</span>
          <input type="text" name="title" /* required */ placeholder='Insira o título' value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>{/* 1 */}
        <label className='w-100 d-flex flex-column'>
          <span>URL da imagem:</span>
          <input type="text" name="image" /* required */ placeholder='insira uma imagem' value={image} onChange={(e) => setImage(e.target.value)} />
        </label>{/* 2 */}
        <p className={`${styles.preview_title} fw-bold`}>Preview da imagem atual:</p>
        <img className={`${styles.image_preview}`} src={post.image} alt={post.title} />
        <label className='w-100 d-flex flex-column'>
          <span>Conteúdo:</span>
          <textarea name="body" /* required */ placeholder='Insira o conteúdo do post' value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        </label>
        <label className='w-100 d-flex flex-column'>
          <span>Tags:</span>
          <input type="text" name="tags" /* required */ placeholder='Insira as tags separadas por vírgula' value={tags} onChange={(e) => setTags(e.target.value)} />
        </label>
        {/* <button className='btn btn-outline-success fw-bold my-3'>Cadastrar</button> */}
        {!response.loading && <button className='btn btn-outline-success fw-bold my-3'>Editar</button>}
        {response.loading && <button className='btn btn-outline-success fw-bold my-3' disabled>Aguarde...</button>}
        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}
      </form>
        </>
      )}
    </div>
  )
}

export default EditPost