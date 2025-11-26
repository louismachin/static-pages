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

// fetchGoogleReviews();

const reviews = [
    {
        rating: 5,
        author_name: "Danni Ware",
        text: "Dawn and her team supplied the food for our wedding In late August 2025 and I couldn’t recommend them enough! Food was amazing, such a brilliant selection and the service and layout was beautiful and I’m so greatful for everything they did. Thank you Dawn we are forever grateful! 🤍🤍🤍",
        date: "2025-09-15"
    },
    {
        rating: 5,
        author_name: "Kel Conway",
        text: "Fabulous service and food .. highly recommend",
        date: "2025-09-10"
    },
    {
        rating: 5,
        author_name: "Sarah Crawford",
        text: "The doorstop sandwiches are genuinely unbeatable. The best sandwiches you can get. I honestly cannot recommend enough, and the staff are absolutely delightful, too!",
        date: "2025-01-10"
    },
];

function displayReviews() {
    const parent_div = document.getElementById('google-reviews');
    reviews.forEach(review => {
        if (review.rating === 5 && review.text.length < 400) {
            const span = document.createElement('span');
            span.innerHTML = `⭐⭐⭐⭐⭐ — "${review.text}" — ${review.author_name}`;
            const div = document.createElement('div');
            div.appendChild(span);
            parent_div.appendChild(div);
        }
    });
}