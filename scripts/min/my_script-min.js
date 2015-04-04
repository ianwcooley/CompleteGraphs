function generateNodes(t,r){for(var e=t,n=r,a=e+30,i=e+30,o=[],u=0;n>u;u++){var c=u*(360/n)*(Math.PI/180),l=a+e*Math.cos(c),d=i+e*Math.sin(c);o.push([l,d])}return o}function generateLines(t,r){for(var e=t,n=r,a=generateNodes(e,n),i=[],o=0;n-1>o;o++)for(var u=o+1;n>u;u++){var c=a[o][0],l=a[o][1],d=a[u][0],s=a[u][1];i.push([c,l,d,s])}return i}function drawGraph(t,r,e){var n=generateNodes(r,e),a=generateLines(r,e);t.attr("width",2*r+60).attr("height",2*r+60).style({"background-color":"rgb(25,124,290)",position:"relative",left:"50%","margin-left":-(r+30),"margin-top":"30px","margin-bottom":"50px"}),t.selectAll("line").data(a).enter().append("line").attr("x1",function(t){return t[0]}).attr("y1",function(t){return t[1]}).attr("x2",function(t){return t[2]}).attr("y2",function(t){return t[3]}).attr("stroke","rgb(190, 190, 190)").attr("stroke-width","2"),t.selectAll("circle").data(n).enter().append("circle").attr("cx",function(t){return t[0]}).attr("cy",function(t){return t[1]}).attr("r",9).attr("fill","rgb(190, 190, 190)")}function addNodes(t,r,e,n,a){var i=generateNodes(r,e),o=generateLines(r,e);t.selectAll("line").data(o).transition().delay(n).duration(a).attr("x1",function(t){return t[0]}).attr("y1",function(t){return t[1]}).attr("x2",function(t){return t[2]}).attr("y2",function(t){return t[3]}),t.selectAll("line").data(o).enter().append("line").attr("stroke-opacity","0.0").attr("stroke-width","1").attr("stroke","rgb(190, 190, 190)").transition().delay(n).duration(a).attr("x1",function(t){return t[0]}).attr("y1",function(t){return t[1]}).attr("x2",function(t){return t[2]}).attr("y2",function(t){return t[3]}).attr("stroke-opacity","1.0").attr("stroke-width","2"),t.selectAll("circle").data(i).transition().delay(n).duration(a).attr("cx",function(t){return t[0]}).attr("cy",function(t){return t[1]}).attr("r",9).attr("fill","rgb(190, 190, 190)"),t.selectAll("circle").data(i).enter().append("circle").attr("r",8).attr("fill-opacity","0.0").attr("fill","rgb(190, 190, 190)").transition().delay(n).duration(a).attr("cx",function(t){return t[0]}).attr("cy",function(t){return t[1]}).attr("r",9).attr("fill-opacity","1.0")}function removeNodes(t,r,e,n,a){var i=generateNodes(r,e),o=generateLines(r,e);t.selectAll("line").data(o).transition().delay(n).duration(a).attr("x1",function(t){return t[0]}).attr("y1",function(t){return t[1]}).attr("x2",function(t){return t[2]}).attr("y2",function(t){return t[3]}),t.selectAll("line").data(o).exit().transition().delay(n).duration(a).attr("stroke-opacity","0.0").attr("stroke-width","1").remove(),t.selectAll("circle").data(i).transition().delay(n).duration(a).attr("cx",function(t){return t[0]}).attr("cy",function(t){return t[1]}),t.selectAll("circle").data(i).exit().transition().delay(n).duration(a).attr("fill-opacity","0.0").attr("r","1").remove()}var svg=d3.select("svg"),radius=200,numberOfNodes=Math.floor(12*Math.random()+3);drawGraph(svg,radius,numberOfNodes),$("input").on("keypress",function(t){t||(t=window.event);var r=t.which||t.keyCode;if("13"==r){var e=Number($(this).val());if(e>25||0===e||e===numberOfNodes)return;e>numberOfNodes?(numberOfNodes=e,addNodes(svg,radius,numberOfNodes,200,1e3)):numberOfNodes>e&&(numberOfNodes=e,removeNodes(svg,radius,numberOfNodes,200,1e3))}});