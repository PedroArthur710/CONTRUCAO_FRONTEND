'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function ClienteFormPage(props) {

  const router = useRouter()

  // Recupera a lista de clientes do localStorage
  const clientes = JSON.parse(localStorage.getItem('clientes')) || []

  // Recupera o ID para edição, se existir
  const id = props.searchParams.id
  const clienteEditado = clientes.find(item => item.id === id)

  // Função para salvar os dados do cliente
  function salvar(dados) {
    if (clienteEditado) {
      // Se for edição, substitui o cliente editado na lista
      Object.assign(clienteEditado, dados)
      localStorage.setItem('clientes', JSON.stringify(clientes))
    } else {
      // Se for criação, cria um novo cliente com ID único
      dados.id = v4()
      clientes.push(dados)
      localStorage.setItem('clientes', JSON.stringify(clientes))
    }
    alert("Cliente salvo com sucesso!")
    router.push("/clientes")
  }

  // Valores iniciais do formulário
  const initialValues = {
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    dataNascimento: '',
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    dataNascimento: Yup.date().required("Campo obrigatório"),
  })

  return (
    <Pagina titulo={"Cadastro de Cliente"}>
      <Formik
        initialValues={clienteEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            {/* Campo de Nome e Email */}
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Nome:</Form.Label>
                <Form.Control
                  name='nome'
                  type='text'
                  value={values.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.nome && !errors.nome}
                  isInvalid={touched.nome && errors.nome}
                />
                <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  name='email'
                  type='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Campo de Telefone e Endereço */}
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Telefone:</Form.Label>
                <Form.Control
                  name='telefone'
                  type='text'
                  value={values.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.telefone && !errors.telefone}
                  isInvalid={touched.telefone && errors.telefone}
                />
                <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Endereço:</Form.Label>
                <Form.Control
                  name='endereco'
                  type='text'
                  value={values.endereco}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.endereco && !errors.endereco}
                  isInvalid={touched.endereco && errors.endereco}
                />
                <Form.Control.Feedback type='invalid'>{errors.endereco}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Campo de Data de Nascimento */}
            <Form.Group className='mb-3'>
              <Form.Label>Data de Nascimento:</Form.Label>
              <Form.Control
                name='dataNascimento'
                type='date'
                value={values.dataNascimento}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.dataNascimento && !errors.dataNascimento}
                isInvalid={touched.dataNascimento && errors.dataNascimento}
              />
              <Form.Control.Feedback type='invalid'>{errors.dataNascimento}</Form.Control.Feedback>
            </Form.Group>

            {/* Botões */}
            <Form.Group className='text-end'>
              <Button className='me-2' href='/clientes'><FaArrowLeft /> Voltar</Button>
              <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  )
}
