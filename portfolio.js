

function toggleOverlay(){
    
    
    document.getElementById("overlay").style.opacity = "0";
    document.getElementById("overlay").classList.toggle("slideUp");
}

$(document).ready(function(){
    $("#overlayButton").click(function(){
        $("#overlay").slideUp()
                       
    
    });
});