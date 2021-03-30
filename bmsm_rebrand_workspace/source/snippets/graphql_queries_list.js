// Query: Customer's Cart
let graphQLOrderQuery = `query cart {
  order {
    items {
      id
      __typename
      ...BundleOrderItemFragment
      ...FlightOrderItemFragment
      ...HotelOrderItemFragment
      ...SeatOrderItemFragment
      ...TravelerAncillaryOrderItemFragment
      ...VehicleOrderItemFragment
      ...ItineraryAncillaryOrderItemFragment
    }
    travelers {
      id
      firstName
      lastName
      middleName
      suffix
      isPrimary
      type
      ssrs {
        code
        flightId
        title
        price {
          amount
          currency
          __typename
        }
        additionalInfo
        __typename
      }
      __typename
    }
    price {
      total
      balanceDue
      taxes {
        amount
        __typename
      }
      fees {
        amount
        __typename
      }
      __typename
    }
    payments {
      ... on PromoPayment {
        id
        description
        total {
          amount
          currency
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}

fragment BundleOrderItemFragment on OrderItem {
  ... on BundleOrderItem {
    id
    bundle {
      id
      tier
      name
      banner
      ancillaries {
        name
        type
        price {
          amount
          __typename
        }
        __typename
      }
      __typename
    }
    price {
      amount
      currency
      __typename
    }
    __typename
  }
  __typename
}

fragment FlightOrderItemFragment on OrderItem {
  ... on FlightOrderItem {
    id
    flight {
      id
      number
      origin {
        code
        displayName
        city
        state
        __typename
      }
      destination {
        code
        displayName
        city
        state
        __typename
      }
      departingTime
      arrivalTime
      isOvernight
      __typename
    }
    seatmap {
      seatSizesMap {
        id
        name
        __typename
      }
      __typename
    }
    flightPrice: price {
      total
      subtotal
      taxesAndFees
      taxes {
        total {
          amount
          currency
          __typename
        }
        breakdown {
          name
          code
          value {
            amount
            currency
            __typename
          }
          __typename
        }
        __typename
      }
      fees {
        total {
          amount
          currency
          __typename
        }
        breakdown {
          name
          code
          value {
            amount
            currency
            __typename
          }
          __typename
        }
        __typename
      }
      discountValue {
        amount
        currency
        __typename
      }
      discountType
      total
      __typename
    }
    __typename
  }
  __typename
}

fragment HotelOrderItemFragment on OrderItem {
  ... on HotelOrderItem {
    id
    hotelPrice: price {
      total
      __typename
    }
    roomType
    roomsCount
    roomId
    hotelId
    hotel {
      name
      promos {
        id
        code
        headlineDescription
        __typename
      }
      __typename
    }
    checkin {
      time
      __typename
    }
    checkout {
      time
      __typename
    }
    roomsCount
    adultCount
    childrenCount
    __typename
  }
  __typename
}

fragment SeatOrderItemFragment on OrderItem {
  ... on SeatOrderItem {
    id
    flightId
    travelerId
    column
    row
    price {
      amount
      currency
      __typename
    }
    bundledAncillaryPrice {
      amount
      __typename
    }
    isBundledAncillaryIncluded
    seatSizeId
    __typename
  }
  __typename
}

fragment TravelerAncillaryOrderItemFragment on OrderItem {
  ... on TravelerAncillaryOrderItem {
    id
    flightId
    travelerId
    ancillaryType
    quantity
    price {
      amount
      currency
      __typename
    }
    bundledAncillaryPrice {
      amount
      __typename
    }
    isBundledAncillaryIncluded
    __typename
  }
  __typename
}

fragment VehicleOrderItemFragment on OrderItem {
  ... on VehicleOrderItem {
    id
    vehiclePrice: price {
      total {
        amount
        currency
        __typename
      }
      __typename
    }
    vehicle {
      category
      code
      type
      description
      __typename
    }
    vendor {
      name
      __typename
    }
    promotions {
      id
      code
      headlineDescription
      __typename
    }
    pickUpDate
    dropOffDate
    __typename
  }
  __typename
}

fragment ItineraryAncillaryOrderItemFragment on OrderItem {
  ... on ItineraryAncillaryOrderItem {
    id
    ancillaryType
    quantity
    price {
      amount
      currency
      __typename
    }
    bundledAncillaryPrice {
      amount
      __typename
    }
    isBundledAncillaryIncluded
    __typename
  }
  __typename
}
`;


