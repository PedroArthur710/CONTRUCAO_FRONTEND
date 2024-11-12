'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'

export default function PetForm(props) {

  const router = useRouter()

  // Buscar a lista de pets no localStorage, se não existir, inicializa uma lista vazia
  const pets = JSON.parse(localStorage.getItem('pets')) || []

  // Recuperando id para edição
  const id = props.searchParams.id
  const petEditado = pets.find(item => item.id == id)

  // Função para salvar os dados do formulário
  function salvar(dados) {
    if (petEditado) {
      // Se petEditado existe, atualiza os dados e salva no localStorage
      Object.assign(petEditado, dados)
      localStorage.setItem('pets', JSON.stringify(pets))
    } else {
      // Se não existe, cria um novo pet com ID único
      dados.id = v4()
      pets.push(dados)
      localStorage.setItem('pets', JSON.stringify(pets))
    }

    alert("Pet salvo com sucesso!")
    router.push("/pets")
  }

  // Valores iniciais do formulário
  const initialValues = {
    nome: '',
    dataNascimento: '',
    especie: '',
    raca: '',
    status: '',
  }

  // Esquema de validação com Yup
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    dataNascimento: Yup.date().required("Campo obrigatório"),
    especie: Yup.string().required("Campo obrigatório"),
    raca: Yup.string().required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório"),
  })

  return (
    <Pagina titulo={"Cadastro de Pet"}>
      <Formik
        initialValues={petEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {
          ({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
            return (
              <Form onSubmit={handleSubmit}>
                {/* Campos do formulário */}
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
                    <Form.Label>Espécie:</Form.Label>
                    <Form.Control
                      name='especie'
                      type='text'
                      value={values.especie}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.especie && !errors.especie}
                      isInvalid={touched.especie && errors.especie}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.especie}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Raça:</Form.Label>
                    <Form.Control
                      name='raca'
                      type='text'
                      value={values.raca}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.raca && !errors.raca}
                      isInvalid={touched.raca && errors.raca}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.raca}</Form.Control.Feedback>
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
                      <option value="Inativo">Inativo</option>
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.status}</Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {/* Botões */}
                <Form.Group className='text-end'>
                  <Button className='me-2' href='/pets'><FaArrowLeft /> Voltar</Button>
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
