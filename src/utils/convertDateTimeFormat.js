export const convertDateTimeFormat = (datetime) => {
    const formattedText = datetime.replace(/(\d{2}:\d{2}) (\d{2}-\d{2}-\d{4})/, '$1, $2')
    return formattedText
}