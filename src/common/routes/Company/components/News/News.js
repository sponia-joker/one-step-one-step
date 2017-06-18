import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Card from 'common/components/Card'
import NoRecord from 'common/components/NoRecord'
import moment from 'moment'

export const News = ({ title, data }) => (
  <div className='company-news'>
    <Card title={title}>
      {
        data && data.length >= 1
        ? <div className='company-news-list'>
          {
            data.map((_new, index) => {
              return (
                <div className='company-news-list-item' key={index}>
                  <p>
                    <a href={_new.link} target='_blank'>
                      {
                        _new.title
                      }
                    </a>
                    <span className='news-date'>
                      {_new.date ? moment(_new.date).format('YYYY.MM.DD') : '未知'}
                    </span>
                  </p>
                  <p>
                    <span className='news-type'>
                      {
                          _new.news_type ? _new.news_type : '未知'
                        }
                    </span>
                    <span className='news-link'><a href={_new.link} target='_blank'>{_new.link}</a></span>
                  </p>
                </div>
              )
            })}
        </div> : <NoRecord />
      }
    </Card>
  </div>
)
News.propTypes = {
  title:PropTypes.string,
  data:PropTypes.array
}

export default News
