const path = require('path')
const fs = require('fs')
const es = require('event-stream')
const Papa = require('papaparse')

function cleanup(inPath, outPath) {
    return fs.createReadStream(inPath, 'utf-8')
        .pipe(es.split())
        .pipe(es.mapSync((line) => {
            if (
                line === ',HD-OKÊ!!,' ||
                line === 'CANTOR,NÚMERO,MÚSICA' ||
                line.match(/,,Página [0-9].* de [0-9].*/g)) {
                return ''
            } else {
                return line + '\n'
            }
        }))
        .pipe(fs.createWriteStream(outPath, { encoding: 'utf-8', flags: 'a' }))
}

function generateJson(inPath, writeStream) {
    let first = true
    Papa.parse(fs.readFileSync(inPath, 'utf-8'), {
        step: row => {
            if (row.data[0][0]) {
                if (!first) {
                    writeStream.write(',')
                }
                writeStream.write('\n{')
                writeStream.write(`"id": \"${row.data[0][1]}\",`)
                writeStream.write(`"artist": \"${row.data[0][0]}\",`)
                writeStream.write(`"song": \"${row.data[0][2].replace(/\"/g, '\\"')}\"`)
                writeStream.write('}')
                if (first) {
                    first = false
                }
            }
        }
    })
}

const cleanedCatalog = path.join(__dirname, '../src/catalogs/catalogo-cleaned.csv');

fs.unlinkSync(cleanedCatalog)

cleanup(path.join(__dirname, '../catalogs/catalogonacional.csv'), cleanedCatalog)
    .on('finish', () => {
        cleanup(path.join(__dirname, '../catalogs/catalogointernacional.csv'), cleanedCatalog)
            .on('finish', () => {
                const jsonPath = path.join(__dirname, '../src/catalogs/catalogo.json');
                fs.unlinkSync(jsonPath)

                const writeStream = fs.createWriteStream(jsonPath, { encoding: 'utf-8' })
                writeStream.write('{\n')
                writeStream.write('"songs":[')
                generateJson(cleanedCatalog, writeStream)
                writeStream.write(']}')
                writeStream.close()
            })
    })

