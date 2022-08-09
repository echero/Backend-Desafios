const chai = require('chai')
const chaiHttp = require('chai-http')
const { describe } = require('mocha')
const {server} = require('../app.js')
const { expect } = chai

chai.use(chaiHttp)

describe("API PRODUCTOS GET", () => {

    describe("GET /productos",  () => {
        it("Trae todos los productos del controller",  () => {
            chai.request(server)
            .get('/productos')
            .end((_, res) =>{
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql([
                    { id: '62f1b134911670d046ec0e7f', full_name: "Titulo: Fibras - Codigo: F001", caracteristicas: "Precio: $500 - Stock: 100"},
                ])
            })
        })
    })

     describe("GET /productos/:id",  () => {
        it("Trae un producto especifico por ID",  () => {
            chai.request(server)
            .get('/productos/62f1b134911670d046ec0e7f')
            .end((_, res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql(
                    {id: '62f1b134911670d046ec0e7f', full_name: "Titulo: Fibras - Codigo: F001", caracteristicas: "Precio: $500 - Stock: 100"}
                )
            })
        })
    })
    
})

describe("API PRODUCTOS POST", () => {

    describe("POST /productos",  () => {
        it("Crea un producto",  () => {
            chai.request(server)
            .post('/productos')
            .send({ nombre: "Hojas", descripcion: "Hojas Rivadabia", codigo: "H001", precio: 1000, stock: 200 })
            .end((_, res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql(
                    { nombre: "Hojas", descripcion: "Hojas Rivadabia", codigo: "H001", precio: 1000, stock: 200, _id: JSON.parse(res.text)._id, __v: 0 }
                )
            })
        })
    })
    
})

describe("API PRODUCTOS PUT", () => {

    describe("PUT /productos",  () => {
        it("Actualiza un producto",  () => {
            chai.request(server)
            .put('/productos/62f1b134911670d046ec0e7f')
            .send({ nombre: "Fibras2", descripcion: "Fibras Rivadabia3", codigo: "F001", precio: 100, stock: 20 })
            .end((_, res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql(
                    { message: 'Producto actualizado'},
                )
            })
        })
    })
    
})

describe("API PRODUCTOS ELIMINAR", () => {

    describe("DELETE /productos",  () => {
        it("ELiminar un producto",  () => {
            chai.request(server)
            .delete('/productos/62f1b134911670d046ec0e7f')
            .end((_, res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(JSON.parse(res.text))
                .to.eql(
                    { message: 'Producto eliminado'},
                )
            })
        })
    })
    
})