# Capstone Project Backend
## Built by Bijan Saniee

## DEPENDENCIES
- express
- mongoose
- cors
- morgan
- dotenv

## MODELS
Movie:
- title: string
- director: string
- genre: string
- coverImage: string
- description: string

## BACKEND ROUTE TABLE
| url | method | action |
|-----|--------|--------|
| /movies | get | getting all the movies (index)||
| /movies | post | posting a new movie (create) |
| /movies/:id | put | updating a movie (update) |
| /movies/:id | delete | delete the movie (destroy) |