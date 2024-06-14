const valueKr = document.getElementById("value_kr");
const inputKr = document.getElementById("range_kr");
valueKr.textContent = inputKr.value;
inputKr.addEventListener("input", (event) => {
    valueKr.textContent = event.target.value;
    re_render_header();
	// csv_render();
	// execute();
	// re_render_script();
	// re_render_script_post_GDP();
	re_render_script_post_CPI();
	
});

const valueM2 = document.getElementById("value_m2");
const inputM2 = document.getElementById("range_m2");
valueM2.textContent = inputM2.value;
inputM2.addEventListener("input", (event) => {
    valueM2.textContent = event.target.value;
    re_render_header();
	// csv_render();
	// execute();
	// re_render_script();
	// re_render_script_post_GDP();
	re_render_script_post_CPI();
	
});


let chart = null;

// console.log(input.value);

const execute = function() {
const xhr = new XMLHttpRequest()
const method = 'GET'
const url = "/api/"         // path to knock for json
const responseType = "json"
let el = document.getElementById("reload")
let header = document.getElementById('title')
const value = document.getElementById("value_kr").textContent;
let multiply = document.getElementById("multiplied")
let header3 = document.getElementById("header3")
xhr.responseType = responseType
xhr.open(method, url)

xhr.onload = function() {
    let changing = xhr.response
		header3.innerHTML =  "Прогнозирование инфляции на основе ИИ модели машинного обучения"
        header.innerHTML = "ИИ прогноз инфляции"
    }
xhr.send()
}

const timeNow = function () {
    let currentTime = new Date().toLocaleString()
    let elTime = document.getElementById("time")
    elTime.innerHTML = currentTime
}

const csv_render = function () {
	const xhr = new XMLHttpRequest()
	const method = 'GET'
	const url = "/csv_api/"
	const responseType = "json"
	xhr.responseType = responseType
	xhr.open(method, url)
	// document.querySelector("tbody").innerText = ''
	const value = document.getElementById("value_kr").textContent;
	xhr.onload = function () {
		let changing = xhr.response
		// console.log(changing['dictionary'])
		let new_arr = JSON.parse((changing['dictionary']))
		new_arr.forEach(json_data_set => {
			let tr = document.createElement("tr")
			Object.keys(json_data_set).forEach(key => {
				var td = document.createElement("td")
				if (json_data_set[key] < 1000) {
					td.innerText = json_data_set[key] //* value	
				} else {
					td.innerText = json_data_set[key]		
				}
				tr.appendChild(td)
			})
			document.querySelector("tbody").appendChild(tr)
		})	
	}
	xhr.send()
}


	
const csv_show = function () {
	const xhr = new XMLHttpRequest()
	let xData = [];
	let yData = new Array();
	const method = 'GET'
	const url = "/csv_show/"
	const responseType = "json"
	xhr.responseType = responseType
	xhr.open(method, url)
	let xData_temp = ''
	let yData_temp = ''
	xhr.onload = function () {
		let changing = xhr.response
		let new_arr = JSON.parse((changing['data']))
		for (let i = 0; i < new_arr.length ; i++){
			// console.log(`date = ${new_arr[i].date}, type: ${typeof(new_arr[i].date)} value = ${new_arr[i].value}, type: ${typeof(new_arr[i].value)}`)
			xData_temp = new_arr[i].date
			yData_temp = +new_arr[i].value
			// console.log(`date = ${xData_temp}, type: ${typeof(xData_temp)} value = ${yData_temp}, type: ${typeof(yData_temp)}`)
			xData.push(xData_temp);
			yData.push(yData_temp);		
		}
		const CreateLineChart = (xData, yData) => {
				let data = {
				labels: xData,
				datasets: [
					{
						label: 'Темп роста ВВП',
						data: yData,
						pointStyle: false,
						fill: true,
						borderWidth: 1
					}
				],
			}
			let config = {
			type: 'line',
			data: data,
			}
			let canvas = window.document.createElement('canvas');
			let context = canvas.getContext('2d');
			let chart = new Chart(context, config);
			// console.log('done')
			};
	CreateLineChart(xData, yData)
	}
	xhr.send()
};




let graph_render = function () {
    

}
window.addEventListener('load', graph_render, false);

let re_render_header = function (){
	let header = document.getElementById('title')
	let header3 = document.getElementById("header3")
	const valueKr = document.getElementById("value_kr").textContent;
	const valueM2 = document.getElementById("value_m2").textContent;
	header.innerHTML = "ИИ прогноз инфляции"
	header3.innerHTML = "Прогноз инфляции при среднегодовой ключевой ставке " + valueKr + "% и темпа прироста M2 " + valueM2 + "% на основе ИИ модели машинного обучения"
}

