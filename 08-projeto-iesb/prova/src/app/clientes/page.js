'use client'

import Pagina from '@/components/Pagina'
import { useRouter } from 'next/navigation'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { FaPen, FaTrashAlt } from "react-icons/fa"

export default function ClientePage(props) {

  const router = useRouter()

  // Recupera a lista de clientes do localStorage
  const clientes = JSON.parse(localStorage.getItem('clientes')) || []

  // Função para editar um cliente
  function editarCliente(id) {
    router.push(`/clientes?id=${id}`)
  }

  // Função para excluir um cliente
  function excluirCliente(id) {
    const clientesAtualizados = clientes.filter(cliente => cliente.id !== id)
    localStorage.setItem('clientes', JSON.stringify(clientesAtualizados))
    alert("Cliente excluído com sucesso!")
    router.reload()  // Recarrega a página após a exclusão
  }

  return (
    <Pagina titulo="Lista de Clientes">
      <Row className="mb-3">
        <Col>
          <Button variant="primary" onClick={() => router.push('/clientes/cadastrar')}>
            Adicionar Cliente
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length > 0 ? (
            clientes.map(cliente => (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.endereco}</td>
                <td>{cliente.dataNascimento}</td>
                <td>
                  <Button 
                    variant="warning" 
                    onClick={() => editarCliente(cliente.id)} 
                    className="me-2">
                    <FaPen />
                  </Button>
                  <Button 
                    variant="danger" 
                    onClick={() => excluirCliente(cliente.id)}>
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">Nenhum cliente encontrado</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Pagina>
  )
}
