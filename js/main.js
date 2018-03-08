window.onload = function() {
  var w = 900;
  var h = 500;

  var container = d3.select("body")
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .attr('class', 'container')
      .style('background-color', 'rgba(0,0,0,0.2)');

  //innerRect block
  var innerRect = container.append("rect")
      .datum(400)
      .attr('width', function(d){
        return d * 2;
      })
      .attr('height', function(d){
        return d;
      })
      .attr("class", "innerRect")
      .attr("x", 50)
      .attr("y", 50)
      .style("fill", "#6e0c56");
};