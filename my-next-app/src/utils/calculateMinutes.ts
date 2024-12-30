export function calculateMinutes(startDate: Date): number {
    const now = new Date();
    if (!(startDate instanceof Date) || isNaN(startDate.getTime())) {
        throw new Error('Invalid date provided');
    }
    const difference = now.getTime() - startDate.getTime();
    return Math.floor(difference / (1000 * 60));
}