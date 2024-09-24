'use client'

import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import apiSeris from "../apis/apiSeries";
import Pagina from "../components/Pagina";

export default function Series() {

    // Armazenar um dado para que o react saiba que ele sofreu alguma mudança
    // e mude na tela
    const [series, setSeries] = useState([])

    // Efeito Colateral
    useEffect(() => {
        // A requisição pra buscar os filmes
        buscarSeries()
    }, [])

    async function buscarSeries() {
        const resultado = await apiSeries.get("/movie/popular?language=pt-BR")
        console.log(resultado.data.results)
        // alterando o estado filmes para receber os filmes da requisição
        setSeries(resultado.data.results)
    }


    return (
        <Pagina titulo="Series Populares">

            <Row md={4}>
                {
                    series.map(serie => {
                        return (
                            <Col className="py-2">
                                <Card style={{ height: '100%' }}>
                                    <Card.Img src={'https://image.tmdb.org/t/p/w500/' + filme.poster_path} />
                                    <Card.Body>
                                        <Card.Title>{serie.original_title}</Card.Title>
                                        <p><b>Nota: {serie.vote_average} ⭐</b></p>
                                    </Card.Body>
                                    <Card.Footer className="text-end">
                                        <Button href={"/series/" + serie.id}>Detalhes</Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>

        </Pagina>
    )
}