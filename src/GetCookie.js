const getCookieValue = (cookieName) => {
    // Split the document.cookie string into individual cookies
    const cookies = document.cookie.split(';');

    // Loop through the cookies to find the one with the specified name
    for (const cookie of cookies) {
        const cookieParts = cookie.trim().split('=');
        const name = cookieParts[0];
        if (name === cookieName) {
            // If the cookie name matches, return the cookie value
            return cookieParts[1];
        }
    }

    // Return null if the cookie is not found
    return null;
}

export default getCookieValue;