// Query: Flight Search Criteria
let graphQLFlightSearchQuery = `
query flightSearchCriteria {
  flightSearchCriteria {
    tripType
    origin
    destination
    departDate
    returnDate
    adultsCount
    lapInfantDobs
    childrenDobs
    lapInfantCount
    childrenCount
    __typename
  }
  order {
    items {
      id
      ... on FlightOrderItem {
        flight {
          id
          departingTime
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}

`;


// Query: Hotel and Promos
let graphQLHotelQuery = `
query hotels($packageHotelSearchCriteria: PackageHotelSearchInput, $sort: HotelSort, $filters: HotelFiltersInput, $offset: Int, $limit: Int, $origin: IataCode, $destination: IataCode, $departureDate: DateTime, $returnDate: DateTime) {
  application(name: DESKTOPBOOKINGPATH) {
    ... on DesktopBookingPath {
      destinationAdverts(filters: {section: BOOKING_HOTELS, position: TOP, origin: $origin, destination: $destination, departureDate: $departureDate, returningDate: $returnDate}) {
        content
        position
        __typename
      }
      __typename
    }
    __typename
  }
  hotelsForPackage(packageHotelSearchCriteria: $packageHotelSearchCriteria, filters: $filters) {
    result {
      list(sort: $sort, offset: $offset, limit: $limit) {
        ...HotelFragment
        __typename
      }
      totalCount
      filters {
        ratings {
          name
          count
          __typename
        }
        priceRanges {
          from
          to
          count
          __typename
        }
        amenities {
          name
          count
          __typename
        }
        landmarks {
          name
          count
          __typename
        }
        neighborhoods {
          name
          count
          __typename
        }
        __typename
      }
      lowestHotelPrice
      minRooms
      maxRooms
      __typename
    }
    errors
    __typename
  }
  packageHotelSearchCriteria {
    locationCode
    checkIn
    checkOut
    roomsCount
    __typename
  }
}

fragment HotelFragment on Hotel {
  id
  name
  address
  description
  geoPoint {
    latitude
    longitude
    __typename
  }
  image
  hotelGallery {
    path
    alternativeText
    __typename
  }
  inOrder
  featured
  rating
  promos {
    id
    code
    headlineDescription
    shortDescription
    details
    termsAndConditions
    reservationFrom
    reservationTo
    occupancyFrom
    occupancyTo
    blackoutDates {
      from
      to
      __typename
    }
    __typename
  }
  prices {
    lowestRoom
    dailyAverageRate
    strikeThroughRate
    packageTotal {
      amount
      currency
      __typename
    }
    __typename
  }
  __typename
}


`;


/* Mutation: Apply Promocode
operationName: "addPromoPayment"
variables: {payment: {code:"CASINO50"}} // BMSMB030100
*/
let graphQLPromoMutation = `
mutation addPromoPayment($payment: PromoPaymentInput!) {
addPromoPayment(payment: $payment) {
  order {
    loyalty {
      ...LoyaltyFragment
      __typename
    }
    payments {
      ...OrderPaymentFragment
      ...PromoPaymentFragment
      ...VoucherPaymentFragment
      __typename
    }
    price {
      balanceDue
      __typename
    }
    __typename
  }
  errors
  __typename
}
}

fragment OrderPaymentFragment on OrderPayment {
paymentType
paymentStatus
paymentMethod
total {
  amount
  currency
  __typename
}
__typename
}

fragment PromoPaymentFragment on PromoPayment {
id
description
isAutoApplied
__typename
}

fragment VoucherPaymentFragment on VoucherPayment {
id
type
__typename
}

fragment LoyaltyFragment on OrderLoyalty {
totalPoints
totalAmount {
  amount
  currency
  __typename
}
applicableAmount {
  amount
  currency
  __typename
}
applicablePoints
rewardPoints
dueAmount {
  amount
  __typename
}
bonusPoints
enrolled
eligible
bonusAndRewardPoints
totalDueAmount {
  amount
  currency
  __typename
}
__typename
}

`;



