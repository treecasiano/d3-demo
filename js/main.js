window.onload = function () {
  var w = 950;
  var h = 500;

  var cityPop = [
    {
      city: 'Portland',
      population: 639863
    },
    {
      city: 'Salem',
      population: 167419
    },
    {
      city: 'Beaverton',
      population: 97590
    },
    {
      city: 'Tigard',
      population: 51902
    }
  ];

  //find the minimum value of the array
  var minPop = d3.min(cityPop, function(d){
    return d.population;
  });

  //find the maximum value of the array
  var maxPop = d3.max(cityPop, function(d){
    return d.population;
  });

  var x = d3.scaleLinear()  //create the scale
      .range([100, 800]) //output min and max
      .domain([0, 3]); //input min and max


  //scale for circles center y coordinate
  var y = d3.scaleLinear()
      .range([450, 50])
      .domain([0, 800000]);

  //color scale generator
  var color = d3.scaleLinear()
      .range([
        "#ff9ac9",
        "#7c3a65"
      ])
      .domain([
        minPop,
        maxPop
      ]);


  var container = d3.select("body")
      .append('svg')
      .attr('width', w)
      .attr('height', h)
      .attr('class', 'container')
      .style('background-color', 'rgba(0,0,0,0.2)');

  //innerRect block
  var innerRect = container.append("rect")
      .datum(400)
      .attr('width', function (d) {
        return d * 2.15;
      })
      .attr('height', function (d) {
        return d;
      })
      .attr("class", "innerRect")
      .attr("x", 50)
      .attr("y", 50)
      .style("fill", "#eeeeee");


  // since we want to create new elements based on our data array,
  // we need to create an empty selection by using a selector it won't find a match for

  var circles = container.selectAll(".circles")
      .data(cityPop)
      .enter()
      .append('circle')
      .attr('class', 'circles')
      .attr('id', function (d) {
        return d.city;
      })
      .attr("r", function (d, i) { //circle radius
        var area = d.population * 0.01;
        return Math.sqrt(area / Math.PI);
      })
      .attr("cx", function (d, i) { //x coordinate
        //use the index to place each circle horizontally
        return x(i);
      })
      .attr("cy", function (d) { //y coordinate
        //subtract value from 450 to "grow" circles up from the bottom instead of down from the top of the SVG
        return y(d.population);
      })
      .style("fill", function(d, i){ //add a fill based on the color scale generator
        return color(d.population);
      })
      .style("stroke", "#222"); //black circle stroke


  var yAxis = d3.axisLeft(y)
      .scale(y);

  //create axis g element and add axis
  // .call(yAxis) feeds the axis selection to the yAxis
  var axis = container.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(50, 0)")
      .call(yAxis);


  var title = container.append("text")
      .attr("class", "title")
      .attr("text-anchor", "middle")
      .attr("x", 450)
      .attr("y", 30)
      .text("City Populations");

  var labels = container.selectAll(".labels")
      .data(cityPop)
      .enter()
      .append("text")
      .attr("class", "labels")
      .attr("text-anchor", "left")
      .attr("y", function(d){
        //vertical position centered on each circle
        return y(d.population);
      });

  //first line of label
  var nameLine = labels.append("tspan")
      .attr("class", "nameLine")
      .attr("x", function(d,i){
        //horizontal position to the right of each circle
        return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
      })
      .text(function(d){
        return d.city;
      });

  var format = d3.format(",");

  //second line of label
  var popLine = labels.append("tspan")
      .attr("class", "popLine")
      .attr("x", function(d,i){
        return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
      })
      .attr("dy", "15") //vertical offset
      .text(function(d){
        return "Pop. " + format(d.population);
      });
};

