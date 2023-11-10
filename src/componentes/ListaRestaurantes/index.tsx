import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

interface IParametrosBusca {
  ordering?: string;
  search?: string;
}

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState('');
  const [paginaAnterior, setPaginaAnterior] = useState('');
  const [busca, setBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState('');

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    // Criar um objeto de configuração separado
    const config: AxiosRequestConfig = {
      params: {},
      ...opcoes,
    };

    if (busca) {
      config.params.search = busca;
    }
    if (ordenacao) {
      config.params.ordering = ordenacao;
    }

    axios.get<IPaginacao<IRestaurante>>(url, config)
      .then((resposta) => {
        setRestaurantes(resposta.data.results);
        setProximaPagina(resposta.data.next);
        setPaginaAnterior(resposta.data.previous);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  const buscar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    carregarDados('http://localhost:8000/api/v1/restaurantes/');
  };

  useEffect(() => {
    carregarDados('http://localhost:8000/api/v1/restaurantes/');
  }, []);

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      <form className={style.Formulario} onSubmit={buscar}>
        <div>
          <input className={style.InputBusca} type="text" value={busca} onChange={(evento) => setBusca(evento.target.value)} />
        </div>
        <div>
          <label className={style.LabelOrdenacao} htmlFor="select-ordenacao">Ordenação</label>
          <select
            className={style.SelectOrdenacao}
            name="select-ordenacao"
            id="select-ordenacao"
            value={ordenacao}
            onChange={(evento) => setOrdenacao(evento.target.value)}
          >
            <option value="">Padrão</option>
            <option value="id">Por ID</option>
            <option value="nome">Por Nome</option>
          </select>
        </div>
        <div>
          <button className={style.Botao} type="submit">Buscar</button>
        </div>
      </form>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      <div className={style.Paginacao}>
      {<button className={style.Botao} onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}>
        Página Anterior
      </button>}
      {<button className={style.Botao} onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}>
        Próxima página
      </button>}
      </div>
    </section>
  );
};

export default ListaRestaurantes;
