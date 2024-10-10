import React from "react";

type Time = {
    clockTimeString: string;
    dateString: string;
}

// a hook that returns the current time
export const useCurrentTime = () => {
    const [time, setTime] = React.useState<Time>({
        clockTimeString: "",
        dateString: ""
    });

    React.useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setTime({
                clockTimeString: now.toLocaleTimeString(),
                dateString: now.toDateString()
            });
        };

        updateClock();
        const intervalId = setInterval(updateClock, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return time;
}