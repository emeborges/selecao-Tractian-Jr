import { Card, Typography    } from 'antd'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import './GeralAssets.css'

const { Title } = Typography

const GraficoBarrasHorizontal = ({ dado, referencia, classe }) => {

    const options = {
        chart: {
            type: 'bar',
            width:450,
            height:190,
            padding:0,
        },
        title: {
            text: '',
            floating:true,
        },
       
        yAxis: [{
            title: {
                text: '%'
            },
            max:100,
            valueSuffix: '%',
            
        },],
        xAxis: {
            visible:false,
            
        },
        legend: {
            shadow: false,
        },
        tooltip: {
            shared: false,
        },
        plotOptions: {
            bar: {
                grouping: false,
                shadow: false,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Referência Geral',
            color: 'rgba(165,170,217,1)',
            data: [referencia],
            pointPadding: 0.3,
            pointPlacement: -0.2,
            tooltip: {
                valueSuffix: '%',}
        }, {
            name: 'Saúde Unidade',
            color: 'rgba(126,86,134,.9)',
            data: [dado],
            pointPadding: 0.4,
            pointPlacement: -0.2,
            tooltip: {
                valueSuffix: '%',}
            
        }, ],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        verticalAlign: 'bottom',
                        layout: 'horizontal'
                    },
                    yAxis: {
                        labels: {
                            align: 'left',
                            x: 0,
                            y: -5
                        },
                        title: {
                            text: null
                        }
                    },
                    subtitle: {
                        text: null
                    },
                    credits: {
                        enabled: false
                    }
                }
            }]
        },
        tooltip: {
            shared: true
        },
    }

    return(
            <Card className={classe} >
                <Title level={5}>Comporativo do nível de saúde da unidade com o nível geral da empresa</Title>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </Card>
    )
}

export default GraficoBarrasHorizontal