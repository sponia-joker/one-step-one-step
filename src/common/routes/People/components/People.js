import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
import Header from 'common/components/Header'
import Footer from 'common/components/Footer'
import { getPeople } from '../modules/people'
import Breadcrumb from 'common/components/Breadcrumb'
import NoRecord from 'common/components/NoRecord'
import './People.scss'
import img_default_people from 'assets/img-default-people@2x.png'
import Image from 'common/components/Image'
import { Link } from 'react-router-dom'
import logo_balck from 'assets/logo-black@2x.png'

class People extends Component {

  static propTypes={
    params:PropTypes.object,
    getPeople:PropTypes.func,
    people:PropTypes.object

  }
  componentDidMount () {
    const { params:{ people_id } } = this.props.match
    this.props.getPeople(people_id)
  }
  render () {
    const { people } = this.props
    const path = [ { name:'首页', link:'/' }, { name:'创业公司', link:'/companies' } ]
    const company = people && people.company
    if (people && company) {
      path.push(
        { name:people.company&&people.company.short_name, link:`/company/${people.company&&people.company.id}` },
        { name:people.name, link:`/people/${people.id}` }
      )
    }
    return (
      <div className='people-container'>
        <Helmet title={`${people && people.name || '人物详情'} | 快体育`} />
        <Header style={{ backgroundColor:'#fff' }} logo={logo_balck} />
        {people
          ? <div className='people-content'>
            <Breadcrumb path={path} />
            <div className='people-info'>
              <div className='people-info-basic'>
                <div className='avatar'>
                  <img src={people.avatar ? people.avatar : img_default_people}
                    alt={people.name} width='80px' height='80px' />
                  <span>{people.name}</span>
                </div>
                <div className='business-profile'>
                  <span>{company&&company.short_name}&nbsp;&nbsp;{people.position}</span>
                </div>
              </div>

            </div>
            <div className='people-info-other'>
              <ul>
                <li className='people-profile'>
                  <span className='header'>人物简介</span>
                  <span className='description'>
                    {
                      people.description
                      ? `${people.name}，${people.description}`
                      : <NoRecord style={{ padding:'0px', textAlign:'left' }} />

                    }
                  </span>
                </li>
                <li className='people-create-bussiss'>
                  <span className='header'>创业经历</span>
                  <div className='product-list'>
                    <div className='product-list-item'>
                      <div className='product-list-item-logo'>
                        <Image
                          height={60}
                          width={60}
                          url={company&&company.logo}
                          link={`/company/${company&&company.id}`}
                          radius={6} />
                      </div>
                      <div className='product-list-item-logo-text'>
                        <Link to={`/company/${company&&company.id}`}>{company&&company.short_name}</Link>
                        <p>{company&&company.description}</p>
                      </div>
                    </div>
                  </div>
                </li>
                <li className='people-work'>
                  <span className='header'>工作经历</span>
                  <div className='people-work-list'>
                    {
                    people.previous_jobs && people.previous_jobs.length > 1
                    ? people.previous_jobs.map((job, index) => {
                      return <div className='people-work-list-item' key={index}>
                        <i />
                        <span>{job}</span>
                      </div>
                    }) : <NoRecord style={{ padding:'0px', textAlign:'left' }} />

                  }
                  </div>
                </li>
                <li className='people-education'>
                  <span className='header'>教育经历</span>
                  <div className='people-education-list'>
                    {
                    people.educations && people.educations.length > 1
                    ? people.educations.map((education, index) => {
                      return <div className='people-education-list-item' key={index}>
                        <i />
                        <span>{education}</span>
                      </div>
                    }) : <NoRecord style={{ padding:'0px', textAlign:'left' }} />

                  }
                  </div>
                </li>
              </ul>
            </div>
          </div> : null}
        <Footer />
      </div>
    )
  }
}

const mapDispatchToProps = {
  getPeople
}

const mapStateToProps = (state) => ({
  people:state.people.data
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(People)
