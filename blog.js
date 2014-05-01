

$("#blog_title").html(title);
$("#header_title").html(header_title);
$("#contact").attr("href","mailto:"+contact);
$("#contact").html(contact);



//load up the database
data=JSON.parse(database);

if(typeof(data[0]) == 'undefined'){
	$("#content_title").html('Enter a New Title');
	$("#content_text").html('Enter a New Entry');
	var d =  new Date();
	$("#content_date").html(d.getYear() + "-" + d.getMonth()+ "-" + d.getDate());
}else{
	$("#content_title").html(atob(data[0].title));
	$("#content_text").html(atob(data[0].content));
	$("#content_date").html(data[0].year + "-" + data[0].month+ "-" + data[0].day);
}


//create the archive sidebar
var links = {};

for(var i in data){
	if(typeof(links[data[i].year]) == 'undefined')
		links[data[i].year]="";
	links[data[i].year] += "<li><a href=\"#date\" class='archive_date' " + data[i].year + "'>"+data[i].year + "-" + data[i].month+ "-" + data[i].day + "</a></li>";
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
		sel_date=$(this).html();
		year=sel_date.split("-")[0];
		month=sel_date.split("-")[1];
		day=sel_date.split("-")[2];
		for(var i in data){
			if(data[i].year == year && data[i].day == day && data[i].month == month){
				$("#content_title").html(atob(data[i].title));
				$("#content_text").html(atob(data[i].content));
				$("#content_date").html(data[i].year + "-" + data[i].month+ "-" + data[i].day);
			}
		}
	});





