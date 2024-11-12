'use client'

import { Container, Nav, Navbar } from "react-bootstrap"

export default function Pagina({ titulo, children }) {

  return (
    <>
      {/* Barra de Navegação */}
      <Navbar style={{ backgroundColor: '#FFA500' }}>
        <Container>
          <Navbar.Brand href="/" style={{ color: 'black' }}>Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/servicos" style={{ color: 'black' }}>Serviços</Nav.Link>
            <Nav.Link href="/pets" style={{ color: 'black' }}>Pets</Nav.Link>
            <Nav.Link href="/clientes" style={{ color: 'black' }}>Clientes</Nav.Link>
            <Nav.Link href="/agendamentos" style={{ color: 'black' }}>Agendamentos</Nav.Link>
            <Nav.Link href="/funcionarios" style={{ color: 'black' }}>Funcionários</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Barra de Titulo */}
      <div className="bg-dark text-center text-white py-2">
        <h1>{titulo}</h1>
      </div>

      {/* Conteúdo da Página */}
      <Container className="mt-2">
        {children}
      </Container>
    </>
  )
}
