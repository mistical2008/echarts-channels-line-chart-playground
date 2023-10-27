const isLive = false

var dom = document.getElementById("chart-container")
const toggleAxisOne = document.getElementById("toggle-axis-1")
const toggleAxisTwo = document.getElementById("toggle-axis-2")

const serieTogglersRoot = document.getElementById("serie-togglers")

const cycleThroghIndexes = ({ indexes, current }) => {
  const prevIndex = current
  current = ++current
  current = current % indexes.length

  return {
    prevIndex,
    current
  }
}

dom.style.height = "90vh"

var myChart = echarts.init(dom, null, {
  renderer: "canvas",
  useDirtyRect: false,
  height: 400
})
var app = {}

const xAxisIndexesMap = {
  time: 0,
  volume: 1
}

const xAxisIndexes = Object.values(xAxisIndexesMap)
let xAxisIndex = xAxisIndexesMap.time

const yAxisIndexes = [0, 1]
let yAxisIndex = yAxisIndexes[0]

const showAxis = {
  "0": true,
  "1": true
}

const commonSerieOptions = {
  type: "line",
  animationDurationUpdate: 0,
  animationDuration: 50,
  large: true,
  sampling: "lttb",
  // symbol: false,
  showSymbol: false,
  selectedMode: "single",
  lineStyle: {
    width: 2
  },
  select: {
    lineStyle: {
      width: 4
    }
  },
  silent: false
}

const commonYAxisOptions = {
  axisTick: {
    show: true
  },
  type: "value",
  nameGap: 50,
  axisLabel: {
    fontSize: 12
  },
  splitLine: false,
  nameLocation: "middle",
  triggerEvent: true
}

const commonXAxisOptions = {
  type: "value",
  nameGap: 45,
  // max: 3000,
  // min: 0,
  position: "bottom",
  axisPointer: { snap: false },
  axisTick: {
    show: true,
    inside: true
  },
  nameTextStyle: {
    color: "blue"
    // padding: [15, 0, 0, 0]
  },
  nameLocation: "middle",
  triggerEvent: true,
  boundaryGap: true
}

const commonYAxisLine = {
  show: true, // show the axis line
  symbol: ["none"], // use an arrow at the end of the axis line
  symbolSize: [10, 15], // set the size of the arrow
  // symbolOffset: [0, 10], // set the offset of the arrow
  lineStyle: {
    color: "black", // set the color of the axis line
    width: 1, // set the width of the axis line
    type: "solid" // set the type of the axis line to dashed
  }
}

