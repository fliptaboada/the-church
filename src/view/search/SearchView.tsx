import React from 'react'
import './SearchView.css'
import { RouteComponentProps } from 'react-router'
import Button from '../../components/Button'
import SearchInput from '../../components/SearchInput';
import Logo from '../../components/Logo';

interface SearchProps extends RouteComponentProps {

}

export default class SearchView extends React.Component<SearchProps> {

    render() {
        return (
            <div className='search-view'>
                <Logo className="search-logo" />
                <span className="lbl-busca">BUSCA POR ARTISTA</span>
                <SearchInput onSearch={this.onSearch} />
                <p className='lbl-info'>Encontre o código da sua música utilizando a <br />
                    pesquisa acima ou se preferir:</p>
                <Button className='btn-lista'>VER A LISTA COMPLETA</Button>
            </div>
        )
    }


    private onSearch = (searchQuery: string) => {
        this.props.history.push({
            pathname: '/result',
            search: encodeURI(searchQuery.trim())
        })
    }

}