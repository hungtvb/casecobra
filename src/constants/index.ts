export const FEATURES = [
    "High-quality, durable material",
    "5 years print guarantee",
    "Modern Iphone models supported",
];

export const USER_FEEDBACKS = [
    {
        rating: 5,
        comment: "I absolutely love my new phone case from CaseCobra! The custom-printed design looks even better in person than I expected, and the quality is top-notch. It fits my phone perfectly and provides excellent protection. Plus, the customer service was exceptional—I received prompt responses to my inquiries. Overall, I'm thrilled with my purchase and would definitely recommend CaseCobra to friends and family!",
        name: "Harry",
        image: '/users/user-1.png'
    },
    {
        rating: 5,
        comment: "I'm beyond impressed with my experience with CaseCobra! The custom phone case I ordered exceeded my expectations—the print quality is exceptional, and the case itself feels durable and well-made. Not only did I receive compliments on the unique design, but the shipping was also surprisingly fast. I appreciate the attention to detail and the care taken in crafting the perfect case for my phone. I'll definitely be returning for more custom designs in the future!",
        name: "Emily",
        image: '/users/user-2.png'
    }
]

export const PHONES = [
    "/testimonials/1.jpg",
    "/testimonials/2.jpg",
    "/testimonials/3.jpg",
    "/testimonials/4.jpg",
    "/testimonials/5.jpg",
    "/testimonials/6.jpg",
]

export const ANIMATION_DELAY = [
    "0s",
    "0.1s",
    "0.2s",
    "0.3s",
    "0.4s",
    "0.5s"
]

export const STEPS = [
    {
        name: "Step 1: Add image",
        description: "Choose an image for your case",
        url: "/upload"
    },
    {
        name: "Step 2: Customise design",
        description: "Make the case yours",
        url: "/design"
    }, 
    {
        name: "Step 3: Summary",
        description: "Review your final design",
        url: "/preview"
    }
]

export const PRODUCT_PRICE = {

    material: {
        silicone: 0,
        polycarbonate: 5_00,
    },
    finish: {
        smooth: 0,
        textured: 3_00
    }
} as const;

export const BASE_PRICE = 14_00