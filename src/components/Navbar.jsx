import { NavLink } from 'react-router-dom'
import { useAuthValue } from '../context/AuthContext'
import { useAuthentication } from '../hooks/useAuthentication'

const Navbar = () => {
  const {user} = useAuthValue()
  const {logout} = useAuthentication()

  return (
    <nav className={`d-flex shadow-lg justify-content-between align-items-center py-1 px-3 text-align-center`}>
        <NavLink to={'/'} className={`fs-3 text-dark text-decoration-none`}>
            Mini<span className={`fw-bolder`}>BLOG</span>
        </NavLink>
        <ul className={`d-flex justify-content-center align-items-center list-unstyled`}>
            <li className='mt-3 me-2'><NavLink className={`btn btn-outline-dark fw-bold border-0`} to={'/'}>Home</NavLink></li>
            {!user && (
              <>
              <li className='mt-3 me-2'><NavLink className={`btn btn-outline-dark fw-bold border-0`} to={'/login'}>Entrar</NavLink></li>
            <li className='mt-3 me-2'><NavLink className={`btn btn-outline-dark fw-bold border-0`} to={'/register'}>Cadastrar</NavLink></li>
              </>
            )} 
            {user && (
              <>
              <li className='mt-3 me-2'><NavLink className={`btn btn-outline-dark fw-bold border-0`} to={'/posts/create'}>Novo post</NavLink></li>
            <li className='mt-3 me-2'><NavLink className={`btn btn-outline-dark fw-bold border-0`} to={'/dashboard'}>Dashboard</NavLink></li>
              </>
            )} 
            <li className='mt-3 me-2'><NavLink className={`btn btn-outline-dark fw-bold border-0`} to={'/about'}>Sobre</NavLink></li>
            {user && (
              <li className='mt-3 me-2'>
                <button onClick={logout} className={`btn btn-outline-dark fw-bold border-0`}>Sair</button>
              </li>
            )}
        </ul>
    </nav>
  )
}

export default Navbar