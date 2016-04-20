// create some chart on startup
$( document ).ready(function() {
  // property definitions
  var parentDiv = d3.select('#stats');
    margin = {top: 50, right: 20, bottom: 150, left: 50},
    width =  parentDiv[0][0].clientWidth - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  // Define the div for the tooltip
  var tooltip = parentDiv.append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

  // time firmat definition
  var dateTimeFormat = d3.time.format('%m.%d.%Y %H:%M:%S');

  // scales
  var xScale = d3.scale.ordinal()
      .rangeRoundBands([0, width], .05)
      .domain(chatData.map(function(d) { return new Date (d.created_at_date); }));

  var yScale = d3.scale.linear()
      .range([height, 0])
      .domain([0, d3.max(chatData, function(d) { return d.transcripts.length; })]);

  // axis
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .tickFormat(dateTimeFormat);

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')
      .ticks(10);

  // create a new SVG element
  var svg1 = parentDiv.append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // append x-axis
  svg1.append('g')
    //.attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-.8em')
    .attr('dy', '-.55em')
    .attr('transform', 'rotate(-90)')

  // apend y-axis
  svg1.append('g')
    //.attr('class', 'y axis')
    .call(yAxis)
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('y', -35)
    //.attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('Chat length (messages)');

  var bars = svg1.selectAll('bar')
    .data(chatData)
    .enter().append('rect')
    .attr('fill', function(d) {return 'rgb(0, 0, ' + (d.transcripts.length * 20) + ')';})
    .attr('x', function(d) { return xScale(new Date(d.created_at_date)); })
    .attr('width', xScale.rangeBand())
    .attr('y', function(d) { return yScale(d.transcripts.length); })
    .attr('height', function(d) { return height - yScale(d.transcripts.length); });

  bars.on('mouseover', function(d) {
      d3.select(this)
      .style('stroke-opacity', 1)
      .style('stroke-width', 3)
      .style('stroke', 'rgb(250, 183, 52)')
      tooltip.transition()
      .duration(100)
      .style('opacity', .9);
      tooltip.html(function() {
        if (d.user_agent.indexOf('Linux') > -1){var faOsCode = '\uf17c';}
        else if (d.user_agent.indexOf('Windows') > -1){var faOsCode = '\uf17a';}
        else if (d.user_agent.indexOf('Apple') > -1){var faOsCode = '\uf179';}
        else {var faOsCode = '\uf059';}
        return '<strong>Chat description:</strong>   ' + d.description + ' - <strong>OS:</strong> ' + faOsCode + '  - <strong> - from IP: </strong> ' + d.ip_address + '<strong> - from location: </strong>' + d.country + ' - <strong>requested by: </strong>' + d.requested_by;
      })
    })
    .on('mouseout', function(d) {
      d3.select(this)
      .style('stroke-width', 0)
      tooltip.transition()
      .duration(100)
      .style('opacity', 0);
      });
  });