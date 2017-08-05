$('document').ready(function() {

	var imgDivTransTime = 200;
	var navLinkTransTime = 200;
	var themeChangeTime = 500;
	var mainTheme = true;

	$('#categoryLink-nature').click(function() {
		$('.galleryLink:not(.galleryLink-nature)').hide(navLinkTransTime);
		$('.galleryLink-nature').toggle(navLinkTransTime);
	});
	$('#categoryLink-travel').click(function() {
		$('.galleryLink:not(.galleryLink-travel)').hide(navLinkTransTime);
		$('.galleryLink-travel').toggle(navLinkTransTime);
	});
	$('#categoryLink-commissions').click(function() {
		$('.galleryLink:not(.galleryLink-commissions)').hide(navLinkTransTime);
		$('.galleryLink-commissions').toggle(navLinkTransTime);
	});

	$('#navLinkHome').click(function() {
		$('.imgDiv:not(.imgDiv-home)').fadeOut(imgDivTransTime, function() {
			$('.imgDiv-home').fadeIn(imgDivTransTime);
		});
	});
	$('#navLinkFlowers').click(function() {
		$('.imgDiv:not(.imgDiv-flowers)').fadeOut(imgDivTransTime, function() {
			$('.imgDiv-flowers').fadeIn(imgDivTransTime);
		});
	});

	$('#flipBtn').click(function() {
		$(this).toggleClass('flipped');
		$('.bgDiv').toggleClass('blackTheme');
		if(mainTheme) {
			$('.navMain, .showMain').fadeOut(themeChangeTime);
			$('.navMusic, .showMusic').delay(themeChangeTime).fadeIn(themeChangeTime);
		} else {
			$('.navMusic, .showMusic').fadeOut(themeChangeTime);
			$('.navMain, .showMain').delay(themeChangeTime).fadeIn(themeChangeTime);
		}
		mainTheme = !mainTheme;
	});
});