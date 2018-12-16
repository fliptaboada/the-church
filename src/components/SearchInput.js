import React from 'react'
import './SearchInput.css'
import { ReactComponent as Arrow } from '../images/arrow-right.svg'

export default class SearchInput extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchQuery: ''
        }
    }

    render() {
        return (
            <span className='search-group'>
                <input value={this.state.searchQuery} onChange={this.onChangeSearchQuery} />
                <button onClick={this.onSearch}>
                    <Arrow fill='white' />
                </button>
            </span>
        )
    }

    onChangeSearchQuery = (event) => {
        this.setState({ searchQuery: event.target.value })
    }
    onSearch = () => {
        this.props.onSearch(this.state.searchQuery)
    }

}
