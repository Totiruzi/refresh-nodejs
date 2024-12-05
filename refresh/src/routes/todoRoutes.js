import express from 'express';
import database from '../db.js';

const router = express.Router();

// get all todo
router.get('/', (req, res) => {})

// create todo
router.post('/', (req, res) => {})

// Update todo
router.put('/:id', (req, res) => {})

// delete todo
router.delete('/:id', (req, res) => {})

export default router;
