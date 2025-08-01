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
      {
        id: "mock-1",
        price: {
          raw: 419.18,
          formatted: "$420",
        },
        legs: [
          {
            id: "leg-1a",
            origin: { id: "LGW", name: "London Gatwick", displayCode: "LGW" },
            destination: { id: "JFK", name: "New York John F. Kennedy", displayCode: "JFK" },
            durationInMinutes: 495,
            stopCount: 0,
            departure: "2024-02-20T12:35:00",
            arrival: "2024-02-20T15:50:00",
            carriers: {
              marketing: [{ id: -30598, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/I%29.png", name: "Norse Atlantic Airways" }],
            },
            segments: [],
          },
        ],
        isSelfTransfer: false,
        tags: ["cheapest", "shortest"],
        score: 0.998502,
      },
      {
        id: "mock-2",
        price: {
          raw: 527.97,
          formatted: "$528",
        },
        legs: [
          {
            id: "leg-2a",
            origin: { id: "LHR", name: "London Heathrow", displayCode: "LHR" },
            destination: { id: "JFK", name: "New York John F. Kennedy", displayCode: "JFK" },
            durationInMinutes: 665,
            stopCount: 1,
            departure: "2024-02-20T07:50:00",
            arrival: "2024-02-20T13:55:00",
            carriers: {
              marketing: [{ id: -32753, logoUrl: "https://logos.skyscnr.com/images/airlines/favicon/EI.png", name: "Aer Lingus" }],
            },
            segments: [],
          },
        ],
        isSelfTransfer: false,
        tags: ["1 stop"],
        score: 0.58567,
      },
    ],
  },
};