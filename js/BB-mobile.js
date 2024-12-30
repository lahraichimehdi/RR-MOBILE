const Guests = [
    {
        RoomNum:1,
        Adults:1,
        Children:0
    }
]

jQuery("#rr__calender").dateRangePicker({
    language: "en",
    inline: true,
    container: "#rr__calender",
    alwaysOpen: true,
    stickyMonths: true,
    hoveringTooltip: false,
    format: "DD.MM.YYYY",
    startDate: new Date(),
  });

// Toggle menu
jQuery('body').on("click", ".rr__menu--trigger", function () {
    jQuery(".rr__menu").toggleClass("open");
});
jQuery('body').on("click", ".rr__menu--close", function () {
    jQuery(".rr__menu").toggleClass("open");
});

// Update guest
jQuery('body').on("click", ".rr__update--guest", function () {
    jQuery(".guestResult").hide();
    jQuery(".guestEdit").show();
});
jQuery('body').on("click", ".apply--room", function () {
    jQuery(".guestResult").show();
    jQuery(".guestEdit").hide();
    applyGuestsToHTML();
    
});

// Update calendar
jQuery('body').on("click", ".rr__update--calendar", function () {
    jQuery(".calendarResult").hide();
    jQuery(".calendarEdit").show();
});
jQuery('body').on("click", ".apply--calendar", function () {
    jQuery(".calendarResult").show();
    jQuery(".calendarEdit").hide();
});

// Update promo
jQuery('body').on("click", ".rr__update--promo", function () {
    jQuery(".promoResult").hide();
    jQuery(".promoEdit").show();
});
jQuery('body').on("click", ".apply--promo", function () {
    jQuery(".promoResult").show();
    jQuery(".promoEdit").hide();
});

jQuery(".rr__button_cta").click(function () {
    jQuery(".rr__container").toggleClass("open");
  });

  jQuery(".rr__container--close").click(function () {
    jQuery(".rr__container").toggleClass("open");
});

jQuery('body').on("click", ".rr__roomLine--remove", function () {

    
    if(jQuery(".rr__roomLine").length > 1) {

        jQuery(this).closest('.rr__roomLine').remove();
        const roomNum = jQuery(this).closest('.rr__roomLine').data('room');
        Guests.splice(Guests.findIndex(guest => guest.RoomNum === roomNum), 1);

        Guests.forEach((guest, index) => {
            guest.RoomNum = index + 1;
        });
        jQuery('.rr__roomLine').each(function(index){
            jQuery(this).data('room', index + 1);
            jQuery(this).find('.rr__roomLine--title h4').text(`Room ${index + 1}`);
        })        

    }

});

// Handle increment
jQuery('body').on("click", ".rr__guests__item--up", function () {

    console.log("increment");
    let valueDisplay = jQuery(this).siblings('.value'); // Select the sibling element with class "value"
    let value = parseInt(valueDisplay.text(), 10);
    value++;
    valueDisplay.text(value);
    // Update the Guests object
    const type = valueDisplay.hasClass('Booking__guests__item--adult') ? 'Adults' : 'Children';
    const roomNum = jQuery(this).closest('.rr__roomLine').data('room');
    updateGuests(roomNum, type, value); // Pass RoomNum = 1 as an example
});

// Handle decrement
jQuery('body').on("click", ".rr__guests__item--down", function () {
    console.log("decrement");
    let valueDisplay = jQuery(this).siblings('.value'); // Select the sibling element with class "value"
    let value = parseInt(valueDisplay.text(), 10);

    // Check if this is the "Adults" section
    if (valueDisplay.hasClass('Booking__guests__item--adult')) {
        if (value > 1) { // Min value for Adults is 1
            value--;
            valueDisplay.text(value);
        }
    } else {
        // For other sections like "Children," min value is 0
        if (value > 0) {
            value--;
            valueDisplay.text(value);
        }
    }

    // Update the Guests object
    const type = valueDisplay.hasClass('Booking__guests__item--adult') ? 'Adults' : 'Children';
    const roomNum = jQuery(this).closest('.rr__roomLine').data('room');
    updateGuests(roomNum, type, value); // Pass RoomNum = 1 as an example
});


