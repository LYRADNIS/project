

window.onload = function(){
    $(".images").on("click", function(data){
        $("#words").text(data.target.dataset.src)
        //console.log(data.target.dataset.src)
    })
}

    //page speed insights API
    function run() {
      const outputDiv = $("#googleOutput");
      const url = setUpQuery();
      try{
          fetch(url)
            .then(response => response.json())
            .then(json => {
                console.log(json)
              // See https://developers.google.com/speed/docs/insights/v5/reference/pagespeedapi/runpagespeed#response
              // to learn more about each of the properties in the response object.
              showInitialContent(json.id,outputDiv);
              const cruxMetrics = {
                "First Contentful Paint": json.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category,
                "First Input Delay": json.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category
              };
              showCruxContent(cruxMetrics,outputDiv);
              const lighthouse = json.lighthouseResult;
              const lighthouseMetrics = {
                'First Contentful Paint': lighthouse.audits['first-contentful-paint'].displayValue,
                'Speed Index': lighthouse.audits['speed-index'].displayValue,
                'Time To Interactive': lighthouse.audits['interactive'].displayValue,
                'First Meaningful Paint': lighthouse.audits['first-meaningful-paint'].displayValue,
                'First CPU Idle': lighthouse.audits['first-cpu-idle'].displayValue,
                'Estimated Input Latency': lighthouse.audits['estimated-input-latency'].displayValue
              };
              showLighthouseContent(lighthouseMetrics, outputDiv);
            });
        } catch(e){
            console.log(e)
        }
    }

function setUpQuery() {
  const urlFieldvalue = $("#urlField").val();
  const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  const parameters = {
    url: encodeURIComponent("https://" + urlFieldvalue)
  };
  let query = `${api}?`;
  // for now put actual key inside code
  for (key in parameters) {
    query += `${key}=${parameters[key]}`;
  }
  return query;
}

function showInitialContent(id, targetDiv) {
  //document.body.innerHTML = '';
  const title = document.createElement('h1');
  title.textContent = 'PageSpeed Insights API Demo';
  targetDiv.append(title);
  const page = document.createElement('p');
  page.textContent = `Page tested: ${id}`;
  targetDiv.append(page);
}

function showCruxContent(cruxMetrics, targetDiv) {
  const cruxHeader = document.createElement('h2');
  cruxHeader.textContent = "Chrome User Experience Report Results";
  targetDiv.append(cruxHeader);
  for (key in cruxMetrics) {
    const p = document.createElement('p');
    p.textContent = `${key}: ${cruxMetrics[key]}`;
    targetDiv.append(p);
  }
}

function showLighthouseContent(lighthouseMetrics, targetDiv) {
  const lighthouseHeader = document.createElement('h2');
  lighthouseHeader.textContent = "Lighthouse Results";
  targetDiv.append(lighthouseHeader);
  for (key in lighthouseMetrics) {
    const p = document.createElement('p');
    p.textContent = `${key}: ${lighthouseMetrics[key]}`;
    targetDiv.append(p);
  }
}