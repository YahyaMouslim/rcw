const fs = require('fs');

function renderTemplate(templateName, data) {
    const templatePath = `src/api/helpers/${templateName}.html`;
    const template = fs.readFileSync(templatePath, 'utf-8');
    const renderedTemplate = replacePlaceholders(template, data);
    return renderedTemplate;
}

function replacePlaceholders(template, data) {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return data[key] || match;
    });
}



function isTimestampNotPassed(timestampInSeconds) {
    const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    return timestampInSeconds > currentTimestamp;
}

module.exports = {
    renderTemplate,
    isTimestampNotPassed
}