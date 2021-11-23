import { Layout } from 'antd'


import HeaderGeral from '../partials/Header'
import MenuGeral from '../partials/Menu'
import './Geral.css'

const { Header, Content, Footer, Sider } = Layout

const TemplateGeral = ({ children }) => {
    return(
        <Layout>
            <MenuGeral />
            <Layout>
            <HeaderGeral />
            <Content className="conteiner">
                {children}
                <Footer style={{ textAlign: 'center' }}>Emeborges ©2021 Created by Ant UED</Footer>
            </Content>
            
            </Layout>
      </Layout>       
        
    )
}

export default TemplateGeral