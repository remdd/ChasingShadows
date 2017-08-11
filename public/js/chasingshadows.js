$(function() {

	var imgTime = 300;
	var navTime = 200;
	var themeChangeTime = 200;
	var mainTheme = true;

	$('.bigText').bigtext({maxfontsize: 40});
	$('.bigTextSm').bigtext({maxfontsize: 30, minfontsize: 18});

	$('.flipBtn').click(function() {
		$('.picControls').fadeOut(imgTime);
		$(".flipBtn").css("pointer-events", "none");		// Disable further click events on click
		$('.flipBtn').toggleClass('flipped');
		$('body').toggleClass('blackTheme');
		$('i').toggleClass('whiteIcons');
		$('.showDiv').each(function() {
			if($(this).hasClass('invisible')) {
				return;
			} else {
				$(this).fadeOut(function(themeChangeTime) {
					$(this).addClass('invisible');
					removeThumbnails();
					if(mainTheme) {
						$.when($('.mainNav').fadeOut(themeChangeTime)).then(function() {
							$('.mainNav').addClass('invisible');
							$('.musicNav').removeClass('invisible').hide().fadeIn(themeChangeTime);
							$('.bigText').bigtext({maxfontsize: 40});
							$('#musicCover').removeClass('invisible').hide().fadeIn(themeChangeTime, function() {
								$(".flipBtn").css("pointer-events", "auto");		// Re-enable click events
							});
						});
					} else {
						$.when($('.musicNav').fadeOut(themeChangeTime)).then(function() {
							$('.musicNav').addClass('invisible');
							$('.mainNav').removeClass('invisible').hide().fadeIn(themeChangeTime);
							$('#showCover').removeClass('invisible').hide().fadeIn(themeChangeTime, function() {
								$(".flipBtn").css("pointer-events", "auto");
							});
						});
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
		$('.picControls').fadeOut(imgTime);
		var galCount = $(this).attr('data-pics');
		var galName = $(this).attr('data-gallery');
		var galClass = $(this).attr('data-thumbClass');
		$('.showDiv').each(function() {
			if($(this).is(':visible')) {
				$(this).fadeOut(function() {
					$(this).addClass('invisible');
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
				$('#showThumbnails').addClass('invisible');
				$('#zoomImg').attr('data-galName', galName);
				$('#zoomImg').attr('data-imgNo', imgNo);
				$('#zoomImg').attr('data-galCount', galCount);
				$('#zoomImg').attr('src', 'img/' + galName + '/' + name + '.JPG');
				$('#showZoomImg').imagesLoaded(function() {
					$('#showZoomImg').removeClass('invisible').hide().fadeIn(imgTime);
					$('.picControls').fadeIn(imgTime);
				});
			});
		});
		$('#showThumbnails').imagesLoaded(function() {
			$('#showThumbnails').removeClass('invisible').hide().fadeIn(imgTime);
			resizeThumbs();
			$grid.masonry();
		});
	};

	/*	Popup image controls 	*/
	$('#closePopUp').click(function() {
		$('.picControls').fadeOut(imgTime);
		$('#showZoomImg').fadeOut(imgTime, function() {
			$('#showZoomImg').addClass('invisible');
			$('#showThumbnails').removeClass('invisible').hide().fadeIn(imgTime);
		});
	});
	$('#prevBtn').click(function() {
		$("#prevBtn").css("pointer-events", "none");
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
		$('#showZoomImg').fadeIn(imgTime, function() {
			$("#prevBtn").css("pointer-events", "auto");
		});
	});
	$('#nextBtn').click(function() {
		$("#nextBtn").css("pointer-events", "none");
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
		$('#showZoomImg').fadeIn(imgTime, function() {
			$("#nextBtn").css("pointer-events", "auto");
		});
	});


	$('.logoMain').click(function() {
		if(($('#showCover').is(':visible')) || $('#musicCover').is(':visible')) {
			return;
		}
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

	function resizeThumbs() {
		if ($(window).width() > 767) {
	        $('.thumbImg').removeClass('bigThumbImg');
	        $('.thumbImg').addClass('smallThumbImg');
	    } else {
	        $('.thumbImg').removeClass('smallThumbImg');
	        $('.thumbImg').addClass('bigThumbImg');
	    }
		$grid.masonry();
	};

	$(window).resize(function() {
		console.log($(window).width());
		resizeThumbs();
	});

	$('#musicCover').addClass('invisible');

});