const dataForSeries = [
  {
    name: "ch1",
    data: [
      [0, -1047],
      [100, -1376],
      [200, -1238],
      [300, -1202],
      [400, -1094],
      [500, -1139],
      [600, -1063],
      [700, -1189],
      [800, -1121],
      [900, -1011],
      [1000, -1087],
      [1100, -1146],
      [1200, -1219],
      [1300, -1113],
      [1400, -1058],
      [1500, -1035],
      [1600, -1024],
      [1700, -1092],
      [1800, -1117],
      [1900, -1046],
      [2000, -1074],
      [2100, -1152],
      [2200, -1138],
      [2300, -1089],
      [2400, -1065],
      [2500, -1037],
      [2600, -1018],
      [2700, -1093],
      [2800, -1056],
      [2900, -1021]
    ]
  },
  {
    name: "ch2",
    data: [
      [0, -1317],
      [100, -1256],
      [200, -1289],
      [300, -1334],
      [400, -1298],
      [500, -1273],
      [600, -1237],
      [700, -1212],
      [800, -1186],
      [900, -1151],
      [1000, -1125],
      [1100, -1099],
      [1200, -1074],
      [1300, -1048],
      [1400, -1023],
      [1500, -997],
      [1600, -971],
      [1700, -946],
      [1800, -920],
      [1900, -895],
      [2000, -869],
      [2100, -843],
      [2200, -818],
      [2300, -792],
      [2400, -767],
      [2500, -741],
      [2600, -715],
      [2700, -690],
      [2800, -664],
      [2900, -639]
    ]
  },
  {
    name: "ch3",
    data: [
      [0, -1499],
      [100, -1474],
      [200, -1448],
      [300, -1423],
      [400, -1397],
      [500, -1372],
      [600, -1346],
      [700, -1321],
      [800, -1295],
      [900, -1270],
      [1000, -1244],
      [1100, -1219],
      [1200, -1193],
      [1300, -1168],
      [1400, -1142],
      [1500, -1117],
      [1600, -1091],
      [1700, -1066],
      [1800, -1040],
      [1900, -1015],
      [2000, -989],
      [2100, -964],
      [2200, -938],
      [2300, -913],
      [2400, -887],
      [2500, -862],
      [2600, -836],
      [2700, -811],
      [2800, -785],
      [2900, -760]
    ]
  },
  {
    name: "ch4",
    data: [
      [0, -1432],
      [100, -1407],
      [200, 581],
      [300, 356],
      [400, 330],
      [500, -305],
      [600, 279],
      [700, 254],
      [800, -228],
      [900, 1203],
      [1000, 177],
      [1100, -1152],
      [1200, -1126],
      [1300, -1101],
      [1400, -1075],
      [1500, -1050],
      [1600, -1024],
      [1700, -999],
      [1800, 73],
      [1900, -48],
      [2000, -22],
      [2100, -97],
      [2200, -871],
      [2300, -846],
      [2400, -820],
      [2500, -795],
      [2600, 69],
      [2700, -744],
      [2800, -718],
      [2900, -693]
    ]
  },
  {
    name: "ch5",
    data: [
      [0, 47],
      [100, 376],
      [200, 238],
      [300, 502],
      [400, -10],
      [500, -39],
      [600, 63],
      [700, 189],
      [800, 121],
      [900, -11],
      [1000, 287],
      [1100, 346],
      [1200, 519],
      [1300, 113],
      [1400, -1058],
      [1500, -1035],
      [1600, -1024],
      [1700, -1092],
      [1800, -17],
      [1900, -446],
      [2000, -1074],
      [2100, -152],
      [2200, -138],
      [2300, -89],
      [2400, -65],
      [2500, -437],
      [2600, -218],
      [2700, -393],
      [2800, 156],
      [2900, -1021]
    ]
  }
]

var option

