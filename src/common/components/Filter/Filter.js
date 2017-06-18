import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'common/components/Select'
import { getFilters } from 'common/actions/filter'
import './Filter.scss'

class Filter extends Component {
  static propTypes = {
    getFilters: PropTypes.func,
    handleSubmit: PropTypes.func.isRequired,
    industries: PropTypes.array,
    types: PropTypes.array,
    citys: PropTypes.array,
    tags: PropTypes.array,
    rounds: PropTypes.array,
    locations: PropTypes.array,
    years: PropTypes.array,
    industriesVisible: PropTypes.bool,
    typesVisible: PropTypes.bool,
    tagsVisible: PropTypes.bool,
    roundsVisible: PropTypes.bool,
    locationsVisible: PropTypes.bool,
    citysVisible: PropTypes.bool,
    yearsVisible: PropTypes.bool,
    companySelectId:PropTypes.string,
    investmentSelectId:PropTypes.string
  };
  static defaultProps = {
    industriesVisible: true,
    tagsVisible: true,
    roundsVisible: true,
    locationsVisible: true,
    yearsVisible: true,
    citysVisible: true,
    typesVisible: true
  }
  constructor (props) {
    super(props)
    this.state = {
      filter: {}
    }
  }
  componentDidMount () {
    this.props.getFilters()
  }
  onFilterChange = (object) => {
    const { handleSubmit } = this.props
    const filter = {
      ...this.state.filter,
      ...object
    }
    this.setState({ filter })
    handleSubmit(filter)
  }
  onIndustryChange = (data) => {
    const filter = this.state.filter
    filter.industries = data
    this.setState({ filter }, () => {
      this.handleSubmit()
    })
  }
  onTagChange = (data) => {
    const filter = this.state.filter
    filter.tags = data
    this.setState({ filter }, () => {
      this.handleSubmit()
    })
  }
  onLocationChange = (data) => {
    const filter = this.state.filter
    filter.locations = data
    this.setState({ filter }, () => {
      this.handleSubmit()
    })
  }
  onRoundChange = (data) => {
    const filter = this.state.filter
    filter.rounds = data
    this.setState({ filter }, () => {
      this.handleSubmit()
    })
  }
  formatRound = (array) => {
    const object = { label: '', value: '', name: 'rounds[]' }
    object.children = array
    return [object]
  }

  render () {
    const { industries, tags, locations } = this.props
    const { industriesVisible, locationsVisible,
            roundsVisible, tagsVisible, yearsVisible, typesVisible, citysVisible } = this.props
    let { years, rounds, types, citys } = this.props
    rounds = this.formatRound(rounds)
    years = this.formatRound(years)
    types = this.formatRound(types)
    citys = this.formatRound(citys)
    return (
      <div className='companies-select-container'>
        {
                industriesVisible ? <Select
                  data={industries}
                  field='industries'
                  limit={10}
                  onChange={this.onFilterChange}
                  title='行业'
                  text='全部行业'
                  selectId={this.props.companySelectId}
                  style={{ width:'550px', left:'-1px' }}
                 /> : null
              }
        {
                locationsVisible ? <Select
                  data={locations}
                  field='locations'
                  limit={5}
                  onChange={this.onFilterChange}
                  title='地区'
                  text='全部地区'
                  selectId={this.props.investmentSelectId}
                  style={{ width:'400px', left:'-1px' }}
                 /> : null
              }
        {
                roundsVisible ? <Select
                  data={rounds}
                  field='rounds'
                  limit={5}
                  onChange={this.onFilterChange}
                  title='轮次'
                  text='全部轮次'
                  style={{ width:'410px', left:'-1px' }}
                 /> : null
              }
        {
                tagsVisible ? <Select
                  data={tags}
                  field='tags'
                  limit={10}
                  onChange={this.onFilterChange}
                  title='标签'
                  text='全部标签'
                  style={{ width:'540px', right:'-1px' }}
                 /> : null
              }
        {
                yearsVisible
                ? <Select
                  data={years}
                  field='years'
                  limit={5}
                  onChange={this.onFilterChange}
                  title='时间'
                  text='全部时间'
                  style={{ width:'400px', right:'-1px' }}
                 /> : null
              }
        {
                citysVisible
                ? <Select
                  data={citys}
                  selectWidth={560}
                  field='citys'
                  limit={5}
                  onChange={this.onFilterChange}
                  title='地区'
                  text='全部地区'
                  style={{ width:'560px', right:'-1px' }}
                 /> : null
              }
        {
                typesVisible
                ? <Select
                  data={types}
                  selectWidth={560}
                  field='types'
                  limit={10}
                  onChange={this.onFilterChange}
                  title='类型'
                  text='全部类型'
                  style={{ width:'560px', right:'-1px' }}
                 /> : null
              }
      </div>
    )
  }
}

const mapDispatchToProps = {
  getFilters
}

const mapStateToProps = (state) => ({
  industries: state.filter.industries,
  rounds: state.filter.rounds,
  tags: state.filter.tags,
  locations: state.filter.locations,
  years: state.filter.years,
  citys:state.filter.citys,
  types:state.filter.types
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter)
