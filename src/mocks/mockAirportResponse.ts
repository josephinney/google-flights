import { SearchAirportResponse } from "@/types/flights";

export const mockAirportApiResponse: SearchAirportResponse = {
  status: true,
  timestamp: 1691008938320,
  data: [
    // --- New York ---
    {
      presentation: {
        title: "New York",
        suggestionTitle: "New York (Any)",
        subtitle: "United States"
      },
      navigation: {
        entityId: "27537542",
        entityType: "CITY",
        localizedName: "New York",
        relevantFlightParams: {
          skyId: "NYCA",
          entityId: "27537542",
          flightPlaceType: "CITY",
          localizedName: "New York"
        }
      }
    },
    {
      presentation: {
        title: "New York Newark",
        suggestionTitle: "New York Newark (EWR)",
        subtitle: "United States"
      },
      navigation: {
        entityId: "95565059",
        entityType: "AIRPORT",
        localizedName: "New York Newark",
        relevantFlightParams: {
          skyId: "EWR",
          entityId: "95565059",
          flightPlaceType: "AIRPORT",
          localizedName: "New York Newark"
        }
      }
    },
    {
      presentation: {
        title: "New York John F. Kennedy",
        suggestionTitle: "New York John F. Kennedy (JFK)",
        subtitle: "United States"
      },
      navigation: {
        entityId: "95565058",
        entityType: "AIRPORT",
        localizedName: "New York John F. Kennedy",
        relevantFlightParams: {
          skyId: "JFK",
          entityId: "95565058",
          flightPlaceType: "AIRPORT",
          localizedName: "New York John F. Kennedy"
        }
      }
    },

    
    // --- London ---
    {
      presentation: {
        title: "London",
        suggestionTitle: "London (Any)",
        subtitle: "United Kingdom"
      },
      navigation: {
        entityId: "27544008",
        entityType: "CITY",
        localizedName: "London",
        relevantFlightParams: {
          skyId: "LOND",
          entityId: "27544008",
          flightPlaceType: "CITY",
          localizedName: "London"
        }
      }
    },
    {
      presentation: {
        title: "London Heathrow",
        suggestionTitle: "London Heathrow (LHR)",
        subtitle: "United Kingdom"
      },
      navigation: {
        entityId: "95565050",
        entityType: "AIRPORT",
        localizedName: "London Heathrow",
        relevantFlightParams: {
          skyId: "LHR",
          entityId: "95565050",
          flightPlaceType: "AIRPORT",
          localizedName: "London Heathrow"
        }
      }
    },
    {
        presentation: {
          title: "London Gatwick",
          suggestionTitle: "London Gatwick (LGW)",
          subtitle: "United Kingdom"
        },
        navigation: {
          entityId: "95565051",
          entityType: "AIRPORT",
          localizedName: "London Gatwick",
          relevantFlightParams: {
            skyId: "LGW",
            entityId: "95565051",
            flightPlaceType: "AIRPORT",
            localizedName: "London Gatwick"
          }
        }
      }
  ]
};