// Handle click apply calendar
jQuery('body').on("click", ".apply--calendar", function () {
    loadTotalPriceBetweenTwoDates();
});

jQuery('body').on("click", ".rr__roomLine-add", function () {
    const RoomLength = jQuery(".rr__roomLine").length;
    if(RoomLength < 5)  addRoom();
});
// =====



const updateGuests = (roomNum, type, value) => {
    // Find the room in the Guests array
    const room = Guests.find(r => r.RoomNum === roomNum);

    if (room) {
        if (type === 'Adults') {
            room.Adults = value;
        } else if (type === 'Children') {
            room.Children = value;
        }
    }
}

const applyGuestsToHTML = () => { 

    const container = jQuery('.rr__guests--info');
    let newGuestsHtml = ''; 

    Guests.forEach(guest => {
        newGuestsHtml += `
            <p>
                <span class="nbRoom">Room ${guest.RoomNum}</span><i> - </i>
                <span>${guest.Adults} adults, ${guest.Children} children</span>
            </p>
        `;
    });
    container.html(newGuestsHtml);
}

const addRoom = () =>{

    const newRoomNum = Guests.length + 1;
    // Add a new room object to the Guests array
    Guests.push({
        RoomNum: newRoomNum,
        Adults: 1,
        Children: 0
    });

    newRoomHtml = `
        <div class="rr__roomLine" data-room="${newRoomNum}">
            <div class="rr__roomLine--title">
              <h4>Room ${newRoomNum}</h4>
              <span class="rr__roomLine--remove"> Remove </span>
            </div>

            <div class="rr__guests__col Adults">
              <label class="rr__label">Adult</label>

              <div class="rr__guests__item Booking__guests__item">
                <div class="rr__guests__item--down Booking__guests__item--down">
                  <span class="RRicon RRicon-less"></span>
                </div>
                <div class="rr__guests__item--adult value Booking__guests__item--adult">
                  1
                </div>
                <div class="rr__guests__item--up Booking__guests__item--up">
                  <span class="RRicon RRicon-add"></span>
                </div>
              </div>
            </div>
            <div class="rr__guests__col Childs">
              <label class="rr__label">Child</label>

              <div class="rr__guests__item Booking__guests__item">
                <div class="rr__guests__item--down Booking__guests__item--down">
                  <span class="RRicon RRicon-less"></span>
                </div>
                <div class="rr__guests__item--child value Booking__guests__item--child">
                  0
                </div>
                <div class="rr__guests__item--up Booking__guests__item--up">
                  <span class="RRicon RRicon-add"></span>
                </div>
              </div>
            </div>
          </div>`

    jQuery('.rr__roomLine--container').append(newRoomHtml);
    console.log("Added Room:", Guests);
}


