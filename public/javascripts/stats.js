// create some chart on startup
$( document ).ready(function() {
  // create a new SVG element
  var parentDiv = d3.select('#stats');
  var svg1 = parentDiv.append('svg')
  .attr('width', parentDiv[0][0].clientWidth)
  .attr('height', 500);

  // Define the div for the tooltip
  var div = d3.select("body").append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

  var dateTimeFormat = d3.time.format('%Y-%m-%d %H:%M:%S');

  // Add an ordinal scale
  var xScale = d3.scale.ordinal()
      .domain(d3.map(chatData, function(d) { return d.created_at_date; }))
      .rangeBands([0, svg1.attr('width')]);

  var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')
      .tickFormat(d3.time.format("%Y-%m-%d"));

  svg1.append('g')
    .attr('transform','translate(0,' + (svg1.attr('height') -5) + ")")
    .call(xAxis)

  // create bar graph
  var bars = svg1.selectAll('rect')
  .data(chatData)
  .enter()
  .append('rect')
  .attr("fill", function(d) {return 'rgb(0, 0, ' + (d.transcripts.length * 20) + ')';})
  .attr('x', function(d, i) {return i * (svg1.attr('width') / chatData.length);})  //Bar width of 20 plus 1 for padding
  .attr('y', function(d) { return svg1.attr('height') - d.transcripts.length*25})  //Height minus scaled data value
  .attr('width', function(d) { return svg1.attr('width')/chatData.length - 50;})
  .attr('height', function(d) { return d.transcripts.length*25 });

  bars.on('mouseover', function(d) {
      d3.select(this)
      .style('stroke-opacity', 1)
      .style('stroke-width', 3)
      .style('stroke', 'red')
      div.transition()
      .duration(100)
      .style('opacity', .9);
      div.html(dateTimeFormat(new Date(d.created_at_date)))
      .style('left', (d3.event.pageX) + 'px')
      .style('top', (d3.event.pageY - 30) + 'px');
    }).on('mouseout', function(d) {
        d3.select(this)
        .style('stroke-width', 0)
        div.transition()
        .duration(100)
        .style('opacity', 0);
      });

  // create labels
  var labels =  svg1.selectAll('text')
  .data(chatData)
  .enter()
  .append('text')
  .text(function(d) {
    if (d.user_agent.indexOf('Linux') > -1){var faOsCode = '\uf17c';}
    else if (d.user_agent.indexOf('Windows') > -1){var faOsCode = '\uf17a';}
    else if (d.user_agent.indexOf('Apple') > -1){var faOsCode = '\uf179';}
    else {var faOsCode = '\uf059';}
    return 'Chat messages: ' + d.transcripts.length + ' -  OS: ' + faOsCode;
  })
  .attr('x', function(d, i) { return i * (svg1.attr('width') / chatData.length ) +25; })
  .attr('y', function(d) {return svg1.attr('height') - d.transcripts.length*25 + 25; })
  .attr('font-family', 'FontAwesome')
  .attr('font-size', '20px')
  .attr('fill', 'white')

  });