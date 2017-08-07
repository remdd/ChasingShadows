$('document').ready(function() {

	var imgDivTransTime = 200;
	var navLinkTransTime = 200;
	var themeChangeTime = 500;
	var mainTheme = true;

	var galCount;
	var galName;
	var galClass;

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
		$('.galLink').not($(this).parent().find('li')).hide(navLinkTransTime);
	});

	$('.galLinkMain').click(function() {
		galCount = $(this).attr('data-pics');
		galName = $(this).attr('data-gallery');
		galClass = $(this).attr('data-thumbClass');
		if($('#coverImgMain').is(':visible')) {
			$('#coverImgMain').fadeOut(imgDivTransTime, function() {
				removeThumbnails();
				addThumbnails();
				$('#galDivMain').fadeIn(imgDivTransTime);
			});			

		} else {
			$('#galDivMain').fadeOut(imgDivTransTime, function() {
				removeThumbnails();
				addThumbnails();
				$('#galDivMain').fadeIn(imgDivTransTime);
			});
		}
	});

	removeThumbnails = function() {
		$('#thumbsMain').children().remove();
		$('#thumbsMain').append('<div> </div>');
	}

	addThumbnails = function() {
		for(var i = 1; i <= galCount; i ++) {
			var name = galName + '_' + i;
			if(galClass === 'thumbRichmond') {
				if(i === 1 || i === 5 || i === 8 || i === 12) {
					$('#thumbsMain').append('<div class="col col-lg-3 col-md-4 col-sm-6 col-xs-12"></div>');
				}
				$('#thumbsMain').children().last().append('<img class="thumbImg ' + galClass 
					+ '" data-name="' + name + '" '
					+ '" data-gal="' + galName + '" ' 
					+ '" data-galCount="' + galCount + '" '
					+ '" data-imgNo="' + i + '"'
					+ ' src="img/' + galName + '/Thumbs/' + name + '.JPG"></div>');
			} else {
				$('#thumbsMain').append('<div class="col col-lg-3 col-md-4 col-sm-6 col-xs-12"></div>');
				$('#thumbsMain').children().last().append('<img class="thumbImg ' + galClass 
					+ '" data-name="' + name + '" ' 
					+ '" data-gal="' + galName + '" ' 
					+ '" data-galCount="' + galCount + '" '
					+ '" data-imgNo="' + i + '"'
					+ ' src="img/' + galName + '/Thumbs/' + name + '.JPG"></div>');
			}
		}
		$('.thumbImg').click(function() {
			var gal = $(this).attr('data-gal');
			var name = $(this).attr('data-name');
			var imgNo = $(this).attr('data-imgNo');
			var galCount = $(this).attr('data-galCount');
			$('#popUpImgMain').attr('src', 'img/' + gal + '/' + name + '.JPG');
			$('#popUpImgMain').attr('data-gal', gal);
			$('#popUpImgMain').attr('data-imgNo', gal);
			$('#thumbsMain').fadeOut(imgDivTransTime, function() {
				$('#popUpMain').fadeIn(imgDivTransTime);
			});
		});
	};

	$('#closePopUpMain').click(function() {
		$('#popUpMain').fadeOut(imgDivTransTime, function() {
			$('#thumbsMain').fadeIn(imgDivTransTime);
		});
	});
	$('#prevBtnMain').click(function() {
		var gal = $('#popUpImgMain').attr('data-gal');
		var no = parseInt($('#popUpImgMain').attr('data-imgNo'));
		var galCount = parseInt($('#popUpImgMain').attr('data-galCount'));
		alert(gal + no + galCount);
		if(no === 1) {
			no = galCount;
		} else {
			no--;
		}
		$('#popUpImgMain').fadeOut(imgDivTransTime, function() {
			$('#popUpImgMain').attr('src', 'img/' + gal + '/' + gal + '_' + no + '.JPG');
			$('#popUpImgMain').fadeIn(imgDivTransTime);
		});
	});


	$('.logoMain').click(function() {
		if($('#coverImgMain').is(':visible')) {
			return;
		} else {
			$('#galDivMain').fadeOut(imgDivTransTime, function() {
				$('#coverImgMain').fadeIn(imgDivTransTime);
			});
		}
	})
});