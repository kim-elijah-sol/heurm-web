export const getDayText = (day: number) => {
    return {
        0: 'Sun',
        1: 'Mon',
        2: 'Tue',
        3: 'Wed',
        4: 'Tur',
        5: 'Fri',
        6: 'Sat',
    }[day] ?? 'Unknown'
}