function re_render_script_GDP() {
	// Получение контекста для рисования
	let canvasGDP = window.document.querySelector('canvas.GDP');
	let contextGDP = canvasGDP.getContext('2d');
	// Функции
	const createLineChart = (xData, yData) => {
		let data = {
			labels: xData,
			datasets: [{
				label: 'GDP growth rate',
				data: yData,
				pointStyle: false,
				fill: true,
				borderWidth: 1
			}]
		}
		let config = {
			type: 'line',
			data: data
		}
		let chart = new Chart(contextGDP, config);
	}
	// Получение данных с сервера
	axios.get('/api/v1/forecast/')
		.then((response) => {
			
			let data = JSON.parse(response.data.data_gdp);
			// console.log(response.data.data_gdp)
			const valueKr = +document.getElementById("value_kr").textContent;
			let xData = [];
			let yData = [];
			let xData_temp = ''
			let yData_temp = ''
			for (let i = 0; i < data.length ; i++) {
					xData.push(data[i].date);
					yData.push(parseFloat(data[i].value));

			}
			createLineChart(xData, yData);
		});
}

function re_render_script_CPI() {
	// Получение контекста для рисования
	let canvas = window.document.querySelector('canvas.CPI');

	let context = canvas.getContext('2d');
	// Функции
	const createLineChart = (xData, yData) => {
		let data = {
			labels: xData,
			datasets: [{
				label: 'Темп инфляции',
				data: yData,
				pointStyle: false,
				fill: true,
				borderWidth: 1
			}]
		}
		let config = {
			type: 'line',
			data: data
		}
		let chart = new Chart(context, config);
	}
	// Получение данных с сервера
	axios.get('/api/v1/forecast/')
		.then((response) => {
			let data = JSON.parse(response.data.data_cpi);
			const valueKr = +document.getElementById("value_kr").textContent;
			const valueM2 = +document.getElementById("value_m2").textContent;
			let xData = [];
			let yData = [];
			let xData_temp = ''
			let yData_temp = ''
			for (let i = 0; i < data.length ; i++) {
					xData.push(data[i].date);
					yData.push(parseFloat(data[i].value));

			}
			createLineChart(xData, yData);
		});
}

let canvas = null;



function re_render_script_post_GDP() {
	let chartStatus = Chart.getChart("GDP"); // <canvas> id
	if (chartStatus != undefined) {
	chartStatus.destroy();
			//(or)
	// chartStatus.clear();
	}
// 		if(window.myChart instanceof Chart)
// {
//     window.myChart.destroy();
// }
	canvas = window.document.querySelector('canvas.GDP');
	let context = canvas.getContext('2d');
	let valueKr = +document.getElementById("value_kr").textContent;
	let valueM2 = +document.getElementById("value_m2").textContent;
    // Переменные 
    
	let pauseMode = false;
	
	// console.log(value);
	const createLineChart = (xData, yData) => {
		let gradient = context.createLinearGradient(0, 0, 0, window.screen.width / 2);
		gradient.addColorStop(0, 'rgba(74, 169, 230, 0.8)');
		gradient.addColorStop(1, 'rgba(74, 169, 230, 0.001)');
		let chartData = {
			labels: xData,
			datasets: [{
				label: 'ВВП',
				data: yData,
				pointStyle: false,
				fill: true,
				backgroundColor: gradient,
				borderWidth: 2,
				borderColor: 'rgba(74, 169, 230, 1)',
				tension: 0.2
			}]
		}
		let xScaleConfig = {
			min: 0,
			max: 50,
			ticks: {
				autoSkip: true,
				maxRotation: 0,
				// minRotation: 90,
				color: 'rgba(74, 169, 230, 0.9)'
			},
			border: {
				color: 'rgba(74, 169, 230, 1)'
			},
			grid: {
				color: 'rgba(74, 169, 230, 0.3)'
			},
			title: {
				display: true,
				text: "Год",
			}
		}
		let yScaleConfig = {
			ticks: {
				color: 'rgba(74, 169, 230, 0.9)'
			},
			border: {
				color: 'rgba(74, 169, 230, 1)'
			},
			grid: {
				color: 'rgba(74, 169, 230, 0.3)'
			},
			title: {
				display: true,
				text: "Темп прироста ВВП, %",
			}
		}
		let config = {
			type: 'line',
			data: chartData,
			options: {
				scales: {
					x: xScaleConfig,
					y: yScaleConfig
				},
				plugins: {
					legend: {
						display: false
					},
					title: {
						display: true,
						text: "Темп прироста ВВП",
						padding: {
							top: 10,
							bottom: 30
						},
						font: {
							size: 12
						}
					},
				},
				animation: {
					duration: 400,
					easing: 'linear'
				}
			}
		}

	let chartStatus = Chart.getChart("GDP"); // <canvas> id
	if (chartStatus != undefined) {
	chartStatus.destroy();
			//(or)
	// chartStatus.clear();
	}

	chart = new Chart(context, config);
      
    }
	axios({
		method: "POST",
		url: '/api/v1/forecast/',
		data: {
			valueKr: valueKr,
			valueM2: valueM2,
		 },
		headers: {
      'Content-Type': 'multipart/form-data'
    },
	})
		.then(function (response) {
			//handle success
			// console.log(response.data.data);
			let data = JSON.parse(response.data.data_gdp);
			// console.log(response.data.data_dgp)
      let xData = [];
      let yData = [];
      for(let i = 0; i < data.length ; i++){
		  if (data[i].value !== '.') {

          xData.push(data[i].date);
          yData.push(parseFloat(data[i].value));
        }
      }
      let xStartData = [];
      let yStartData = [];
      let xParseData = [];
      let yParseData = [];
      for(let i = 0; i < data.length; i++){
		  if (i < 50) {
          xStartData.push(xData[i]);
          yStartData.push(parseFloat(yData[i]));
        }else{
          xParseData.push(xData[i]);
          yParseData.push(parseFloat(yData[i]));
        }
      }
      createLineChart(xStartData, yStartData);
    //   realTimeDemo(xParseData, yParseData, data);
  })
  .catch(function (response) {
	  //handle error
	  console.log("-------------------------------");

    console.log(response);
  });
	window.addEventListener('click', ()=>pauseMode = !pauseMode);
}





