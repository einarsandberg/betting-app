/* eslint-disable */
"use strict"
/**
 * Script to populate database with the seasons matches from json file
 * To run: `mongo populate.ts`
 *  
*/
import mongoose from 'mongoose';
import Match, { IMatch } from '../schemas/Match';
import fs from 'fs';

// DB
mongoose.connect('mongodb://localhost/betting-app-db', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

async function addMatchesToDb(matches: IMatch[]) {
    try {
        const initialMatches = await Match.find();
        if (initialMatches.length > 0 ) {
            console.error('ERROR: Database already contains matches');
            process.exit(1);
        }

        let matchesToAdd: IMatch[] = [];
        matches.forEach((match: IMatch) => {
            matchesToAdd.push(new Match({ ...match }));
        })
            
       await Match.insertMany(matchesToAdd);
       const res = await Match.find();
       console.log('Successfully added ' + res.length + ' matches');
       process.exit();
    } catch(err) {
        console.error(err);
    }
}

async function populateMatches() {
    fs.readFile(__dirname + '/matches.json', 'utf8', (err, data: string) => {
        if (err) throw err;
        const matches: IMatch[] = JSON.parse(data);
        addMatchesToDb(matches)
    });
}

populateMatches();

