import express from 'express';
import { extractLocationFromText } from '../services/gemini.js';
import { geocodeLocation } from '../services/geocoding.js';
import { supabase } from '../services/supabaseClient.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, description, location_name, tags, owner_id } = req.body;
    const locationExtracted = await extractLocationFromText(description);
    const { lat, lng } = await geocodeLocation(locationExtracted || location_name);

    const { data, error } = await supabase.from('disasters').insert([{
      title,
      location_name: locationExtracted || location_name,
      location: `POINT(${lng} ${lat})`,
      description,
      tags,
      owner_id
    }]);

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
