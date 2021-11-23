
import { Row, Col } from 'antd';
import './Login.css'

const Login = ({ children }) => {
    return(
        <Row style={{backgroundImage:'url(https://i.ibb.co/7R1B5X7/Design-sem-nome-4.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize:'cover',
        height:'100vh',
        width:'100%'}}> 
            
            <Col className='colunaCentral'>
                
                    {children}
                
            </Col>
            
        </Row>
    )
}

export default Login