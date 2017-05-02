import { Component } from 'react'
import { URL } from 'universal-url'
import fetch from 'isomorphic-unfetch'
import Widget from '../../widget'
import Counter from '../../counter'

export default class JiraIssueCount extends Component {
  static defaultProps = {
    query: '',
    title: 'JIRA Issue Count'
  }

  state = {
    count: 0
  }

  async componentDidMount () {
    const { url, query } = this.props

    const urlObj = new URL('rest/api/2/search', url)
    urlObj.searchParams.append('jql', query)

    const res = await fetch(urlObj.toString()) // eslint-disable-line no-undef
    const json = await res.json()

    this.setState({ count: json.total })
  }

  render () {
    const { count } = this.state
    const { title } = this.props

    return (
      <Widget title={title}>
        <Counter value={count} />
      </Widget>
    )
  }
}
