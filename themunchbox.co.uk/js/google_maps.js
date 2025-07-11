async function fetchGoogleReviews() {
    const url = `https://corsproxy.io/?https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews&key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.result && data.result.reviews) {
            console.log("Business Name:", data.result.name);
            console.log("Reviews:");
            const parent_div = document.getElementById('google-reviews');
            data.result.reviews.forEach(review => {
                if (review.rating == 5 && review.text.length < 400) {
                    console.log(`⭐ ${review.rating} - ${review.author_name}: ${review.text}`);
                    const span = document.createElement('span');
                    span.innerHTML = `&starf;&starf;&starf;&starf;&starf; &mdash; "${review.text}" &mdash; ${review.author_name}`
                    const div = document.createElement('div');
                    div.appendChild(span);
                    parent_div.appendChild(div);
                }
            });
        } else {
            console.log("No reviews found.");
        }
    } catch (error) {
        console.error("Error fetching reviews:", error);
    }
}

fetchGoogleReviews();