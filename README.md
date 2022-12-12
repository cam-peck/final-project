# RunningFuze

A PERN-stack web application for runners to track their run progress over the week, month, and year.

## Why Build This?

I love to run, but I struggle to get up early enough to get my run in before work. Inspired by GitHub squares, I built RunningFuze to help motivate me to get up and run while simultaneously tracking my run-data.

## Techonologies Used

- React
- Node
- Express
- PostgreSQL
- D3
- TailwindCSS (via PostCSS plugin)
- AWS E2
- Webpack

## Live Deployment

- https://runningfuze.cjpeck.dev/

## MVP Features

- User Can Create an Account
- User Can Login to an Account
- User Can View Profile Information
- User Can Add a Run
- User Can View Their Runs
- User Can Edit Their Runs
- User Can Delete Their Runs
- User Can View Their RunSquares
- User Can View Weekly Run Data
- User Can Add Custom Workout (pending)
- User Can View Custom Workouts (pending)
- User Can Edit Custom Workouts (pending)
- User Can delete Custom Workouts (pending)

## Stretch Features

- User Can Add GPS Data (.gpx) to Runs
- User Can View Pace & Elevation Data for Runs
- User Can View Labels on Weekly Run Chart

## Preview

## Development

### System Requirements
- Node.js v18 or higher
- NPM v8 or higher
- PostgreSQL

### Getting Started
1. Clone the repository.
```
git clone https://github.com/cam-peck/runningfuze.git
cd runningfuze
```

2. Install all dependencies with NPM.
```
npm install
```

3. Make a copy of the provided `env.example` file. Name your copy `.env`. Change the `DATABASE_URL` to `runningFuze`.
```
cp .env.example .env
```

4. Import the example database to PostgreSQL.
```
sudo service postgresql start
createdb runningFuze
npm run db:import
```

5. To view the database in your browser, use pgweb.
```
pgweb --db=runningFuze
```

6. Start the project. Once running, you can view the application by opening http://localhost:3000 in your browser.
```
npm run dev
```
