import bcrypt from 'bcryptjs'

const data = {
    users: [
        {
            name: "John",
            email: "admin@example.com",
            password: bcrypt.hashSync("123456"),
            isAdmin: true,
        },
        {
            name: "Jane",
            email: "user@example.com",
            password: bcrypt.hashSync("123456"),
            isAdmin: false,
        },
    ],
    products: [
        {
            name: "Formal Shirt",
            slug: "formal-shirt",
            category: "Shirt",
            image: "/images/shirt1.jpg",
            price: 400,
            brand: "Nike",
            rating: 4.5,
            numReviews: 10,
            countInStock: 20,
            description: "A Formal Shirt",
        },
        {
            name: "Fit Shirt",
            slug: "fit-shirt",
            category: "Shirt",
            image: "/images/shirt2.jpg",
            price: 800,
            brand: "Jockey",
            rating: 4,
            numReviews: 10,
            countInStock: 20,
            description: "A Fit Shirt",
        },
        {
            name: "Partywear Shirt",
            slug: "partywear-shirt",
            category: "Shirt",
            image: "/images/shirt3.jpg",
            price: 1000,
            brand: "H & M",
            rating: 4.8,
            numReviews: 10,
            countInStock: 20,
            description: "A popular Shirt",
        },
        {
            name: "Formal Pants",
            slug: "formal-pants",
            category: "Pants",
            image: "/images/pants1.jpg",
            price: 700,
            brand: "C & C",
            rating: 3.5,
            numReviews: 10,
            countInStock: 20,
            description: "A popular Pant",
        },
        {
            name: "Jogger Pants",
            slug: "jogger-pants",
            category: "Pants",
            image: "/images/pants2.jpg",
            price: 600,
            brand: "Victor",
            rating: 4,
            numReviews: 10,
            countInStock: 20,
            description: "A popular Pant design",
        },

    ]
}

export default data;