option = {
  animation: isLive,
  title: {
    text: "Line chart"
  },
  tooltip: {
    trigger: "axis",
    formatter: (params) => {
      return params
        .map((p) => {
          const createColorSquare = (text) => `
          <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 16px; height: 16px; border-radius: 3px; background-color: ${p.color};"></div>
              <span> ${text}</span>
          </div>

          `
          return createColorSquare(
            `<strong>${p.name} - ${p.seriesName}:</strong> ${p.value}`
          )
        })
        .join("")
    }
  },
  legend: {
    show: false,
    // data: dataForSeries.map((d) => d.name),
    selected: {
      Email: false,
      ch1: false
    }
  },
  grid: {
    left: "3%",
    right: "3%",
    bottom: "8%",
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: [
    {
      ...commonXAxisOptions,
      type: "time",
      id: "time",
      show: xAxisIndex === 0,
      name: "time"
    },
    {
      ...commonXAxisOptions,
      type: "value",
      id: "volume",
      show: xAxisIndex === 1,
      name: "volume"
    }
  ],
  yAxis: [
    {
      ...commonYAxisOptions,
      id: "value-left",
      position: "left",
      name: "metric one",
      min: -1500,
      max: 1000,
      nameRotate: 90,
      axisLine: commonYAxisLine,
      nameTextStyle: {
        color: "red",
        padding: [0, 0, 0, 0],
        align: "center"
      }
    },
    {
      ...commonYAxisOptions,
      id: "value-right",
      position: "right",
      name: "metric two",
      min: -1500,
      max: 1000,
      nameRotate: 269,
      axisLine: commonYAxisLine,
      nameTextStyle: {
        color: "red",
        padding: [0, 10, 0, 0],
        align: "center"
      }
    }
  ],
  series: dataForSeries.map((item) => ({
    ...item,
    ...commonSerieOptions
  }))
}

/**
 * ============ Set event handlers: =============
 */
myChart.on("click", (params) => {
  if (!(params.componentType === "yAxis" && params.targetType === "axisName"))
    return
  const {
    prevIndex: yAxisIndexPrev,
    current: yAxisIndexRes
  } = cycleThroghIndexes({
    indexes: yAxisIndexes,
    current: yAxisIndex
  })

  yAxisIndex = yAxisIndexRes

  console.log({ params, yAxisIndexPrev, yAxisIndexRes })
  const o = {
    yAxis: [
      {
        id: option.yAxis[yAxisIndexPrev].id,
        show: false
      },
      { id: option.yAxis[yAxisIndexRes].id, show: true }
    ]
  }
  myChart.setOption(o)
})

myChart.on("click", (params) => {
  if (!(params.componentType === "xAxis" && params.targetType === "axisName"))
    return

  const {
    prevIndex: xAxisIndexPrev,
    current: xAxisIndexRes
  } = cycleThroghIndexes({
    indexes: xAxisIndexes,
    current: xAxisIndex
  })

  const oldOpts = myChart.getOption()

  xAxisIndex = xAxisIndexRes

  console.log({ xAxisIndexPrev, xAxisIndexRes, xAxisIndex })
  const o = {
    series: oldOpts.series.map((s) => ({ ...s, xAxisIndex: xAxisIndexRes })),
    xAxis: [
      {
        id: option.xAxis[xAxisIndexPrev].id,
        show: false
      },
      { id: option.xAxis[xAxisIndexRes].id, show: true }
    ]
  }
  myChart.setOption(o)
})

const serieTogglers = option.series.map((serie) => {
  const toggleMetricBtn = document.createElement("button")
  toggleMetricBtn.textContent = `Toggle ${serie.name}`
  toggleMetricBtn.addEventListener("click", function () {
    myChart.dispatchAction({
      type: "legendToggleSelect",
      name: serie.name
    })
  })

  return toggleMetricBtn
})

;[toggleAxisOne, toggleAxisTwo].forEach((btn) => {
  btn.onclick = (event) => {
    const yAxisList = option.yAxis.slice()

    const index = event.target.dataset.id
    showAxis[index] = !showAxis[index]

    const o = {
      yAxis: [
        {
          ...yAxisList[index],
          show: showAxis[index]
        }
      ]
    }
    myChart.setOption(o)
  }
})

/**
 * @description Set clicked line to bigger width
 */
myChart.on("click", function (params) {
  console.log(params)
  let udpatedSeries = null
  const _o = myChart.getOption()

  if (!(params.seriesType === "line")) {
    return
  }

  if (!(params.componentType === "series")) {
    udpatedSeries = _o.series.map((s, idx) => {
      return { ...s, lineStyle: { ...s.lineStyle, width: 2 } }
    })
  } else {
    udpatedSeries = _o.series.map((s, idx) => {
      if (params.seriesIndex === idx)
        return { ...s, lineStyle: { ...s.lineStyle, width: 4 } }
      return { ...s, lineStyle: { ...s.lineStyle, width: 2 } }
    })
  }

  myChart.setOption({
    series: udpatedSeries
  })

  myChart.dispatchAction({
    type: "select",
    seriesName: params.seriesName
  })
})

/**
 * ============ Init: =============
 */
serieTogglersRoot.append(...serieTogglers)

if (option && typeof option === "object") {
  myChart.setOption(option)
}

window.addEventListener("resize", myChart.resize)
