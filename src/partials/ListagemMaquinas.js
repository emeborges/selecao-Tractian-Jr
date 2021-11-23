import { Typography, Table, Tag, Space    } from 'antd'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


import './ListagemMaquinas.css'

const { Title } = Typography

const ListagemMaquinas = () => {
    const unidadeSelecionada = parseInt(localStorage.getItem('unidadeUsuario'))

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
  
    const assetsFiltrados = assets.filter( (asset) => {
       if(asset.unitId === unidadeSelecionada){
            return true
        }
        else {
            return false
        }
    } )

    const columns = [
        {
          title: 'Id',
          dataIndex: 'id',
          key: 'id',
          responsive: ['xxl','xl', 'lg', 'md','sm', 'xs'] ,
          render: text => 
                    <>
                      <Link to={`/detalhado/${text}`}>{text}</Link>  
                    </>,
        },
        {
          title: 'Nome',
          dataIndex: 'name',
          key: 'name',
          responsive: ['xxl','xl', 'lg', 'md','sm',  'xs'] ,
          
        },
        {
          title: 'Modelo',
          dataIndex: 'model',
          key: 'model',
          responsive: ['xxl','xl', 'lg', 'md','sm',] ,
        },
        {
          title: 'Saúde',
          dataIndex: 'healthscore',
          key: 'healthscore',
          responsive: ['xxl','xl', 'lg', 'md','sm',] ,
          
        },
        {
          title: 'Última Coleta',
          dataIndex: 'lastUptimeAt',
          key: 'lastUptimeAt',
          responsive: ['xxl','xl', 'lg', 'md','sm',] ,
        },
        {
          title: 'Status',
          key: 'tags',
          dataIndex: 'tags',
          responsive: ['xxl','xl', 'lg', 'md','sm', 'xs'] ,
        },
      ]

      const tagColor = (status) =>{
        if( status === "inAlert")
          return(
            <Tag color='green'>
                Em operação
            </Tag>
            )
        
        else if( status === "inDowntime" )
          return(
            <Tag color='orange'>
                Parado
            </Tag>
            )
        else 
          return(
            <Tag color='red'>
                Em Alerta
            </Tag>
            )
      }
      
      const alterandoData = (data) =>{
        let tentar = Date.parse(data)
        let dataLocal = new Date(tentar).toLocaleDateString()
        
        return dataLocal
      }

      const data = assetsFiltrados.map( asset => {
        return({
          id: asset.id,
          name: asset.name,
          model: asset.model.toUpperCase(),
          healthscore: asset.healthscore + '%',
          lastUptimeAt: alterandoData(asset.metrics.lastUptimeAt),
          tags: tagColor(asset.status),
         
         })
       })

    return(
        <div>
            <Title level={3}>Listagem de Máquinas</Title>
            <Table bordered columns={columns} dataSource={data} />
        </div>
    )
}

export default ListagemMaquinas