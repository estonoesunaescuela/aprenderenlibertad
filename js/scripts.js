$(document).ready(readyFunction);

function readyFunction(){
	$("#book-image").on('click', toggleBook);
	$("#condiciones-link").on('click', showConditions);
	$("#privacidad-link").on('click', showPrivacity);
	$("#signup-button").on('click', showSignup);
}

function toggleBook(){
    $("#main-page").toggleClass("hidden");
    $("#book-page").toggleClass("hidden");
}

function showConditions(){
	$("#main-page").addClass("hidden");
	$("#book-page").addClass("hidden");
	$("#condiciones").removeClass("hidden");
	$("#privacidad").addClass("hidden");
}

function showPrivacity(){
	$("#main-page").addClass("hidden");
	$("#book-page").addClass("hidden");
	$("#condiciones").addClass("hidden");
	$("#privacidad").removeClass("hidden");
}

function showSignup(){
	$("#main-page").addClass("hidden");
	$("#book-page").addClass("hidden");
	$("#condiciones").addClass("hidden");
	$("#signup-form").removeClass("hidden");
}

var handler = StripeCheckout.configure({
    key: 'pk_live_uWo17rHYl0BXyyKmoMtHM3aS',
    //***************************************************************IMPORTANT!!!!!!!------CHECK IMAGE STORAGE AND PARAMETERS FOR CHECKOUT**********
    image: 'img/anagrama_peq_color_whitebckgrnd_small.png',
    locale: 'auto',
    currency: "EUR",
    panelLabel: "Dona €25",
    allowRememberMe: "false",
    token: function(token, args) {
        window.perkTokenBeenCalled = true;
        var redirectDomain = "https://script.google.com/macros/s/AKfycbywnXbEp_nIPvClMVyEgw_YK_IhHgqnAs9-N-sYVjufx1jPCLw/exec";
        var Query = "stripeEmail=" + token.email + "&stripeToken=" + token.id + "&amount=" + 2500 + "&itemID=" + "PERK20" + "&beenShared=" + "false" + "&libro=" + "false" + "&curso=" + "false" + "&islive=" + token.livemode;
        var eQuery = window.btoa(unescape(encodeURIComponent(Query)));
        var Query = {
            e: eQuery
        };
        var request = $.ajax({
            type: 'get',
            url: redirectDomain,
            jsonpCallback: 'callback',
            contentType: "application/json",
            dataType: 'jsonp',
            data: Query
        });
        request.done(function(resultJson) {
            var date = new Date();
            var n = date.toLocaleDateString();
            var t = date.toLocaleTimeString();
            var now = "El día " + n + " a las " + t;
            beenHacked = resultJson.beenHacked;
            if (beenHacked) {
                $("#" + window.containerID).find(".divPerkResponse").html("Se ha producido un error en el servidor. Inténtelo más tarde.");
            } else {
                var amountR = resultJson.amount / 100;
                var last4 = resultJson.last4;
                var eMail = resultJson.eMail;
                var localizer = resultJson.localizer;
                $("#" + window.containerID).find(".perkAmountShow").html(amountR);
                $("#" + window.containerID).find(".perkUlt4Show").html(last4);
                $("#" + window.containerID).find(".perkEmailShow").html(eMail);
                $("#" + window.containerID).find(".perkLocalizerShow").html(localizer);
                $("#" + window.containerID).find(".perkDate").html(now);
            }
        });
    }
});