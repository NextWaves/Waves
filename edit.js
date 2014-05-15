


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


function addEntry(){
	currDate=new Date();
	var unixtime = parseInt(currDate.getTime() / 1000);
	newdata = "{ \"id\" : \"" + unixtime +"\" , \"year\" : \""+currDate.getFullYear()+"\", \"month\": \""+(parseInt(currDate.getMonth()) +1) +"\", \"day\" :\""+currDate.getDate()+"\", \"title\" :\""+btoa($("#content_title").html())+"\", \"content\" :\""+$("#content_markdown").html()+"\"}";

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
	alert(id);
	for(var i in data){
		if(data[i].id == id){
			data[i].title = btoa($("#content_title").html());
			data[i].content = btoa($("#content_markdown").text());
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
	updateSelect();

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