import { Link } from 'react-router-dom'
import styles from './PostDetail.module.css'

const PostDetail = ({post}) => {
  return (
    <div className={styles.post_detail}>
        <img src={post.image} alt={post.title} />
        <h2>{post.title}</h2>
        <p className={`${styles.createdBy} fst-italic text-secondary`}>{post.createdBy}</p>
        <div className={`${styles.tags} d-flex`}>
            {post.tagsArray.map((tag)=>(
                <p key={tag}><span className='fw-bold'>#</span>{tag}</p>
            ))}
        </div>
        <Link to={`/posts/${post.id}`} className='btn btn-outline-success fw-bold'>Ler</Link>
    </div>
  )
}

export default PostDetail