import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className='text-center d-flex flex-column align-items-center'>
      <h2>Sobre o Mini <span>Blog</span></h2>
      <p className='fs-5 text-secondary mb-2'>Este projeto consiste em um blog feito com React no front-end e Firebase no back-end.</p>
      <Link to={'/posts/create'} className='btn btn-outline-success fw-bold my-3 d-block mt-3 py-3 px-4'>Criar post</Link>
    </div>
  )
}

export default About