$(function() {

	var imgTime = 300;
	var navTime = 200;
	var themeChangeTime = 500;
	var mainTheme = true;

	$('.bigText').bigtext({maxfontsize: 40});

	$('#flipBtn').click(function() {
		$(this).toggleClass('flipped');
		$('body').toggleClass('blackTheme');
		$('i').toggleClass('whiteIcons');
		$('.showDiv').each(function() {
			if($(this).is(':visible')) {
				$(this).fadeOut(function() {
					removeThumbnails();
					if(mainTheme) {
						$('#musicNav').fadeIn(themeChangeTime);
						$('#mainNav').fadeOut(themeChangeTime);
						$('#musicCover').fadeIn(themeChangeTime);
						$('.bigText').bigtext({maxfontsize: 40});
					} else {
						$('#mainNav').fadeIn(themeChangeTime);
						$('#musicNav').fadeOut(themeChangeTime);
						$('#showCover').fadeIn(themeChangeTime);
					}
					mainTheme = !mainTheme;
				});
			}
		});
	});

	var $grid = $('#showThumbnails').masonry({
		columnWidth: '.thumbImg',
		itemSelector: '.thumbImg'
	});


	//	Show contained galleries when a category title is clicked, hide contents of other categories
	$('.categoryLink').click(function(e) {
		if(e.target !== this) {return;}
		$('.galLink').not($(this).parent().find('li')).hide();
		$(this).parent().find('li').toggle(navTime);
	});

	//	Hide any previous displayed image or thumbnails then show correct thumbnails when a gallery name is clicked
	$('.galLinkMain').click(function() {
		var galCount = $(this).attr('data-pics');
		var galName = $(this).attr('data-gallery');
		var galClass = $(this).attr('data-thumbClass');
		$('.showDiv').each(function() {
			if($(this).is(':visible')) {
				$(this).fadeOut(function() {
					removeThumbnails();
					addThumbnails(galName, galClass, galCount);
				});
			}
		});
	});

	removeThumbnails = function() {
		$('#showThumbnails').children().remove();
	}


	addThumbnails = function(galName, galClass, galCount) {
		for(var i = 1; i <= galCount; i ++) {
			var name = galName + '_' + i;
			var $imgDiv = $('#showThumbnails');
			$imgDiv.append('<img class="thumbImg" src="img/' + galName + '/Thumbs/' + name + '.JPG">');
			var $img = $imgDiv.children().last();
			$img.attr('data-name', name);
			$img.attr('data-galName', galName);
			$img.addClass(galClass);
			$img.attr('data-galCount', galCount);
			$img.attr('data-imgNo', i);
			$img.attr('data-name', name);
			$grid.masonry( 'addItems', $img );
		}
		$('.thumbImg').click(function() {
			var galName = $(this).attr('data-galName');
			var name = $(this).attr('data-name');
			var imgNo = $(this).attr('data-imgNo');
			var galCount = $(this).attr('data-galCount');
			$('#showThumbnails').fadeOut(imgTime, function() {
				$('#zoomImg').attr('data-galName', galName);
				$('#zoomImg').attr('data-imgNo', imgNo);
				$('#zoomImg').attr('data-galCount', galCount);
				$('#zoomImg').attr('src', 'img/' + galName + '/' + name + '.JPG');
				$('#showZoomImg').imagesLoaded(function() {
					$('#showZoomImg').fadeIn(imgTime);
					$('.picControls').fadeIn(imgTime);
				});
			});
		});
		$('#showThumbnails').imagesLoaded(function() {
			$('#showThumbnails').fadeIn(imgTime);
			$grid.masonry();
		});
	};

	/*	Popup image controls 	*/
	$('#closePopUp').click(function() {
		$('.picControls').fadeOut(imgTime);
		$('#showZoomImg').fadeOut(imgTime, function() {
			$('#showThumbnails').fadeIn(imgTime);
		});
	});
	$('#prevBtn').click(function() {
		var galName = $('#zoomImg').attr('data-galName');
		var imgNo = parseInt($('#zoomImg').attr('data-imgNo'));
		var galCount = parseInt($('#zoomImg').attr('data-galCount'));
		if(imgNo === 1) {
			imgNo = galCount;
		} else {
			imgNo--;
		}
		$('#showZoomImg').fadeOut(imgTime, function() {
			$('#zoomImg').attr('src', 'img/' + galName + '/' + galName + '_' + imgNo + '.JPG');
			$('#zoomImg').attr('data-imgNo', imgNo);
		});
		$('#showZoomImg').fadeIn(imgTime);
	});
	$('#nextBtn').click(function() {
		var galName = $('#zoomImg').attr('data-galName');
		var imgNo = parseInt($('#zoomImg').attr('data-imgNo'));
		var galCount = parseInt($('#zoomImg').attr('data-galCount'));
		if(imgNo === galCount) {
			imgNo = 1;
		} else {
			imgNo++;
		}
		$('#showZoomImg').fadeOut(imgTime, function() {
			$('#zoomImg').attr('src', 'img/' + galName + '/' + galName + '_' + imgNo + '.JPG');
			$('#zoomImg').attr('data-imgNo', imgNo);
		});
		$('#showZoomImg').fadeIn(imgTime);
	});


	$('.logoMain').click(function() {
		$('.showDiv').each(function() {
			if($(this).is(':visible')) {
				$(this).fadeOut(function() {
					$('.picControls').fadeOut(imgTime);
					removeThumbnails();
					if(mainTheme) {
						$('#showCover').fadeIn(imgTime);
					} else {
						$('#musicCover').fadeIn(imgTime);
					}
				});
			}
		});
	});

});