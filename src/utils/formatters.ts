import dayjs from 'dayjs';

// Format date to "HH:mm AM/PM"
export const formatTime = (dateString: string): string => {
    return dayjs(dateString).format('h:mm A');
};

// Format time duration to a "Xh Ym"
export const formatDuration = (minutes: number): string => {
    if (isNaN(minutes) || minutes < 0) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
};