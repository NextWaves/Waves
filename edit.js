
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

currDate=new Date();
var markdown=""
$("#content_date").html(currDate.getFullYear() +"-"+ (parseInt(currDate.getMonth()) +1) +"-"+ currDate.getDate() );



$("#content_title").click(
	function (){
		prev=$(this).html();
		if(prev.indexOf("title_input") > -1)
			return;

		$(this).html("<input class='title_input' id='title_input' type='text' value='"+prev+"'>");
	}
);

$("#content_title").mouseleave(
			function(){
				if (typeof( $("#title_input").val() ) != 'undefined'){
					if($("#title_input").val()=="")
						$("#content_title").html("Enter Title");
					else
						$("#content_title").html($("#title_input").val());

				}
					
			}
		);




$("#content_text").click(
	function (){
		prev=$(this).html();
		if(prev.indexOf("text_input") > -1)
			return;
		
		$(this).html("<span style='float:right'>Markdown Editor</span><br><textarea class='text_input' id='text_input' type='text' >" +markdown+"</textarea>");

	}
);


$("#content_text").mouseleave(
			function(){
			
				if (typeof( $("#text_input").val() ) != 'undefined'){
					//$("#content_text").html($("#text_input").val());
					markdown=$("#text_input").val();
					marked($("#text_input").val(),function(err, content){
							if(markdown.trim()==""){
								content="Edit Contents";
							}
							$("#content_text").html(content);

					});

				}
					

			}
		);

function generate(){
	currDate=new Date();
	newdata = "{ \"year\" : \""+currDate.getFullYear()+"\", \"month\": \""+(parseInt(currDate.getMonth()) +1) +"\", \"day\" :\""+currDate.getDate()+"\", \"title\" :\""+btoa($("#content_title").html())+"\", \"content\" :\""+btoa($("#content_text").html())+"\"}";

	ndata=JSON.parse(newdata);
	data.unshift(ndata);
	datastr=JSON.stringify(data);
	datastr=datastr.replace(/"/g,"\\\"");
	datastr= "database=\"" + datastr + "\";";
	enc=btoa(datastr);
	$("#download").attr("href", "data:application/octet-stream;charset=utf-8;base64,"+enc);

}