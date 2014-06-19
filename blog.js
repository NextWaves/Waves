

$("#blog_title").html(title);
$("#header_title").html(header_title);
$("#contact").attr("href","mailto:"+contact);
$("#contact").html(contact);
$("#logo").attr("src",logo_img);


marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: true,
  sanitize: false,
  smartLists: true,
  smartypants: false
});



//load up the database
data=JSON.parse(database);

if(typeof(data[0]) == 'undefined'){
	$("#content_title").html('Enter a New Title');
	$("#content_text").html('Enter a New Entry');
	var d =  new Date();
	$("#content_date").html(d.getYear() + "-" + d.getMonth()+ "-" + d.getDate());
}else{
	if(window.location.hash != "" && window.location.hash.indexOf("#date") > -1){
		dd=window.location.hash.split("=")[1];
		console.log(dd);
		for(var i in data){
			if(data[i].id == dd){
				/*$("#content_title").html(atob(data[i].title));
				$("#content_markdown").text(data[i].content);
				console.info($("#content_markdown").text());
				var md = atob($("#content_markdown").text());
				marked(md,function(err, content){
									$("#content_text").html(content);
							});
				//$("#content_text").html(atob(data[i].content));
				$("#content_date").html(data[i].year + "-" + data[i].month+ "-" + data[i].day);*/
				var carea=$("<div/>").addClass("content_area");
				var ctitle=$("<div/>").addClass("content_title");
				var cdate=$("<div/>").addClass("content_date");
				var ctext=$("<div/>").addClass("content_text");
				//var cmd=$("<div/>").addClass("conent_markdown");
				ctitle.html(atob(data[i].title));
				cdate.html(data[i].year + "-" + data[i].month+ "-" + data[i].day);
				var md = atob(data[i].content);
				marked(md,function(err, content){
						ctext.html(content);
				});
				carea.append(cdate);
				carea.append(ctitle);
				carea.append("<hr>");
				carea.append(ctext);
				$(".content").append(carea);

			}
		}

	}else{
		/*$("#content_title").html(atob(data[0].title));
		$("#content_markdown").html(data[0].content);
		var md = atob($("#content_markdown").text());
		marked(md,function(err, content){
				$("#content_text").html(content);
		});
		$("#content_date").html(data[0].year + "-" + data[0].month+ "-" + data[0].day);*/

		for(var i in data){
			if(edit==true){
				$("#content_title").html(atob(data[0].title));
				$("#content_markdown").html(data[0].content);
				var md = atob($("#content_markdown").text());
				marked(md,function(err, content){
						$("#content_text").html(content);
				});
				$("#content_date").html(data[0].year + "-" + data[0].month+ "-" + data[0].day);
			}
			else if(i<=4){
				if(typeof(data[i]) == 'undefined')
					break;
				var carea=$("<div/>").addClass("content_area");
				var ctitle=$("<div/>").addClass("content_title");
				var cdate=$("<div/>").addClass("content_date");
				var ctext=$("<div/>").addClass("content_text");
				//var cmd=$("<div/>").addClass("conent_markdown");
				ctitle.html(atob(data[i].title));
				cdate.html(data[i].year + "-" + data[i].month+ "-" + data[i].day);
				var md = atob(data[i].content);
				marked(md,function(err, content){
						ctext.html(content);
				});
				carea.append(cdate);
				carea.append(ctitle);
				carea.append("<hr>");
				carea.append(ctext);
				$(".content").append(carea);
			}
		}

	



	}
}

//create the archive sidebar
function updateArchive(){
	var links = {};
	if(typeof(data[0]) == 'undefined')
		return;

	if(typeof(data[0].year) == 'undefined')
		return;

	for(var i in data){
		if(typeof(links[data[i].year]) == 'undefined')
			links[data[i].year]="";
		data_date=data[i].year + "-" + data[i].month+ "-" + data[i].day
		links[data[i].year] += "<li><a href=\"#date="+data[i].id+"\" date='"+ data[i].id +"' title='" + atob(data[i].title) + "' class='archive_date' > &#8614;&nbsp;"+ atob(data[i].title)+ "</a></li>";
	}

	archiveHtml="<ul>";
	for(var key in links){
		archiveHtml+="<li><a href=\"#year\" class='archive_year' year='" + key + "'> <b>" + key + "</b></a><br><div id='year_"+key+ "' class='archive_dates'><ul>" + links[key] + "</ul></div>";
	}
	archiveHtml+="</ul>";

	$("#archive").html(archiveHtml);

	$(".archive_year").click(
		function() {
			year = $(this).attr('year');
			if( $("#year_"+year).is(':visible') ){
				$("#year_"+year).hide();
			}else{
				$("#year_"+year).show();
			}

		});


	$(".archive_date").click(
		function(){
			sel_date=$(this).attr("date");
			for(var i in data){
				if(data[i].id == sel_date){
					/*$("#content_title").html(atob(data[i].title));
					$("#content_markdown").html(data[i].content);
					var md = atob($("#content_markdown").text());
					console.log($("#content_markdown").text());
					console.log(md);
					marked(md,function(err, content){
									$("#content_text").html(content);
							});
					//$("#content_text").html(atob(data[i].content));
					$("#content_date").html(data[i].year + "-" + data[i].month+ "-" + data[i].day);*/
					

					var carea=$("<div/>").addClass("content_area");
					var ctitle=$("<div/>").addClass("content_title");
					ctitle.attr("id","content_title");
					var cdate=$("<div/>").addClass("content_date");
					cdate.attr("id", "content_date");
					var ctext=$("<div/>").addClass("content_text");
					ctext.attr("id", "content_text");
					//var cmd=$("<div/>").addClass("conent_markdown");
					ctitle.html(atob(data[i].title));
					cdate.html(data[i].year + "-" + data[i].month+ "-" + data[i].day);
					var md = atob(data[i].content);
					marked(md,function(err, content){
							ctext.html(content);
					});
					var cmark=$("<div/>").addClass("content_markdown");
					cmark.attr("id", "content_markdown");
					cmark.hide();
					cmark.html(data[i].content);
					carea.append(cdate);
					carea.append(ctitle);
					carea.append("<hr>");
					carea.append(ctext);
					carea.append(cmark)
					$(".content").html(carea);
					$("#add").hide();
					$("#update").show();
					$("#new").show();
					if(edit==true){
						registerContentEvents();
						$("#update").attr("date", sel_date);
					}
				}
			}
		});
	$("#year_"+data[0].year).show();
}
updateArchive();





