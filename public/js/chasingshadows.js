$(function() {

	var imgTime = 300;
	var navTime = 200;
	var themeChangeTime = 200;
	var mainTheme = true;

	var musicTheme = ($('#allDiv').attr('data-maintheme') == 'false');
	if(musicTheme) {
		mainTheme = false;
		$('.musicMiniNav').removeClass('notShown');
		$('.musicNav').removeClass('invisible').hide().fadeIn(themeChangeTime);
		$('#musicCover').removeClass('invisible').hide();
		$('#musicCover').imagesLoaded(function() {
			$('#musicCover').fadeIn(themeChangeTime);
		});
		$('.flipBtn').toggleClass('flipped');
		$('body').toggleClass('blackTheme');
		$('i').toggleClass('whiteIcons');
		$('#closePopUp').toggleClass('whiteIcons');
	} else {
		$('.mainMiniNav').removeClass('notShown');
		$('.mainNav').removeClass('invisible').hide().fadeIn(themeChangeTime);
		$('#mainCover').removeClass('invisible').hide();
		$('#mainCover').imagesLoaded(function() {
			$('#mainCover').fadeIn(themeChangeTime);
		});
	}

	$('.bigText').bigtext({maxfontsize: 40});
	$('.bigTextSm').bigtext({maxfontsize: 30, minfontsize: 18});

	$('.flipBtn').click(function() {
		$('.dropdown-toggle').dropdown('toggle');
		$('.picControls').fadeOut(imgTime);
		$(".flipBtn").css("pointer-events", "none");		// Disable further click events on click
		$('.flipBtn').toggleClass('flipped');
		$('body').toggleClass('blackTheme');
		$('i').toggleClass('whiteIcons');
		$('#closePopUp').toggleClass('whiteIcons');
		$('.showDiv').each(function() {
			if($(this).hasClass('invisible')) {
				return;
			} else {
				$(this).fadeOut(function(themeChangeTime) {
					$(this).addClass('invisible');
					removeThumbnails();
					if(mainTheme) {
						$.when($('.mainNav').fadeOut(themeChangeTime)).then(function() {
							$('.mainMiniNav').addClass('notShown');
							$('.musicMiniNav').removeClass('notShown');
							$('.mainNav').addClass('invisible');
							$('.musicNav').removeClass('invisible').hide().fadeIn(themeChangeTime);
							$('#musicCover').removeClass('invisible').hide();
							$('#musicCover').imagesLoaded(function() {
								$('#musicCover').fadeIn(themeChangeTime, function() {
									$(".flipBtn").css("pointer-events", "auto");		// Re-enable click events
								});
							});
						});
					} else {
						$.when($('.musicNav').fadeOut(themeChangeTime)).then(function() {
							$('.musicMiniNav').addClass('notShown');
							$('.mainMiniNav').removeClass('notShown');
							$('.musicNav').addClass('invisible');
							$('.mainNav').removeClass('invisible').hide().fadeIn(themeChangeTime);
							$('#mainCover').removeClass('invisible').hide();
							$('#mainCover').imagesLoaded(function() {
								$('#mainCover').fadeIn(themeChangeTime, function() {
									$(".flipBtn").css("pointer-events", "auto");		// Re-enable click events
								});
							});
						});
					}
					mainTheme = !mainTheme;
					$('.bigText').bigtext({maxfontsize: 40});
				});
			}
		});
	});

	var $grid = $('#showThumbnails').masonry({
		columnWidth: '.thumbImg',
		singleMode: true,
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
		$('.dropdown-toggle').dropdown('toggle');
		var galCount = $(this).attr('data-pics');
		var galName = $(this).attr('data-gallery');
		var galClass = $(this).attr('data-thumbClass');
		var galCol = $(this).attr('data-galCol');
		$('.showDiv').each(function() {
			if($(this).is(':visible')) {
				$(this).fadeOut(function() {
					$(this).addClass('invisible');
					removeThumbnails();
					addThumbnails(galName, galClass, galCount, galCol);
				});
			}
		});
	});

	removeThumbnails = function() {
		$('#showThumbnails').children().remove();
	}


	addThumbnails = function(galName, galClass, galCount, galCol) {
		console.log(galCol);
		console.log(galCount);
		for(var i = 1; i <= galCount; i ++) {
			var name = galName + '_' + i;
			var $imgDiv = $('#showThumbnails');
			if(galCol == 3) {
				$imgDiv.append('<img class="thumbImg 3thumbImg" src="img/' + galName + '/Thumbs/' + name + '.JPG">');
			} else {
				$imgDiv.append('<img class="thumbImg 4thumbImg" src="img/' + galName + '/Thumbs/' + name + '.JPG">');
			}
			var $img = $imgDiv.children().last();
			$img.attr('data-name', name);
			$img.attr('data-galName', galName);
			$img.addClass(galClass);
			$img.attr('data-galCount', galCount);
			$img.attr('data-imgNo', i);
			$img.attr('data-name', name);
			$grid.masonry( 'addItems', $img );
		}
		$('.thumbImg, .3thumbImg').click(function() {
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
		if(($('#mainCover').is(':visible')) || $('#musicCover').is(':visible')) {
			return;
		}
		$('.showDiv').each(function() {
			if($(this).is(':visible')) {
				$(this).fadeOut(function() {
					$('.picControls').fadeOut(imgTime);
					removeThumbnails();
					if(mainTheme) {
						$('#mainCover').fadeIn(imgTime);
					} else {
						$('#musicCover').fadeIn(imgTime);
					}
				});
			}
		});
	});

	function resizeThumbs() {
		if ($(window).width() > 767) {
	        $('.4thumbImg').removeClass('big4ThumbImg');
	        $('.4thumbImg').addClass('small4ThumbImg');
	        $('.3thumbImg').removeClass('big3ThumbImg');
	        $('.3thumbImg').addClass('small3ThumbImg');
	    } else {
	        $('.4thumbImg').removeClass('small4ThumbImg');
	        $('.4thumbImg').addClass('big4ThumbImg');
	        $('.3thumbImg').removeClass('small3ThumbImg');
	        $('.3thumbImg').addClass('big3ThumbImg');
	    }
		$grid.masonry();
	};

	$(window).resize(function() {
		resizeThumbs();
	});

});