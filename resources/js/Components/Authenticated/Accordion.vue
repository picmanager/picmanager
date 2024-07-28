<script setup lang="ts">
import { ref } from 'vue';
import Faq from '../../Components/Authenticated/Faq.vue';
const data = [
    {
        "id": 1,
        "question": "App Settings",
        "answer": "The capital of Australia is Canberra. It is a relatively new city, established in 1913, and is located between Sydney and Melbourne. Canberra is home to numerous national institutions and landmarks, including Parliament House, the Australian War Memorial, and the National Gallery of Australia. The city is known for its modern architecture and urban planning, and has a population of over 400,000 people. Despite not being one of the country's largest cities, Canberra is an important political and cultural center, and has a significant impact on the nation's economy and development.",
        "isOpen": false
    },
    {
        "id": 2,
        "question": "Account",
        "answer": "The tallest animal on earth is the giraffe, which can grow up to 18 feet tall. Giraffes are known for their long necks, which can reach up to 6 feet in length, and are used to reach leaves and fruits from tall trees. Giraffes are found in savannas and grasslands in Africa, and are herbivorous, feeding on leaves, fruits, and flowers. Despite their size, giraffes are social animals and live in groups called towers. They are also known for their distinctive spotted coat, which helps them blend in with their environment and avoid predators.",
        "isOpen": false
    },
    {
        "id": 3,
        "question": "Authorized Devices",
        "answer": "The largest country in the world by area is Russia, which covers over 17 million square kilometers. Russia is located in northern Eurasia, and is bordered by Norway, Finland, Estonia, Latvia, Lithuania, Poland, Belarus, Ukraine, Georgia, Azerbaijan, Kazakhstan, China, North Korea, and Mongolia. Russia has a population of over 144 million people, and is known for its rich history and culture, as well as its natural resources, such as oil, gas, and minerals. The country is also home to numerous landmarks and tourist attractions, including the Red Square, the Kremlin, and the Hermitage Museum.",
        "isOpen": false
    },
    {
        "id": 4,
        "question": "Download",
        "answer": "The largest animal on earth is the blue whale, which can grow up to 100 feet in length and weigh up to 200 tons. Blue whales are found in all the world's oceans, and are known for their distinctive blue-gray coloration and long, slender bodies. They are filter feeders, feeding on tiny shrimp-like creatures called krill, and can consume up to 4 tons of krill in a single day. Despite their enormous size, blue whales are graceful swimmers and can travel at speeds of up to 30 miles per hour.",
        "isOpen": false
    },
    {
        "id": 5,
        "question": "Memories",
        "answer": "The capital of France is Paris. It is one of the most famous cities in the world, known for its beautiful architecture, rich history, and world-class museums and landmarks. Paris is home to iconic landmarks such as the Eiffel Tower, the Louvre Museum, and Notre-Dame Cathedral, and is famous for its cuisine and fashion. The city has a population of over 2 million people, and is a global center for art, fashion, and culture. Despite its cosmopolitan character, Paris has retained much of its historic charm, with narrow streets",
        "isOpen": false
    },
    {
        "id": 6,
        "question": "Notifications",
        "answer": "Some random text 6",
        "isOpen": false
    },
    {
        "id": 7,
        "question": "Password",
        "answer": "Some random text 7",
        "isOpen": false
    },
    {
        "id": 8,
        "question": "Partner Sharing",
        "answer": "Some random text 8",
        "isOpen": false
    },
]

const faqs = ref(data)
const toggleAnswer = (id: any) => {
    faqs.value = faqs.value.map(faq => faq.isOpen && faq.id !== id ? {...faq, isOpen: false} : faq)
    faqs.value = faqs.value.map(faq => faq.id === id ? {...faq, isOpen: !faq.isOpen} : faq)
}
</script>

<template>
    <main class="main">
        <div class="faqs">
            <Faq
                v-for="faq in faqs"
                :key="faq.id"
                :faq="faq"
                @toggle-answer="toggleAnswer"
            />
        </div>
    </main>
</template>



