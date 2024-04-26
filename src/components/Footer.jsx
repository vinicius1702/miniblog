import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer /* className='footer ' */
    className={`${styles.footer} shadow-lg d-flex flex-column justify-content-center align-items-center`}>
        <h3>Escreva sobre o que você tem interesse!</h3>
        <p>Mini Blog &copy; 2024</p>
    </footer>
  )
}

export default Footer