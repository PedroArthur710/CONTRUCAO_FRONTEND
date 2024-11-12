'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function FuncionariosPage() {

  const [funcionarios, setFuncionarios] = useState([])

  // Carrega a lista de funcionários ao acessar a página
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const funcionariosLocalStorage = JSON.parse(localStorage.getItem("funcionarios")) || []
    // Guarda a lista no estado
    setFuncionarios(funcionariosLocalStorage)
    console.log(funcionariosLocalStorage)
  }, [])

  // Função para exclusão do funcionário
  function excluir(funcionario) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o funcionário ${funcionario.nome}?`)) {
      // Filtra a lista antiga removendo o funcionário recebido
      const novaLista = funcionarios.filter(item => item.id !== funcionario.id)
      // Grava no localStorage a nova lista
      localStorage.setItem('funcionarios', JSON.stringify(novaLista))
      // Atualiza o estado para renderizar a nova lista
      setFuncionarios(novaLista)
      alert("Funcionário excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Funcionários"}>
      <div className='text-end mb-2'>
        <Button href='/funcionarios/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os Funcionários */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Endereço</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map(funcionario => (
            <tr key={funcionario.id}>
              <td>{funcionario.nome}</td>
              <td>{funcionario.cpf}</td>
              <td>{funcionario.email}</td>
              <td>{funcionario.endereço}</td>
              <td className='text-center'>
                {/* Botões das ações */}
                <Button className='me-2' href={`/funcionarios/form?id=${funcionario.id}`}><FaPen /></Button>
                <Button variant='danger' onClick={() => excluir(funcionario)}><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  )
}
