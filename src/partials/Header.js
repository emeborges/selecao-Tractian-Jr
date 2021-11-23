import { Layout, Avatar, Popover} from 'antd'
import { UserOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom'

import './Header.css'

const { Header } = Layout

const HeaderGeral = () => {

    const content = (
                <Link to="/" className="">Sair</Link>

    );

    return(
            <Header className="conteinerHeader" >
                <Popover placement="bottomRight" Paragraph='Perfil' content={content} trigger="click">
                    <div className="userProfile">
                        <Avatar  icon={<UserOutlined />} />
                    </div>
                </Popover>
            </Header>
    )
}
//
export default HeaderGeral