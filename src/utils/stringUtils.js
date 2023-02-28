const getFirstLettersFromName = (name) => {
    const firstAndLastIndex = (index) => index === 0 || index === name.split(" ").length - 1;
    return name
        .split(" ")
        .reduce(
            (acc, val, index) => (
                firstAndLastIndex(index) ? (acc + val.charAt(0).toUpperCase()) : acc
            ),
            ""
        );
}

const getSubstringFromString = (string, start, end) => {
    if (string.length < end) {
        return string;
    }
    return string.substring(start, end) + "...";
}

export { getFirstLettersFromName, getSubstringFromString };