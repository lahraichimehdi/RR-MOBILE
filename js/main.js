$(function () {

  console.clear();

  $(".rr__container .rr__promo input").focus(function () {
    $(this).attr('placeholder', ' ');

  });

  // jQuery(".rr__button_cta").click(function(event) {
  //     event.preventDefault();
  // });

  jQuery('body').on('click', '.rr__button_cta', function (e) {
    e.preventDefault();
    jQuery('.rr__container').toggleClass("open");
    jQuery('.rr__container_close span').toggleClass("open");
  });

  jQuery("body").on("click", ".rr__container_close", function (e) {
    e.preventDefault();
    jQuery('.rr__container').toggleClass("open");
    jQuery('.rr__container_close span').toggleClass("open");
  });

  jQuery(document).keyup(function (e) {
    if (e.which == 27) {
      jQuery('.rr__container').removeClass("open");
      jQuery('.rr__container_close span').removeClass("open");
    }

  });

  jQuery("#rr__calender").dateRangePicker({
    language: 'en',
    inline: true,
    container: '#rr__calender',
    alwaysOpen: true,
    stickyMonths: true,
    hoveringTooltip: false,
    format: 'DD.MM.YYYY',
    startDate: new Date(),
  }).bind('datepicker-first-date-selected', function (event, obj) {

  });



  jQuery(".date-picker-wrapper .month-wrapper table .day.toMonth.valid").click(function () {
    var num_of_nights = jQuery(".selected-days-num").text();
    var result = num_of_nights - 1;
    // console.log(result);
    jQuery(".rr__infos_night .rr__infos--info").html(result);
  });

  jQuery(".rr__guests__item--up").click(function () {
    var parentEl = jQuery(this).parents(".rr__guests__item"),
      inputEl = parentEl.find('input[type="hidden"]'),
      elmnt = parentEl.find(".value");
    var inputVal = parseInt(inputEl.val());


    if (parseInt(inputVal) < 6) {
      elmnt.html(inputVal + 1);
      inputEl.val(inputVal + 1);
      inputEl.trigger("change");
    }
  });

  jQuery(".rr__guests__item--down").click(function () {
    var parentEl = jQuery(this).parents(".rr__guests__item"),
      inputEl = parentEl.find('input[type="hidden"]'),
      elmnt = parentEl.find(".value");
    var inputVal = parseInt(inputEl.val());


    if (parseInt(inputVal) > 1) {
      elmnt.html(inputVal - 1);
      inputEl.val(inputVal - 1);
      inputEl.trigger("change");
    }

  });


  var rating_count = 4.2;
  var rating_count_round = Math.round(rating_count);
  // console.log(rating_count_round);


  setTimeout(() => {
    for (index = 1; index <= rating_count_round; index++) {

      var ratig_class = ".rating-" + index;

      jQuery(ratig_class).addClass("ico_anim");

    }
  }, 900);


  jQuery(".rr__maps_icon, .rr__infos_maps, .rr__maps_mobile, .rr__maps_title").click(function () {
    jQuery(".rr__maps").toggleClass("rr_map_full");
    jQuery(".rr__maps_icon").toggleClass("rr__maps_icon_rotate");
    jQuery("#maps_big").toggleClass("show_maps");


  });

  // MAAPS REAL RATES


  jQuery(".rr__nearby ul li").click(function () {

    var datatypes = jQuery(this).data("rrtype");

    jQuery(this).addClass("rr__is_active").siblings().removeClass("rr__is_active");

    renderMap(datatypes);
    var icon_map = 'https://demo.globres.io/RR-new-map/img/flag.png';

    var marker = new google.maps.Marker({
      position: { lat: 48.8726199, lng: 2.3211823 },
      map: map,
      icon: icon_map
    });
  });

  function renderMap(data) {
    // get the selected type
    selectedTypes = [];
    selectedTypes.push(data);

    // var geocoder = new google.maps.Geocoder();

    getLocation(lat_maps, lng_maps, selectedTypes);
  }

  function getLocation(lat, lng, selectedTypes) {

    var pyrmont = new google.maps.LatLng(lat, lng);

    var request = {
      location: pyrmont,
      radius: 10000,
      types: selectedTypes
    };

    infowindow = new google.maps.InfoWindow();

    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

  }

  function callback(results, status, datatypes) {

    console.log(datatypes);
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      // console.log(results);
      var iconBase = 'https://demo.globres.io/RR-new-map-2/img/';
      var icons = {
        parking: {
          icon: iconBase + 'medical.svg'
        },
        library: {
          icon: iconBase + 'library_maps.png'
        },
        info: {
          icon: iconBase + 'info-i_maps.png'
        }
      };

      for (var i = 0; i < results.length; i++) {

        var test = icons.parking;
        console.log(test);
        createMarker(results[i], test);


        console.log(results[i]);
      }
    }
  }

  function createMarker(place, icon) {
    var placeLoc = place.geometry.location;

    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      icon: {
        url: icon,
        scaledSize: new google.maps.Size(20, 20) // pixels
      },
      // animation: google.maps.Animation.DROP
    });

    markersArray.push(marker);

    google.maps.event.addListener(marker, 'click', function () {
      infowindow.setContent(place.name + '<br>' + place.vicinity);
      infowindow.open(map, this);
    });
  }
})
