import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Card from 'common/components/Card'
import NoRecord from 'common/components/NoRecord'
import moment from 'moment'
import icon_list from 'assets/icon-list@2x.png'

export const Milestones = ({ title, data }) => (
  <div className='company-milestones'>
    <Card title={title}>
      {
        data && data.length >= 1
        ? <div className='company-milestones-list'>
          {
          data.map((milestone, index) => {
            return (
              <div className='company-milestones-list-item' key={index}>
                <span className='company-milestones-date'>{
                  milestone.date ? moment(milestone.date).format('YYYY.MM') : '未知'}
                </span>
                <span className='company-milestones-border'>
                  <img src={icon_list} width='15px' />
                </span>
                <span className='company-milestones-content'>
                  {milestone.content}
                </span>
              </div>
            )
          })
        }
        </div> : <NoRecord />
      }
    </Card>
  </div>
)
Milestones.propTypes = {
  title:PropTypes.string,
  data:PropTypes.array
}

export default Milestones
