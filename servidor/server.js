const express = require("express")
const cors = require("cors")
const usos = require("../dados.json")

//Funções e códigos auxiliares, tipo: autoIncrement, totais, cálculos...
function autoIncrement() {
    return Number(usos[usos.length - 1].id) + 1
}

const rotaInicial = (req, res) => {
    res.json("Back-end respondendo")
}
const cadastrarUso = (req, res) => {
    const uso = req.body
    uso.id = autoIncrement()
    res.status(201).json(uso)
}

const readUso = (req, res) => {
    res.json(usos)
}

const buscaUso = (req, res) => {
    const uso = usos.find(p => p.id == Number(req.params.id))
    if (uso) res.json(uso)
    else res.status(404).json("Id não encontrado")
}

const updateUso = (req, res) => {
    const id = req.params.id
    const dados = req.body
    dados.id = Number(id)
    let status = 0

    usos.forEach((uso, indice) => {
        if (uso.id == id) {
            usos[indice] = dados
            status = 1
        }
    })

    if (status == 1) {
        res.status(202).json(dados)
    } else {
        res.status(404).send("Uso não encontrado")
    }
}

const deleteUso = (req, res) => {
    const id = req.params.id
    let status = 0

    usos.forEach((uso, indice) => {
        if (uso.id == id) {
            usos.splice(indice, 1)
            status = 1
        }
    })

    if (status == 1) {
        res.json("Uso excluido com sucesso")
    } else {
        res.status(404).send("Uso não encontrado")
    }
}




const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const porta = 3000


app.get('/', rotaInicial)
app.post('/usos', cadastrarUso)
app.get('/usos', readUso)
app.get('/usos/:id', buscaUso)
app.put('/usos/:id', updateUso)
app.delete('/usos/:id', deleteUso)


app.listen(porta, () => {
    console.log(`Servidor respondendo em: http://localhost:${porta}`)
})