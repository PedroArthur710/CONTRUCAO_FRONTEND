'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function ServicoPage(props) {

  const router = useRouter()

  // Recupera a lista de serviços do localStorage
  const servicos = JSON.parse(localStorage.getItem('servicos')) || []

  // Recupera o ID do serviço para edição, se existir
  const id = props.searchParams.id
  const servicoEditado = servicos.find(item => item.id === id)

  // Função para salvar o formulário
  function salvar(dados) {
    if (servicoEditado) {
      // Atualiza os dados do serviço no localStorage
      Object.assign(servicoEditado, dados)
      localStorage.setItem('servicos', JSON.stringify(servicos))
    } else {
      // Cria um novo serviço e salva no localStorage
      dados.id = v4()
      servicos.push(dados)
      localStorage.setItem('servicos', JSON.stringify(servicos))
    }
    alert("Serviço salvo com sucesso!")
    router.push("/servicos")
  }

  // Valores iniciais do formulário
  const initialValues = {
    nome: '',
    descricao: '',
    preco: '',
    duracao: '',
    status: '',
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
    preco: Yup.number().required("Campo obrigatório").positive("O valor deve ser positivo"),
    duracao: Yup.string().required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório"),
  })

  return (
    <Pagina titulo={"Cadastro de Serviço"}>
      <Formik
        initialValues={servicoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            {/* Campos do form */}
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Nome do Serviço:</Form.Label>
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
                <Form.Label>Descrição:</Form.Label>
                <Form.Control
                  name='descricao'
                  type='text'
                  value={values.descricao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.descricao && !errors.descricao}
                  isInvalid={touched.descricao && errors.descricao}
                />
                <Form.Control.Feedback type='invalid'>{errors.descricao}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Preço:</Form.Label>
                <Form.Control
                  name='preco'
                  type='number'
                  value={values.preco}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.preco && !errors.preco}
                  isInvalid={touched.preco && errors.preco}
                />
                <Form.Control.Feedback type='invalid'>{errors.preco}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Duração:</Form.Label>
                <Form.Control
                  name='duracao'
                  type='text'
                  value={values.duracao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.duracao && !errors.duracao}
                  isInvalid={touched.duracao && errors.duracao}
                />
                <Form.Control.Feedback type='invalid'>{errors.duracao}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Status:</Form.Label>
                <Form.Select
                  name='status'
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.status && !errors.status}
                  isInvalid={touched.status && errors.status}
                >
                  <option value=''>Selecione</option>
                  <option value="Disponível">Disponível</option>
                  <option value="Indisponível">Indisponível</option>
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.status}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Botões */}
            <Form.Group className='text-end'>
              <Button className='me-2' href='/servicos'><FaArrowLeft /> Voltar</Button>
              <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  )
}
