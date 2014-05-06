

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
  pedantic: false,
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
		for(var i in data){
			if(data[i].id = dd){
				$("#content_title").html(atob(data[i].title));
				marked(atob(data[i].content),function(err, content){
									$("#content_text").html(content);
							});
				//$("#content_text").html(atob(data[i].content));
				$("#content_date").html(data[i].year + "-" + data[i].month+ "-" + data[i].day);
			}
		}

	}else{
		$("#content_title").html(atob(data[0].title));
		//$("#content_text").html(atob(data[0].content));
		marked(atob(data[0].content),function(err, content){
									$("#content_text").html(content);
							});
		$("#content_date").html(data[0].year + "-" + data[0].month+ "-" + data[0].day);
	}
}

//create the archive sidebar
function updateArchive(){
	var links = {};

	for(var i in data){
		if(typeof(links[data[i].year]) == 'undefined')
			links[data[i].year]="";
		data_date=data[i].year + "-" + data[i].month+ "-" + data[i].day
		links[data[i].year] += "<li><a href=\"#date="+data[i].id+"\" date='"+ data[i].id +"' title='" + atob(data[i].title) + "' class='archive_date' >"+data_date+ "</a></li>";
	}

	archiveHtml="<ul>";
	for(var key in links){
		archiveHtml+="<li><a href=\"#year\" class='archive_year' year='" + key + "'> " + key + "</a><br><div id='year_"+key+ "' class='archive_dates'><ul>" + links[key] + "</ul></div>";
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
					$("#content_title").html(atob(data[i].title));
					marked(atob(data[i].content),function(err, content){
									$("#content_text").html(content);
							});
					$("#content_markdown").html(atob(data[i].content));
					//$("#content_text").html(atob(data[i].content));
					$("#content_date").html(data[i].year + "-" + data[i].month+ "-" + data[i].day);
					$("#update").attr("date", sel_date);
					$("#add").hide();
					$("#update").show();
					$("#new").show();
				}
			}
		});
}
updateArchive();





