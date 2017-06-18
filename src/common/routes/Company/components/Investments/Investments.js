import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Card from 'common/components/Card'
import NoRecord from 'common/components/NoRecord'
import moment from 'moment'
import { transformAmount } from 'tools'

const displayInvestors = (event) => {
  const target = event.target
  target.style.display = 'none'
  const liElement = target.parentNode.previousSibling
  liElement.style.height = 'auto'
  const aElement = target.nextElementSibling
  aElement.style.display = 'inline-block'
}
const hiddenInvestors = (event) => {
  const target = event.target
  target.style.display = 'none'
  const liElement = target.parentNode.previousSibling
  liElement.style.height = '82px'
  const aElement = target.previousSibling
  aElement.style.display = 'inline-block'
}

export const Investments = ({ title, data, subtitle }) => (
  <div className='company-investments'>
    <Card title={title} subtitle={subtitle || '不明确'}>
      {
        data && data.length >= 1
        ? <div className='company-investments-list'>
          {
            data.map((investment, index) => {
              return (
                <div className='company-investments-list-item' key={index}>
                  <ul>
                    <li>
                      {investment.round}
                      <span>{investment.date ? moment(investment.date).format('YYYY.MM.DD') : '未知'}</span>
                    </li>
                    <li>
                      {
                        investment.amount && investment.amount !== 0
                        ? `${transformAmount(investment.amount)}${investment.currency
                        ? investment.currency : ''}`
                        : investment.approximation
                        ? `${investment.approximation}${investment.currency ? investment.currency : ''}`
                        : '不明确'
                      }
                    </li>
                    <li style={{ height:investment.investors &&
                                 investment.investors.length === 4 ? '106px' : '82px' }}>
                      {investment.investors && investment.investors.map((investor, _index) => {
                        return (
                          <span key={_index}>{investor}</span>
                        )
                      })}
                    </li>
                    {
                      investment.investors && investment.investors.length > 4
                      ? <li>
                        <a href='javascript:;'
                          onClick={displayInvestors}>
                          显示全部{investment.investors.length}个投资者
                        </a>
                        <a href='javascript:;'
                          onClick={hiddenInvestors}
                          style={{ display:'none' }}>
                            收起
                        </a>
                      </li> : null
                    }
                  </ul>
                </div>
              )
            })
          }
        </div> : <NoRecord />
      }
    </Card>
  </div>
)
Investments.propTypes = {
  title:PropTypes.string,
  subtitle:PropTypes.string,
  data:PropTypes.array
}

export default Investments
