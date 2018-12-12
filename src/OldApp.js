import React from 'react';
import './App.css';
import catalogo from './catalogs/catalogo-cleaned.csv'
import * as Papa from 'papaparse'
import { Route } from 'react-router-dom'
import SearchView from './view/search/SearchView';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {searchQuery: '', result: []}
  }

  render() {
    return (
      <div className="App">
        <Route exact path='/' component={SearchView} />
        <header className="App-header">
          <p>
            Busca:
            <input type='text' value={this.state.searchQuery} onChange={this.onSearch} />
          </p>
        </header>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Música / Artista</th>
            </tr>
          </thead>
          <tbody>
            {this.state.result.map(row => (
              <tr>
                <td>{row[0][1]}</td>
                <td>{row[0][2]} - {row[0][0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  onSearch = (event) => {
    this.setState({searchQuery: event.target.value})
    if (event.target.value.length > 3) {
      const result = []
      Papa.parse(catalogo, {
        download: true,
        step: row => {
          if (row.data[0][0].toUpperCase().includes(this.state.searchQuery.toUpperCase()))
            result.push(row.data)
        },
        complete: () => this.setState({result})
      })
    }
  }

}
