$('document').ready(function() {

	var imgDivTransTime = 200;
	var navLinkTransTime = 200;
	var themeChangeTime = 500;
	var mainTheme = true;


	$('#flipBtn').click(function() {
		$(this).toggleClass('flipped');
		$('.bgDiv').toggleClass('blackTheme');
		if(mainTheme) {
			$('.contentMain').fadeOut(themeChangeTime, function(){
				$('.contentMusic').fadeIn(themeChangeTime);
				$('i').addClass('flippedIcon');
			});
		} else {
			$('.contentMusic').fadeOut(themeChangeTime, function(){
				$('.contentMain').fadeIn(themeChangeTime);
				$('i').removeClass('flippedIcon');
			});
		}
		mainTheme = !mainTheme;
	});

	$('.categoryLink').click(function(e) {
		if(e.target !== this) {return;}
		$(this).parent().find('li').toggle(navLinkTransTime);
		$('.galleryLink').not($(this).parent().find('li')).hide(navLinkTransTime);
	});

	$('.galleryLink').click(function() {
		var galCount = $(this).attr('data-pics');
		var galName = $(this).attr('data-gallery');
		var galClass = $(this).attr('data-thumbClass');
		$('.coverImg').fadeOut(imgDivTransTime);
		if($('#galleryDiv').is(':visible')) {
			$('#galleryDiv').fadeOut(imgDivTransTime);
		}
		$('#thumbs').children().delay(imgDivTransTime).remove();

		window.setTimeout(function() {
			for(var i = 1; i <= galCount; i ++) {
				if(galClass === 'thumbRichmond') {
					if(i === 1 || i === 5 || i === 8 || i === 12) {
						$('#thumbs').append('<div class="col col-lg-3 col-md-4 col-sm-6 col-xs-12"></div>');
					}
					var name = galName + '_' + i;
					$('#thumbs').children().last().append('<img class="thumbImg ' + galClass + '" data-name=' + galName + ' src="img/' + galName + '/Thumbs/' + name + '.JPG"></div>');
				} else {
					$('#thumbs').append('<div class="col col-lg-3 col-md-4 col-sm-6 col-xs-12"></div>');
					$('#thumbs').children().last().append('<img class="thumbImg ' + galClass + '" src="img/' + galName + '/Thumbs/' + galName + '_' + i + '.JPG"></div>');
				}
			}
			$('#galleryDiv').ready(function() {
				$('#galleryDiv').fadeIn(imgDivTransTime);
			});
		}, imgDivTransTime);
	});



	$('.logo').click(function() {
		$('.coverImg').fadeIn(imgDivTransTime);
	})
});