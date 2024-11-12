'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function FuncionarioFormPage(props) {

  // router -> hook para navegação de telas
  const router = useRouter()

  // Busca a lista de departamentos para usar no select
  const departamentos = JSON.parse(localStorage.getItem('departamentos')) || []

  // Buscar a lista de funcionarios no localStorage, se não existir, inicializa uma lista vazia
  const funcionarios = JSON.parse(localStorage.getItem('funcionarios')) || []

  // Recuperando id para edição
  const id = props.searchParams.id
  const funcionarioEditado = funcionarios.find(item => item.id == id)

  // função para salvar os dados do form
  function salvar(dados) {
    // Se funcionarioEditado existe, atualiza os dados e salva no localStorage
    if (funcionarioEditado) {
      Object.assign(funcionarioEditado, dados)
      localStorage.setItem('funcionarios', JSON.stringify(funcionarios))
    } else {
      // se não existe, cria um novo funcionário com ID único
      dados.id = v4()
      funcionarios.push(dados)
      localStorage.setItem('funcionarios', JSON.stringify(funcionarios))
    }

    alert("Funcionário salvo com sucesso!")
    router.push("/funcionarios")
  }

  // Valores iniciais do formulário
  const initialValues = {
    nome: '',
    dataNascimento: '',
    matricula: '',
    status: '',
    departamento: '',
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    dataNascimento: Yup.date().required("Campo obrigatório"),
    matricula: Yup.string().required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório"),
    departamento: Yup.string().required("Campo obrigatório"),
  })

  return (
    <Pagina titulo={"Cadastro de Funcionário"}>
      <Formik
        initialValues={funcionarioEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {
          ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
            return (
              <Form onSubmit={handleSubmit}>
                {/* Campos do form */}
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
                </Row>

                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Matrícula:</Form.Label>
                    <Form.Control
                      name='matricula'
                      type='text'
                      value={values.matricula}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.matricula && !errors.matricula}
                      isInvalid={touched.matricula && errors.matricula}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.matricula}</Form.Control.Feedback>
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
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo"></option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.status}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Telefone:</Form.Label>
                    <Form.Select
                      name='departamento'
                      value={values.departamento}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.departamento && !errors.departamento}
                      isInvalid={touched.departamento && errors.departamento}
                    >
                      <option value=''>Selecione</option>
                      {departamentos.map(departamento => (
                        <option key={departamento.nome} value={departamento.nome}>{departamento.nome}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.departamento}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {/* Botões */}
                <Form.Group className='text-end'>
                  <Button className='me-2' href='/funcionarios'><FaArrowLeft /> Voltar</Button>
                  <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
                </Form.Group>
              </Form>
            )
          }
        }
      </Formik>
    </Pagina>
  )
}
