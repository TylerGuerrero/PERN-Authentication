CREATE TABLE users(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE todos(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    desription VARCHAR(255) NOT NULL,
    user_id UUID,
    FOREIGN KEY(user_id) 
    REFERENCES users(id)
);

