import React, { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'


const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const {login, error: authError, loading} = useAuthentication()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    const user = {
      email,
      password
    }

    const res = await login(user)

    console.log(res)
  }

  useEffect(()=>{
    if(authError){
      setError(authError)
    }
  },[authError])

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <h1>Entrar</h1>
      <p>Faça o login para poder utilizar o sistema</p>
      <form className='w-50 d-flex flex-column justify-content-center align-items-center' onSubmit={handleSubmit}>
        <label className='w-100 d-flex flex-column'>
          <span>E-mail:</span>
          <input type="email" name="email" required placeholder='E-mail do usuário' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </label>
        <label className='w-100 d-flex flex-column'>
          <span>Senha:</span>
          <input type="password" name="password" required placeholder='Insira sua senha' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </label>
        {!loading && <button className='btn btn-outline-success fw-bold my-3'>Entrar</button>}
        {loading && <button className='btn btn-outline-success fw-bold my-3' disabled>Aguarde...</button>}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default SignIn