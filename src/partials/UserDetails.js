import { useState, useEffect } from 'react'
import axios from 'axios'
import { Typography, List, Card, Table   } from 'antd'
import { Link } from 'react-router-dom'

import './UserDetails.css'
import CardEstats from './CardEstats'
import Calendario from './Calendario'

const { Title } = Typography

const UserDetails = () => {
    const usuarioSelecionado = localStorage.getItem('user')

    //Chamada da API -> Requisição dos dados do usuário
    const [user, setUser] = useState([])
    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(`https://my-json-server.typicode.com/tractian/fake-api/users/${usuarioSelecionado}`)
                .then(response => { 
                    const { data } = response
        
                    setUser(data)
                })
                return request
        }
            fetchData()
        }, [])

    const unidadeSelecionada = user.unitId
    
    localStorage.setItem('unidadeUsuario', unidadeSelecionada)

    //Chamada da API -> Requisitar todas os assets
    const [assets, setAsset] = useState([])
    useEffect(() => {
        async function fetchAssets(){
            const request = await axios.get(`https://my-json-server.typicode.com/tractian/fake-api/assets`)
                .then(response => { 
                    const { data } = response
        
                    setAsset(data)
                })
                return request
        }
        fetchAssets()
        }, [])

     //Manipulação de dados da API -> Filtro de Unidade
    const assetsFiltrados = assets.filter( (asset) => {
       if(asset.unitId === unidadeSelecionada){
            return true
        }
        else {
            return false
        }
        
    } )

    //Manipulação de dados da API -> Indicadores basicos da unidade
    let assetsFiltradosQtde = assetsFiltrados.length
    let assetsFiltradosSoma = assetsFiltrados.reduce((acc, curr ) => {
       
        return acc +++ curr.healthscore
        },'')

    let saudeMediaUnidade = assetsFiltradosSoma / assetsFiltradosQtde

    //Manipulação de dados da API -> Indicador de Alerta sobre os equipamentos da unidade
    const assetsEmAlerta = assetsFiltrados.filter( (asset) => {
        if(asset.status === "inAlert"){
            return true
        }
        else {
            return false
        }
    })
    let alertaQtde = assetsEmAlerta.length


    //Manipulação de dados da API -> Indicador de Alerta sobre os equipamentos da unidade
    const assetsEmOp = assetsFiltrados.filter( (asset) => {
        if(asset.status === "inOperation"){
            return true
        }
        else {
            return false
        }
    })
    let operacaoQtde = assetsEmOp.length 
   

    //Referência da quantidade de alertas
    let razaoAlerta = 0.7
    let qtdeLimiteAlertas = Math.round(razaoAlerta * assetsFiltradosQtde)
  console.log(assetsEmAlerta)
 
    //Tabela Dados e Referência
    const tabelaDados = assetsEmAlerta.map(dadosAsset => { 
        return ({
            id: dadosAsset.id,
            name: dadosAsset.name,
            healthscore: Math.round(dadosAsset.healthscore) + '%',
          })
    })
       

    const tabelaColunas = [{
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        render: text => 
                    <>
                      <Link to={`/detalhado/${text}`}>{text}</Link>  
                    </>,
        
      },
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
       
      },
      {
        title: 'Saúde',
        dataIndex: 'healthscore',
        key: 'healthscore',
        
      },]
    

    return(
        <div>
           <Title level={3}> Olá <span>{user.name}</span>, seja bem vindo!</Title>
           <div className="boxDados">
                <CardEstats classe="conteinerDados" nome={"Quantidade de Ativos"} valor={assetsFiltradosQtde} />
                <CardEstats classe="conteinerDados" nome={"Quantidade de Ativos em Operação"} valor={operacaoQtde} />
                <CardEstats classe="conteinerDados"  nome={"Saúde Média das Máquinas da Unidade"} valor={saudeMediaUnidade} precisao={2} sulfixo={'%'} referencia={60} prefixo={'sim'} />
                <CardEstats classe="conteinerDados" nome={"Quantidade de Ativos em Alerta"} valor={alertaQtde} referencia={qtdeLimiteAlertas}/>
           </div>
           <div className="boxDados"> 
                <Calendario className="conteinerCalendario"/>
                <Card className="conteinerTasks">
                    <List
                        size="small"
                        header={<Title level={5} >Tarefas:</Title>}
                        bordered
                        renderItem={item => <List.Item>{item}</List.Item>}
                        className="tasks"
                    />
                </Card>
                <Card className="conteinerAlertas">
                    <Title level={5}> Máquinas em Alerta</Title>
                    <Table dataSource={tabelaDados} columns={tabelaColunas} pagination='false'/>  
                </Card>
           </div>           
        </div>
    )
}

export default UserDetails