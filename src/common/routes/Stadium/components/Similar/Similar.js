import React from 'react'
import PropTypes from 'prop-types'
import Image from 'common/components/Image'
import Card from 'common/components/Card'
import stadium_default_logo from 'assets/img-default-stadium@2x.png'
// import { Link } from 'react-router'

import './Similar.scss'

const Stadium = ({ stadium }) => (
  <div className='stadium-similar-item'>
    <div className='left-image'>
      <Image height={54}
        width={70} url={stadium.logo}
        link={`/stadium/${stadium.id}`}
        radius={0}
        defaultImg={stadium_default_logo} />
    </div>
    <div className='right-text'>
      <a href={`/stadium/${stadium.id}`} target='_blank'>
        {stadium.name}
      </a>
    </div>
  </div>
)

Stadium.propTypes = {
  stadium:PropTypes.object
  // getStadium:PropTypes.func
}

export const Similar = ({ data, title, getStadium }) => (
  <div className='similar'>
    <Card title={title}>
      {
          data && data.map(stadium => (
            <Stadium
              key={stadium.id}
              stadium={stadium}
              getStadium={getStadium}
             />
          ))
        }
    </Card>
  </div>
)

Similar.propTypes = {
  title:PropTypes.string,
  data:PropTypes.array,
  getStadium:PropTypes.func
}

export default Similar
