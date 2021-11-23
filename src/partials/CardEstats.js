
import {Statistic, Card  } from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'

import './CardEstats.css'

const CardEstats = ({ nome, valor, precisao, referencia, sulfixo, prefixo, classe }) => {

    const corReferencia = (valorCalculado, referenciaCalculada) =>{
        if(referenciaCalculada === undefined)
            return '#060606'
        else if( valorCalculado > referenciaCalculada )
            return '#3f8600'
        else
            return '#cf1322'
    }

    const selecionarPrefixo = (prefixo, valorCalculado, referenciaCalculada) =>{
        if(prefixo === undefined)
            return
        else if( valorCalculado > referenciaCalculada )
            return <ArrowUpOutlined />
        else
            return <ArrowDownOutlined />
    }

    
    
    return(
        <Card className={classe}>
            <Statistic title={nome} precision={precisao} prefix={selecionarPrefixo(prefixo, valor, referencia)} valueStyle={{color: corReferencia(valor, referencia)}} value={valor} suffix={sulfixo}/>
        </Card>    
    )
}

export default CardEstats