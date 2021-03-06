


currDate=new Date();

$("#content_date").html(currDate.getFullYear() +"-"+ (parseInt(currDate.getMonth()) +1) +"-"+ currDate.getDate() );
$("#content_title").html("Enter Title");
$("#content_text").html("Edit Contents");
$("#content_markdown").html("");

function updateSelect(){
	var select = $('<select id="selections" />');
	for( var i in data ){
		d = data[i].year + "-" + data[i].month + "-" + data[i].day;
			$('<option />', {value: data[i].id, text: d, title: atob(data[i].title) }).appendTo(select);
	}
	$("#Entries").html(select);
	updateArchive();
}
updateSelect();

var title_timeout;
var text_timeout;
function registerContentEvents(){
	$("#content_title").click(
		function (){
			prev=$(this).html();
			if(prev.indexOf("title_input") > -1)
				return;
			$("#content_date").html(currDate.getFullYear() +"-"+ (parseInt(currDate.getMonth()) +1) +"-"+ currDate.getDate() );
			$(this).html("<input class='title_input' id='title_input' type='text' value='"+prev+"'>");
		}
	);

	$("#content_title").mouseenter(function(){
		clearTimeout(title_timeout);

	});

	$("#content_title").mouseleave(
				function(){
					title_timeout = setTimeout(function(){
						if (typeof( $("#title_input").val() ) != 'undefined'){
							if($("#title_input").val()=="")
								$("#content_title").html("Enter Title");
							else
								$("#content_title").html($("#title_input").val());

						}
					}, 1000);
						
				}
			);




	$("#content_text").click(
		function (){
			prev=$(this).html();
			if(prev.indexOf("text_input") > -1)
				return;
			$("#content_date").html(currDate.getFullYear() +"-"+ (parseInt(currDate.getMonth()) +1) +"-"+ currDate.getDate() );
			$(this).html("<span style='float:right'>Markdown Editor</span><br><textarea class='text_input' id='text_input' type='text' >" +$('<div/>').text(atob($("#content_markdown").text())).html() +"</textarea>");

		}
	);

	$("#content_text").mouseenter(function(){
		clearTimeout(text_timeout);

	});
	$("#content_text").mouseleave(
		function(){
			text_timeout = setTimeout( function(){
					if (typeof( $("#text_input").val() ) != 'undefined'){
						//$("#content_text").html($("#text_input").val());
						var markdown=$("#text_input").val();
						$("#content_markdown").html(btoa(markdown));
						var md = $("#text_input").val();
						marked(md,function(err, content){
								if(markdown.trim()==""){
									content="Edit Contents";
								}
								$("#content_text").html(content);

						});

					}
				}, 1000);
				
		}
	);
}
registerContentEvents();


function addEntry(){
	currDate=new Date();
	var unixtime = parseInt(currDate.getTime() / 1000);
	newdata = "{ \"id\" : \"" + unixtime +"\" , \"year\" : \""+currDate.getFullYear()+"\", \"month\": \""+(parseInt(currDate.getMonth()) +1) +"\", \"day\" :\""+currDate.getDate()+"\", \"title\" :\""+btoa($("#content_title").html())+"\", \"content\" :\""+$("#content_markdown").text()+"\"}";

	ndata=JSON.parse(newdata);
	data.unshift(ndata);
	updateSelect();

}
$("#new").click(function () {

	$("#content_title").html("Enter Title");
	$("#content_text").html("Edit Contents");
	$("#content_markdown").html("");
	$("#add").show();
	$("#update").hide();
	$("#new").hide();
});

$("#update").click(function () {


	id=$(this).attr("date");
	
	for(var i in data){
		if(data[i].id == id){
			data[i].title = btoa($("#content_title").html());
			data[i].content = $("#content_markdown").text();
		}

	}

	updateSelect();

});

function generate(){
	datastr=JSON.stringify(data);
	datastr=datastr.replace(/"/g,"\\\"");
	datastr= "database=\"" + datastr + "\";";
	enc=btoa(datastr);
	$("#download").attr("href", "data:application/octet-stream;charset=utf-8;base64,"+enc);
	$("#download").attr("download",databaseFile);
	updateSelect();

	if(rss == false)
		return
	
	//rss feed
	var rss = rssHeader;
	for(var i in data){
		rss+="<item>";
		rss+="<title><![CDATA[" + atob(data[i].title) +"]]></title>";
		rss+="<link><![CDATA["+rssdomain+"?date="+data[i].id +"]]></link>";
		rss+="<guid><![CDATA["+rssdomain+"?date="+data[i].id +"]]></guid>";
		var pubDate=new Date(data[i].id*1000);
		var weekday=new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat");
		var monthname=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
		var formattedDate = weekday[pubDate.getDay()] + ', ' 
					+ pubDate.getDate() + ' '
                    + monthname[pubDate.getMonth()] + ' ' 
                    + pubDate.getFullYear() + ' '
                    + (pubDate.getHours() < 10 ? "0"+pubDate.getHours() : pubDate.getHours()) + ":" 
                    + (pubDate.getMinutes() < 10 ? "0"+pubDate.getMinutes() : pubDate.getMinutes()) + ":"
                    + (pubDate.getSeconds() < 10 ? "0"+pubDate.getSeconds() : pubDate.getSeconds());

		rss+="<pubDate><![CDATA["+formattedDate+"]]></pubDate>";
		var md = atob(data[i].content);
		marked(md,function(err, content){
				rss+="<description><![CDATA["+content +"]]></description>";
		});
		rss+="</item>"
		
	}
	rss+="</channel>";
	rss+="</rss>";
	var rssfeed=btoa(rss);
	$("#rssFeed").attr("href", "data:application/rss+xml;charset=utf-8;base64,"+rssfeed);
	$("#rssFeed").attr("download", rssFile);




}


$("#delete").click(function(){
	
	dd=$("#selections").val();
	for(var i in data){
		if(data[i].id == dd ){
			console.log("Deleting " + $("#selections").val());
			data.splice(i,1);
			updateSelect();
			return;
		}
	}

});

window.onbeforeunload = function(){
  return 'Are you sure you want to leave?';
};

///RSS stuff
var rssdomain="http://www.meshedsites.com/blog/";
var rssHeader='<?xml version="1.0" encoding="utf-8"?> \r\n\
<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/">  \
<channel>  \
<title>' + title + '</title> \
<link>' +rssdomain+ '</link> \
<description></description> \
<image> \
  <title>' + title + '</title> \
  <url>https://www.meshedsites.com/' + logo_img +'</url> \
  <link>'+rssdomain+'</link> \
</image>';



