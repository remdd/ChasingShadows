$(function() {

	var imgTime = 300;
	var navTime = 300;
	var themeChangeTime = 300;
	var mainTheme = true;

	$('#emailLinkIcon').tooltip();

	var musicTheme = ($('#allDiv').attr('data-maintheme') == 'false');
	if(musicTheme) {
		mainTheme = false;
		$('#mainAbout').hide();
		$('#musicAbout').hide();
		$('.instagramLink').attr('href', 'https://www.instagram.com/london_reflected/');
		$('.musicMiniNav').removeClass('invisible');
		$('#musicBigNav').removeClass('invisible').fadeIn(themeChangeTime);
		$('#coverImg').attr('src', 'img/CoverMusic.jpg');
		$('#coverImg').imagesLoaded(function() {
			$('#cover').removeClass('invisible').hide().fadeIn(themeChangeTime);
		});
		$('.flipBtn').toggleClass('flipped');
		$('body').toggleClass('blackTheme');
		$('i').toggleClass('whiteIcons');
		$('#closePopUp').toggleClass('whiteIcons');
	} else {
		$('#mainAbout').hide();
		$('#musicAbout').hide();
		$('.instagramLink').attr('href', 'https://www.instagram.com/chasing.light.and.shadows/');
		$('.mainMiniNav').removeClass('invisible');
		$('#mainBigNav').removeClass('invisible').fadeIn(themeChangeTime);
		$('#coverImg').attr('src', 'img/Cover.jpg');
		$('#coverImg').imagesLoaded(function() {
			$('#cover').removeClass('invisible').hide().fadeIn(themeChangeTime);
		});

	}

	$('.bigText').bigtext({maxfontsize: 40});
	$('.bigTextSm').bigtext({maxfontsize: 30, minfontsize: 18});

	$('.flipBtn').click(function() {
		$('.dropdown-toggle').dropdown('toggle');
		$('.picControls').fadeOut(imgTime);
		$('.flipBtn').css("pointer-events", "none");		// Disable further click events on click
		$('.flipBtn').toggleClass('flipped');
		$('.showDiv').each(function() {
			if($(this).hasClass('invisible')) {
				return;
			} else {
				$('body').toggleClass('blackTheme');
				$('i').toggleClass('whiteIcons');
				$('#closePopUp').toggleClass('whiteIcons');
				$(this).fadeOut(themeChangeTime,function() {
					$(this).hide().addClass('invisible');
					removeThumbnails();
					if(mainTheme) {
						$('#mainBigNav').fadeOut(themeChangeTime, function() {
							$('#mainBigNav').addClass('invisible');
							$('.instagramLink').attr('href', 'https://www.instagram.com/london_reflected/');
							$('.mainMiniNav').addClass('invisible');
							$('#coverImg').attr('src', 'img/CoverMusic.jpg');
							$('#coverImg').imagesLoaded(function() {
								$('#cover').removeClass('invisible').hide().fadeIn(themeChangeTime);
								$('#musicBigNav').removeClass('invisible');
								$('.musicMiniNav').removeClass('invisible');
								$(".flipBtn").css("pointer-events", "auto");		// Re-enable click events
							});
						});
					} else {
						$('#musicBigNav').fadeOut(themeChangeTime, function() {
							$('#musicBigNav').addClass('invisible');
							$('.instagramLink').attr('href', 'https://www.instagram.com/chasing.light.and.shadows/');
							$('.musicMiniNav').addClass('invisible');
							$('#coverImg').attr('src', 'img/Cover.jpg');
							$('#coverImg').imagesLoaded(function() {
								$('#cover').removeClass('invisible').hide().fadeIn(themeChangeTime);
								$('#mainBigNav').removeClass('invisible');
								$('.mainMiniNav').removeClass('invisible');
								$(".flipBtn").css("pointer-events", "auto");		// Re-enable click events
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
				$imgDiv.append('<img class="thumbImg 3thumbImg" src="img/' + galName + '/Thumbs/' + name + '.jpg">');
			} else {
				$imgDiv.append('<img class="thumbImg 4thumbImg" src="img/' + galName + '/Thumbs/' + name + '.jpg">');
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
				$('#zoomImg').attr('src', 'img/' + galName + '/' + name + '.jpg');
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
			$('#zoomImg').attr('src', 'img/' + galName + '/' + galName + '_' + imgNo + '.jpg');
			$('#zoomImg').attr('data-imgNo', imgNo);
			$('#showZoomImg').imagesLoaded(function() {
				$('#showZoomImg').fadeIn(imgTime, function() {
					$("#prevBtn").css("pointer-events", "auto");
				});
			})
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
			$('#zoomImg').attr('src', 'img/' + galName + '/' + galName + '_' + imgNo + '.jpg');
			$('#zoomImg').attr('data-imgNo', imgNo);
			$('#showZoomImg').imagesLoaded(function() {
				$('#showZoomImg').fadeIn(imgTime, function() {
					$("#nextBtn").css("pointer-events", "auto");
				});
			})
		});
	});


	$('.logoMain').click(function() {
		if($('#cover').is(':visible')) {
			return;
		}
		$('.showDiv').each(function() {
			if($(this).is(':visible')) {
				$(this).fadeOut(function() {
					$(this).addClass('invisible');
					$('.picControls').fadeOut(imgTime);
					removeThumbnails();
					if(mainTheme) {
						$('#cover').removeClass('invisible').hide().fadeIn(themeChangeTime);
					} else {
						$('#cover').removeClass('invisible').hide().fadeIn(themeChangeTime);
					}
				});
			}
		});
	});

	$('.aboutLink').click(function() {
		console.log('click');
		if(($('#mainAbout').is(':visible')) || $('#musicAbout').is(':visible')) {
			return;
		}
		$('.showDiv').each(function() {
			if($(this).is(':visible')) {
				$(this).fadeOut(function() {
					$(this).addClass('invisible');
					$('.picControls').fadeOut(imgTime);
					removeThumbnails();
					if(mainTheme) {
						$('#mainAbout').removeClass('invisible').hide().fadeIn(imgTime);
					} else {
						$('#musicAbout').removeClass('invisible').hide().fadeIn(imgTime);
					}
				});
			}
		});		
	})

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