import { useParams } from "react-router-dom"
import { useFetchDocument } from "../../hooks/useFetchDocument"
import styles from './Post.module.css'

const Post = () => {
  const { id } = useParams()
  const { document: post, loading } = useFetchDocument("posts", id)

  return (
    <div className={`${styles.post_container} text-center`}>
      {loading && <p>Carregando post...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <h3>Este post trata sobre:</h3>
          <div className={`${styles.tags} d-flex justify-content-center`}>
          {post.tagsArray.map((tag)=>(
            <p key={tag}>
              <span className="fw-bold">#</span>
              {tag}
            </p>
          ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Post