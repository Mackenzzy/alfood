import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";
import IRestaurante from "../../../interfaces/IRestaurante";
import ITag from "../../../interfaces/ITags";

const FormularioPrato = () => {
    const navigate = useNavigate();
    const parametros = useParams();
    const [nomePrato, setNomePrato] = useState("");
    const [descricao, setDescricao] = useState("");




    const [tag, setTag] = useState("");
    const [restaurante, setRestaurante] = useState("");

    const [imagem, setImagem] = useState<File | null>(null);


    const [tags, setTags] = useState<ITag[]>([]);
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]> ([]);


    useEffect(() => {

        http.get < {tags: ITag[]} >('tags/')
        .then(resposta => {
            setTags(resposta.data.tags)
        })
        http.get < IRestaurante [] >('restaurantes/')
        .then(resposta => {
            setRestaurantes(resposta.data)            
        })
    },[])

    useEffect(() => {
        if (parametros.id) {
            http.get<IPrato>(`pratos/${parametros.id}/`)
                .then(resposta => {
                    const [restaurante, setRestaurante] = useState<number>(0);
                    const prato = resposta.data
                    setNomePrato(prato.nome)
                    setDescricao(prato.descricao)
                    setTag(prato.tag)
                    setRestaurante(prato.restaurante)
                })
        }
    }, [parametros])

    const selecionarArquivo =( evento : React.ChangeEvent<HTMLInputElement> ) =>{
        if (evento.target.files?.length){
            setImagem(evento.target.files[0])
        }else{
            setImagem(null)
        }
    }

    const voltar = () => {

        navigate(-1);
    };

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        const formData = new FormData();

        formData.append('nome', nomePrato)
        formData.append('descricao', descricao)
        formData.append('tag', tag)
        formData.append('restaurante', restaurante)
        
        if(imagem){
            formData.append('imagem', imagem)
        }

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
        .then(() =>{
            setNomePrato('')
            setDescricao('')
            setTag('')
            setRestaurante('')            
            alert('Prato cadastrado com sucesso')
            navigate('/admin/pratos')
        })


    }



    return (
        <>

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
                <Typography component="h1" variant="h6">
                    Formulario de Pratos
                </Typography>
                <Box component="form" sx={{ width: "80%", flexGrow: 1 }} onSubmit={aoSubmeterForm}>
                    <TextField
                        value={nomePrato}
                        onChange={evento => setNomePrato(evento.target.value)}
                        id="standard-basic"
                        label="Nome do Prato"
                        variant="standard"
                        required
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        value={descricao}
                        onChange={evento => setDescricao(evento.target.value)}
                        id="standard-basic"
                        label="Descrição"
                        variant="standard"
                        required
                        fullWidth
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="select-tag"> Tag</InputLabel>
                        <Select labelId="select-tag" label="Tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                            {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                                {tag.value}
                            </MenuItem> 
                                 )}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="select-restaurante"> Restaurante</InputLabel>
                        <Select labelId="select-restaurante" label="restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                            {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                                {restaurante.nome}
                            </MenuItem> 
                                 )}
                        </Select>
                    </FormControl>
                    
                    <input type="file" onChange={selecionarArquivo}/>

                    <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>
                        Salvar
                    </Button>
                    <Button sx={{ marginTop: 1 }} onClick={voltar} variant="outlined" color="error" fullWidth>
                        Cancelar
                    </Button>
                </Box>
            </Box>


        </>
    );
};

export default FormularioPrato;