function re_render_script_post_CPI() {
	let chartStatus = Chart.getChart("CPI"); // <canvas> id
	if (chartStatus != undefined) {
	chartStatus.destroy();
			//(or)
	// chartStatus.clear();
	}
// 	if(window.myChart instanceof Chart)
// {
//     window.myChart.destroy();
// }
 	canvas = window.document.querySelector('canvas.CPI');
	let context = canvas.getContext('2d');
	let valueKr = +document.getElementById("value_kr").textContent;
	let valueM2 = +document.getElementById("value_m2").textContent;
    // Переменные 
    
	let pauseMode = false;
	
	// console.log(value);
	const createLineChart = (xData, yData) => {
      let gradient = context.createLinearGradient(0, 0, 0, window.screen.width/2);
      gradient.addColorStop(0, 'rgba(74, 169, 230, 0.8)');
      gradient.addColorStop(1, 'rgba(74, 169, 230, 0.001)');
      let chartData = {
        labels: xData,
        datasets: [{
          label: 'Инфляция',
          data: yData,
          pointStyle: false,
          fill: true,
          backgroundColor: gradient,
          borderWidth: 2,
          borderColor: 'rgba(74, 169, 230, 1)',
          tension: 0.2
        }]
      }
      let xScaleConfig = {
        min: 0,
        max: 50,
        ticks: {
          autoSkip: true,
          maxRotation: 0,
          // minRotation: 90,
          color: 'rgba(74, 169, 230, 0.9)'
        },
        border: {
          color: 'rgba(74, 169, 230, 1)'
        },
        grid: {
          color: 'rgba(74, 169, 230, 0.3)'
        },
		title: {
			  display: true,
			  text: "Год",
		  }
      }
      let yScaleConfig = {
        ticks: {
          color: 'rgba(74, 169, 230, 0.9)'
        },
        border: {
          color: 'rgba(74, 169, 230, 1)'
        },
        grid: {
          color: 'rgba(74, 169, 230, 0.3)'
		  },
		title: {
			  display: true,
			  text: "Темп инфляции y/y, %",
		  }
      }
      let config = {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            x: xScaleConfig,
            y: yScaleConfig
          },
			plugins: {
				legend: {
					display: false
				},
				title: {
					display: true,
					text: "Темп инфляции",
					padding: {
						top: 10,
						bottom: 30
					},
					font: {
					size: 12
				}
				},
			},
          animation: {
            duration: 400,
            easing: 'linear'
          }
        }
		}
	let chartStatus = Chart.getChart("CPI"); // <canvas> id
	if (chartStatus != undefined) {
	chartStatus.destroy();
			//(or)
	// chartStatus.clear();
	}
      chart = new Chart(context, config);
    }
	axios({
		method: "POST",
		url: '/api/v1/forecast/',
		data: {
			valueKr: valueKr,
			valueM2: valueM2
		 },
		headers: {
      'Content-Type': 'multipart/form-data'
    },
	})
		.then(function (response) {
			//handle success
			// console.log(response.data.data);
			let data = JSON.parse(response.data.data_cpi);
      let xData = [];
      let yData = [];
      for(let i = 0; i < data.length ; i++){
		  if (data[i].value !== '.') {

          xData.push(data[i].date);
          yData.push(parseFloat(data[i].value));
        }
      }
      let xStartData = [];
      let yStartData = [];
      let xParseData = [];
      let yParseData = [];
      for(let i = 0; i < data.length; i++){
		  if (i < 50) {
          xStartData.push(xData[i]);
          yStartData.push(parseFloat(yData[i]));
        }else{
          xParseData.push(xData[i]);
          yParseData.push(parseFloat(yData[i]));
        }
      }
      createLineChart(xStartData, yStartData);
    //   realTimeDemo(xParseData, yParseData, data);
  })
  .catch(function (response) {
	  //handle error
	console.log("-------------------------------");
    console.log(response);
  });
	window.addEventListener('click', ()=>pauseMode = !pauseMode);
}

setTimeout(execute, 10)
// setInterval(timeNow, 10)
// setTimeout(csv_render, 10)
// setTimeout(re_render_script_GDP, 10)
setTimeout(re_render_script_CPI, 10)
