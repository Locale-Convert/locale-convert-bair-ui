export function getLocalizedField(fieldName, language, data) {
    if (!data || typeof data !== 'object') {
        console.error('Data is invalid or missing.');
        return null;
    }

    const fieldKey = `${fieldName}_${language}`;

    if (!data.hasOwnProperty(fieldKey)) {
        console.error(`Field "${fieldName}" for language "${language}" is missing.`);
        return null;
    }

    return data[fieldKey];
}