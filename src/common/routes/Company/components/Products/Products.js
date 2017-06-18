import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Card from 'common/components/Card'
import NoRecord from 'common/components/NoRecord'
import Image from 'common/components/Image'
import { getProductDefaultImage } from 'tools'

export const Products = ({ title, data }) => (
  <div className='company-products'>
    <Card title={title}>
      {
        data && data.length >= 1
        ? <div className='company-product-list'>
          {
          data.map((product, index) => {
            return (
              <div className='company-product-list-item' key={index}>
                <div className='item-img'>
                  <Image
                    height={60}
                    width={60}
                    radius={6}
                    url={product.images && product.images[0]
                        ? product.images[0] : getProductDefaultImage(product.product_type)} />
                </div>
                <div className='item-info'>
                  <span>
                    {
                      product.link
                      ? <a href={product.link} target='_blank'
                        className='product-has-link'>{product.name}</a> : product.name
                    }
                    <a className='product-type'>{product.product_type ? product.product_type : '未知'}</a>
                  </span>
                  <p>{product.description}</p>
                </div>
              </div>
            )
          })
        }
        </div> : <NoRecord />
      }
    </Card>
  </div>
)
Products.propTypes = {
  title:PropTypes.string,
  data:PropTypes.array
}

export default Products
