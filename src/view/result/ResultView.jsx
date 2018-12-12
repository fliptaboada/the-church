import React from 'react'
import './ResultView.css'
import Button from '../../components/Button'
import db from '../../database/database';
import Logo from '../../components/Logo';

export default class ResultView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            result: [],
            searching: true
        }
    }

    componentDidMount() {
        this.loadResults()
    }

    componentDidUpdate() {
        this.loadResults()
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.location.search !== nextProps.location.search
            || this.state.searching !== nextState.searching
    }

    render() {
        return (
            <div className='result-view'>
                <span className="lbl-result-header">RESULTADO PARA:</span>
                <span className="lbl-result-search">{decodeURI(this.props.location.search.substring(1)).toUpperCase()}</span>
                <table className='result-table'>
                    <thead>
                        <tr>
                            <th>CÓDIGO</th>
                            <th>MÚSICA / ARTISTA</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.result && this.state.result.map(row => (
                            <tr key={row.id}>
                                <td style={{ fontWeight: '600' }}>{row.id}</td>
                                <td>{row.song} - {row.artist.toUpperCase()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Button onClick={this.voltar}>VOLTAR PARA A PESQUISA</Button>
                <Logo className="result-logo" />
            </div>
        )
    }

    loadResults = () => {
        const searchString = decodeURI(this.props.location.search.substring(1)).toUpperCase()
        this.setState({
            result: db.get('songs')
                .filter(item => item.artist.toUpperCase().includes(searchString) || item.song.toUpperCase().includes(searchString))
                .value(),
            searching: false
        })
    }

    voltar = () => {
        this.props.history.push('/')
    }

}