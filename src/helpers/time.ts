export function formatTime (ms: number): string {
    // function takes duration in ms and formats it to days, hours, mins, seconds as in 1d 2h 30' 5''
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor((ms / 1000 / 60 / 60) % 24);
    const days = Math.floor((ms/ 1000 / 60 / 60 / 24) % 24);

    return [
        `${days.toString().padStart(2, "0")}d`,
        `${hours.toString().padStart(2, "0")}h`,
        `${minutes.toString().padStart(2, "0")}'`,
        `${seconds.toString().padStart(2, "0")}''`
    ].join(" ");
}