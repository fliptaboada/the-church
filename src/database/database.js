import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'
import catalog from '../catalogs/catalogo.json'

localStorage['catalog'] = JSON.stringify(catalog)

const adapter = new LocalStorage('catalog')
const db = low(adapter)

export default db