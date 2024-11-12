'use client'

import Pagina from '@/components/Pagina'
import { Button, Card, Col, Row } from 'react-bootstrap'

export default function HomePage() {


  const servicos = JSON.parse(localStorage.getItem("servicos")) || []
  const pets = JSON.parse(localStorage.getItem("pets")) || []
  const clientes = JSON.parse(localStorage.getItem("clientes")) || []
  const agendamentos = JSON.parse(localStorage.getItem("agendamentos")) || []
  const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || []

  const lista = [
    {
      nome: "Serviços",
      imagem: "https://i.pinimg.com/236x/53/f4/63/53f463fcc23af8ec4fc28e7c5ccd168a.jpg", quantidade: servicos.length,
      link: "/servicos"
    },
    {
      nome: "Pets",
      imagem: "https://t4.ftcdn.net/jpg/02/69/47/89/360_F_269478900_EEEXPJa7ohrxraL6L6V2GlmltteALheQ.jpg", quantidade: pets.length,
      link: "/pets"
    },
    {
      nome: "Clientes",
      imagem: "https://i.pinimg.com/736x/39/09/fb/3909fb65bbab271bb5a9ddbf85c80d00.jpg", quantidade: clientes.length,
      link: "/clientes"
    },
    {
      nome: "Agendamentos",
      imagem: "https://i.pinimg.com/236x/79/0f/fc/790ffceeb183a1059b77c5558342ffc0.jpg", quantidade: agendamentos.length,
      link: "/agendamentos"
    },
    {
      nome: "Funcionários",
      imagem: "https://i.pinimg.com/236x/ce/96/4d/ce964d843b92374b8b96e105ffa82831.jpg", quantidade: funcionarios.length,
      link: "/funcionarios"
    },
  ]



  return (
    <Pagina titulo={"Serviços Exclusivos para o Seu Melhor Amigo"}>
      <Row md={4}>
        {lista.map(item => (
          <Col className='py-2'>
            <Card style={{height: '100%'}}>
              <Card.Img src={item.imagem} style={{ height: '100%' }} />
              <Card.Body>
                <Card.Title>{item.nome}</Card.Title>
                Cadastrados: {item.quantidade}
              </Card.Body>
              <Card.Footer className='text-end'>
                <Button href={item.link}>Ver Lista</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}

      </Row>
    </Pagina>
  )
}