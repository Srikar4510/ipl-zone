// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const Team = require('./models/Team');

// dotenv.config();

// const teamsData = [
//   {
//     name: 'Kolkata Knight Riders',
//     players: [
//       // Batters (9)
//       { name: 'A Rahane', role: 'Batsman' },
//       { name: 'Q D Kock', role: 'Batsman (wk)' },
//       { name: 'R Gurbaz', role: 'Batsman (wk)' },
//       { name: 'A Raghuvanshi', role: 'Batsman' },
//       { name: 'L S Sisodia', role: 'Batsman (wk)' },
//       { name: 'R Singh', role: 'Batsman' },
//       { name: 'M Pandey', role: 'Batsman' },
//       { name: 'R Powell', role: 'Batsman' },
//       { name: 'R Singh', role: 'Batsman' },
//       // Bowlers (7)
//       { name: 'A Nortje', role: 'Bowler' },
//       { name: 'V Arora', role: 'Bowler' },
//       { name: 'M Markande', role: 'Bowler' },
//       { name: 'S Johnson', role: 'Bowler' },
//       { name: 'H Rana', role: 'Bowler' },
//       { name: 'V Chakaravarthy', role: 'Bowler' },
//       { name: 'C Sakariya', role: 'Bowler' },
//       // All Rounders (5)
//       { name: 'A Russell', role: 'All Rounder' },
//       { name: 'M Ali', role: 'All Rounder' },
//       { name: 'A Roy', role: 'All Rounder' },
//       { name: 'V Iyer', role: 'All Rounder' },
//       { name: 'S Narine', role: 'All Rounder' },
//     ]
//   },
//   {
//     name: 'Royal Challengers Bengaluru',
//     players: [
//       // Batters (7)
//       { name: 'R Patidar', role: 'Batsman (c)' },
//       { name: 'V Kohli', role: 'Batsman' },
//       { name: 'P Salt', role: 'Batsman (wk)' },
//       { name: 'D Padikkal', role: 'Batsman' },
//       { name: 'S Chikara', role: 'Batsman' },
//       { name: 'J Sharma', role: 'Batsman (wk)' },
//       { name: 'T David', role: 'Batsman' },
//       // Bowlers (9)
//       { name: 'S Singh', role: 'Bowler' },
//       { name: 'J Hazlewood', role: 'Bowler' },
//       { name: 'R Salam', role: 'Bowler' },
//       { name: 'S Sharma', role: 'Bowler' },
//       { name: 'B Kumar', role: 'Bowler' },
//       { name: 'N Thushara', role: 'Bowler' },
//       { name: 'L Ngidi', role: 'Bowler' },
//       { name: 'Y Dayal', role: 'Bowler' },
//       { name: 'A Singh', role: 'Bowler' },
//       // All Rounders (6)
//       { name: 'L Livingstone', role: 'All Rounder' },
//       { name: 'K Pandya', role: 'All Rounder' },
//       { name: 'J Bethell', role: 'All Rounder' },
//       { name: 'R Shepherd', role: 'All Rounder' },
//       { name: 'M S Bhandage', role: 'All Rounder' },
//       { name: 'M Rathee', role: 'All Rounder' },
//     ]
//   },
//   {
//     name: 'Mumbai Indians',
//     players: [
//       // Batters (7)
//       { name: 'R Sharma', role: 'Batsman' },
//       { name: 'S Yadav', role: 'Batsman' },
//       { name: 'R Rickelton', role: 'Batsman (wk)' },
//       { name: 'B Jacobs', role: 'Batsman' },
//       { name: 'R Minz', role: 'Batsman (wk)' },
//       { name: 'K Shrijith', role: 'Batsman (wk)' },
//       { name: 'W Jacks', role: 'Batsman' },
//       // Bowlers (10)
//       { name: 'D Chahar', role: 'Bowler' },
//       { name: 'T Boult', role: 'Bowler' },
//       { name: 'J Bumrah', role: 'Bowler' },
//       { name: 'M U Rahman', role: 'Bowler' },
//       { name: 'R Topley', role: 'Bowler' },
//       { name: 'K Sharma', role: 'Bowler' },
//       { name: 'A Tendulkar', role: 'Bowler' },
//       { name: 'V Puthur', role: 'Bowler' },
//       { name: 'A Kumar', role: 'Bowler' },
//       { name: 'S Raju', role: 'Bowler' },
//       // All Rounders (6)
//       { name: 'H Pandya', role: 'All Rounder (c)' },
//       { name: 'T Varma', role: 'All Rounder' },
//       { name: 'N Dhir', role: 'All Rounder' },
//       { name: 'M Santner', role: 'All Rounder' },
//       { name: 'R A Bawa', role: 'All Rounder' },
//       { name: 'C Bosch', role: 'All Rounder' },
//     ]
//   },
//   {
//     name: 'Chennai Super Kings',
//     players: [
//       // Batters (7)
//       { name: 'R Gaikwad', role: 'Batsman (c)' },
//       { name: 'D Conway', role: 'Batsman (wk)' },
//       { name: 'M Dhoni', role: 'Batsman (wk)' },
//       { name: 'R Tripathi', role: 'Batsman' },
//       { name: 'S Rasheed', role: 'Batsman' },
//       { name: 'V Bedi', role: 'Batsman (wk)' },
//       { name: 'C A Siddarth', role: 'Batsman' },
//       // Bowlers (7)
//       { name: 'K Nagarkoti', role: 'Bowler' },
//       { name: 'M Choudhary', role: 'Bowler' },
//       { name: 'N Ellis', role: 'Bowler' },
//       { name: 'K Ahmed', role: 'Bowler' },
//       { name: 'N Ahmad', role: 'Bowler' },
//       { name: 'G Singh', role: 'Bowler' },
//       { name: 'M Pathirana', role: 'Bowler' },
//       // All Rounders (11)
//       { name: 'R Ravindra', role: 'All Rounder' },
//       { name: 'S Dube', role: 'All Rounder' },
//       { name: 'D Hooda', role: 'All Rounder' },
//       { name: 'V Shankar', role: 'All Rounder' },
//       { name: 'S Curran', role: 'All Rounder' },
//       { name: 'J Overton', role: 'All Rounder' },
//       { name: 'R Jadeja', role: 'All Rounder' },
//       { name: 'R Ashwin', role: 'All Rounder' },
//       { name: 'A Kamboj', role: 'All Rounder' },
//       { name: 'R Ghosh', role: 'All Rounder' },
//       { name: 'S Gopal', role: 'All Rounder' },
//     ]
//   },
//   {
//     name: 'Delhi Capitals',
//     players: [
//       // Batters (8)
//       { name: 'K Rahul', role: 'Batsman (wk)' },
//       { name: 'A Porel', role: 'Batsman (wk)' },
//       { name: 'J Fraser-McGurk', role: 'Batsman' },
//       { name: 'F D Plessis', role: 'Batsman' },
//       { name: 'T Stubbs', role: 'Batsman (wk)' },
//       { name: 'A Sharma', role: 'Batsman' },
//       { name: 'S Rizvi', role: 'Batsman' },
//       { name: 'K Nair', role: 'Batsman' },
//       // Bowlers (8)
//       { name: 'D Nalkande', role: 'Bowler' },
//       { name: 'V Nigam', role: 'Bowler' },
//       { name: 'M Starc', role: 'Bowler' },
//       { name: 'M Kumar', role: 'Bowler' },
//       { name: 'K Yadav', role: 'Bowler' },
//       { name: 'T Natarajan', role: 'Bowler' },
//       { name: 'M Sharma', role: 'Bowler' },
//       { name: 'D Chameera', role: 'Bowler' },
//       // All Rounders (6)
//       { name: 'A Patel', role: 'All Rounder (c)' },
//       { name: 'D Ferreira', role: 'All Rounder' },
//       { name: 'M Kumar', role: 'All Rounder' },
//       { name: 'A J Mandal', role: 'All Rounder' },
//       { name: 'M Tiwari', role: 'All Rounder' },
//       { name: 'T Vijay', role: 'All Rounder' },
//     ]
//   },
//   {
//     name: 'Punjab Kings',
//     players: [
//       // Batters (8)
//       { name: 'S Iyer', role: 'Batsman (c)' },
//       { name: 'P Singh', role: 'Batsman (wk)' },
//       { name: 'J Inglis', role: 'Batsman' },
//       { name: 'V Vinod', role: 'Batsman' },
//       { name: 'S Singh', role: 'Batsman' },
//       { name: 'H Singh', role: 'Batsman' },
//       { name: 'N Wadhera', role: 'Batsman' },
//       { name: 'P Avinash', role: 'Batsman' },
//       // Bowlers (9)
//       { name: 'H Brar', role: 'Bowler' },
//       { name: 'A Singh', role: 'Bowler' },
//       { name: 'Y Chahal', role: 'Bowler' },
//       { name: 'L Ferguson', role: 'Bowler' },
//       { name: 'Y R Thakur', role: 'Bowler' },
//       { name: 'V Vijaykumar', role: 'Bowler' },
//       { name: 'P Dubey', role: 'Bowler' },
//       { name: 'X Bartlett', role: 'Bowler' },
//       { name: 'K Sen', role: 'Bowler' },
//       // All Rounders (8)
//       { name: 'M Stoinis', role: 'All Rounder' },
//       { name: 'G Maxwell', role: 'All Rounder' },
//       { name: 'A Omarzai', role: 'All Rounder' },
//       { name: 'A Hardie', role: 'All Rounder' },
//       { name: 'M A Khan', role: 'All Rounder' },
//       { name: 'M Jansen', role: 'All Rounder' },
//       { name: 'P Arya', role: 'All Rounder' },
//       { name: 'S Shedge', role: 'All Rounder' },
//     ]
//   },
//   {
//     name: 'Sunrisers Hyderabad',
//     players: [
//       // Batters (5)
//       { name: 'T Head', role: 'Batsman' },
//       { name: 'I Kishan', role: 'Batsman (wk)' },
//       { name: 'H Klaasen', role: 'Batsman (wk)' },
//       { name: 'S Baby', role: 'Batsman' },
//       { name: 'A Verma', role: 'Batsman' },
//       // Bowlers (8)
//       { name: 'P Cummins', role: 'Bowler (c)' },
//       { name: 'H Patel', role: 'Bowler' },
//       { name: 'M Shami', role: 'Bowler' },
//       { name: 'A Zampa', role: 'Bowler' },
//       { name: 'R Chahar', role: 'Bowler' },
//       { name: 'J Unadkat', role: 'Bowler' },
//       { name: 'E Malinga', role: 'Bowler' },
//       { name: 'S Singh', role: 'Bowler' },
//       // All Rounders (7)
//       { name: 'A Sharma', role: 'All Rounder' },
//       { name: 'A Manohar', role: 'All Rounder' },
//       { name: 'A Taide', role: 'All Rounder' },
//       { name: 'K Mendis', role: 'All Rounder' },
//       { name: 'N K Reddy', role: 'All Rounder' },
//       { name: 'W Mulder', role: 'All Rounder' },
//       { name: 'Z Ansari', role: 'All Rounder' },
//     ]
//   },
//   {
//     name: 'Rajasthan Royals',
//     players: [
//       // Batters (9)
//       { name: 'S Samson', role: 'Batsman (c & wk)' },
//       { name: 'Y Jaiswal', role: 'Batsman' },
//       { name: 'S Dubey', role: 'Batsman' },
//       { name: 'S Hetmyer', role: 'Batsman' },
//       { name: 'D Jurel', role: 'Batsman (wk)' },
//       { name: 'V Suryavanshi', role: 'Batsman' },
//       { name: 'K S Rathore', role: 'Batsman (wk)' },
//       { name: 'R Parag', role: 'Batsman' },
//       { name: 'N Rana', role: 'Batsman' },
//       // Bowlers (10)
//       { name: 'Y Singh', role: 'Bowler' },
//       { name: 'J Archer', role: 'Bowler' },
//       { name: 'S Sharma', role: 'Bowler' },
//       { name: 'K Maphaka', role: 'Bowler' },
//       { name: 'F Farooqi', role: 'Bowler' },
//       { name: 'A Madhwal', role: 'Bowler' },
//       { name: 'K Kartikeya', role: 'Bowler' },
//       { name: 'M Theekshana', role: 'Bowler' },
//       { name: 'A Sharma', role: 'Bowler' },
//       { name: 'T Deshpande', role: 'Bowler' },
//       // All Rounders (1)
//       { name: 'W Hasaranga', role: 'All Rounder' },
//     ]
//   },
//   {
//     name: 'Gujarat Titans',
//     players: [
//       // Batters (6)
//       { name: 'S Gill', role: 'Batsman (c)' },
//       { name: 'J Buttler', role: 'Batsman (wk)' },
//       { name: 'B S Sudharsan', role: 'Batsman' },
//       { name: 'A Rawat', role: 'Batsman (wk)' },
//       { name: 'K Kushagra', role: 'Batsman (wk)' },
//       { name: 'S Khan', role: 'Batsman' },
//       // Bowlers (9)
//       { name: 'R S Kishore', role: 'Bowler' },
//       { name: 'J Yadav', role: 'Bowler' },
//       { name: 'K Rabada', role: 'Bowler' },
//       { name: 'G Coetzee', role: 'Bowler' },
//       { name: 'P Krishna', role: 'Bowler' },
//       { name: 'M Siraj', role: 'Bowler' },
//       { name: 'I Sharma', role: 'Bowler' },
//       { name: 'K Khejroliya', role: 'Bowler' },
//       { name: 'G Brar', role: 'Bowler' },
//       // All Rounders (10)
//       { name: 'S Rutherford', role: 'All Rounder' },
//       { name: 'G Phillips', role: 'All Rounder' },
//       { name: 'M Lomror', role: 'All Rounder' },
//       { name: 'W Sundar', role: 'All Rounder' },
//       { name: 'K Janat', role: 'All Rounder' },
//       { name: 'N Sindhu', role: 'All Rounder' },
//       { name: 'A Khan', role: 'All Rounder' },
//       { name: 'M J Suthar', role: 'All Rounder' },
//       { name: 'R Khan', role: 'All Rounder' },
//       { name: 'R Tewatia', role: 'All Rounder' },
//     ]
//   },
//   {
//     name: 'Lucknow Super Giants',
//     players: [
//       // Batters (8)
//       { name: 'R Pant', role: 'Batsman (c & wk)' },
//       { name: 'M Breetzke', role: 'Batsman' },
//       { name: 'N Pooran', role: 'Batsman (wk)' },
//       { name: 'D Miller', role: 'Batsman' },
//       { name: 'A Juyal', role: 'Batsman (wk)' },
//       { name: 'H Singh', role: 'Batsman' },
//       { name: 'A Badoni', role: 'Batsman' },
//       { name: 'A Samad', role: 'Batsman' },
//       // Bowlers (10)
//       { name: 'S Joseph', role: 'Bowler' },
//       { name: 'A Deep', role: 'Bowler' },
//       { name: 'A Khan', role: 'Bowler' },
//       { name: 'R Bishnoi', role: 'Bowler' },
//       { name: 'M Siddharth', role: 'Bowler' },
//       { name: 'A Singh', role: 'Bowler' },
//       { name: 'M Yadav', role: 'Bowler' },
//       { name: 'D S Rathi', role: 'Bowler' },
//       { name: 'P Yadav', role: 'Bowler' },
//       { name: 'S Thakur', role: 'Bowler' },
//       // All Rounders (4)
//       { name: 'A Markram', role: 'All Rounder' },
//       { name: 'M Marsh', role: 'All Rounder' },
//       { name: 'A Kulkarni', role: 'All Rounder' },
//       { name: 'S Ahmed', role: 'All Rounder' },
//       { name: 'Y Chaudhary', role: 'All Rounder' },
//       { name: 'R Hangargekar', role: 'All Rounder' },
//     ]
//   }
// ];

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(async () => {
//     console.log('MongoDB connected');
//     // Clear existing teams
//     await Team.deleteMany({});
//     // Insert new teams
//     await Team.insertMany(teamsData);
//     console.log('Teams seeded successfully');
//     process.exit();
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });

