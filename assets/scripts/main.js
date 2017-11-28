var lineChart;
var gaugeChart;

//Get the gauge chart's data
function requestGaugeData() {
    $.ajax({
        url: 'http://localhost:8000',
        type: 'GET',
        data: { type: "gauge" } ,
        contentType: 'application/json; charset=utf-8',
        success: function(milliseconds) {

            var point = gaugeChart.series[0].points[0];

            point.update(milliseconds);
            // call it again after 2 seconds
            setTimeout(requestGaugeData, 2000);    
        },
        cache: false
    });
}

//Get the line chart's data
function requestLineData() {
    $.ajax({
        url: 'http://localhost:8000',
        type: 'GET',
        data: { type: "line" } ,
        contentType: 'application/json; charset=utf-8',
        success: function(aData) {

            var series = lineChart.series[0];

            // add the points
            /*for (var i = 0; i <= aData.length; i++) {
                series.addPoint([aData[i][0], aData[i][1]]);
            }*/
            series.setData(aData, true);

            // call it again after 2 seconds
            setTimeout(requestLineData, 2000);    
        },
        cache: false
    });
}

//Create charts
$(document).ready(function() {
    gaugeChart = new Highcharts.chart('gaugeChart', {
        
        chart: {
            type: 'solidgauge',
            backgroundColor: null,
            events: {
                load: requestGaugeData
            }
        },

        title: null,

        pane: {
            center: ['55%', '70%'],
            size: '110%',
            startAngle: -90,
            endAngle: 90,
            background: [
                {
                    backgroundColor: '#EEE',
                    innerRadius: '80%',
                    outerRadius: '100%',
                    shape: 'arc'
                }, {
                    backgroundColor: 'white',
                    boxShadow: true,
                    className: 'circle',
                    outerRadius: '70%',
                    borderWidth: 2
                }
            ]
        },

        tooltip: {
            enabled: false
        },

        yAxis: {
            lineWidth: 2,
            minorTickInterval: null,
            tickAmount: 2,
            labels: {
                enabled: false
            },
            min: 0,
            //60 seconds * 40 minutes in milliseconds
            max: 60*40*1000,
            title: {
                enabled: false
            }
        },

        plotOptions: {
            solidgauge: {
                innerRadius: '80%',
                dataLabels: {
                    padding: 0,
                    y: 50,
                    borderWidth: 0,
                    //Get the current y, the number of milliseconds, and convert it to time using moment.js
                    // The second value is 6% lower than the main time
                    formatter: function() { 
                        var x = '<div sytle="width: 30%; height: 20%;" class="text-center">'
                            +'  <span style="font-size: 150%; font-weight: 700">'+('0' + moment.duration(this.y).hours()).slice(-2)+':'+('0' + moment.duration(this.y).minutes()).slice(-2)+':'+('0' + moment.duration(this.y).seconds()).slice(-2)+'</span><br>'
                            +'  <span><span class="glyphicons glyphicons-family"></span>'+('0' + moment.duration(this.y - (this.y * 0.06)).hours()).slice(-2)+':'+('0' + moment.duration(this.y - (this.y * 0.06)).minutes()).slice(-2)+':'+('0' + moment.duration(this.y - (this.y * 0.06)).seconds()).slice(-2)+'</span><br><br>'
                            +'  <div sytle="padding-right: 3em" class="semi-circle">'
                            +'     <p>HIT 6%</p>'
                            +'  </div>'
                            +'</div>';
                            return x;
                        },
                    useHTML: true
                }
            }
        },

        series: [{
            label: { enabled: false },
            data: [{
                y:1,
                color: '#f4b938'
            }]
        }],

        credits: {
            enabled: false
        },

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                }
            }]
        }

    });

    lineChart = new Highcharts.chart('lineChart', {

        chart: {
            type: 'line',
            backgroundColor: null,
            events: {
                load: requestLineData
            }
        },

        credits: {
            enabled: false
        },

        plotOptions: {
            line: {
                color: 'gray'
            },
            pointInterval: 10
        },

        title: null,
        
        yAxis: {
            title: { 
                enabled: false 
            },
            labels: { 
                enabled: false 
            },
            tickInterval: 1,
            startOnTick: false,
            endOnTick: false,
            allowDecimals: true
        },

        xAxis: {
            labels: { 
                enabled: false 
            },
            tickInterval: 24
        },

        legend: {
            enabled: false
        },

        exporting: {
            enabled: false
        },

        series: [{
            data: []
        }],

        responsive: {
            rules: [{
                condition: {
                    minWidth: 250
                },
                chartOptions: {
                  legend: {
                    enabled: false
                  }
                }
            }]
        }

    }); 
});