import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioRestaurante = () => {
  const navigate = useNavigate();
  const parametros = useParams();
  const [nomeRestaurante, setNomeRestaurante] = useState("");

  useEffect(() => {
    if (parametros.id) {
      axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
        .then(resposta => {
          setNomeRestaurante(resposta.data.nome);
        });
    }
  }, [parametros]);

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if (parametros.id) {
      axios
        .put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante atualizado com sucesso!");
          navigate(-1);
        })
        .catch((error) => {
          console.error("Erro ao atualizar o restaurante:", error);
        });
    } else {
      axios
        .post("http://localhost:8000/api/v2/restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante cadastrado com sucesso!");
          navigate(-1);
        })
        .catch((error) => {
          console.error("Erro ao cadastrar o restaurante:", error);
        });
    }
  };

  const voltar = () => {
    navigate(-1);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
      <Typography component="h1" variant="h6">
        Formulario de Restaurante
      </Typography>
      <Box component="form" onSubmit={aoSubmeterForm}>
        <TextField
          value={nomeRestaurante}
          onChange={evento => setNomeRestaurante(evento.target.value)}
          id="standard-basic"
          label="Nome do Restaurante"
          variant="standard"
          required
          fullWidth
        />
        <Button sx={{ marginTop: 1 }} type="submit" variant="outlined" fullWidth>
          Salvar
        </Button>
        <Button sx={{ marginTop: 1 }} onClick={voltar} variant="outlined" color="error" fullWidth>
          Cancelar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioRestaurante;
