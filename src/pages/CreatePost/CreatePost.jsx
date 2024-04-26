import React, { useState } from 'react'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import {useAuthValue} from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'


const CreatePost = () => {

  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')

  const {user} = useAuthValue()

  const {insertDocument, response} = useInsertDocument('posts')

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

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    navigate('/')
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form className='w-50 d-flex flex-column justify-content-center align-items-center' onSubmit={handleSubmit}>
        <label className='w-100 d-flex flex-column'>
          <span>Título:</span>
          <input type="text" name="title" /* required */ placeholder='Insira o título' value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>{/* 1 */}
        <label className='w-100 d-flex flex-column'>
          <span>URL da imagem:</span>
          <input type="text" name="image" /* required */ placeholder='insira uma imagem' value={image} onChange={(e) => setImage(e.target.value)} />
        </label>{/* 2 */}
        <label className='w-100 d-flex flex-column'>
          <span>Conteúdo:</span>
          <textarea name="body" /* required */ placeholder='Insira o conteúdo do post' value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        </label>
        <label className='w-100 d-flex flex-column'>
          <span>Tags:</span>
          <input type="text" name="tags" /* required */ placeholder='Insira as tags separadas por vírgula' value={tags} onChange={(e) => setTags(e.target.value)} />
        </label>
        {/* <button className='btn btn-outline-success fw-bold my-3'>Cadastrar</button> */}
        {!response.loading && <button className='btn btn-outline-success fw-bold my-3'>Cadastrar</button>}
        {response.loading && <button className='btn btn-outline-success fw-bold my-3' disabled>Aguarde...</button>}
        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost