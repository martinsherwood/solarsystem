$(function(control) {
	var body = $("body"),
		universe = $("#universe"),
		solarsys = $("#solar-system");
    
    $(".hide-ui").click(function() {
		$(".ui").toggleClass("ui-is-hidden");
	});
    
    $("h1.overview").click(function(e) {
        e.preventDefault();
        $(".solar-system-info").toggleClass("solar-system-info-shown");
	});
	
	$("#data a").click(function(e) {
		var ref = $(this).attr("class");
		solarsys.removeClass().addClass(ref);
		$(this).parent().find("a").removeClass("active");
		$(this).addClass("active");
		e.preventDefault();
	});
	
	$(".show-distance").click(function () {
		$("#universe").removeClass("set-speed");
		$("#universe").removeClass("set-size");
		$("#universe").addClass("set-distance");
	});
	
	$(".show-speed").click(function () {
		$("#universe").removeClass("set-distance");
		$("#universe").removeClass("set-size");
		$("#universe").addClass("set-speed");
	});
	
	$(".show-size").click(function () {
		$("#universe").removeClass("set-distance");
		$("#universe").removeClass("set-speed");
		$("#universe").addClass("set-size");
	});
});


$(function(infoModals) {
	var talk = new SpeechSynthesisUtterance(),
		voices = window.speechSynthesis.getVoices();
	
	talk.voice = voices[10]; //some voices don't support altering params
	talk.voiceURI = "native";
	//talk.volume = 1; //0 to 1
	//talk.rate = 1; //0.1 to 10
	//talk.pitch = 2; //0 to 2
	talk.lang = "en-gb";
	
	$(".help").click(function() {
		var self = $(this);
		$(".help-pane").toggleClass("help-pane-shown");
	});
	
	$("#close-help").click(function() {
		$(".help-pane").removeClass("help-pane-shown");
	});
	
	//information panels
	$(".planet-select a").dblclick(function() {
		var self = $(this);
		$(".mask").addClass("active");
		$(".modal .content h1").text(self.data("planet"));
		$(".modal .content p").text(self.data("info"));
		$(".modal .content .gravity").text(self.data("gravity"));
		$(".modal .content .temperature").text(self.data("temperature"));
		$(".modal .content .composition").text(self.data("composition"));
	});
	
	$(".speak").on("click", function(){
		talk.text = $(".modal .content p").text();
		speechSynthesis.speak(talk);
	});
	
	function closeModal() {
		speechSynthesis.cancel();
		$(".mask").removeClass("active");
	}
	
	//close modal on the clicks/keyboard
	$(".close, .mask").on("click", function(){
		closeModal();
	});
	
	//close of escape key
	$(document).keyup(function(e) {
		if (e.keyCode == 27) {
			closeModal();
		}
	});
});