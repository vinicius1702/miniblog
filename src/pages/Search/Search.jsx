import { useQuery } from '../../hooks/useQuerry'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import PostDetail from '../../components/PostDetail'
import { Link } from 'react-router-dom'
import styles from './Search.module.css'

const Search = () => {
    const query = useQuery()
    const search = query.get('q')

    const { documents: posts } = useFetchDocuments("posts", search)

    return (
        <div className={`${styles.search_container} d-flex flex-column align-items-center justify-content-center`}>
            <h2>#{search}</h2>
            <div>
                {posts && posts.length === 0 && (
                <div className={styles.noposts}>
                    <p>Não foram encontrados posts a partir da sua busca...</p>
                    <Link to={'/'} className='btn btn-outline-dark fw-bold'>Voltar</Link>
                </div>
            )}
                {posts && posts.map((post) => (
                    <PostDetail key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default Search