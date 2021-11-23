import { Typography, Descriptions, Tag, Avatar, Card, message, Button     } from 'antd'
import { useState, useEffect } from 'react'
import axios from 'axios'

import './DetalhadoMaquina.css'
import CardEstats from './CardEstats'

const { Title } = Typography

const DetalhadoMaquina = () => {
    const ferramentaSelecionada = window.location.pathname.replace('detalhado/','')
    var objetoInicial = {
                        'metrics': {
                            'totaltotalUptime': 0,
                            'lastUptimeAt':0,
                            'totalCollectUpTime':0
                        },
                        "specifications": {
                            "power": 0,
                            "maxTemp": 0,
                            "rpm": 0,
                          },
                        
                            }


    //Chamada da API -> Requisita os dados da Asset
    const [asset, setAsset] = useState(objetoInicial)
    
    useEffect(() => {
        async function fetchAssets(){
            const request = await axios.get(`https://my-json-server.typicode.com/tractian/fake-api/assets/${ferramentaSelecionada}`)
                .then(response => { 
                    const { data } = response
        
                    setAsset(data)
                })
                return request
        }
        fetchAssets()
        }, [])

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

    const mensagemBotao = () =>{
        message.error('Você não pode fazer esse tipo de solicitação, favor contatar a gerência')
    }

    const alterandoData = (data) =>{
        let tentar = Date.parse(data)
        let dataLocal = new Date(tentar).toLocaleDateString()
        
        return dataLocal
      }

    const verificacao = (item) =>{
        if(item === null)
        return "-"
        else if(item === 0)
        return "Não informado"
        else if(item === undefined)
        return "Não informado"
        else
        return item
    }  
    
    const arredondar = (valor) =>{
        let valorArredondado = Math.round(valor)
        return valorArredondado
    }



    return(
        <div className="conteinerPrincipal">
            <Card className="dadosBase">
                <div className="maquinaSelecionada">
                    <Avatar
                        size={{ xs: 200, sm: 200, md: 200, lg: 200, xl: 300, xxl: 350 }}
                        src={asset.image}
                    />
                </div>
                <div className="dadosDescritos">
                    <Descriptions size="medium" title={asset.name} column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }} bordered>
                        <Descriptions.Item label="Modelo">{asset.model}</Descriptions.Item>
                        <Descriptions.Item label="Status">{tagColor(asset.status)}</Descriptions.Item>
                    </Descriptions>
                </div>
                <div className="links">
                    <Button type="link" onClick={mensagemBotao}>
                        Adicionar Movimentação
                    </Button>
                    <Button type="link" onClick={mensagemBotao}>
                        Editar Item
                    </Button>
                </div>
            </Card>
            <Card className="informacoesGerais">
                <div className="conteinerEstatiticas">
                    <CardEstats className="cardEstatistica" nome="Saúde da Máquina" valor={arredondar(asset.healthscore)} sulfixo={'%'} />
                    <CardEstats className="cardEstatistica" nome="Total de Horas Coletadas" valor={arredondar(asset.metrics.totalUptime)} />
                    <CardEstats className="cardEstatistica" nome="Última Coleta Em:" valor={alterandoData(asset.metrics.lastUptimeAt)} />
                    <CardEstats className="cardEstatistica" nome="Número Total de Coletas" valor={asset.metrics.totalCollectsUptime} />
                </div>
                <div className="especificacao">
                    <Descriptions size="medium" title='Especificações' column={{ xxl: 3, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }} bordered>
                        <Descriptions.Item label="Temperatura Máxima (ºC)">{verificacao(asset.specifications.maxTemp)} ºC</Descriptions.Item>
                        <Descriptions.Item label="Potência (kWh)">{verificacao(asset.specifications.power)}</Descriptions.Item>
                        <Descriptions.Item label="Rotações Por Minuto (RPM)">{verificacao(asset.specifications.rpm)}</Descriptions.Item>
                    </Descriptions>
                </div>
            </Card>
        </div>
        )
}

export default DetalhadoMaquina