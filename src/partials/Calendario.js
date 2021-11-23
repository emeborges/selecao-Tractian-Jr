import { Card, Calendar   } from 'antd'


import './Calendario.css'



const Calendario = () => {
    return(
        <Card className="boxCalendario">
            <Calendar fullscreen={false} className="calendarioObjeto" />
        </Card>
    )
}

export default Calendario