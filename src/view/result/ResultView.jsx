import React from 'react'
import './ResultView.css'
import Button from '../../components/Button'
import FloatingBackButton from '../../components/FloatingBackButton'
import db from '../../database/database';
import Logo from '../../components/Logo';
import { AutoSizer, WindowScroller, Table, Column } from 'react-virtualized'
import 'react-virtualized/styles.css';

export default class ResultView extends React.Component {

    width = 0

    constructor(props) {
        super(props)
        this.state = {
            result: [],
            searching: true,
        }
        this.tableRef = React.createRef();
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
                                {({ width }) => {
                                    if (width !== this.width && this.tableRef) {
                                        this.width = width
                                        window.setTimeout(() => this.tableRef.current.recomputeRowHeights())
                                    }
                                    return (
                                        <Table
                                            ref={this.tableRef}
                                            autoHeight
                                            height={height}
                                            isScrolling={isScrolling}
                                            scrollTop={scrollTop}
                                            onScroll={onChildScroll}
                                            rowCount={this.state.result.length}
                                            rowGetter={({ index }) => this.state.result[index]}
                                            rowHeight={this.createGetRowHeight(width)}
                                            noRowsRenderer={() => <span className='no-rows'>Nenhuma música encontrada</span>}
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
                                                label={this.createSontArtistHeader()}
                                                dataKey='song'
                                                flexGrow={1}
                                                width={1.0}
                                                cellRenderer={this.createSongArtistCell}
                                            />
                                        </Table>
                                    )
                                }}
                            </AutoSizer>
                        </div>
                    )}
                </WindowScroller>
                <FloatingBackButton />
                <Button onClick={this.voltar}>VOLTAR PARA A PESQUISA</Button>
                <Logo className="result-logo" />
            </div>
        )
    }

    createGetRowHeight = (width) => ({ index }) => {
        const data = this.createSongArtistCell({ rowData: this.state.result[index] })
        return Math.ceil(data.length * this.getPixelsPerChar() / (width - 75 - 20)) * 20
    }

    createSontArtistHeader = () => this.props.location.search ? 'Música / Artista' : 'Artista / Música'

    createSongArtistCell = ({ rowData }) => {
        if (this.props.location.search) {
            return rowData.song.toUpperCase() + " - " + rowData.artist.toUpperCase()
        } else {
            return rowData.artist.toUpperCase() + " - " + rowData.song.toUpperCase()
        }
    }

    loadResults = () => {
        if (this.props.location.search) {
            const searchString = decodeURI(this.props.location.search.substring(1)).toUpperCase()

            this.setState({
                result: db.get('songs')
                    .filter(item => this.normalize(item.artist).includes(this.normalize(searchString)) || this.normalize(item.song).includes(this.normalize(searchString)))
                    .orderBy([item => this.normalize(item.artist), item => this.normalize(item.song)], ['asc', 'asc'])
                    .value(),
                searching: false
            })
        } else {
            this.setState({
                result: db.get('songs')
                    .orderBy([item => this.normalize(item.artist), item => this.normalize(item.song)], ['asc', 'asc'])
                    .value()
            })
        }
    }

    getPixelsPerChar = () => this.isMobile() ? 8.8 : 8

    isMobile = () => {
        return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }

    normalize = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase()

    voltar = () => {
        this.props.history.push('/')
    }

}