// seedSchedule.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Schedule = require('./models/Schedule');

dotenv.config();

const scheduleData = [
  { id: 1, teams: "Royal Challengers Bengaluru vs Kolkata Knight Riders", date: "2025-03-22", time: "19:30", venue: "Kolkata" },
  { id: 2, teams: "Rajasthan Royals vs Sunrisers Hyderabad", date: "2025-03-23", time: "15:30", venue: "Hyderabad" },
  { id: 3, teams: "Mumbai Indians vs Chennai Super Kings", date: "2025-03-23", time: "19:30", venue: "Chennai" },
  { id: 4, teams: "Lucknow Super Giants vs Delhi Capitals", date: "2025-03-24", time: "19:30", venue: "Visakhapatnam" },
  { id: 5, teams: "Punjab Kings vs Gujarat Titans", date: "2025-03-25", time: "19:30", venue: "Ahmedabad" },
  { id: 6, teams: "Kolkata Knight Riders vs Rajasthan Royals", date: "2025-03-26", time: "19:30", venue: "Guwahati" },
  { id: 7, teams: "Lucknow Super Giants vs Sunrisers Hyderabad", date: "2025-03-27", time: "19:30", venue: "Hyderabad" },
  { id: 8, teams: "Royal Challengers Bengaluru vs Chennai Super Kings", date: "2025-03-28", time: "19:30", venue: "Chennai" },
  { id: 9, teams: "Mumbai Indians vs Gujarat Titans", date: "2025-03-29", time: "19:30", venue: "Ahmedabad" },
  { id: 10, teams: "Sunrisers Hyderabad vs Delhi Capitals", date: "2025-03-30", time: "15:30", venue: "Visakhapatnam" },
  { id: 11, teams: "Chennai Super Kings vs Rajasthan Royals", date: "2025-03-30", time: "19:30", venue: "Guwahati" },
  { id: 12, teams: "Kolkata Knight Riders vs Mumbai Indians", date: "2025-03-31", time: "19:30", venue: "Mumbai" },
  { id: 13, teams: "Punjab Kings vs Lucknow Super Giants", date: "2025-04-01", time: "19:30", venue: "Lucknow" },
  { id: 14, teams: "Gujarat Titans vs Royal Challengers Bengaluru", date: "2025-04-02", time: "19:30", venue: "Bengaluru" },
  { id: 15, teams: "Sunrisers Hyderabad vs Kolkata Knight Riders", date: "2025-04-03", time: "19:30", venue: "Kolkata" },
  { id: 16, teams: "Mumbai Indians vs Lucknow Super Giants", date: "2025-04-04", time: "19:30", venue: "Lucknow" },
  { id: 17, teams: "Delhi Capitals vs Chennai Super Kings", date: "2025-04-05", time: "15:30", venue: "Chennai" },
  { id: 18, teams: "Rajasthan Royals vs Punjab Kings", date: "2025-04-05", time: "19:30", venue: "New Chandigarh" },
  { id: 19, teams: "Lucknow Super Giants vs Kolkata Knight Riders", date: "2025-04-06", time: "15:30", venue: "Kolkata" },
  { id: 20, teams: "Gujarat Titans vs Sunrisers Hyderabad", date: "2025-04-06", time: "19:30", venue: "Hyderabad" },
  { id: 21, teams: "Royal Challengers Bengaluru vs Mumbai Indians", date: "2025-04-07", time: "19:30", venue: "Mumbai" },
  { id: 22, teams: "Chennai Super Kings vs Punjab Kings", date: "2025-04-08", time: "19:30", venue: "New Chandigarh" },
  { id: 23, teams: "Rajasthan Royals vs Gujarat Titans", date: "2025-04-09", time: "19:30", venue: "Ahmedabad" },
  { id: 24, teams: "Delhi Capitals vs Royal Challengers Bengaluru", date: "2025-04-10", time: "19:30", venue: "Bengaluru" },
  { id: 25, teams: "Kolkata Knight Riders vs Chennai Super Kings", date: "2025-04-11", time: "19:30", venue: "Chennai" },
  { id: 26, teams: "Gujarat Titans vs Lucknow Super Giants", date: "2025-04-12", time: "15:30", venue: "Lucknow" },
  { id: 27, teams: "Punjab Kings vs Sunrisers Hyderabad", date: "2025-04-12", time: "19:30", venue: "Hyderabad" },
  { id: 28, teams: "Royal Challengers Bengaluru vs Rajasthan Royals", date: "2025-04-13", time: "15:30", venue: "Jaipur" },
  { id: 29, teams: "Mumbai Indians vs Delhi Capitals", date: "2025-04-13", time: "19:30", venue: "Delhi" },
  { id: 30, teams: "Chennai Super Kings vs Lucknow Super Giants", date: "2025-04-14", time: "19:30", venue: "Lucknow" },
  { id: 31, teams: "Kolkata Knight Riders vs Punjab Kings", date: "2025-04-15", time: "19:30", venue: "New Chandigarh" },
  { id: 32, teams: "Rajasthan Royals vs Delhi Capitals", date: "2025-04-16", time: "19:30", venue: "Delhi" },
  { id: 33, teams: "Sunrisers Hyderabad vs Mumbai Indians", date: "2025-04-17", time: "19:30", venue: "Mumbai" },
  { id: 34, teams: "Royal Challengers Bengaluru vs Punjab Kings", date: "2025-04-18", time: "19:30", venue: "Bengaluru" },
  { id: 35, teams: "Gujarat Titans vs Delhi Capitals", date: "2025-04-19", time: "15:30", venue: "Ahmedabad" },
  { id: 36, teams: "Rajasthan Royals vs Lucknow Super Giants", date: "2025-04-19", time: "19:30", venue: "Jaipur" },
  { id: 37, teams: "Punjab Kings vs Royal Challengers Bengaluru", date: "2025-04-20", time: "15:30", venue: "Chandigarh" },
  { id: 38, teams: "Mumbai Indians vs Chennai Super Kings", date: "2025-04-20", time: "19:30", venue: "Mumbai" },
  { id: 39, teams: "Kolkata Knight Riders vs Gujarat Titans", date: "2025-04-21", time: "19:30", venue: "Kolkata" },
  { id: 40, teams: "Lucknow Super Giants vs Delhi Capitals", date: "2025-04-22", time: "19:30", venue: "Lucknow" },
  { id: 41, teams: "Sunrisers Hyderabad vs Mumbai Indians", date: "2025-04-23", time: "19:30", venue: "Hyderabad" },
  { id: 42, teams: "Royal Challengers Bengaluru vs Rajasthan Royals", date: "2025-04-24", time: "19:30", venue: "Bengaluru" },
  { id: 43, teams: "Chennai Super Kings vs Sunrisers Hyderabad", date: "2025-04-25", time: "19:30", venue: "Chennai" },
  { id: 44, teams: "Kolkata Knight Riders vs Punjab Kings", date: "2025-04-26", time: "19:30", venue: "Kolkata" },
  { id: 45, teams: "Mumbai Indians vs Lucknow Super Giants", date: "2025-04-27", time: "15:30", venue: "Mumbai" },
  { id: 46, teams: "Delhi Capitals vs Royal Challengers Bengaluru", date: "2025-04-27", time: "19:30", venue: "Delhi" },
  { id: 47, teams: "Rajasthan Royals vs Gujarat Titans", date: "2025-04-28", time: "19:30", venue: "Jaipur" },
  { id: 48, teams: "Delhi Capitals vs Kolkata Knight Riders", date: "2025-04-29", time: "19:30", venue: "Delhi" },
  { id: 49, teams: "Chennai Super Kings vs Punjab Kings", date: "2025-04-30", time: "19:30", venue: "Chennai" },
  { id: 50, teams: "Rajasthan Royals vs Mumbai Indians", date: "2025-05-01", time: "19:30", venue: "Jaipur" },
  { id: 51, teams: "Gujarat Titans vs Sunrisers Hyderabad", date: "2025-05-02", time: "19:30", venue: "Ahmedabad" },
  { id: 52, teams: "Royal Challengers Bengaluru vs Chennai Super Kings", date: "2025-05-03", time: "19:30", venue: "Bengaluru" },
  { id: 53, teams: "Kolkata Knight Riders vs Rajasthan Royals", date: "2025-05-04", time: "15:30", venue: "Kolkata" },
  { id: 54, teams: "Punjab Kings vs Lucknow Super Giants", date: "2025-05-04", time: "19:30", venue: "Dharamsala" },
  { id: 55, teams: "Sunrisers Hyderabad vs Delhi Capitals", date: "2025-05-05", time: "19:30", venue: "Hyderabad" },
  { id: 56, teams: "Mumbai Indians vs Gujarat Titans", date: "2025-05-06", time: "19:30", venue: "Mumbai" },
  { id: 57, teams: "Kolkata Knight Riders vs Chennai Super Kings", date: "2025-05-07", time: "19:30", venue: "Kolkata" },
  { id: 58, teams: "Punjab Kings vs Delhi Capitals", date: "2025-05-08", time: "19:30", venue: "Dharamsala" },
  { id: 59, teams: "Lucknow Super Giants vs Royal Challengers Bengaluru", date: "2025-05-09", time: "19:30", venue: "Lucknow" },
  { id: 60, teams: "Sunrisers Hyderabad vs Kolkata Knight Riders", date: "2025-05-10", time: "19:30", venue: "Hyderabad" },
  { id: 61, teams: "Punjab Kings vs Mumbai Indians", date: "2025-05-11", time: "15:30", venue: "Dharamsala" },
  { id: 62, teams: "Delhi Capitals vs Gujarat Titans", date: "2025-05-11", time: "19:30", venue: "Delhi" },
  { id: 63, teams: "Chennai Super Kings vs Rajasthan Royals", date: "2025-05-12", time: "19:30", venue: "Chennai" },
  { id: 64, teams: "Royal Challengers Bengaluru vs Sunrisers Hyderabad", date: "2025-05-13", time: "19:30", venue: "Bengaluru" },
  { id: 65, teams: "Gujarat Titans vs Lucknow Super Giants", date: "2025-05-14", time: "19:30", venue: "Ahmedabad" },
  { id: 66, teams: "Mumbai Indians vs Delhi Capitals", date: "2025-05-15", time: "19:30", venue: "Mumbai" },
  { id: 67, teams: "Rajasthan Royals vs Punjab Kings", date: "2025-05-16", time: "19:30", venue: "Jaipur" },
  { id: 68, teams: "Royal Challengers Bengaluru vs Kolkata Knight Riders", date: "2025-05-17", time: "19:30", venue: "Bengaluru" },
  { id: 69, teams: "Gujarat Titans vs Chennai Super Kings", date: "2025-05-18", time: "15:30", venue: "Ahmedabad" },
  { id: 70, teams: "Lucknow Super Giants vs Sunrisers Hyderabad", date: "2025-05-18", time: "19:30", venue: "Lucknow" },
  { id: 71, teams: "TBC vs TBC", date: "2025-05-20", time: "19:30", venue: "Hyderabad" }, // Qualifier 1
  { id: 72, teams: "TBC vs TBC", date: "2025-05-21", time: "19:30", venue: "Hyderabad" }, // Eliminator
  { id: 73, teams: "TBC vs TBC", date: "2025-05-23", time: "19:30", venue: "Kolkata" },   // Qualifier 2
  { id: 74, teams: "TBC vs TBC", date: "2025-05-25", time: "19:30", venue: "Kolkata" },   // Final
];

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');
    await Schedule.deleteMany({});
    await Schedule.insertMany(scheduleData);
    console.log('Schedule seeded successfully');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
