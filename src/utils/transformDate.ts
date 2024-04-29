

export function transformDate(date: string) {
    const dateTemplate = /\d\d\d\d-\d\d-\d\d/;

    const transformDate = {
        year: '',
        month: '',
        day: '',
    };

    if (dateTemplate.test(date)) {
        transformDate.year = date.split('-')[0];
        transformDate.month = date.split('-')[1];
        transformDate.day = date.split('-')[2];
    }

    return transformDate;
}