const loadXteaseData = () => {

    jQuery('.rr__xtease_loader').removeClass('rr__hide');

    const form = new FormData();
    
    form.append('action', 'xtease');
    form.append('version', 'v2');
    form.append('token', 'KMgzx<4W{MH|TQ>');
    form.append('hotel_id', '60669');
    form.append('rr_id', '');
    form.append('provider_id', '0');
    form.append('d1', '2025-01-15');
    form.append('d2', '2025-01-16');
    form.append('currency', 'CHF');
    form.append('adults', '1');
    form.append('rooms', '1');
    form.append('children', '0');
    form.append('taxes', 'false');
    form.append('hidden_p', '{"0":10,"1":7,"2":6,"3":5,"4":3}');
    form.append('xt_p', '{"hidden":[10,7,6,5,3],"deleted":[],"mapped":["bk","ex","hrs","lr","tc","hotels","mms","ag","pl"]}');
    form.append('bePriceCode', '200');
    form.append('max_platforms', '4');
    form.append('lang', 'EN');
    form.append('device', '');
    form.append('source', '');
    form.append('country', '');
    form.append('promocode', '');
    form.append('actual_hotel_session_info', '60837');
    form.append('actual_hotel_session_info', '60837');
    form.append('TotalPriceType', 'stay');
    form.append('rr_sessionID', 'AjN1735492824509Qgg');
    
    let xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    xhr.open('POST', 'https://api.globres.io/RealRate/api');
    xhr.setRequestHeader('accept', '*/*');

    xhr.onload = function() {
        if (xhr.status === 200) {

            const response = JSON.parse(xhr.response)
            if(response.data){
                const platforms = response.data
                for (const platformCode in platforms) {
                    if (Object.hasOwnProperty.call(platforms, platformCode)) {
                        const {price,currency} = platforms[platformCode];
                        jQuery(`.${platformCode} .rr__xtease_body--price`).text(price)
                        jQuery(`.${platformCode} .rr__xtease_body--currency`).text(currency)
                    }
                }
            }

            
            // console.log('Response:', xhr.response);
            jQuery('.rr__xtease_loader').addClass('rr__hide');
            jQuery('.rr__xtease').removeClass('rr__hide');

        } else {
            jQuery('.rr__xtease_loader').addClass('rr__hide');
            console.error('Error:', xhr.status, xhr.statusText);
        }
    };

    xhr.onerror = function() {
        jQuery('.rr__xtease_loader').addClass('rr__hide');
        console.error('Network error or CORS issue');
    };
    
    xhr.send(form);
}

const loadCalendarPricing = () => {

    const form = new FormData();
    form.append('Currency', 'CHF');
    form.append('HotelId', '60669');
    form.append('HotelStayOnly', 'true');
    form.append('End', '2025-07-31');
    form.append('Start', '2025-05-01');
    form.append('Adults', '1');
    form.append('Guests', '{"1":{"room":1,"adults":1,"childs":0}}');
    form.append('Rooms', '1');
    form.append('Children', '0');
    form.append('PromoCode', '');
    form.append('IATACode', '');
    form.append('GroupCode', '');
    form.append('CouponCode', '');

    let xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    xhr.open('POST', 'https://api.globres.io/RealRate/calendarPricing.php');
   
    xhr.onload = function() {
    console.log(xhr.response);
    };

    xhr.send(form);
}

const loadTotalPriceBetweenTwoDates = () => {

    const form = new FormData();
    form.append('action', 'getTotal');
    form.append('Start', '2025-06-09');
    form.append('End', '2025-06-12');
    form.append('Currency', 'CHF');
    form.append('HotelId', '60669');
    form.append('Adults', '1');
    form.append('Children', '0');
    form.append('Guests', '{"1":{"room":1,"adults":1,"childs":0}}');
    form.append('Rooms', '1');
    form.append('PromoCode', '');
    form.append('IATACode', '');
    form.append('GroupCode', '');
    form.append('CouponCode', '');
    form.append('TotalPriceType', 'stay');

    let xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;
    xhr.open('POST', 'https://api.globres.io/RealRate/calendarPricing.php');

    xhr.onload = function() {
        if (xhr.status === 200) {

            const response = JSON.parse(xhr.response)
            if(response){
                const {DirectPrice} = response
                jQuery('.rr__submit_p .rr__submit--price').text(DirectPrice.AmountAfterTax)
                jQuery('.rr__submit_p .rr__submit--currency').text(DirectPrice.CurrencyCode)
                console.log(DirectPrice)
            }

        } else {
            jQuery('.rr__xtease_loader').addClass('rr__hide');
            console.error('Error:', xhr.status, xhr.statusText);
        }
    };
    xhr.onerror = function() {
        console.error('Network error or CORS issue');
    };

    xhr.send(form);
}


loadXteaseData();
// loadCalendarPricing();
loadTotalPriceBetweenTwoDates();