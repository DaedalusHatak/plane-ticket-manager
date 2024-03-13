"use server";

export const handleFlightForm = async (
    formData: FormData,
    airports: Airport[]
  ) => {
    const targetLink = {
      origin: formData.get("origin"),
      destination: formData.get("destination"),
    };
    const isError = { origin: false, destination: false };
    if (!targetLink.origin && !targetLink.destination) {
      isError.origin = true;
      isError.destination = true;
    } else {
      const checkOrigin =
        targetLink.origin === "All airports"
          ? airports
          : airports.filter(
              (airport: Airport) =>
                airport.airportname.toLowerCase() ===
                targetLink.origin?.toString().toLowerCase()
            );
      const checkDestination =
        targetLink.destination === "All airports"
          ? airports
          : airports.filter(
              (airport: Airport) =>
                airport.airportname.toLowerCase() ===
                targetLink.destination?.toString().toLowerCase()
            );


            targetLink.origin =
            targetLink.origin === "All airports"
              ? "all-flights"
              : targetLink.origin;

          targetLink.destination =
            targetLink.destination === "All airports"
              ? "all-flights"
              : targetLink.destination;


      if (targetLink.origin !== "all-flights" && checkOrigin.length !== 1) {
        isError.origin = true;
      }
  
      if (
        targetLink.destination !== "all-flights" &&
        checkDestination.length !== 1
      ) {
        isError.destination = true;
      }
      

      
    }

  return { targetLink, isError };
  };
  