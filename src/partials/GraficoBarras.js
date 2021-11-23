import { Card, Typography    } from 'antd'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import './GeralAssets.css'

const { Title } = Typography

const GraficoBarras = ({ assets, classe }) => {
    
   
    const cards = assets.map(asset => {
        return({
            name: asset.name,
            data: [asset.healthscore],
            tooltip: {
                valueSuffix: '%',}
        })
    })

    const options = {
        chart: {
          type: 'column',
          spacing:0,
          height:415,
          width:700,
          spacingTop:10,
        },
        title: {
          text: '',
          floating:true,
                },
        series: cards,
        xAxis: {
            categories: [
                'Máquinas',
            ],           
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Nível de Vida (%)'
            },
        },
        colors: '#fdfdfd',
        legend: {
            padding: 0,
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 300
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
        }
    }
    
    return(
            <Card  className={classe}>
                <HighchartsReact  highcharts={Highcharts} options={options} />
            </Card>
    )
}

export default GraficoBarras