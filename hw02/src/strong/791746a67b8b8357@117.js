function _1(md){return(
md`# HW2 Strong baseline (2pt)`
)}

function _data(FileAttachment){return(
FileAttachment("data.json").json()
)}

function _Constell(data){return(
data.map(item => item.Constellation)
)}

function _cCounts(){return(
[]
)}

function _Constella(){return(
["牡羊","金牛","雙子","巨蠍","獅子","處女","天秤","天蠍","射手","摩羯","水瓶","雙魚"]
)}

function _6(cCounts,Constell,Constella,data)
{
  cCounts.length = 0; //將cCounts清空
  var minConstell = Math.min(...Constell); //最早出生年
  var maxConstell = Math.max(...Constell); //最晚出生年
  for (var y=minConstell; y<=maxConstell; y++) { 
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    cCounts.push({Constell:Constella[y], gender:"male", count:0}); 
    //Object包含：1. 出生年，2.男性，3.人數(設為0)
    cCounts.push({Constell:Constella[y], gender:"female", count:0}); 
    //Object包含：1. 出生年，2.女性，3.人數(設為0)
  }
  data.forEach (x=> {
    var i = (x.Constellation-minConstell)*2 + (x.Gender== "男" ? 0 : 1); 
    cCounts[i].count++;
    //讀取data array，加總每個年份出生的人
  })
  return cCounts
}


function _7(cCounts,Constell,Constella,data)
{
  cCounts.length = 0; //將cCounts清空
  var minConstell = Math.min(...Constell); //最早出生年
  var maxConstell = Math.max(...Constell); //最晚出生年
  for (var y=minConstell; y<=maxConstell; y++) { 
    //所有年份都建立兩個Object，一個存放男性資料，一個存放女性資料
    cCounts.push({Constell:Constella[y], gender:"male", count:0}); 
    //Object包含：1. 出生年，2.男性，3.人數(設為0)
    cCounts.push({Constell:Constella[y], gender:"female", count:0}); 
    //Object包含：1. 出生年，2.女性，3.人數(設為0)
  }
  data.forEach (x=> {
    var i = (x.Constellation-minConstell)*2 + (x.Gender== "男" ? 0 : 1); 
    cCounts[i].count++;
    //讀取data array，加總每個年份出生的人
  })
  return cCounts
}


function _8(Plot,Constella,data){return(
Plot.plot({    
	y: {grid: true, label: "count"},  
  x: {ticks: 12, tickFormat: (d) => { return Constella[d]; }},
	marks: [    
		Plot.rectY(data, Plot.binX({y:"count"}, { x:"Constellation", interval:1, fill:"Gender", tip: true,
                                          title: d => `Constellation: ${Constella[d.Constellation]}\nGender: ${d.Gender == "male" ? "男":"女"}`})),   
		Plot.gridY({ interval: 1, stroke: "white", strokeOpacity: 0.5 })
	 ]
})
)}

function _9(Plot,cCounts){return(
Plot.plot({
  color: {scheme: "BuRd"},
  grid: true,
  y: {label: "count"},
  marks: [
    Plot.ruleY([0]),
    Plot.barY(cCounts, {x: "Constell", y: "count", tip: true , fill:"gender"})
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("../data.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("Constell")).define("Constell", ["data"], _Constell);
  main.variable(observer("cCounts")).define("cCounts", _cCounts);
  main.variable(observer("Constella")).define("Constella", _Constella);
  main.variable(observer()).define(["cCounts","Constell","Constella","data"], _6);
  main.variable(observer()).define(["cCounts","Constell","Constella","data"], _7);
  main.variable(observer()).define(["Plot","Constella","data"], _8);
  main.variable(observer()).define(["Plot","cCounts"], _9);
  return main;
}
