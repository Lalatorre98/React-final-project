import React from 'react'
import { Link } from 'react-router-dom'
import "./ArticleCard.css"

const ArticleCard = ({article}) => {
  return (
    <div className='article-card'>
        <img src={article?.imageUrl} />
        <div className="article-card-info">
            <p>{article?.title}</p>
            <Link to={`/article/${article?.id}`}>Read</Link>
        </div>
    </div>
  )
}

export default ArticleCard