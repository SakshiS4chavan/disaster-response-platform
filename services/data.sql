-- Create disasters table
CREATE TABLE disasters (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  location_name TEXT NOT NULL,
  location GEOGRAPHY(Point, 4326),
  description TEXT,
  tags TEXT[],
  owner_id TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create geospatial index
CREATE INDEX disasters_location_idx ON disasters USING GIST (location);
