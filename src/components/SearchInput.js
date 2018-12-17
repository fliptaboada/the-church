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
            <form onSubmit={this.onSearch} action='.'>
                <span className='search-group'>
                    <input type='search' value={this.state.searchQuery} onChange={this.onChangeSearchQuery} />
                    <button onClick={this.onSearch}>
                        <Arrow fill='white' />
                    </button>
                </span>
            </form>
        )
    }

    onChangeSearchQuery = (event) => {
        this.setState({ searchQuery: event.target.value })
    }
    onSearch = () => {
        this.props.onSearch(this.state.searchQuery)
    }

}
