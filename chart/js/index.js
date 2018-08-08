
var initState = null; 

var bgColors = ["#ffa000","#ffa000","#ffa000","#ffa000","#ffa000","#ffa000"]; 
var myConfig = {
    "globals": {
        "font-family": "Helvetica"
    },
    "type": "bar",
    "background-color": "white",
    "title": {
        "color": "#606060",
        "background-color": "white",

    },
    "subtitle": {
        "color": "#606060",
        
    },
    "scale-y": {
        "line-color": "none",
        "tick": {
            "line-color": "none"
        },
        "guide": {
		
            "line-style": "none",
			
			"visible":false
			
        },
        "item": {
            "color": "#FFFFFF"
        }
    },
    "scale-x": {
        "values": [
            "2013",
            "2014",
            "2015",
            "2016",
            "2017",
            "2018"
        ],
        "line-color": "#FFFFFF",
        "line-width": 0,
        "tick": {
            "line-width": 0,
            "line-color": "#FFFFFF"
        },
        "guide": {
            "visible": false
        },
        "item": {
            "color": "#222",
	
			
        }
    },
    "crosshair-x": {
        "marker": {
            "visible": false
        },
        "line-color": "none",
        "line-width": "0px",
        "scale-label": {
            "visible": false
        },
        "plot-label": {
            "text": "%data-browser: %v ",
            "multiple": true,
            "font-size": "12px",
            "color": "#606060",
            "background-color": "white",
            "border-width": 3,
            "alpha": 0.9,
            "callout": true,
            "callout-position": "bottom",
            "shadow": 0,
            "placement": "node-top",
            "border-radius": 4,
            "offsetY":-20,
            "padding":8,
            "rules": [
                {
                    "rule": "%i==0",
                    "border-color": "#ffa000"
                },
                {
                    "rule": "%i==1",
                    "border-color": "#ffa000"
                },
                {
                    "rule": "%i==2",
                    "border-color": "#ffa000"
                },
                {
                    "rule": "%i==3",
                    "border-color": "#ffa000"
                },
                {
                    "rule": "%i==4",
                    "border-color": "#ffa000"
                },
                {
                    "rule": "%i==5",
                    "border-color": "#ffa000"
                }
            ]
        }
    },
    "plot": {
        "data-browser": [
            "<span style='font-weight:bold;color:#ffa000;'>2013(out of 14)</span>",
            "<span style='font-weight:bold;color:#ffa000;'>2014(out of 25)</span>",
            "<span style='font-weight:bold;color:#ffa000;'>2015(out of 30)</span>",
            "<span style='font-weight:bold;color:#ffa000;'>2016(out of 75)</span>",
            "<span style='font-weight:bold;color:#ffa000;'>2017(out of 120)</span>",
            "<span style='font-weight:bold;color:#ffa000;'>2018(out of ?)</span>"
        ],
        "cursor": "hand",
        "value-box": {
           
      
            "color": "#222"
        },
        "tooltip": {
            "visible": false
        },
        "animation": {
            "effect": "2"
	
        },
         "rules": [
                {
                    "rule": "%i==0",
                    "background-color": "#ffa000"
                },
                {
                    "rule": "%i==1",
                    "background-color": "#ffa000"
                },
                {
                    "rule": "%i==2",
                    "background-color": "#ffa000"
                },
                {
                    "rule": "%i==3",
                    "background-color": "#ffa000"
                },
                {
                    "rule": "%i==4",
                    "background-color": "#ffa000"
                },
                {
                    "rule": "%i==5",
                    "background-color": "#ffa000"
                }
            ]
    },
    "series": [
        {
            "values": [
                6,
                11,
                15,
                40,
                65,
                100
            ]
        }
    ]
};

var updateChart = function(p){
  initState = zingchart.exec(p.id,'getdata');  
  var newValues = null;
  var update = null;
  switch(p.nodeindex){
    case 0:
      newValues = store['ie'];
      update = true;
      break;
    case 1:
      newValues = store['chrome'];
      update = true;
      break;
    case 2:
      newValues = store['firefox'];
      update = true;
      break;
    case 3:
      newValues = store['safari'];
      update = true;
      break;
    case 4:
      newValues = store['opera'];
      update = true;
      break;
    case 5:
      update = false;
      break;
  }
  if(update){
    zingchart.unbind(p.id, 'node_click');
    zingchart.exec(p.id, 'modify', {
      update:false, 
      data:{
        "crosshair-x":{
          "plot-label":{
           
          
            "border-color": bgColors[p.nodeindex]
          }
        },
        "plot":{
          "cursor":null,
         
          "background-color": bgColors[p.nodeindex]
        },
        "scale-x":{
         
        }
      }
    });
    zingchart.exec(p.id, 'setseriesvalues',{ 
      update:false, 
      plotindex:0,
      values:newValues
    });
    zingchart.exec(p.id,'update'); 
    zingchart.bind(p.id, 'animation_end', function(){
      zingchart.exec(p.id, 'addobject',{ 
        type:'shape',
        data:{
          "type":"rectangle",
          "id":"back_btn",
          "height":20,
          "width":70,
          "background-color":"#ffffff #f6f6f6",
          "x":"80%",
          "y":"16%",
          "border-width":1,
          "border-color":"#888",
          "cursor":"hand",
          "label":{
            "text":"< Back",
            "color": "#606060"
          },
          "hover-state":{
            "background-color":"#1976D2 #ffffff",
            "border-color":"#57a2ff",
            "fill-angle": -180
          }
        }
      });
    });
  }
};

zingchart.render({
	id : 'myChart', 
	data : myConfig,
});

zingchart.bind('myChart','node_click',updateChart);

zingchart.bind('myChart', 'shape_click', function(p){ 
  zingchart.unbind(p.id,'animation_end');
  if (p.shapeid == "back_btn"){
    zingchart.exec(p.id,'setdata',{ 
      data:initState
    });
    zingchart.bind(p.id,'node_click',updateChart);
  }
});