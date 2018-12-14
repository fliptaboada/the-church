import React from 'react'
import './ResultView.css'
import Button from '../../components/Button'
import db from '../../database/database';
import Logo from '../../components/Logo';
import { AutoSizer, WindowScroller, Table, Column } from 'react-virtualized'
import 'react-virtualized/styles.css';

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
                {this.props.location.search ?
                    <>
                        <span className="lbl-result-header">RESULTADO PARA:</span>
                        <span className="lbl-result-search">{decodeURI(this.props.location.search.substring(1)).toUpperCase()}</span>
                    </>
                    :
                    <span className="lbl-result-header">LISTA COMPLETA</span>
                }
                <WindowScroller>
                    {({ height, isScrolling, onChildScroll, scrollTop }) => (
                        <div style={{ flex: '1 1 auto' }}>
                            <AutoSizer disableHeight>
                                {({ width }) => (
                                    <Table
                                        autoHeight
                                        height={height}
                                        isScrolling={isScrolling}
                                        scrollTop={scrollTop}
                                        onScroll={onChildScroll}
                                        rowCount={this.state.result.length}
                                        rowGetter={({ index }) => this.state.result[index]}
                                        rowHeight={25}
                                        headerHeight={20}
                                        className='result-table'
                                        width={width}
                                    >
                                        <Column
                                            label='Código'
                                            dataKey='id'
                                            style={{ fontWeight: '600', fontSize: '1rem' }}
                                            width={65}
                                            minWidth={65}
                                        />
                                        <Column
                                            label='Música / Artista'
                                            dataKey='song'
                                            flexGrow
                                            width={1.0}
                                            cellRenderer={({ rowData }) => (rowData.song + " - " + rowData.artist.toUpperCase())}
                                        />
                                    </Table>
                                )}
                            </AutoSizer>
                        </div>
                    )}
                </WindowScroller>
                {/*<table className='result-table'>
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
                        </table>*/}
                <Button onClick={this.voltar}>VOLTAR PARA A PESQUISA</Button>
                <Logo className="result-logo" />
            </div>
        )
    }

    loadResults = () => {
        if (this.props.location.search) {
            const searchString = decodeURI(this.props.location.search.substring(1)).toUpperCase()

            this.setState({
                result: db.get('songs')
                    .filter(item => this.normalize(item.artist).includes(this.normalize(searchString)) || this.normalize(item.song).includes(this.normalize(searchString)))
                    .sortBy('artist', 'song')
                    .value(),
                searching: false
            })
        } else {
            this.setState({
                result: db.get('songs').sortBy('artist', 'song').value()
            })
        }
    }

    normalize = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase()

    voltar = () => {
        this.props.history.push('/')
    }

}