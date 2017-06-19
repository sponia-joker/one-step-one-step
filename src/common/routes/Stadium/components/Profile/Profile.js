import React from 'react'
import PropTypes from 'prop-types'
import './Profile.scss'
import Image from 'common/components/Image'
import Tag from 'common/components/Tag'
import stadium_default_logo from 'assets/img-default-stadium@2x.png'
import { removeMunicipality, singleLineString } from 'tools'

export const Profile = ({ stadium }) => (
  <div className='stadium-profile'>
    <div className='stadium-profile-top'>
      <div className='profile-image'>
        <Image height={180}
          width={240}
          url={stadium.logo}
          link={`/stadium/${stadium.id}`}
          radius={0}
          defaultImg={stadium_default_logo} />
      </div>
      <div className='profile-basic'>
        <ul>
          <li className='profile-basic-name'>{stadium.name}</li>
          <li className='profile-basic-tele'>
            <span>电话：</span>
            <span style={{ color:stadium.telephone ? '#333' : '#999' }}>
              {stadium.telephone ? stadium.telephone : '未收录'}
            </span>
          </li>
          <li className='profile-basic-address'>
            <span>地址：</span>
            <span style={{ color:stadium.address || stadium.location ? '#333' : '#999' }}>
              {
                  stadium.address || stadium.location
                 ? singleLineString`${stadium.location.province ? stadium.location.province : ''}
                  ${stadium.location.city ? removeMunicipality(stadium.location.city) : ''}
                  ${stadium.location.district ? stadium.location.district : ''}
                  ${stadium.address ? stadium.address : ''}` : '未收录'
                }
            </span>
          </li>
          <li className='profile-basic-time'>
            <span>营业时间：</span>
            <span style={{ color:stadium.open_start ? '#333' : '#999' }}>
              {
                stadium.open_start
                ? `${stadium.open_start}-${stadium.open_end}` : '未收录'
              }
            </span>
          </li>
          <li className='profile-basic-types'>
            {
            stadium.stadium_types && stadium.stadium_types.map((type, index) => (
              <div className='tag-wrap'
                style={{ display:'inline-block' }}
                key={index}>
                <Tag text={type.name} key={type.id} />
              </div>
            ))
          }
          </li>
        </ul>
      </div>
    </div>
    {
    stadium.intro &&
      <div className='stadium-profile-buttom'>
        {
       stadium.intro
      }
      </div>
    }
  </div>
)
Profile.propTypes = {
  stadium:PropTypes.object
}

export default Profile
