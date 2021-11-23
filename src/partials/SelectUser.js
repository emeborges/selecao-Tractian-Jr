import { useState, useEffect } from 'react'
import { Card, Select, Form, Input, Button } from 'antd'
import axios from 'axios'

import './SelectUser.css'



const { Option } = Select

//Funções referentes a ação do select
function onChange(value) {
  console.log(`selected ${value}`)
}
function onSearch(val) {
  console.log('search:', val)
}

const SelectUser = () => {
    const [usuarios, setUsuarios] = useState([])

    //Chamada da API com Await
    useEffect(() => {
        async function fetchData(){
            const request = await axios.get('https://my-json-server.typicode.com/tractian/fake-api/users')
                .then(response => { 
                    const { data } = response
        
                    setUsuarios(data)
                })
                return request
        }
        fetchData()
        }, [])

    const handleSubmit = (values) => {
        
        localStorage.setItem('user', values.user)
        window.location.href = '/dashboard'
    }

    const validateMessages = {
        required: " Por favor, preencha para continuar."
      }


    return(
        <Card className='boxCentral'>
            <Form className='boxForm' validateMessages={validateMessages} onFinish={handleSubmit}>
                <Form.Item className='boxSelect' name="user" label="Usuário" rules={[{ required: true }]} >
                    <Select
                    showSearch
                    className='SelectComponent'
                    placeholder="Selecione um usuário"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                    option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    {usuarios.map((user) => {
                        return(
                            <Option value={user.id}>{user.name}</Option>
                        )})
                    }
                    
                    </Select>
                </Form.Item>

                <Form.Item className='boxButton'>
                    <Button className='ButtonComponent' type="primary" htmlType="submit" >
                        Entrar
                    </Button>
                    
                </Form.Item>
            </Form> 
        </Card>
    )
}

export default SelectUser