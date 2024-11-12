'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function AgendamentoFormPage(props) {

  const router = useRouter()

  // Recupera dados do localStorage
  const clientes = JSON.parse(localStorage.getItem('clientes')) || []
  const servicos = JSON.parse(localStorage.getItem('servicos')) || []
  const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || []
  const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || []

  // Recupera ID do agendamento para edição
  const id = props.searchParams.id
  const agendamentoEditado = agendamentos.find(item => item.id === id)

  // Função para salvar os dados do agendamento
  function salvar(dados) {
    if (agendamentoEditado) {
      // Editar agendamento existente
      Object.assign(agendamentoEditado, dados)
      localStorage.setItem('agendamentos', JSON.stringify(agendamentos))
    } else {
      // Criar um novo agendamento
      dados.id = v4()
      agendamentos.push(dados)
      localStorage.setItem('agendamentos', JSON.stringify(agendamentos))
    }
    alert("Agendamento salvo com sucesso!")
    router.push("/agendamentos")
  }

  // Valores iniciais para o formulário
  const initialValues = {
    data: '',
    hora: '',
    cliente: '',
    servico: '',
    funcionario: '',
    observacoes: '',
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    data: Yup.date().required("Campo obrigatório"),
    hora: Yup.string().required("Campo obrigatório"),
    cliente: Yup.string().required("Campo obrigatório"),
    servico: Yup.string().required("Campo obrigatório"),
    funcionario: Yup.string().required("Campo obrigatório"),
    observacoes: Yup.string(),
  })

  return (
    <Pagina titulo={"Cadastro de Agendamento"}>
      <Formik
        initialValues={agendamentoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            {/* Campo de Data e Hora */}
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Data:</Form.Label>
                <Form.Control
                  name='data'
                  type='date'
                  value={values.data}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.data && !errors.data}
                  isInvalid={touched.data && errors.data}
                />
                <Form.Control.Feedback type='invalid'>{errors.data}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Hora:</Form.Label>
                <Form.Control
                  name='hora'
                  type='time'
                  value={values.hora}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.hora && !errors.hora}
                  isInvalid={touched.hora && errors.hora}
                />
                <Form.Control.Feedback type='invalid'>{errors.hora}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Seletor de Cliente, Serviço e Funcionário */}
            <Row className='mb-2'>
              <Form.Group as={Col}>
                <Form.Label>Cliente:</Form.Label>
                <Form.Select
                  name='cliente'
                  value={values.cliente}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.cliente && !errors.cliente}
                  isInvalid={touched.cliente && errors.cliente}
                >
                  <option value=''>Selecione</option>
                  {clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.nome}>{cliente.nome}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.cliente}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Serviço:</Form.Label>
                <Form.Select
                  name='servico'
                  value={values.servico}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.servico && !errors.servico}
                  isInvalid={touched.servico && errors.servico}
                >
                  <option value=''>Selecione</option>
                  {servicos.map(servico => (
                    <option key={servico.id} value={servico.nome}>{servico.nome}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.servico}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Funcionário:</Form.Label>
                <Form.Select
                  name='funcionario'
                  value={values.funcionario}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.funcionario && !errors.funcionario}
                  isInvalid={touched.funcionario && errors.funcionario}
                >
                  <option value=''>Selecione</option>
                  {funcionarios.map(funcionario => (
                    <option key={funcionario.id} value={funcionario.nome}>{funcionario.nome}</option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type='invalid'>{errors.funcionario}</Form.Control.Feedback>
              </Form.Group>
            </Row>

            {/* Observações */}
            <Form.Group className='mb-3'>
              <Form.Label>Observações:</Form.Label>
              <Form.Control
                name='observacoes'
                as='textarea'
                rows={3}
                value={values.observacoes}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>

            {/* Botões */}
            <Form.Group className='text-end'>
              <Button className='me-2' href='/agendamentos'><FaArrowLeft /> Voltar</Button>
              <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  )
}
