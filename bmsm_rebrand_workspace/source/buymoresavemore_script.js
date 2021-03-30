/**
 * Regex plugin code by James Padolsey
 * https://j11y.io/snippets/regex-selector-for-jquery/
 */
 jQuery.expr[':'].regex = function(elem, index, match) {
  var matchParams = match[3].split(','),
      validLabels = /^(data|css):/,
      attr = {
          method: matchParams[0].match(validLabels) ? 
                      matchParams[0].split(':')[0] : 'attr',
          property: matchParams.shift().replace(validLabels,'')
      },
      regexFlags = 'ig',
      regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
  return regex.test(jQuery(elem)[attr.method](attr.property));
}


let hotel_checkin_date = new Date(new Date($("[data-hook='hotels-page-search-criteria-check-in-date']").text()).toISOString().substring(0,10));
let hotel_checkout_date = new Date(new Date($("[data-hook='hotels-page-search-criteria-check-out-date']").text()).toISOString().substring(0,10));
let hotel_number_of_nights = calculateDateDifference(hotel_checkout_date, hotel_checkout_date);
let MEETS_BMSM_HOTEL_CRITERIA = calculateDateDifference(hotel_checkout_date, hotel_checkout_date) >= 3 && calculateDateDifference(hotel_checkout_date, hotel_checkout_date) < 14;

if (MEETS_BMSM_HOTEL_CRITERIA){
   // handleHotelPageLoad();

}

function handleHotelPageLoad(){



}




function applyBMSMHotelPageStyles(){
  if ($("div.bundle-and-save").length === 0) {
    let hotel_cards = $("div[class*='HotelCardBox']:regex(data-hook, hotels-page-[a-zA-z\-]*-card\_[a-z-]*)");
    $(hotel_cards).each(function (hotelCard) {
          let hotel_name_element = this.children[3].children[0].innerText;
          let hotel_address_element = this.children[3].children[4].innerText.replace("Map", "");
          let hotel_price_element = this.children[4];
  
          
          let has_hotel_promo_banner_text = hotel_price_element.children.length > 1;
          if (has_hotel_promo_banner_text) {
            let hotel_price_container = hotel_price_element.children[1].children[0];
            renderHotelDiscountStyles(hotel_price_container);
            hotel_price_element = this.children[4].children[1].children[0].innerText;
            return hotel_price_element;
          }
          else {
            let hotel_price_container = hotel_price_element.children[0].children[0];
            renderHotelDiscountStyles(hotel_price_container);
            hotel_price_element = this.children[4].children[0].children[0].innerText;
            return hotel_price_element;
          }
  
          console.log({
            hotel_name_element,
            hotel_address_element,
            hotel_price_element
          });
  
        });
  };
}






/** HELPERS */
function calculateDateDifference(endDate, startDate){
  const MS_TO_DAY = 86400000;
  const numberOfDays = new Date(endDate - startDate) / MS_TO_DAY;
  return numberOfDays;
}

