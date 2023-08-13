import { db } from "./server";

export const populateDatabase = async () => {

    const users = [{
        "id": 1,
        "name": "John Doe",
        "city": "New York",
        "country": "USA",
        "favorite_sport": "Basketball"
    },
    {
        "id": 2,
        "name": "Jane Smith",
        "city": "London",
        "country": "UK",
        "favorite_sport": "Football"
    },
    {
        "id": 3,
        "name": "Mike Johnson",
        "city": "Paris",
        "country": "France",
        "favorite_sport": "Tennis"
    },
    {
        "id": 4,
        "name": "Karen Lee",
        "city": "Tokyo",
        "country": "Japan",
        "favorite_sport": "Swimming"
    },
    {
        "id": 5,
        "name": "Tom Brown",
        "city": "Sydney",
        "country": "Australia",
        "favorite_sport": "Running"
    },
    {
        "id": 6,
        "name": "Emma Wilson",
        "city": "Berlin",
        "country": "Germany",
        "favorite_sport": "Basketball"
    }]

    db.serialize(() => {
        const stmt = db.prepare('INSERT INTO users (name, city, country, favorite_sport) VALUES (?, ?, ?, ?)');
        users.forEach(user => stmt.run(user.name, user.city, user.country, user.favorite_sport));
        stmt.finalize();
    });

}
