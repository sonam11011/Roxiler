CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL CHECK (char_length(name) BETWEEN 20 AND 60),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  address VARCHAR(400) NOT NULL CHECK (char_length(address) <= 400),
  role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'USER', 'OWNER')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stores (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL CHECK (char_length(name) BETWEEN 20 AND 60),
  email VARCHAR(255) NOT NULL UNIQUE,
  address VARCHAR(400) NOT NULL CHECK (char_length(address) <= 400),
  owner_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ratings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  store_id INTEGER NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, store_id)
);

CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_name ON users(name);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_stores_name ON stores(name);
CREATE INDEX IF NOT EXISTS idx_stores_address ON stores(address);
CREATE INDEX IF NOT EXISTS idx_ratings_store_id ON ratings(store_id);
CREATE INDEX IF NOT EXISTS idx_ratings_user_id ON ratings(user_id);