function calculateHotelDiscountPrice(hotelPrice, numberofNights) {
  let discountAmount = 5;
  let price = hotelPrice.replace(/[$,]+/g, "");
  let discountedPrice = (Number(price) - (discountAmount * numberofNights)).toFixed(2);
  return discountedPrice;
}
function renderHotelDiscountStyles(element){
    
  $(element).css({
    "text-decoration": "line-through",
    "color": "#7d7d7d",
    "font-size": "1.5rem"
  });

  // Add the bundle and save part
  // let hotelCheckInDate = new Date(BuyMoreSaveMore_Campaign.hotels.data.packageHotelSearchCriteria.checkIn);
  // let hotelCheckOutDate = new Date(BuyMoreSaveMore_Campaign.hotels.data.packageHotelSearchCriteria.checkOut);
  // let numberOfHotelNights = calculateDateDifference(hotelCheckOutDate, hotelCheckInDate);
  let hotelDiscountPrice = calculateHotelDiscountPrice(element.innerText, hotel_number_of_nights);
 
    $(element).after(`
    <div class="bundle-and-save" style="display:flex; align-items:center;margin-top: 10px;margin-bottom: 10px;">
    <span style="display:inline-block;height: 38px; width: 77px;margin-right: 5px; vertical-align:bottom;">
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 157.8 74.67'><defs><style>.cls-1{fill:#f15500;}.cls-2{fill:#fff;}</style></defs><title>Asset 1</title><g id='Layer_2' data-name='Layer 2'><g id='Layer_2-2' data-name='Layer 2'><path class='cls-1' d='M106.67,71.56,76,44.75a9.6,9.6,0,0,1,0-14.83L106.67,3.11a13.29,13.29,0,0,1,17,0L154.3,29.92a9.6,9.6,0,0,1,0,14.83L123.64,71.56A13.29,13.29,0,0,1,106.67,71.56Z'/><path class='cls-1' d='M12.9,0H115.07V74.67H12.81A12.82,12.82,0,0,1,0,61.86v-49A12.89,12.89,0,0,1,12.9,0Z'/><circle class='cls-2' cx='144.98' cy='36.96' r='7.2'/><path class='cls-2' d='M19.61,10.73c3.81,0,6.1,1.76,6.1,4.73a4.11,4.11,0,0,1-3.48,4.26,4.62,4.62,0,0,1,4.32,4.78c0,3.21-2.54,5.13-6.8,5.13h-8.1V10.73Zm-5.8,8.16H19.5c2.54,0,4-1.11,4-3.08s-1.49-3-4-3H13.81Zm0,8.69H19.5c3.08,0,4.86-1.22,4.86-3.38s-1.78-3.26-4.86-3.26H13.81Z'/><path class='cls-2' d='M41.67,29.63H39.56V26.42c-.94,2.21-2.83,3.26-5.39,3.29-3.32,0-5.32-2.11-5.32-5.53V15.4H31v8.21a3.65,3.65,0,0,0,3.94,4c3-.05,4.67-2.18,4.67-5.21v-7h2.11Z'/><path class='cls-2' d='M58.46,20.86v8.77h-2.1V21.42a3.68,3.68,0,0,0-4-4A4.61,4.61,0,0,0,47.56,22v7.64H45.45V15.4h2.11v3.13c1-2.15,2.91-3.18,5.5-3.21C56.47,15.32,58.46,17.43,58.46,20.86Z'/><path class='cls-2' d='M74.88,29.63H72.77V26.58a5.92,5.92,0,0,1-5.53,3.16c-4,0-6.86-3-6.86-7.24s2.81-7.2,6.83-7.2a6,6,0,0,1,5.56,3.18V9.6h2.11Zm-2.11-7.07a5.14,5.14,0,1,0-10.28,0,5.14,5.14,0,1,0,10.28,0Z'/><path class='cls-2' d='M78.93,29.63V9.6H81v20Z'/><path class='cls-2' d='M97.21,23.34H85.6a5,5,0,0,0,5.16,4.53,6,6,0,0,0,4.4-1.78l1.16,1.24a7.46,7.46,0,0,1-5.73,2.38,6.8,6.8,0,0,1-7.07-7.18,6.81,6.81,0,0,1,7-7.18C95.16,15.32,97.42,18.51,97.21,23.34Zm-1.89-1.73a4.44,4.44,0,0,0-4.75-4.45,4.8,4.8,0,0,0-5,4.45Z'/><path class='cls-2' d='M116,26.85a8.15,8.15,0,0,1-5.86,2.89,5.33,5.33,0,0,1-5.61-5.19c0-2.75,2.08-4.18,4.29-5.37a7.4,7.4,0,0,1-1.94-4.45c0-2.38,1.86-4.08,4.61-4.08s4.37,1.57,4.37,3.81c0,2.56-2.32,3.89-4.66,5.13,1.16,1.35,2.69,2.91,4.58,4.78a18.13,18.13,0,0,0,2-3.68l1.43,1.11A18.64,18.64,0,0,1,117,25.58l3.26,3.21L119.16,30Zm-1.22-1.22c-2.07-2.07-3.77-3.8-5-5.29-1.87,1-3.43,2.16-3.43,4.05A3.68,3.68,0,0,0,110.22,28,6.27,6.27,0,0,0,114.78,25.63Zm-4.53-7.18c2.08-1.08,3.89-2.1,3.89-4a2.36,2.36,0,0,0-2.65-2.35,2.64,2.64,0,0,0-2.89,2.59A6.61,6.61,0,0,0,110.25,18.45Z'/><path class='cls-2' d='M34.71,38.46l-2.95,5.32A25.55,25.55,0,0,0,21.9,41c-2,0-3.39.65-3.39,1.95,0,4.64,16.28,2,16.28,11.69,0,5.36-5.45,8.19-12.32,8.19A25.14,25.14,0,0,1,8.39,58.53l3-5.25a20.76,20.76,0,0,0,11.13,4c2.46,0,4-.81,4-2.34,0-4.75-16.28-1.92-16.28-11.42,0-4.94,4.89-8.08,12.28-8.08A25.77,25.77,0,0,1,34.71,38.46Z'/><path class='cls-2' d='M43.72,57.65l-2.24,4.94h-8L46.72,35.78h8.05l13,26.81H59.39l-2.2-4.94ZM50.5,42.56,46,52.48H54.9Z'/><path class='cls-2' d='M74.88,62.59l-12-26.81h8.36l7.87,19.73L87,35.78h8L83,62.59Z'/><path class='cls-2' d='M103.74,41.14v5.33h14.7v5.36h-14.7v5.4h16.77v5.36H95.91V35.78H120v5.36Z'/></g></g></svg>
    </span>
    <span style="display:inline-block; font-size: 2rem;color: rgb(1, 87, 155);font-weight: 600;line-height: 1;">$${hotelDiscountPrice}</span>
    </div>
    `);

}