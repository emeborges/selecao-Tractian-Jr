import { Typography, Descriptions    } from 'antd'
import { useState, useEffect } from 'react'
import axios from 'axios'


import GraficoBarras from './GraficoBarras'
import CardEstats from './CardEstats'
import GraficoBarrasHorizontal from './GraficoBarrasHorizontal'
import './GeralAssets.css'

const { Title } = Typography

const GeralAssets = () => {
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

     //Manipulação de dados da API -> Filtro de Unidade
    const assetsFiltrados = assets.filter( (asset) => {
       if(asset.unitId === unidadeSelecionada){
            return true
        }
        else {
            return false
        }
        
    } )

    //Manipulação de dados da API -> Dados da unidade
    const assetsFiltradosQtde = assetsFiltrados.length
    const assetsFiltradosSoma = assetsFiltrados.reduce((acc, curr ) => {
       
        return acc +++ curr.healthscore
        },'')

    const saudeMediaUnidade = Math.round(assetsFiltradosSoma / assetsFiltradosQtde)
   
    //Manipulação de dados da API -> Referência da média saúde geral
    const assetsQtdeTotais = assets.length
    const assetsSomaTotais = assets.reduce((acc, curr ) => {
       
        return acc +++ curr.healthscore
        },'')

    const saudeMediaGeral = assetsSomaTotais / assetsQtdeTotais
    const saudeMediaGeralArredondado = Math.round(saudeMediaGeral)
    
    

    const assetsOperation = assetsFiltrados.reduce((acc, curr ) => {
        if (curr.status === "inOperation"){
            acc.pass.push(curr)
        }
        else {
            acc.fail.push(curr)
        }

        return acc

    }, {
        pass: [],
        fail:[]
    })

    const qtdeAssetsOperation = assetsOperation.pass.length
    const porcentagemEmOperation = (qtdeAssetsOperation / assetsFiltradosQtde) * 100
    
    const assetsDownTime = assetsFiltrados.reduce((acc, curr ) => {
        if (curr.status === "inDowntime"){
            acc.pass.push(curr)
        }
        else {
            acc.fail.push(curr)
        }

        return acc

    }, {
        pass: [],
        fail:[]
    })

    const qtdeAssetsDownTime = assetsDownTime.pass.length
    const porcentagemEmDownTime = (qtdeAssetsDownTime / assetsFiltradosQtde) * 100

    const assetsInAlert = assetsFiltrados.reduce((acc, curr ) => {
        if (curr.status === "inAlert"){
            acc.pass.push(curr)
        }
        else {
            acc.fail.push(curr)
        }

        return acc

    }, {
        pass: [],
        fail:[]
    })

    const qtdeAssetsInAlert = assetsInAlert.pass.length
    const porcentagemInAlert = (qtdeAssetsInAlert / assetsFiltradosQtde) * 100
    
    return(
        <div className="conteinerTotal">
            <Title level={3}>Painel Geral</Title>
            <div className="conteinerConteudo">
                <div className="conteinerDadosGerais">
                    <div>
                        <Title level={5}>Distribuição das máquinas da Unidade</Title>
                        <div className="conteinerResumo">
                            <CardEstats classe="conteinerBasico" nome={"Em Operação"} valor={qtdeAssetsOperation} />
                            <CardEstats classe="conteinerBasico" nome={"Parados"} valor={qtdeAssetsDownTime}  />
                            <CardEstats classe="conteinerBasico" nome={"Em Alerta"} valor={qtdeAssetsInAlert}  />
                        </div>
                        <div className="conteinerResumo">
                            <CardEstats classe="conteinerBasico" nome={"%"} valor={porcentagemEmOperation.toFixed(1)} sulfixo={'%'} />
                            <CardEstats classe="conteinerBasico" nome={"%"} valor={porcentagemEmDownTime.toFixed(1)} sulfixo={'%'}  />
                            <CardEstats classe="conteinerBasico" nome={"%"} valor={porcentagemInAlert.toFixed(1)} sulfixo={'%'}  />
                        </div>
                    </div>
                    <GraficoBarrasHorizontal classe={"boxGraficoComparativo"} dado={saudeMediaUnidade} referencia={saudeMediaGeralArredondado} />
                </div>
                <div className="conteinerMaquinas">
                    <Title level={5}>Máquinas da Unidade</Title>
                    <GraficoBarras classe="graficoDasMaquinas" assets={assetsFiltrados} />
                </div>
            </div>        
        </div>
    )
}

export default GeralAssets