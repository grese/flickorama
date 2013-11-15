// ==UserScript==
// @name        Flickr Panorama
// @namespace   flickrPanorama
// @include     *
// @version     1
// @resource    http://jmgdesignlabcloud.com/cdn/canvorama/ddpanorama.css
// @require     http://codeorigin.jquery.com/jquery-1.10.2.min.js
// @require     http://jmgdesignlabcloud.com/cdn/canvorama/jquery.ba-outside-events.min.js
// @require     http://jmgdesignlabcloud.com/cdn/canvorama/ddpanorama.min.js
// @grant none
// ==/UserScript==
$(window).load(function(){

enablePanoramaMode();

var olayct = 0;
var imgContainers = $('#lightbox ul.positions').find('div.img-wrap').each(function(){
    var elm = this;
    var elmID = $(elm).attr('id');
    var elmOverlay = $('<div/>', { id: 'ynots-panorama-overlay-'+(olayct++)});
    $(elmOverlay).css({
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        zIndex: 10000
    });
    
    var origImg = $(elm).find('img');
    imgSrc = origImg.attr('src');
    var imgHeight = $(origImg).css('height');
    var imgWidth = $(origImg).css('width');
    var imgID = 'ynots-panorama-overlay-img-' + olayct++;
    var panoImg = $('<img/>', {src: imgSrc, width: imgWidth, height: imgHeight, id: imgID });
    $(elmOverlay).append(panoImg);
    $(elm).append(elmOverlay);
    
    $('#'+imgID).ddpanorama({ratio: 9/16})
                   .bind("ddinit", function(event){
						 //This event is called when the panorama is initialized
						 //event.canvas contains the canvas element
						 panoramaCanvas=event.canvas;
						 })
				   .bind("ddresize", function(event){
						 //This event is called when the panorama size is updated
						 //event.canvas contains the canvas element
						 })
				   .bind("ddredraw", function(event){
						 //This event is called when the panorama size is updated
						 //event.canvas contains the canvas element
						 //event.scrollX contains the scroll position
						 //event.speed contains the speed (px/sec)
						 //event.loaded contains the boolean flag which indicates whether the image is loaded or not
						 console.log(event.type+["canvas","loaded","scrollX","speed"]);
						  })
				   .bind("ddstartmove", function(event){
						 //This event is called when the panorama size is updated
						 //event.canvas contains the canvas element
						 //event.scrollX contains the scroll position
						 console.log(event.type+["canvas", "scrollX"]);
						 })
				   .bind("ddstopmove", function(event){
						 //This event is called when the panorama size is updated
						 //event.canvas contains the canvas element
						 //event.scrollX contains the scroll position
						 console.log(event.type+["canvas", "scrollX"]);
						 })
				   .bind("ddmousedown", function(event){
						 //This event is called when the panorama size is updated
						 //event.canvas contains the canvas element
						 //event.scrollX contains the scroll position
						 console.log(event.type+["canvas", "scrollX"]);
						 })
				   .bind("ddmouseup", function(event){
						 //This event is called when the panorama size is updated
						 //event.canvas contains the canvas element
						 //event.scrollX contains the scroll position
						 console.log(event.type+["canvas", "scrollX"]);
						 });
    
});

function disablePanoramaMode(){
    $('#lightbox .bd ul li').find('*').off();
    $('#lightbox .ft .bottom-controls').show();
}
function enablePanoramaMode(){
    $('#lightbox .bd ul li').find('*').on('click', function(){ return false; });
    $('#lightbox .ft .bottom-controls').hide();
}

});
