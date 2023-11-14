import { Paper, TableBody, Table, TableCell, TableContainer, TableHead, TableRow, Button, Container } from "@mui/material"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import http from "../../../http"
import IPrato from "../../../interfaces/IPrato"
import IRestaurante from "../../../interfaces/IRestaurante"



const AdministracaoPratos = () => {
    const navigate = useNavigate()

    const [pratos, setPratos] = useState<IPrato[]>([])

    useEffect(() => {
        http.get('pratos/')
            .then(resposta => {
                setPratos(resposta.data)
            })
    }, [])

    const excluir = (pratoAhSerExcluido: IPrato) => {
        http.delete(`pratos/${pratoAhSerExcluido.id}/`)
            .then(() => {
                const listaPratos = pratos.filter(prato => prato.id !== pratoAhSerExcluido.id)
                setPratos([...listaPratos])
            })
    }
    return (
        <Container sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", flexGrow: 1 }}>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Tag</TableCell>
                        <TableCell>Imagem</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map(prato =>
                        <TableRow key={prato.id}>
                            <TableCell>{prato.nome}</TableCell>
                            <TableCell>{prato.tag}</TableCell>
                            <TableCell>
                                <a href={prato.imagem} target="_blank" rel="noopener noreferrer"> Ver Imagem</a></TableCell>
                            <TableCell><Link to={`/admin/restaurantes/${prato.id}`} >Editar</Link></TableCell>
                            <TableCell><Button
                                variant="outlined"
                                color="error"
                                onClick={() => excluir(prato)}
          
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

export default AdministracaoPratos