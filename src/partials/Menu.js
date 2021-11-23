import { Layout, Menu, Image  } from 'antd'
import { HomeOutlined,AreaChartOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Link } from "react-router-dom"

import './Menu.css'

const { Header, Content, Footer, Sider } = Layout

const MenuGeral = () => {
    return(
            <Sider
            breakpoint="lg"
            collapsedWidth="0"
            className="menuContainer"
            >
                <div className="logo">
                    <Image
                    src="https://i.ibb.co/72PKf50/Inserir-um-t-tulo-1.png"
                    />
                </div>
                <Menu theme="dark" mode="inline" >
                    <Link to="/dashboard">
                        <Menu.Item key="1" icon={<HomeOutlined />}>
                        Home
                        </Menu.Item>
                    </Link>
                    <Link to="/assets">
                        <Menu.Item key="2" icon={<AreaChartOutlined />}>
                        Painel Geral 
                        </Menu.Item>
                    </Link>
                    <Link to="/maquinas">
                        <Menu.Item key="3" icon={<UnorderedListOutlined />}>
                        Listagem de Máquinas
                        </Menu.Item>
                    </Link>
                </Menu>
            </Sider>
    )
}

export default MenuGeral