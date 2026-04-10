const demoData = {
  LibBooks: 7,
  LibraryLevel: 15,
  StampLv: [{0:10},{0:12}],
  CauldronInfo: [{0:15}]
};

function $(id){return document.getElementById(id)}

function extractBooks(data){
  return data.LibBooks ?? "?"
}

function analyzeData(data){
  const recs = []

  // Example stamp rec
  if(data.StampLv){
    recs.push({
      title:"Upgrade Stamp",
      cost:"Needs materials",
      current:data.StampLv[0][0]
    })
  }

  // Library rec
  const books = extractBooks(data)

  recs.push({
    title:"Use Library Books",
    cost:"Spend books",
    current:books
  })

  return {recs, books}
}

function render(result){
  $("results").classList.remove("hidden")

  $("kpiBooks").textContent = result.books
  $("kpiTotal").textContent = result.recs.length
  $("kpiEasy").textContent = result.recs.length

  $("library").innerHTML = `
    <div class="card">
      Current Books: ${result.books}
    </div>
  `

  $("recommendations").innerHTML = result.recs.map(r=>`
    <div class="card">
      <strong>${r.title}</strong><br>
      Current: ${r.current}<br>
      ${r.cost}
    </div>
  `).join("")
}

function analyze(){
  let data
  const json = $("jsonInput").value

  if(json){
    data = JSON.parse(json)
  } else {
    data = demoData
  }

  const result = analyzeData(data)
  render(result)
}

$("analyzeBtn").onclick = analyze
$("demoBtn").onclick = ()=>{ $("jsonInput").value = JSON.stringify(demoData,null,2) }
$("clearBtn").onclick = ()=>{ $("jsonInput").value="" }
