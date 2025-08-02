import { SearchFlightsResponse } from "@/types/flights";

export const mockFlightApiResponse: SearchFlightsResponse = {
  status: true,
  timestamp: 1691008981566,
  sessionId: "25cee707-a873-4d0a-aeb2-4128a7ca0258",
  data: {
    context: {
      status: "incomplete",
      totalResults: 10,
    },
    itineraries: [
      { // Vuelo 1: 2 Paradas - El más barato
        id: "mock-3",
        price: { raw: 355.50, formatted: "$356" },
        legs: [
          {
            id: "leg-3a", origin: { id: "STN", name: "London Stansted", displayCode: "STN" }, destination: { id: "EWR", name: "New York Newark", displayCode: "EWR" }, durationInMinutes: 980, stopCount: 2, departure: "2024-02-20T06:00:00", arrival: "2024-02-20T15:20:00",
            carriers: { marketing: [{ id: -32700, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/FR.png", name: "Ryanair" }] },
            segments: [
              { id: "seg-3a", origin: { flightPlaceId: 'STN', name: 'London Stansted', type: 'Airport' }, destination: { flightPlaceId: 'OSL', name: 'Oslo', type: 'Airport' }, departure: "2024-02-20T06:00:00", arrival: "2024-02-20T09:00:00", durationInMinutes: 120, flightNumber: 'FR789' },
              { id: "seg-3b", origin: { flightPlaceId: 'OSL', name: 'Oslo', type: 'Airport' }, destination: { flightPlaceId: 'KEF', name: 'Reykjavik', type: 'Airport' }, departure: "2024-02-20T10:30:00", arrival: "2024-02-20T12:00:00", durationInMinutes: 90, flightNumber: 'FI321' },
              { id: "seg-3c", origin: { flightPlaceId: 'KEF', name: 'Reykjavik', type: 'Airport' }, destination: { flightPlaceId: 'EWR', name: 'New York Newark', type: 'Airport' }, departure: "2024-02-20T13:00:00", arrival: "2024-02-20T15:20:00", durationInMinutes: 380, flightNumber: 'ICE623' }
            ]
          },
          {
            id: "leg-3b-return", origin: { id: "EWR", name: "New York Newark", displayCode: "EWR" }, destination: { id: "STN", name: "London Stansted", displayCode: "STN" }, durationInMinutes: 950, stopCount: 2, departure: "2024-02-28T18:00:00", arrival: "2024-03-01T09:50:00",
            carriers: { marketing: [{ id: -32700, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/FR.png", name: "Ryanair" }] },
            segments: [
              { id: "seg-3d", origin: { flightPlaceId: 'EWR', name: 'New York Newark', type: 'Airport' }, destination: { flightPlaceId: 'KEF', name: 'Reykjavik', type: 'Airport' }, departure: "2024-02-28T18:00:00", arrival: "2024-02-29T04:30:00", durationInMinutes: 390, flightNumber: 'ICE624' },
              { id: "seg-3e", origin: { flightPlaceId: 'KEF', name: 'Reykjavik', type: 'Airport' }, destination: { flightPlaceId: 'OSL', name: 'Oslo', type: 'Airport' }, departure: "2024-02-29T06:00:00", arrival: "2024-02-29T09:30:00", durationInMinutes: 90, flightNumber: 'FI322' },
              { id: "seg-3f", origin: { flightPlaceId: 'OSL', name: 'Oslo', type: 'Airport' }, destination: { flightPlaceId: 'STN', name: 'London Stansted', type: 'Airport' }, departure: "2024-02-29T11:00:00", arrival: "2024-02-29T14:00:00", durationInMinutes: 120, flightNumber: 'FR790' }
            ]
          }
        ],
        isSelfTransfer: true, tags: ["cheapest"], score: 0.4,
      },
      { // Vuelo 2: 1 Parada - Barato pero largo
        id: "mock-5",
        price: { raw: 389.99, formatted: "$390" },
        legs: [
          {
            id: "leg-5a", origin: { id: "LGW", name: "London Gatwick", displayCode: "LGW" }, destination: { id: "JFK", name: "New York JFK", displayCode: "JFK" }, durationInMinutes: 1100, stopCount: 1, departure: "2024-02-20T09:00:00", arrival: "2024-02-20T20:20:00",
            carriers: { marketing: [{ id: -32720, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/FI.png", name: "Icelandair" }] },
            segments: [
               { id: "seg-5a", origin: { flightPlaceId: 'LGW', name: 'London Gatwick', type: 'Airport' }, destination: { flightPlaceId: 'KEF', name: 'Reykjavik', type: 'Airport' }, departure: "2024-02-20T09:00:00", arrival: "2024-02-20T11:00:00", durationInMinutes: 120, flightNumber: 'FI471' },
               { id: "seg-5b", origin: { flightPlaceId: 'KEF', name: 'Reykjavik', type: 'Airport' }, destination: { flightPlaceId: 'JFK', name: 'New York JFK', type: 'Airport' }, departure: "2024-02-20T17:00:00", arrival: "2024-02-20T20:20:00", durationInMinutes: 380, flightNumber: 'FI615' }
            ]
          },
          {
            id: "leg-5b-return", origin: { id: "JFK", name: "New York JFK", displayCode: "JFK" }, destination: { id: "LGW", name: "London Gatwick", displayCode: "LGW" }, durationInMinutes: 1050, stopCount: 1, departure: "2024-02-28T22:00:00", arrival: "2024-03-01T13:30:00",
            carriers: { marketing: [{ id: -32720, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/FI.png", name: "Icelandair" }] },
            segments: [
               { id: "seg-5c", origin: { flightPlaceId: 'JFK', name: 'New York JFK', type: 'Airport' }, destination: { flightPlaceId: 'KEF', name: 'Reykjavik', type: 'Airport' }, departure: "2024-02-28T22:00:00", arrival: "2024-02-29T08:00:00", durationInMinutes: 360, flightNumber: 'FI616' },
               { id: "seg-5d", origin: { flightPlaceId: 'KEF', name: 'Reykjavik', type: 'Airport' }, destination: { flightPlaceId: 'LGW', name: 'London Gatwick', type: 'Airport' }, departure: "2024-02-29T10:00:00", arrival: "2024-02-29T13:30:00", durationInMinutes: 150, flightNumber: 'FI472' }
            ]
          }
        ],
        isSelfTransfer: false, tags: ["1 stop"], score: 0.5,
      },
      { // Vuelo 3: 1 Parada - Aer Lingus
        id: "mock-2",
        price: { raw: 419.18, formatted: "$420" },
        legs: [
          {
            id: "leg-2a", origin: { id: "LHR", name: "London Heathrow", displayCode: "LHR" }, destination: { id: "JFK", name: "New York JFK", displayCode: "JFK" }, durationInMinutes: 665, stopCount: 1, departure: "2024-02-20T07:50:00", arrival: "2024-02-20T13:55:00",
            carriers: { marketing: [{ id: -32753, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/EI.png", name: "Aer Lingus" }] },
            segments: [
              { id: "seg-2a", origin: { flightPlaceId: 'LHR', name: 'London Heathrow', type: 'Airport' }, destination: { flightPlaceId: 'DUB', name: 'Dublin', type: 'Airport' }, departure: "2024-02-20T07:50:00", arrival: "2024-02-20T09:10:00", durationInMinutes: 80, flightNumber: 'EI151' },
              { id: "seg-2b", origin: { flightPlaceId: 'DUB', name: 'Dublin', type: 'Airport' }, destination: { flightPlaceId: 'JFK', name: 'New York JFK', type: 'Airport' }, departure: "2024-02-20T11:10:00", arrival: "2024-02-20T13:55:00", durationInMinutes: 465, flightNumber: 'EI105' }
            ]
          },
          {
            id: "leg-2b-return", origin: { id: "JFK", name: "New York JFK", displayCode: "JFK" }, destination: { id: "LHR", name: "London Heathrow", displayCode: "LHR" }, durationInMinutes: 600, stopCount: 1, departure: "2024-02-28T19:00:00", arrival: "2024-03-01T08:00:00",
            carriers: { marketing: [{ id: -32753, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/EI.png", name: "Aer Lingus" }] },
            segments: [
              { id: "seg-2c", origin: { flightPlaceId: 'JFK', name: 'New York JFK', type: 'Airport' }, destination: { flightPlaceId: 'DUB', name: 'Dublin', type: 'Airport' }, departure: "2024-02-28T19:00:00", arrival: "2024-02-29T06:00:00", durationInMinutes: 420, flightNumber: 'EI104' },
              { id: "seg-2d", origin: { flightPlaceId: 'DUB', name: 'Dublin', type: 'Airport' }, destination: { flightPlaceId: 'LHR', name: 'London Heathrow', type: 'Airport' }, departure: "2024-02-29T07:00:00", arrival: "2024-02-29T08:20:00", durationInMinutes: 80, flightNumber: 'EI152' }
            ]
          }
        ],
        isSelfTransfer: false, tags: ["1 stop"], score: 0.65,
      },
      { // Vuelo 4: 1 Parada - United
        id: "mock-6",
        price: { raw: 455.00, formatted: "$455" },
        legs: [
            {
              id: "leg-6a", origin: { id: "LHR", name: "London Heathrow", displayCode: "LHR" }, destination: { id: "JFK", name: "New York JFK", displayCode: "JFK" }, durationInMinutes: 700, stopCount: 1, departure: "2024-02-20T10:00:00", arrival: "2024-02-20T16:40:00",
              carriers: { marketing: [{ id: -32620, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/UA.png", name: "United" }] },
              segments: [
                { id: "seg-6a", origin: { flightPlaceId: 'LHR', name: 'London Heathrow', type: 'Airport' }, destination: { flightPlaceId: 'IAD', name: 'Washington Dulles', type: 'Airport' }, departure: "2024-02-20T10:00:00", arrival: "2024-02-20T12:50:00", durationInMinutes: 410, flightNumber: 'UA919' },
                { id: "seg-6b", origin: { flightPlaceId: 'IAD', name: 'Washington Dulles', type: 'Airport' }, destination: { flightPlaceId: 'JFK', name: 'New York JFK', type: 'Airport' }, departure: "2024-02-20T15:00:00", arrival: "2024-02-20T16:40:00", durationInMinutes: 100, flightNumber: 'UA345' }
              ]
            },
            {
              id: "leg-6b-return", origin: { id: "JFK", name: "New York JFK", displayCode: "JFK" }, destination: { id: "LHR", name: "London Heathrow", displayCode: "LHR" }, durationInMinutes: 650, stopCount: 1, departure: "2024-02-28T17:00:00", arrival: "2024-03-01T06:50:00",
              carriers: { marketing: [{ id: -32620, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/UA.png", name: "United" }] },
              segments: [
                { id: "seg-6c", origin: { flightPlaceId: 'JFK', name: 'New York JFK', type: 'Airport' }, destination: { flightPlaceId: 'IAD', name: 'Washington Dulles', type: 'Airport' }, departure: "2024-02-28T17:00:00", arrival: "2024-02-28T18:40:00", durationInMinutes: 100, flightNumber: 'UA346' },
                { id: "seg-6d", origin: { flightPlaceId: 'IAD', name: 'Washington Dulles', type: 'Airport' }, destination: { flightPlaceId: 'LHR', name: 'London Heathrow', type: 'Airport' }, departure: "2024-02-28T21:00:00", arrival: "2024-02-29T09:50:00", durationInMinutes: 410, flightNumber: 'UA918' }
              ]
            }
        ],
        isSelfTransfer: false, tags: ["1 stop"], score: 0.6,
      },
      { // Vuelo 5: Directo (Nonstop) - Norse Atlantic
        id: "mock-1",
        price: { raw: 519.18, formatted: "$520" },
        legs: [
            {
              id: "leg-1a", origin: { id: "LGW", name: "London Gatwick", displayCode: "LGW" }, destination: { id: "JFK", name: "New York JFK", displayCode: "JFK" }, durationInMinutes: 495, stopCount: 0, departure: "2024-02-20T12:35:00", arrival: "2024-02-20T15:50:00",
              carriers: { marketing: [{ id: -30598, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/I%29.png", name: "Norse Atlantic" }] },
              segments: [{ id: "seg-1a", origin: { flightPlaceId: 'LGW', name: 'London Gatwick', type: 'Airport' }, destination: { flightPlaceId: 'JFK', name: 'New York JFK', type: 'Airport' }, departure: "2024-02-20T12:35:00", arrival: "2024-02-20T15:50:00", durationInMinutes: 495, flightNumber: 'NA123' }]
            },
            {
              id: "leg-1b-return", origin: { id: "JFK", name: "New York JFK", displayCode: "JFK" }, destination: { id: "LGW", name: "London Gatwick", displayCode: "LGW" }, durationInMinutes: 460, stopCount: 0, departure: "2024-02-28T18:00:00", arrival: "2024-03-01T06:40:00",
              carriers: { marketing: [{ id: -30598, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/I%29.png", name: "Norse Atlantic" }] },
              segments: [{ id: "seg-1b", origin: { flightPlaceId: 'JFK', name: 'New York JFK', type: 'Airport' }, destination: { flightPlaceId: 'LGW', name: 'London Gatwick', type: 'Airport' }, departure: "2024-02-28T18:00:00", arrival: "2024-02-29T06:40:00", durationInMinutes: 460, flightNumber: 'NA124' }]
            }
        ],
        isSelfTransfer: false, tags: ["shortest"], score: 0.98,
      },
      { // Vuelo 6: Directo (Nonstop) - JetBlue
        id: "mock-7",
        price: { raw: 545.00, formatted: "$545" },
        legs: [
          {
            id: "leg-7a", origin: { id: "LGW", name: "London Gatwick", displayCode: "LGW" }, destination: { id: "JFK", name: "New York JFK", displayCode: "JFK" }, durationInMinutes: 500, stopCount: 0, departure: "2024-02-20T14:00:00", arrival: "2024-02-20T17:20:00",
            carriers: { marketing: [{ id: -32660, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/B6.png", name: "JetBlue" }] },
            segments: [{ id: "seg-7a", origin: { flightPlaceId: 'LGW', name: 'London Gatwick', type: 'Airport' }, destination: { flightPlaceId: 'JFK', name: 'New York JFK', type: 'Airport' }, departure: "2024-02-20T14:00:00", arrival: "2024-02-20T17:20:00", durationInMinutes: 500, flightNumber: 'B620' }]
          },
          {
            id: "leg-7b-return", origin: { id: "JFK", name: "New York JFK", displayCode: "JFK" }, destination: { id: "LGW", name: "London Gatwick", displayCode: "LGW" }, durationInMinutes: 470, stopCount: 0, departure: "2024-02-28T20:30:00", arrival: "2024-03-01T09:40:00",
            carriers: { marketing: [{ id: -32660, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/B6.png", name: "JetBlue" }] },
            segments: [{ id: "seg-7b", origin: { flightPlaceId: 'JFK', name: 'New York JFK', type: 'Airport' }, destination: { flightPlaceId: 'LGW', name: 'London Gatwick', type: 'Airport' }, departure: "2024-02-28T20:30:00", arrival: "2024-02-29T09:40:00", durationInMinutes: 470, flightNumber: 'B621' }]
          }
        ],
        isSelfTransfer: false, tags: [], score: 0.95,
      },
      { // Vuelo 7: 1 Parada - Lufthansa
        id: "mock-8",
        price: { raw: 650.00, formatted: "$650" },
        legs: [
          {
            id: "leg-8a", origin: { id: "LHR", name: "London Heathrow", displayCode: "LHR" }, destination: { id: "EWR", name: "New York Newark", displayCode: "EWR" }, durationInMinutes: 750, stopCount: 1, departure: "2024-02-20T13:00:00", arrival: "2024-02-20T20:30:00",
            carriers: { marketing: [{ id: -32730, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/LH.png", name: "Lufthansa" }] },
            segments: [
              { id: "seg-8a", origin: { flightPlaceId: 'LHR', name: 'London Heathrow', type: 'Airport' }, destination: { flightPlaceId: 'FRA', name: 'Frankfurt', type: 'Airport' }, departure: "2024-02-20T13:00:00", arrival: "2024-02-20T15:30:00", durationInMinutes: 90, flightNumber: 'LH909' },
              { id: "seg-8b", origin: { flightPlaceId: 'FRA', name: 'Frankfurt', type: 'Airport' }, destination: { flightPlaceId: 'EWR', name: 'New York Newark', type: 'Airport' }, departure: "2024-02-20T17:00:00", arrival: "2024-02-20T20:30:00", durationInMinutes: 510, flightNumber: 'LH402' }
            ]
          },
          {
            id: "leg-8b-return", origin: { id: "EWR", name: "New York Newark", displayCode: "EWR" }, destination: { id: "LHR", name: "London Heathrow", displayCode: "LHR" }, durationInMinutes: 700, stopCount: 1, departure: "2024-02-28T18:00:00", arrival: "2024-03-01T08:40:00",
            carriers: { marketing: [{ id: -32730, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/LH.png", name: "Lufthansa" }] },
            segments: [
              { id: "seg-8c", origin: { flightPlaceId: 'EWR', name: 'New York Newark', type: 'Airport' }, destination: { flightPlaceId: 'FRA', name: 'Frankfurt', type: 'Airport' }, departure: "2024-02-28T18:00:00", arrival: "2024-02-29T07:30:00", durationInMinutes: 450, flightNumber: 'LH403' },
              { id: "seg-8d", origin: { flightPlaceId: 'FRA', name: 'Frankfurt', type: 'Airport' }, destination: { flightPlaceId: 'LHR', name: 'London Heathrow', type: 'Airport' }, departure: "2024-02-29T09:00:00", arrival: "2024-02-29T10:40:00", durationInMinutes: 100, flightNumber: 'LH908' }
            ]
          }
        ],
        isSelfTransfer: false, tags: [], score: 0.7,
      },
      { // Vuelo 8: Directo (Nonstop) - British Airways
        id: "mock-4",
        price: { raw: 890.00, formatted: "$890" },
        legs: [
          {
            id: "leg-4a", origin: { id: "LHR", name: "London Heathrow", displayCode: "LHR" }, destination: { id: "JFK", name: "New York JFK", displayCode: "JFK" }, durationInMinutes: 485, stopCount: 0, departure: "2024-02-20T11:00:00", arrival: "2024-02-20T14:05:00",
            carriers: { marketing: [{ id: -32740, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/BA.png", name: "British Airways" }] },
            segments: [{ id: "seg-4a", origin: { flightPlaceId: 'LHR', name: 'London Heathrow', type: 'Airport' }, destination: { flightPlaceId: 'JFK', name: 'New York JFK', type: 'Airport' }, departure: "2024-02-20T11:00:00", arrival: "2024-02-20T14:05:00", durationInMinutes: 485, flightNumber: 'BA117' }]
          },
          {
            id: "leg-4b-return", origin: { id: "JFK", name: "New York JFK", displayCode: "JFK" }, destination: { id: "LHR", name: "London Heathrow", displayCode: "LHR" }, durationInMinutes: 455, stopCount: 0, departure: "2024-02-28T21:00:00", arrival: "2024-03-01T09:35:00",
            carriers: { marketing: [{ id: -32740, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/BA.png", name: "British Airways" }] },
            segments: [{ id: "seg-4b", origin: { flightPlaceId: 'JFK', name: 'New York JFK', type: 'Airport' }, destination: { flightPlaceId: 'LHR', name: 'London Heathrow', type: 'Airport' }, departure: "2024-02-28T21:00:00", arrival: "2024-02-29T09:35:00", durationInMinutes: 455, flightNumber: 'BA112' }]
          }
        ],
        isSelfTransfer: false, tags: [], score: 0.9,
      },
      { // Vuelo 9: 1 Parada - Air France
        id: "mock-9",
        price: { raw: 499.00, formatted: "$499" },
        legs: [
          {
            id: "leg-9a", origin: { id: "LHR", name: "London Heathrow", displayCode: "LHR" }, destination: { id: "JFK", name: "New York JFK", displayCode: "JFK" }, durationInMinutes: 650, stopCount: 1, departure: "2024-02-20T09:30:00", arrival: "2024-02-20T15:20:00",
            carriers: { marketing: [{ id: -32758, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/AF.png", name: "Air France" }] },
            segments: [
                { id: "seg-9a", origin: { flightPlaceId: 'LHR', name: 'London Heathrow', type: 'Airport' }, destination: { flightPlaceId: 'CDG', name: 'Paris Charles de Gaulle', type: 'Airport' }, departure: "2024-02-20T09:30:00", arrival: "2024-02-20T11:50:00", durationInMinutes: 80, flightNumber: 'AF1581' },
                { id: "seg-9b", origin: { flightPlaceId: 'CDG', name: 'Paris Charles de Gaulle', type: 'Airport' }, destination: { flightPlaceId: 'JFK', name: 'New York JFK', type: 'Airport' }, departure: "2024-02-20T13:30:00", arrival: "2024-02-20T15:20:00", durationInMinutes: 470, flightNumber: 'AF006' }
            ]
          },
          {
            id: "leg-9b-return", origin: { id: "JFK", name: "New York JFK", displayCode: "JFK" }, destination: { id: "LHR", name: "London Heathrow", displayCode: "LHR" }, durationInMinutes: 620, stopCount: 1, departure: "2024-02-28T18:00:00", arrival: "2024-03-01T07:20:00",
            carriers: { marketing: [{ id: -32758, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/AF.png", name: "Air France" }] },
            segments: [
                { id: "seg-9c", origin: { flightPlaceId: 'JFK', name: 'New York JFK', type: 'Airport' }, destination: { flightPlaceId: 'CDG', name: 'Paris Charles de Gaulle', type: 'Airport' }, departure: "2024-02-28T18:00:00", arrival: "2024-02-29T07:00:00", durationInMinutes: 420, flightNumber: 'AF007' },
                { id: "seg-9d", origin: { flightPlaceId: 'CDG', name: 'Paris Charles de Gaulle', type: 'Airport' }, destination: { flightPlaceId: 'LHR', name: 'London Heathrow', type: 'Airport' }, departure: "2024-02-29T08:20:00", arrival: "2024-02-29T08:40:00", durationInMinutes: 80, flightNumber: 'AF1580' }
            ]
          }
        ],
        isSelfTransfer: false, tags: [], score: 0.75,
      },
      { // Vuelo 10: 1 Parada - KLM
        id: "mock-10",
        price: { raw: 440.00, formatted: "$440" },
        legs: [
          {
            id: "leg-10a", origin: { id: "LHR", name: "London Heathrow", displayCode: "LHR" }, destination: { id: "JFK", name: "New York JFK", displayCode: "JFK" }, durationInMinutes: 690, stopCount: 1, departure: "2024-02-20T12:00:00", arrival: "2024-02-20T18:30:00",
            carriers: { marketing: [{ id: -32725, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/KL.png", name: "KLM" }] },
            segments: [
                { id: "seg-10a", origin: { flightPlaceId: 'LHR', name: 'London Heathrow', type: 'Airport' }, destination: { flightPlaceId: 'AMS', name: 'Amsterdam Schiphol', type: 'Airport' }, departure: "2024-02-20T12:00:00", arrival: "2024-02-20T14:15:00", durationInMinutes: 75, flightNumber: 'KL1010' },
                { id: "seg-10b", origin: { flightPlaceId: 'AMS', name: 'Amsterdam Schiphol', type: 'Airport' }, destination: { flightPlaceId: 'JFK', name: 'New York JFK', type: 'Airport' }, departure: "2024-02-20T16:00:00", arrival: "2024-02-20T18:30:00", durationInMinutes: 450, flightNumber: 'KL643' }
            ]
          },
          {
            id: "leg-10b-return", origin: { id: "JFK", name: "New York JFK", displayCode: "JFK" }, destination: { id: "LHR", name: "London Heathrow", displayCode: "LHR" }, durationInMinutes: 630, stopCount: 1, departure: "2024-02-28T22:00:00", arrival: "2024-03-01T11:30:00",
            carriers: { marketing: [{ id: -32725, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/KL.png", name: "KLM" }] },
            segments: [
                { id: "seg-10c", origin: { flightPlaceId: 'JFK', name: 'New York JFK', type: 'Airport' }, destination: { flightPlaceId: 'AMS', name: 'Amsterdam Schiphol', type: 'Airport' }, departure: "2024-02-28T22:00:00", arrival: "2024-02-29T10:30:00", durationInMinutes: 450, flightNumber: 'KL644' },
                { id: "seg-10d", origin: { flightPlaceId: 'AMS', name: 'Amsterdam Schiphol', type: 'Airport' }, destination: { flightPlaceId: 'LHR', name: 'London Heathrow', type: 'Airport' }, departure: "2024-02-29T12:00:00", arrival: "2024-02-29T12:30:00", durationInMinutes: 90, flightNumber: 'KL1011' }
            ]
          }
        ],
        isSelfTransfer: false, tags: [], score: 0.68,
      }
    ],
  },
};