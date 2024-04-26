import React, { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'

const SignUp = () => {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const {createUser, error: authError, loading} = useAuthentication()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError('')

    const user = {
      displayName,
      email,
      password
    }

    if(password !== confirmPassword){
      setError('As senhas precisam ser iguais!')
      return
    }

    const res = await createUser(user)

    console.log(res)
  }

  useEffect(()=>{
    if(authError){
      setError(authError)
    }
  },[authError])

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form className='w-50 d-flex flex-column justify-content-center align-items-center' onSubmit={handleSubmit}>
        <label className='w-100 d-flex flex-column'>
          <span>Nome:</span>
          <input type="text" name="displayName" required placeholder='Nome do usuário' value={displayName} onChange={(e)=>setDisplayName(e.target.value)}/>
        </label>
        <label className='w-100 d-flex flex-column'>
          <span>E-mail:</span>
          <input type="email" name="email" required placeholder='E-mail do usuário' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </label>
        <label className='w-100 d-flex flex-column'>
          <span>Senha:</span>
          <input type="password" name="password" required placeholder='Insira sua senha' value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </label>
        <label className='w-100 d-flex flex-column'>
          <span>Confirmação de senha:</span>
          <input type="password" name="confirmPassword" required placeholder='Confirme sua senha' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
        </label>
        {!loading && <button className='btn btn-outline-success fw-bold my-3'>Cadastrar</button>}
        {loading && <button className='btn btn-outline-success fw-bold my-3' disabled>Aguarde...</button>}
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default SignUp