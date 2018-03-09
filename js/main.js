window.onload = function() {
  var w = 900;
  var h = 500;

  var dataArray = [10, 20, 30, 40, 50];

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
      .style("fill", "#084c6e");


  // since we want to create new elements based on our data array,
  // we need to create an empty selection by using a selector it won't find a match for

  var circles = container.selectAll(".circles")
      .data(dataArray)
      .enter()
      .append('circle')
      .attr('class', 'circles')
      .attr("r", function(d, i){ //circle radius
        console.log("d:", d, "i:", i); //let's take a look at d and i
        return d;
      })
      .attr("cx", function(d, i){ //x coordinate
        return 70 + (i * 180);
      })
      .attr("cy", function(d){ //y coordinate
        return 450 - (d * 5);
      });

  // Using .append() after a data join will always create the same number of new elements as data values in the dataset.
};

