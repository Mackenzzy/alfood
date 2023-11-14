import { Paper, TableBody, Table, TableCell, TableContainer, TableHead, TableRow, Button, Container } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"



const AdministracaoRestaurtantes = () => {
    const navigate = useNavigate()

    const novo = () => {
        navigate('/admin/restaurantes/novo')
    }
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    useEffect(() => {
        http.get('restaurantes/')
            .then(resposta => {
                setRestaurantes(resposta.data)
            })
    }, [])

    const excluir = (restauranteAhSerExcluido: IRestaurante) => {
        http.delete(`restaurantes/${restauranteAhSerExcluido.id}/`)
            .then(() => {
                const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id)
                setRestaurantes([...listaRestaurante])
            })
    }
    return (
        <Container sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", flexGrow: 1 }}>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante =>
                        <TableRow key={restaurante.id}>
                            <TableCell>{restaurante.nome}</TableCell>
                            <TableCell><Link to={`/admin/restaurantes/${restaurante.id}`} >Editar</Link></TableCell>
                            <TableCell><Button
                                variant="outlined"
                                color="error"
                                onClick={() => excluir(restaurante)}
          
                            >Excluir
                            </Button>
                            </TableCell>
                        </TableRow>)}

                </TableBody>
            </Table>

        </TableContainer>
        </Container>
    )
}

export default AdministracaoRestaurtantes